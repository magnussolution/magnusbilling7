<?php

/**
 * Classe de com funcionalidades globais
 *
 * MagnusBilling <info@magnusbilling.com>
 * 08/06/2013
 */

class AsteriskAccess
{

    private $asmanager;
    private static $instance;
    private static $config;

    public static function instance($host = 'localhost', $user = 'magnus', $pass = 'magnussolution')
    {
        if (is_null(self::$instance)) {
            self::$instance = new AsteriskAccess();
        }
        self::$instance->connectAsterisk($host, $user, $pass);
        return self::$instance;
    }

    private function __construct()
    {
        $this->asmanager = new AGI_AsteriskManager;
        $this->config    = LoadConfig::getConfig();
    }

    private function connectAsterisk($host, $user, $pass)
    {
        if ($host == 'localhost' && file_exists('/etc/asterisk/asterisk2.conf')) {
            $configFile = '/etc/asterisk/asterisk2.conf';
            $array      = parse_ini_file($configFile);
            $host       = $array['host'];
        }
        $this->asmanager->connect($host, $user, $pass);
    }

    public function queueAddMember($member, $queue)
    {
        $this->asmanager->Command("queue add member SIP/" . $member . " to " . preg_replace("/ /", "\ ", $queue));
    }

    public function queueRemoveMember($member, $queue)
    {
        $this->asmanager->Command("queue remove member SIP/" . $member . " from " . preg_replace("/ /", "\ ", $queue));
    }

    public function queuePauseMember($member, $queue, $reason = 'normal')
    {
        $this->asmanager->Command("queue pause member SIP/" . $member . " queue " . preg_replace("/ /", "\ ", $queue) . " reason " . $reason);
    }

    public function queueUnPauseMember($member, $queue, $reason = 'normal')
    {
        $this->asmanager->Command("queue unpause member SIP/" . $member . " queue " . preg_replace("/ /", "\ ", $queue) . " reason " . $reason);
    }

    public function queueShow($queue)
    {
        return $this->asmanager->Command("queue show " . $queue);
    }

    public function reload()
    {
        return $this->asmanager->Command("reload");
    }

    public function queueReload()
    {
        return $this->asmanager->Command("queue reload all");
    }

    public function queueReseteStats($queue)
    {
        return $this->asmanager->Command("queue reset stats " . $queue);
    }

    public function generateQueueFile()
    {

        $select = '`name`, `language`, `musiconhold`, `announce`, `context`, `timeout`, `announce-frequency`, `announce-round-seconds`, `announce-holdtime`, `announce-position`, `retry`, `wrapuptime`, `maxlen`, `servicelevel`, `strategy`, `joinempty`, `leavewhenempty`, `eventmemberstatus`, `eventwhencalled`, `reportholdtime`, `memberdelay`, `weight`, `timeoutrestart`, `periodic-announce`, `periodic-announce-frequency`, `ringinuse`, `setinterfacevar`, `setqueuevar`, `setqueueentryvar`';
        $model  = Queue::model()->findAll(
            [
                'select' => $select,
            ]
        );

        if (count($model)) {
            AsteriskAccess::instance()->writeAsteriskFile($model, '/etc/asterisk/queues_magnus.conf', 'name');
        }

        AsteriskAccess::instance()->mohReload();
    }

    public function mohReload()
    {
        return $this->asmanager->Command("moh reload");
    }

    public function hangupRequest($channel, $server = 'localhost')
    {

        AsteriskAccess::instance($server, 'magnus', 'magnussolution');
        $this->asmanager->Command("hangup request " . $channel);
    }

    public function dialPlanReload()
    {
        return $this->asmanager->Command("dialplan reload");
    }

    public function sipReload()
    {
        return $this->asmanager->Command("sip reload");
    }

    public function VoiceMailReload()
    {
        return $this->asmanager->Command("voicemail reload");
    }

    public function sipShowPeer($peer)
    {
        return $this->asmanager->Command("sip show peer " . $peer);
    }

