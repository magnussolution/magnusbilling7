<?php

/**
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2023 MagnusSolution. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v2.1
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 *
 */
class FailtwobanipCommand extends ConsoleCommand
{
    protected $resultBanIps = [];
    protected $resultUnBanIps = [];
    protected $ignogeips = 'ignoreip = 127.0.0.1 ';
    protected $ssh_port = 22;
    public function run($args)
    {

        /*
        sed -i 's/ssh-iptables/sshd/g' /etc/fail2ban/jail.local 


        echo "[ip-blacklist]
enabled   = true
maxretry  = 0
findtime  = 15552000
bantime   = -1" >> /etc/fail2ban/jail.local

echo "[Definition]
failregex = ^<HOST> \[.*\]$
ignoreregex =
" > /etc/fail2ban/filter.d/ip-blacklist.conf 

        systemctl restart fail2ban
        fail2ban-client status
        

        cd /root/.ssh
        ssh-keygen -t rsa -N "" -f id_rsa
        cat ~/.ssh/id_rsa.pub

        add the ~/.ssh/id_rsa.pub on /root/.ssh/authorized_keys of the proxy and slaves.
        */



        if (isset($args[0])) {
            $this->ssh_port = $args[0];
        }


        $sql = "SELECT count(id) as logged FROM pkg_log where id_log_actions = 1 AND date >= NOW() - INTERVAL (SELECT config_value FROM pkg_configuration WHERE config_key = 'session_timeout') SECOND AND id_user IN (SELECT id FROM pkg_user WHERE id_group IN (SELECT id FROM pkg_group_user WHERE id_user_type = 1))";
        $command = Yii::app()->db->createCommand($sql);
        $resultAdmins = $command->queryAll();
        if ($resultAdmins[0]['logged']  == 0) {
            echo "Admin not logged\n";
            return;
        }


        $sql     = 'SELECT ip FROM pkg_firewall WHERE action = 3';
        $command = Yii::app()->db->createCommand($sql);
        $this->resultUnBanIps = $command->queryAll();

        foreach ($this->resultUnBanIps as  $unbanIP) {
            $sql     = 'DELETE FROM pkg_firewall WHERE ip = "' . $unbanIP['ip'] . '"';
            Yii::app()->db->createCommand($sql)->execute();
        }

        $sql     = 'SELECT ip FROM pkg_firewall WHERE action = 1';
        $command = Yii::app()->db->createCommand($sql);
        $this->resultBanIps = $command->queryAll();


        $sql     = 'SELECT ip FROM pkg_firewall WHERE action = 5';
        $command = Yii::app()->db->createCommand($sql);
        $modelServersIgnoreIPs = $command->queryAll();

        foreach ($modelServersIgnoreIPs as $key => $server) {
            $this->ignogeips .= $server['ip'] . " ";
        }


        echo "\n\nresultUnBanIps";
        print_r($this->resultUnBanIps);

        echo "\nresultBanIps";
        print_r($this->resultBanIps);

        $sql = 'TRUNCATE TABLE pkg_firewall';
        Yii::app()->db->createCommand($sql)->execute();

        foreach ($modelServersIgnoreIPs as $key => $server) {
            $sql = "INSERT INTO pkg_firewall (ip,action, date, description, jail, id_server) VALUES ('" . $server['ip'] . "',5, NOW(), '','IgnoreIP','1')";
            try {
                Yii::app()->db->createCommand($sql)->execute();
            } catch (Exception $e) {
            }
        }


        $modelServers = Servers::model()->findAll('status IN (1,3,4)');

        if (! isset($modelServers[0])) {

            $modelServers = new Servers;


            $modelServers->name     = 'Master';
            $modelServers->host     = 'localhost';
            $modelServers->type     = 'mbilling';
            $modelServers->port = '5038';
            $modelServers->username = 'magnus';
            $modelServers->password = 'magnussolution';
            $modelServers->status = '1';
            $modelServers->description = '1';
            $modelServers->save();
            $modelServers = Servers::model()->findAll('status IN (1,3,4)');
        }

        foreach ($modelServers as $key => $server) {
            if ($server['host'] != 'localhost') {
                $this->ignogeips .= $server['host'] . " ";
            }
        }



        $modelServers = Servers::model()->findAll('status IN (1,3,4)');

        foreach ($modelServers as $key => $server) {

            echo "\n" . $server['host'] . "\n\n";

            if ($server['type'] == 'sipproxy') {

                $this->getLinesCommand('ip-blacklist', 1, $server);
                $this->getLinesCommand('opensips-iptables', 0, $server);
            } else {

                $this->getLinesCommand('ip-blacklist', 1, $server);
                $this->getLinesCommand('asterisk-iptables', 0, $server);
                $this->getLinesCommand('sshd', 0, $server);
            }
        }
    }

