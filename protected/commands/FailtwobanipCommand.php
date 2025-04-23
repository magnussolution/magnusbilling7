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



        $sql     = 'SELECT ip FROM pkg_firewall WHERE action = 3';
        $command = Yii::app()->db->createCommand($sql);
        $this->resultUnBanIps = $command->queryAll();

        $sql     = 'DELETE FROM pkg_firewall WHERE action = 3';
        $command = Yii::app()->db->createCommand($sql);


        $sql     = 'SELECT ip FROM pkg_firewall WHERE action = 1';
        $command = Yii::app()->db->createCommand($sql);
        $this->resultBanIps = $command->queryAll();


        $sql = 'TRUNCATE TABLE pkg_firewall';
        Yii::app()->db->createCommand($sql)->execute();

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

            echo $server['host'] . "\n";

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
        if ($server['type'] == 'mbilling') {

            foreach ($this->resultUnBanIps as  $unbanIP) {

                echo "unbanip IP " .  $unbanIP['ip'] . "\n";

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

            foreach ($this->resultUnBanIps as  $unbanIP) {

                echo "unbanip IP " .  $unbanIP['ip'] . "\n";

                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client set asterisk-iptables unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client set ip-blacklist unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client set sshd unbanip ' . $unbanIP['ip'] . '" ');
                @shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client set opensips-iptables unbanip ' . $unbanIP['ip'] . '" ');
            }

            if ($command == 'ip-blacklist') {
                foreach ($this->resultBanIps as  $blokedIP) {
                    $status =  shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client set ip-blacklist banip ' . $blokedIP['ip'] . '" ');

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


            $status =  shell_exec('ssh -o StrictHostKeyChecking=no root@' . $server['host'] . ' -p 22 "fail2ban-client status ' . $command . '" ');
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