    public function sipShowPeers()
    {
        return $this->asmanager->Command("sip show peers");
    }

    public function sipShowRegistry()
    {
        return $this->asmanager->Command("sip show registry");
    }

    public function iaxReload()
    {
        return @$this->asmanager->Command("iax2 reload");
    }

    public function coreShowChannelsConcise()
    {
        return @$this->asmanager->Command("core show channels concise");
    }

    public function cdrShowActive()
    {
        return @$this->asmanager->Command("cdr show active");
    }

    public function coreShowChannelsVerbose()
    {
        return @$this->asmanager->Command("core show channels verbose");
    }

    public function groupShowChannels()
    {
        return $this->asmanager->Command("group show channels");
    }

    public function coreShowChannel($channel)
    {
        return @$this->asmanager->Command("core show channel " . $channel);
    }
    public function sipShowChannel($channel)
    {
        return @$this->asmanager->Command("sip show channel " . $channel);
    }

    public function queueGetMemberStatus($member, $campaign_name)
    {
        $queueData = AsteriskAccess::instance()->queueShow($campaign_name);
        $queueData = explode("\n", $queueData["data"]);
        $status    = "error";
        foreach ($queueData as $key => $data) {

            $data = trim($data);

            if (preg_match("/SIP\/" . Yii::app()->session['username'] . "/", $data)) {
                $line   = explode('(', $data);
                $status = trim($line[3]);
                $status = explode(")", $status);

                $status = $status[0];
                break;
            }
        }
        return $status;
    }
    //model , file, e o nome para o contexto
    public function writeAsteriskFile($model, $file, $head_field = 'name')
    {
        $rows = Util::getColumnsFromModel($model);

        $fd = fopen($file, "w");
        file_put_contents($file, '');

        if ($head_field == 'trunkcode' && preg_match("/sip/", $file)) {
            $registerFile = '/etc/asterisk/sip_magnus_register.conf';
            file_put_contents($registerFile, '');
            $fr = fopen($registerFile, "w");
        } elseif ($head_field == 'trunkcode' && preg_match("/iax/", $file)) {
            $registerFile = '/etc/asterisk/iax_magnus_register.conf';
            file_put_contents($registerFile, '');
            $fr = fopen($registerFile, "w");
        }

        if (! $fd) {
            echo "</br><center><b><font color=red>" . gettext("Could not open buddy file") . $file . "</font></b></center>";
        } else {
            foreach ($rows as $key => $data) {
                $line         = "\n\n[" . $data[$head_field] . "]\n";
                $registerLine = '';
                foreach ($data as $key => $option) {
                    if ($key == $head_field) {
                        continue;
                    }

                    //registrar tronco
                    if ($key == 'register_string' && preg_match("/^.{3}.*:.{3}.*@.{5}.*/", $data['register_string'])) {
                        $registerLine .= 'register=>' . $data['register_string'] . "\n";
                    } elseif ($key == 'encryption' && $option == 'no') {
                        continue;
                    } elseif ($key == 'transport' && $option == 'no') {
                        continue;
                    } elseif ($key == 'port' && $option == '5060') {
                        continue;
                    } elseif ($key == 'user') {
                        $line .= $key . '=' . $option . "\n";
                        $line .= 'username=' . $option . "\n";
                    } elseif ($key == 'maxuse') {
                        if ($option > 0) {
                            $line .= 'call-limit=' . $option . "\n";
                        }
                    } elseif ($key == 'sip_config') {
                        $line .= $option;
                    } else {
                        $line .= $key . '=' . $option . "\n";
                    }

                    //to queues member
                    if ($key == 'setqueueentryvar') {
                        $line .= "\n";
                        $modelMember = QueueMember::model()->findAll([
                            'condition' => 'queue_name = :key AND paused = 0',
                            'params'    => [':key' => $data['name']],
                            'order'     => 'id ASC',
                        ]);
                        foreach ($modelMember as $member) {
                            $line .= 'member=' . $member['interface'] . "\n";
                        }
                    }
                }

                if (isset($fr)) {
                    if (fwrite($fr, $registerLine) === false) {
                        echo "Impossible to write to the file" . " ($registerLine)";
                        break;
                    }
                }

                if (fwrite($fd, $line) === false) {
                    echo "Impossible to write to the file ($buddyfile)";
                    break;
                }
            }

            if ($head_field == 'trunkcode') {
                $sql          = "SELECT * FROM pkg_servers WHERE type != 'mbilling' AND status IN (1,4) AND host != 'localhost'";
                $modelServers = Yii::app()->db->createCommand($sql)->queryAll();

                foreach ($modelServers as $key => $data) {

                    if ($data['type'] == 'asterisk') {
                        $line = "\n\n[" . preg_replace('/ /', '', strtolower($data['name'])) . "]\n";
                        $line .= 'context=slave' . "\n";
                    } else if ($data['type'] == 'sipproxy') {

                        $line = "\n\n[sipproxy-" . preg_replace('/ /', '', strtolower($data['name'])) . "-" . $data['id'] . "]\n";
                        $line .= 'accountcode=sipproxy' . "\n";
                        $line .= 'context=proxy' . "\n";
                    } else if ($data['type'] == 'mbilling') {
                        $line = "\n\n[mbilling]\n";
                        $line .= 'context=slave' . "\n";
                    }
                    $line .= 'host=' . $data['host'] . "\n";
                    $line .= 'deny=0.0.0.0/0.0.0.0' . "\n";
                    $line .= 'permit=' . $data['host'] . "/255.255.255.0\n";
                    $line .= 'disallow=all' . "\n";
                    $line .= 'allow=' . $this->config['global']['default_codeds'] . "\n";
                    $line .= 'dtmfmode=RFC2833' . "\n";
                    $line .= 'insecure=port,invite' . "\n";

                    $line .= 'directmedia=no' . "\n";
                    $line .= 'nat=force_rport,comedia' . "\n";
                    $line .= 'qualify=no' . "\n";
                    $line .= 'type=friend' . "\n";
                    $line .= 'sendrpid=no' . "\n";
                    $line .= 'port=' . $data['sip_port'] . "\n";

                    if (fwrite($fr, $registerLine) === false) {
                        echo gettext("Impossible to write to the file") . " ($registerLine)";
                        break;
                    }

                    if (fwrite($fd, $line) === false) {
                        echo "Impossible to write to the file ($buddyfile)";
                        break;
                    }
                }
            }

            fclose($fd);

            if (preg_match("/sip/", $file)) {
                AsteriskAccess::instance()->sipReload();
            } elseif (preg_match("/iax/", $file)) {
                AsteriskAccess::instance()->iaxReload();
            } else {
                AsteriskAccess::instance()->queueReload();
            }
        }
    }
    //call file , time in seconds to create the file
    public static function generateCallFile($callFile, $time = 0)
    {
        $aleatorio    = str_replace(" ", "", microtime(true));
        $arquivo_call = "/var/www/html/mbilling/tmp/" . $aleatorio . ".call";
        $fp           = fopen("$arquivo_call", "a+");
        fwrite($fp, $callFile);
        fclose($fp);

        $time += time();

        touch("$arquivo_call", $time);
        @chown("$arquivo_call", "asterisk");
        @chgrp("$arquivo_call", "asterisk");
        chmod("$arquivo_call", 0755);

        $destination_file = '/var/spool/asterisk/outgoing/' . $aleatorio . '.call'; // Assuming $aleatorio is defined

        rename($arquivo_call, $destination_file);
    }