    public function getLinesCommand($command, $action = 0, $server)
    {

        echo "sed -i 's/^ignoreip = .*/" . $this->ignogeips . "/' /etc/fail2ban/jail.local\n";

        if ($server['type'] == 'mbilling') {

            shell_exec("sed -i 's/^ignoreip = .*/" . $this->ignogeips . "/' /etc/fail2ban/jail.local");
            shell_exec("systemctl reload fail2ban");


            foreach ($this->resultUnBanIps as  $unbanIP) {

                echo "unbanip IP " .  $unbanIP['ip'] . " on MASTER\n";

                @shell_exec("sudo fail2ban-client set asterisk-iptables unbanip " .  $unbanIP['ip']);
                @shell_exec("sudo fail2ban-client set ip-blacklist unbanip " .  $unbanIP['ip']);
                @shell_exec("sudo fail2ban-client set sshd unbanip " . $unbanIP['ip']);
            }
            if ($command == 'ip-blacklist') {

                foreach ($this->resultBanIps as  $blokedIP) {
                    $status = shell_exec("fail2ban-client set ip-blacklist banip " . $blokedIP['ip']);

                    $sqlCheck = "SELECT COUNT(*) FROM pkg_firewall WHERE ip = '" . $blokedIP['ip'] . "' AND id_server = '" . $server['id'] . "'";
                    $exists = Yii::app()->db->createCommand($sqlCheck)->queryScalar();
                    if ($exists > 0) {
                        continue;
                    }

                    $sql = "INSERT INTO pkg_firewall (ip,action, date, description, jail, id_server) VALUES ('" . $blokedIP['ip'] . "',1, NOW(), '" . $server['name'] . "','$command','" . $server['id'] . "')";
                    try {
                        Yii::app()->db->createCommand($sql)->execute();
                    } catch (Exception $e) {
                    }
                }
            }
            $status = shell_exec("fail2ban-client status " . $command);
        } else {

            @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "sed -i \'s/^ignoreip = .*/' . $this->ignogeips . '/\' /etc/fail2ban/jail.local" ');
            @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "systemctl reload fail2ban"');

            foreach ($this->resultUnBanIps as  $unbanIP) {

                echo "unbanip IP " .  $unbanIP['ip'] . " on " . $server['host'] . "\n";

                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client set asterisk-iptables unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client set ip-blacklist unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client set sshd unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client set opensips-iptables unbanip ' . $unbanIP['ip'] . '" ');
            }

            if ($command == 'ip-blacklist') {
                foreach ($this->resultBanIps as  $blokedIP) {
                    $status =  shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client set ip-blacklist banip ' . $blokedIP['ip'] . '" ');

                    $sqlCheck = "SELECT COUNT(*) FROM pkg_firewall WHERE ip = '" . $blokedIP['ip'] . "' AND id_server = '" . $server['id'] . "'";
                    $exists = Yii::app()->db->createCommand($sqlCheck)->queryScalar();
                    if ($exists > 0) {
                        continue;
                    }
                    $sql = "INSERT INTO pkg_firewall (ip,action, date, description, jail, id_server) VALUES ('" . $blokedIP['ip'] . "',1, NOW(), '" . $server['name'] . "','$command','" . $server['id'] . "')";
                    try {
                        Yii::app()->db->createCommand($sql)->execute();
                    } catch (Exception $e) {
                    }
                }
            }

            $status =  shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p ' . $this->ssh_port . ' "fail2ban-client status ' . $command . '" ');
        }

        preg_match('/Banned IP list:\s*(.*)/', $status, $ipMatches);

        if (!isset($ipMatches[1]) || empty($ipMatches[1])) {
            return;
        }

        $ips = array_filter(array_map('trim', explode(' ', $ipMatches[1])));


        foreach ($ips as $ip) {
            $sql = "INSERT INTO pkg_firewall (ip,action, date, description, jail, id_server) VALUES ('$ip',$action, NOW(), '" . $server['name'] . "','$command','" . $server['id'] . "')";

            echo $sql;
            try {
                Yii::app()->db->createCommand($sql)->execute();
            } catch (Exception $e) {
            }
        }
    }
}