    public function getCallsPerDid($did, $agi = null)
    {
        $channelsData = AsteriskAccess::instance()->coreShowChannelsConcise();
        $channelsData = explode("\n", $channelsData["data"]);

        $calls = 0;
        foreach ($channelsData as $key => $line) {
            if (preg_match("/$did\!.*\!Dial\!/", $line)) {
                $calls++;
            }
        }

        return $calls;
    }

    public function getCallsPerUser($accountcode)
    {
        $channelsData = AsteriskAccess::instance()->coreShowChannelsConcise();
        $channelsData = explode("\n", $channelsData["data"]);
        $modelSip     = Sip::model()->findAll('id_user = ( SELECT id FROM pkg_user WHERE username = :key)', [':key' => $accountcode]);
        $sipAccounts  = '';
        foreach ($modelSip as $key => $sip) {
            $sipAccounts .= $sip->name . '|';
        }

        $sipAccounts = substr($sipAccounts, 0, -1);
        $calls       = 0;
        foreach ($channelsData as $key => $line) {
            if (preg_match("/^SIP\/($sipAccounts)-/", $line)) {
                $calls++;
            }
        }

        return $calls;
    }

    public function groupTrunk($agi, $ipaddress, $maxuse)
    {
        if ($maxuse > 0) {

            $agi->verbose('Trunk have channels limit', 15);
            //Set group to count the trunk call use
            $agi->set_variable("GROUP()", $ipaddress);

            $groupData = AsteriskAccess::instance()->groupShowChannels();

            $arr   = explode("\n", $groupData["data"]);
            $count = 0;
            if ($arr[0] != "") {

                foreach ($arr as $temp) {
                    $linha = explode("  ", $temp);

                    if (trim($linha[4]) == $ipaddress) {
                        $channel = AsteriskAccess::getCoreShowChannel($linha[0], $agi);
                        $agi->verbose(print_r($channel['State'], true), 15);

                        if (preg_match("/Up |Ring /", $channel['State'])) {
                            $count++;
                        }
                    }
                }
            }
            if ($count > $maxuse) {
                $agi->verbose('Trunk ' . $ipaddress . ' have  ' . $count . ' calls, and the maximun call is ' . $maxuse, 1);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    public static function getSipShowPeers()
    {
        $sql          = "SELECT * FROM pkg_servers WHERE type = 'asterisk' AND status IN (1,4) AND host != 'localhost'";
        $modelServers = Yii::app()->db->createCommand($sql)->queryAll();

        array_push($modelServers, [
            'host'     => 'localhost',
            'username' => 'magnus',
            'password' => 'magnussolution',
        ]);
        $result = [];
        foreach ($modelServers as $key => $server) {
            $data = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->sipShowPeers();

            if (! isset($data['data']) || strlen($data['data']) < 10) {
                continue;
            }

            $linesSipResult = explode("\n", $data['data']);

            $column  = 'Name/username             Host                                    Dyn Forcerport Comedia    ACL Port     Status      Description';
            $columns = preg_split("/\s+/", $column);

            $index = [];

            for ($i = 0; $i < 10; $i++) {
                $index[] = @strpos($column, $columns[$i]);
            }

            foreach ($linesSipResult as $key => $line) {
                $element = [];
                foreach ($index as $key => $value) {
                    $startIndex               = $value;
                    $lenght                   = @$index[$key + 1] - $value;
                    @$element[$columns[$key]] = trim(isset($index[$key + 1]) ? substr($line, $startIndex, $lenght) : substr($line, $startIndex));
                }
                $element['server'] = $server['host'];
                $result[]          = $element;
            }
        }
        return $result;
    }

    public static function getCoreShowCdrChannels()
    {

        $sql          = "SELECT * FROM pkg_servers WHERE type = 'asterisk' AND status IN (1,4) AND host != 'localhost'";
        $modelServers = Yii::app()->db->createCommand($sql)->queryAll();

        array_push($modelServers, [
            'host'     => 'localhost',
            'username' => 'magnus',
            'password' => 'magnussolution',
        ]);

        $channels = [];
        foreach ($modelServers as $key => $server) {

            $data = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->cdrShowActive();

            if (! isset($data) || ! isset($data['data'])) {
                Servers::model()->updateByPk($server['id'], ['status' => 2]);
                continue;
            }

            if (! isset($data) || ! isset($data['data'])) {
                continue;
            }

            $linesCallsResult = explode("\n", $data['data']);

            for ($i = 0; $i < count($linesCallsResult) - 1; $i++) {
                $call = explode("|", $linesCallsResult[$i]);

                if (!preg_match('/^SIP|^IAX|^PJSIP/', $call[0])) {
                    continue;
                }

                if ($call[4] == 'Down') {
                    continue;
                }
                if ($call[6] == '<none>' && $call[7] != 'AGI' && substr($call[1], 0, 2) != 'MC') {
                    continue;
                }
                $call['server'] = $server['host'];
                $channels[]     = $call;
            }
        }

        return $channels;
    }

    public static function getCoreShowChannels()
    {

        $sql          = "SELECT * FROM pkg_servers WHERE type = 'asterisk' AND status IN (1,4) AND host != 'localhost'";
        $modelServers = Yii::app()->db->createCommand($sql)->queryAll();

        array_push($modelServers, [
            'host'     => 'localhost',
            'username' => 'magnus',
            'password' => 'magnussolution',
        ]);

        $channels = [];
        foreach ($modelServers as $key => $server) {

            $columns = ['Channel', 'Context', 'Exten', 'Priority', 'Stats', 'Application', 'Data', 'CallerID', 'Accountcode', 'Amaflags', 'Duration', 'Bridged'];
            $data    = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->coreShowChannelsConcise();

            if (! isset($data) || ! isset($data['data'])) {
                return;
            }

            $linesCallsResult = explode("\n", $data['data']);

            if (count($linesCallsResult) < 1) {
                return;
            }

            for ($i = 0; $i < count($linesCallsResult); $i++) {
                $call = explode("!", $linesCallsResult[$i]);
                if (! preg_match("/\//", $call[0])) {
                    continue;
                }
                $call['server'] = $server['host'];
                $channels[]     = $call;
            }
        }
        return $channels;
    }

    public static function getCoreShowChannelsVerbose()
    {

        $sql          = "SELECT * FROM pkg_servers WHERE type = 'asterisk' AND status IN (1,4) AND host != 'localhost'";
        $modelServers = Yii::app()->db->createCommand($sql)->queryAll();

        array_push($modelServers, [
            'host'     => 'localhost',
            'username' => 'magnus',
            'password' => 'magnussolution',
        ]);

        $channels = [];
        foreach ($modelServers as $key => $server) {
            $columns = ['Channel', 'Context', 'Extension', 'Prio', 'State', 'Application', 'Data', 'CallerID', 'Duration', 'Accountcode', 'PeerAccount', 'BridgedTo'];
            $data    = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->coreShowChannelsVerbose();

            if (! isset($data) || ! isset($data['data'])) {
                return;
            }

            $linesCallsResult = explode("\n", $data['data']);

            if (count($linesCallsResult) < 1) {
                return;
            }

            for ($i = 0; $i < count($linesCallsResult); $i++) {

                if (preg_match("/\(Outgoing Line\)/", $linesCallsResult[$i])) {
                    continue;
                }
                $call = preg_split("/\s+/", $linesCallsResult[$i]);
                if (! preg_match("/\//", $call[0])) {
                    continue;
                }
                $call['server'] = $server['host'];
                $channels[]     = $call;
            }
        }
        return $channels;
    }

    public static function getCoreShowChannel($channel, $agi = null, $server = null)
    {

        if ($server == null) {
            $sql = "SELECT * FROM pkg_servers WHERE type = 'asterisk' AND  status IN (1,4) AND host != 'localhost'";
            if (isset($agi->engine)) {
                $modelServers = $agi->query($sql)->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $modelServers = Yii::app()->db->createCommand($sql)->queryAll();
            }

            array_push($modelServers, [
                'host'     => 'localhost',
                'username' => 'magnus',
                'password' => 'magnussolution',
            ]);
        } else {
            $modelServers = [];
            array_push($modelServers, [
                'host'     => $server,
                'username' => 'magnus',
                'password' => 'magnussolution',
            ]);
        }

        $channels = [];
        foreach ($modelServers as $key => $server) {
            $data = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->coreShowChannel($channel);
            if (! isset($data['data']) || strlen($data['data']) < 10 || preg_match("/is not a known channe/", $data['data'])) {
                continue;
            }
            $linesCallResult = explode("\n", $data['data']);
            if (count($linesCallResult) < 1) {
                continue;
            }
            $result = [];
            for ($i = 2; $i < count($linesCallResult); $i++) {
                if (preg_match("/level 1: /", $linesCallResult[$i])) {
                    $data = explode("=", substr($linesCallResult[$i], 9));
                } elseif (preg_match("/: /", $linesCallResult[$i])) {
                    $data = explode(":", $linesCallResult[$i]);
                } elseif (preg_match("/=/", $linesCallResult[$i])) {
                    $data = explode("=", $linesCallResult[$i]);
                }
                // echo '<pre>';
                //print_r($data);
                $key   = isset($data[0]) ? $data[0] : '';
                $value = isset($data[1]) ? $data[1] : '';

                if ($key == 'SIPCALLID') {
                    $result[trim($key)] = AsteriskAccess::instance($server['host'], $server['username'], $server['password'])->sipShowChannel(trim($value));
                } else {
                    $result[trim($key)] = trim($value);
                }
            }
            break;
        }

        return $result;
    }

    public function generateSipPeers()
    {
        ini_set('memory_limit', '-1');

        $modelSip = Sip::model()->findAll();

        $buddyfile = '/etc/asterisk/sip_magnus_user.conf';

        $subscriberfile = '/etc/asterisk/sip_magnus_subscriber.conf';
        $subscriber     = '[subscribe]';

        $voicemailFile = '/etc/asterisk/voicemail_magnus.conf';
        file_put_contents($voicemailFile, '');
        $fr_voicemail = fopen($voicemailFile, "w");
        $voicemail    = "[billing]\n";

        if (count($modelSip)) {

            $fd = fopen($buddyfile, "w");
            $fd = fopen($buddyfile, "w");

            if ($fd) {
                foreach ($modelSip as $key => $sip) {

                    if (isset($sip->voicemail) && $sip->voicemail == 1) {
                        $voicemail .= $sip->name . " => " . $sip->voicemail_password . "," . $sip->idUser->lastname . ' ' . $sip->idUser->firstname . "," . $sip->voicemail_email . "\n";
                    }

                    if ($sip->idUser->active == 0) {
                        continue;
                    }

                    if (preg_match('/\:/', $sip->host)) {
                        $host      = explode(':', $sip->host);
                        $sip->host = $host[0];
                        $port      = $host[1];
                    } else {
                        $port = 5060;
                    }

                    $sip->name        = trim($sip->name);
                    $sip->defaultuser = trim($sip->defaultuser);
                    $sip->fromuser    = trim($sip->fromuser);

                    if ($sip->techprefix > 1) {
                        $line = "\n\n[" . $sip->host . "]\n";
                    } else {
                        $line = "\n\n[" . $sip->name . "]\n";
                        $line .= 'accountcode=' . $sip->idUser->username . "\n";
                        if (strlen($sip->defaultuser) > 1) {
                            $line .= 'defaultuser=' . $sip->defaultuser . "\n";
                        }
                        if (strlen($sip->fromuser) > 1) {
                            $line .= 'fromuser=' . $sip->fromuser . "\n";
                        }

                        if (strlen($sip->secret) > 1) {
                            $line .= 'secret=' . $sip->secret . "\n";
                        }
                    }

                    if ($sip->host != 'dynamic') {
                        $line .= 'deny=0.0.0.0/0.0.0.0' . "\n";
                        $line .= 'permit=' . $sip->host . "/255.255.255.0\n";
                    } else {
                        if (strlen($sip->deny) > 1) {
                            $line .= 'deny=' . $sip->deny . "\n";
                        }
                        if (strlen($sip->permit) > 1) {
                            $line .= 'permit=' . $sip->permit . "\n";
                        }
                    }

                    if (isset($port) && $port != 5060) {
                        $line .= 'post=' . $port . "\n";
                    }

                    $line .= 'host=' . $sip->host . "\n";
                    $line .= 'fromdomain=' . $sip->host . "\n";
                    $line .= 'disallow=' . $sip->disallow . "\n";

                    $codecs = explode(",", $sip->allow);
                    foreach ($codecs as $codec) {
                        $line .= 'allow=' . $codec . "\n";
                    }

                    if (strlen($sip->directmedia) > 1) {
                        $line .= 'directmedia=' . $sip->directmedia . "\n";
                    }

                    if (strlen($sip->context) > 1) {
                        $line .= 'context=' . $sip->context . "\n";
                    }

                    if (strlen($sip->dtmfmode) > 1) {
                        $line .= 'dtmfmode=' . $sip->dtmfmode . "\n";
                    }

                    if (strlen($sip->insecure) > 1) {
                        $line .= 'insecure=' . $sip->insecure . "\n";
                    }

                    if (strlen($sip->nat) > 1) {
                        $line .= 'nat=' . $sip->nat . "\n";
                    }

                    if (strlen($sip->qualify) > 1) {
                        $line .= 'qualify=' . $sip->qualify . "\n";
                    }

                    if (strlen($sip->type) > 1) {
                        $line .= 'type=' . $sip->type . "\n";
                    }

                    if (strlen($sip->regexten) > 1) {
                        $line .= 'regexten=' . $sip->regexten . "\n";
                    }

                    if (strlen($sip->amaflags) > 1) {
                        $line .= 'amaflags=' . $sip->amaflags . "\n";
                    }

                    if (strlen($sip->callerid) > 1) {

                        if (preg_match('/\<.*\>/', $sip->callerid)) {
                            $line .= 'callerid=' . $sip->callerid . "\n";
                        } else {
                            $line .= 'callerid=<' . $sip->callerid . ">\n";
                        }
                    }

                    if (strlen($sip->language) > 1) {
                        $line .= 'language=' . $sip->language . "\n";
                    }

                    if ($sip->calllimit > 0) {
                        $line .= 'call-limit=' . $sip->calllimit . "\n";
                    }

                    if (strlen($sip->mohsuggest) > 1) {
                        $line .= 'mohsuggest=' . $sip->mohsuggest . "\n";
                    }

                    if ($sip->videosupport != 'no') {
                        $line .= 'videosupport=' . $sip->videosupport . "\n";
                    }

                    $line .= 'allowtransfer=' . $sip->allowtransfer . "\n";

                    if ($sip->context == 'encryption') {
                        $line .= "encryption=yes\n";
                        $line .= "avpf=yes\n";
                        $line .= "force_avp=yes\n";
                        $line .= "icesupport=yes\n";
                        $line .= "dtlsenable=yes\n";
                        $line .= "dtlsverify=fingerprint\n";
                        $line .= "dtlscertfile=/etc/asterisk/certificate/asterisk.pem\n";
                        $line .= "dtlscafile=/etc/asterisk/certificate/ca.crt\n";
                        $line .= "dtlssetup=actpass\n";
                        $line .= "rtcp_mux=yes\n";
                    }

                    if (isset($sip->sip_config) && $sip->sip_config != '') {
                        $line .= $sip->sip_config . "\n";
                    }

                    if (strlen($sip->sip_group) > 0) {
                        $line .= 'namedcallgroup=' . $sip->sip_group . "\n";
                        $line .= 'namedpickupgroup=' . $sip->sip_group . "\n";
                    }

                    if (fwrite($fd, $line) === false) {
                        echo gettext("Impossible to write to the file") . " ($buddyfile)";
                        break;
                    }

                    if (strlen($sip->defaultuser) > 1) {
                        $subscriber .= 'exten => ' . $sip->defaultuser . ',hint,SIP/' . $sip->defaultuser . "\n";
                    }
                }

                fclose($fd);
            }
        }
        if (fwrite($fr_voicemail, $voicemail) === false) {
            echo "Impossible to write to the file ($fr_voicemail)";
        }
        AsteriskAccess::instance()->VoiceMailReload();

        AsteriskAccess::instance()->sipReload();
    }
    public function generateIaxPeers()
    {

        $modelIax = Iax::model()->findAll();

        $buddyfile = '/etc/asterisk/iax_magnus_user.conf';

        if (count($modelIax)) {

            $fd = fopen($buddyfile, "w");

            if ($fd) {
                foreach ($modelIax as $key => $iax) {

                    if ($iax->idUser->active == 0) {
                        continue;
                    }

                    $line = "\n\n[" . $iax->name . "]\n";
                    if (fwrite($fd, $line) === false) {
                        echo "Impossible to write to the file ($buddyfile)";
                        break;
                    } else {
                        $line = '';

                        $line .= 'host=' . $iax->host . "\n";

                        $line .= 'fromdomain=' . $iax->host . "\n";
                        $line .= 'accountcode=' . $iax->idUser->username . "\n";
                        $line .= 'disallow=' . $iax->disallow . "\n";

                        $codecs = explode(",", $iax->allow);
                        foreach ($codecs as $codec) {
                            $line .= 'allow=' . $codec . "\n";
                        }

                        if (strlen($iax->context) > 1) {
                            $line .= 'context=' . $iax->context . "\n";
                        }

                        if (strlen($iax->dtmfmode) > 1) {
                            $line .= 'dtmfmode=' . $iax->dtmfmode . "\n";
                        }

                        if (strlen($iax->insecure) > 1) {
                            $line .= 'insecure=' . $iax->insecure . "\n";
                        }

                        if (strlen($iax->nat) > 1) {
                            $line .= 'nat=' . $iax->nat . "\n";
                        }

                        if (strlen($iax->qualify) > 1) {
                            $line .= 'qualify=' . $iax->qualify . "\n";
                        }

                        if (strlen($iax->type) > 1) {
                            $line .= 'type=' . $iax->type . "\n";
                        }

                        if (strlen($iax->regexten) > 1) {
                            $line .= 'regexten=' . $iax->regexten . "\n";
                        }

                        if (strlen($iax->amaflags) > 1) {
                            $line .= 'amaflags=' . $iax->amaflags . "\n";
                        }

                        if (strlen($iax->language) > 1) {
                            $line .= 'language=' . $iax->language . "\n";
                        }

                        if (strlen($iax->username) > 1) {
                            $line .= 'username=' . $iax->username . "\n";
                        }

                        if (strlen($iax->fromuser) > 1) {
                            $line .= 'fromuser=' . $iax->fromuser . "\n";
                        }

                        if (strlen($iax->callerid) > 1) {
                            $line .= 'cid_number=' . $iax->callerid . "\n";
                        }

                        if (strlen($iax->callerid) > 1) {
                            $line .= 'callerid=' . $iax->callerid . "\n";
                        }

                        if (strlen($iax->secret) > 1) {
                            $line .= 'secret=' . $iax->secret . "\n";
                        }

                        if ($iax->calllimit > 0) {
                            $line .= 'call-limit=' . $sip->calllimit . "\n";
                        }

                        if (fwrite($fd, $line) === false) {
                            echo gettext("Impossible to write to the file") . " ($buddyfile)";
                            break;
                        }
                    }
                }
                fclose($fd);
            }
        }

        AsteriskAccess::instance()->iaxReload();
    }

    public function writeDidContext()
    {
        $modeDidDestination = Diddestination::model()->findAll('voip_call = 10 AND context != ""');
        $context_file       = '';
        foreach ($modeDidDestination as $key => $destination) {
            $context_file .= "[did-" . $destination->idDid->did . "]\n";
            $context_file .= $destination->context . "\n\n";
        }

        $buddyfile = '/etc/asterisk/extensions_magnus_did.conf';
        $fd        = fopen($buddyfile, "w");
        if ($fd) {
            fwrite($fd, $context_file);
            fclose($fd);
        }

        AsteriskAccess::instance()->dialPlanReload();
    }
}
