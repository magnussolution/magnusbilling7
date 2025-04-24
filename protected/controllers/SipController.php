<?php

/**
 * Acoes do modulo "Sip".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Todos os direitos reservados.
 * ###################################
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 23/06/2012
 */

class SipController extends Controller
{
    public $attributeOrder = 't.id ASC';
    public $extraValues    = [
        'idUser'       => 'username',
        'idTrunkGroup' => 'name',
    ];

    private $sipShowPeers = [];

    public $fieldsFkReport = [
        'id_user'        => [
            'table'       => 'pkg_user',
            'pk'          => 'id',
            'fieldReport' => 'username',
        ],
        'id_trunk_group' => [
            'table'       => 'pkg_trunk_group',
            'pk'          => 'id',
            'fieldReport' => 'name',
        ],
    ];

    public $fieldsInvisibleClient = [
        'id_trunk_group',
    ];

    public $fieldsInvisibleAgent = [
        'id_trunk_group',
    ];

    public $fieldsNotUpdateClient = [
        'context',
    ];

    public $fieldsNotUpdateAgent = [
        'context',
    ];

    public function init()
    {
        $this->instanceModel = new Sip;
        $this->abstractModel = Sip::model();
        parent::init();
    }

    public function actionRead($asJson = true, $condition = null)
    {
        if ($_SERVER['HTTP_HOST'] != 'localhost') {
            $this->sipShowPeers = AsteriskAccess::getSipShowPeers();
        }
        parent::actionRead($asJson = true, $condition = null);
    }

    public function replaceOrder()
    {
        $this->order = preg_replace("/lineStatus/", 'id', $this->order);
        parent::replaceOrder();
    }

    public function removeColumns($columns)
    {
        //remove listatus columns
        for ($i = 0; $i < count($columns); $i++) {
            if ($columns[$i]['dataIndex'] == 'lineStatus') {
                unset($columns[$i]);
            }
        }
        return $columns;
    }

    public function beforeSave($values)
    {

        if (isset($values['alias']) && strlen($values['alias'])) {
            $modelSip = Sip::model()->find('alias = :key AND id_user = (SELECT id_user FROM pkg_sip WHERE id = :key1)', [':key' => $values['alias'], ':key1' => $values['id']]);
            if (isset($modelSip->id)) {
                echo json_encode([
                    'success' => false,
                    'rows'    => [],
                    'errors'  => 'Alias alread in use',
                ]);
                exit;
            }
        }

        if (isset($values['type_forward'])) {
            if ($values['type_forward'] == 'undefined' || $values['type_forward'] == '') {
                $values['forward'] = '';
            } elseif (preg_match("/group|number|custom|hangup/", $values['type_forward'])) {
                $values['extension'] = isset($values['extension']) ? $values['extension'] : '';
                $values['forward']   = $values['type_forward'] . '|' . $values['extension'];
            } else {

                $values['forward'] = $values['type_forward'] . '|' . $values['id_' . $values['type_forward']];
            }
        } else if ((isset($values['id_sip']) || isset($values['id_ivr']) || isset($values['id_queue'])) &  ! $this->isNewRecord) {

            $modelSip = Sip::model()->findByPk($values['id']);

            $type_forward = explode('|', $modelSip->forward);

            if ($type_forward[0] == 'undefined' || $type_forward[0] == '') {
                $values['forward'] = '';
            } elseif (preg_match("/group|number|custom|hangup/", $type_forward[0])) {
                $values['extension'] = isset($values['extension']) ? $values['extension'] : '';
                $values['forward']   = $type_forward[0] . '|' . $values['extension'];
            } else {
                $values['forward'] = $type_forward[0] . '|' . $values['id_' . $type_forward[0]];
            }
        } else if (isset($values['extension']) &&  ! $this->isNewRecord) {

            $modelSip = Sip::model()->findByPk($values['id']);
            $type_forward = explode('|', $modelSip->forward);
            $values['forward']   = $type_forward[0] . '|' . $values['extension'];
        }

        if ($this->isNewRecord) {

            $modelUser = User::model()->findByPk((int) $values['id_user']);

            $modelSipCount = Sip::model()->count("id_user = :id_user", [':id_user' => (int) $values['id_user']]);

            if ($modelUser->idGroup->id_user_type != 3) {
                echo json_encode([
                    'success' => false,
                    'rows'    => [],
                    'errors'  => 'You only can create SipAccount to clients',
                ]);
                exit;
            }

            if (
                ! Yii::app()->session['isAdmin'] && $modelUser->sipaccountlimit > 0
                && $modelSipCount >= $modelUser->sipaccountlimit
            ) {
                echo json_encode([
                    'success' => false,
                    'rows'    => [],
                    'errors'  => 'Limit sip acount exceeded',
                ]);
                exit;
            }
            $values['regseconds'] = 1;
            $values['context']    = 'billing';
            $values['regexten']   = $values['name'];
            if (! $values['callerid']) {
                $values['callerid'] = $values['name'];
            }
        }

        if (isset($values['defaultuser'])) {
            $values['name'] = $values['defaultuser'];
        }

        if (isset($values['callerid'])) {
            $values['cid_number'] = $values['callerid'];
        }

        if (isset($values['allow'])) {
            $values['allow'] = preg_replace("/,0/", "", $values['allow']);
            $values['allow'] = preg_replace("/0,/", "", $values['allow']);
        }
        return $values;
    }

    public function afterUpdateAll($strIds)
    {
        if ($_SERVER['HTTP_HOST'] != 'localhost') {
            AsteriskAccess::instance()->generateSipPeers();
            AsteriskAccess::instance()->generateQueueFile();
        }
        return;
    }

    public function afterSave($model, $values)
    {
        if ($_SERVER['HTTP_HOST'] != 'localhost') {
            AsteriskAccess::instance()->generateSipPeers();
            AsteriskAccess::instance()->generateQueueFile();
        }

        $this->siproxyServer($model, 'save');

        return;
    }

    public function afterDestroy($values)
    {
        AsteriskAccess::instance()->generateSipPeers();
        AsteriskAccess::instance()->generateQueueFile();

        $this->siproxyServer($values, 'destroy');
        return;
    }

    public function siproxyServer($values, $type)
    {

        $modelServers = Servers::model()->findAll("type = 'sipproxy' AND status = 1");

        foreach ($modelServers as $key => $server) {

            $hostname = $server->host;
            $dbname   = 'opensips';
            $table    = 'subscriber';
            $user     = $server->username;
            $password = $server->password;
            $port     = $server->port;

            $dsn = 'mysql:host=' . $hostname . ';dbname=' . $dbname;

            $con         = new CDbConnection($dsn, $user, $password);
            $con->active = true;

            $remoteProxyIP = trim(end(explode("|", $server->description)));

            if (! filter_var($remoteProxyIP, FILTER_VALIDATE_IP)) {
                $remoteProxyIP = $hostname;
            }

            if ($type == 'destroy') {
                //delete the deletes users on Sipproxy server
                for ($i = 0; $i < count($values); $i++) {
                    $modelSip = Sip::model()->findByPk((int) $values[$i]['id']);
                    $sql      = "DELETE FROM $dbname.$table WHERE username = '" . $modelSip->name . "'";
                    $con->createCommand($sql)->execute();
                }
            } elseif ($type == 'save') {
                if ($this->isNewRecord) {
                    $modelUser = User::model()->findByPk((int) $values->id_user);
                    $sql       = "INSERT INTO $dbname.$table (username,domain,ha1,accountcode,trace) VALUES
                            ('$values->defaultuser','$remoteProxyIP','" . md5($values->defaultuser . ':' . $remoteProxyIP . ':' . $values->secret) . "','" . $modelUser->username . "',$values->trace)";
                    $con->createCommand($sql)->execute();
                } else {
                    $sql = "UPDATE $dbname.$table SET ha1 = '" . md5($values->defaultuser . ':' . $remoteProxyIP . ':' . $values->secret) . "',
                            username = '$values->defaultuser', trace = $values->trace WHERE username = '$values->defaultuser'";
                    $con->createCommand($sql)->execute();
                }
            }
        }
    }

    public function setAttributesModels($attributes, $models)
    {

        $pkCount = is_array($attributes) || is_object($attributes) ? $attributes : [];
        for ($i = 0; $i < count($pkCount); $i++) {
            $attributes[$i]['lineStatus'] = 'unregistered';
            foreach ($this->sipShowPeers as $value) {

                $name = strlen($attributes[$i]['techprefix']) ? $attributes[$i]['host'] : $attributes[$i]['name'];

                if (strtok($value['Name/username'], '/') == $name) {

                    $attributes[$i]['lineStatus'] = $value['Status'];

                    if (preg_match('/OK/', $value['Status'])) {
                        $attributes[$i]['lineStatus'] .= ' ' . $value['server'];
                        break;
                    }
                }
            }

            foreach ($attributes[$i] as $key => $value) {
                if ($key == 'forward') {
                    if (preg_match("/\|/", $value)) {

                        $itemOption = explode("|", $value);
                        $itemKey    = explode("_", $key);

                        if (! isset($attributes[$i]['type_forward'])) {
                            $attributes[$i]['type_forward'] = $itemOption[0];
                        }

                        if (isset($itemOption[1]) && preg_match("/number|group|custom|hangup/", $itemOption[0])) {
                            $attributes[$i]['extension'] = $itemOption[1];
                        } else if (isset($itemOption[1])) {
                            $attributes[$i]['id_' . $itemOption[0]] = end($itemOption);
                            if (is_numeric($itemOption[1])) {
                                $model = ucfirst($itemOption[0]);


                                if (class_exists($model)) {
                                    $model = $model::model()->findByPk(end($itemOption));
                                } else {
                                    continue;
                                }


                                $attributes[$i]['id_' . $itemOption[0] . '_name'] = isset($model->name) ? $model->name : '';
                            } else {
                                $attributes[$i]['id_' . $itemOption[0] . '_name'] = '';
                            }
                        }
                    } else {
                        $attributes[$i]['forward']      = '';
                        $attributes[$i]['type_forward'] = '';
                    }
                }
            }
        }
        return $attributes;
    }

    public function actionGetSipShowPeer()
    {
        $modelSip = Sip::model()->find('name = :key', [':key' => $_POST['name']]);

        if ($modelSip->idUser->active == 0) {
            $sipShowPeer = 'The username is inactive';
        } else {

            $sipShowPeer = AsteriskAccess::instance()->sipShowPeer(strlen($modelSip->techprefix) ? $modelSip->host : $modelSip->name);
        }

        echo json_encode([
            'success'     => true,
            'sipshowpeer' => Yii::app()->session['isAdmin'] ? print_r($sipShowPeer, true) : '',
        ]);
    }

    public function actionBulk()
    {
        $values = $this->getAttributesRequest();
        if (Yii::app()->session['user_type'] == 3) {
            exit;
        }

        $secret = $_POST['secret'] == "Leave blank to auto generate" ? '' : $_POST['secret'];

        if (strlen($secret) > 0 && strlen($secret) < 6 && strlen($secret) < 25) {
            echo json_encode([
                'success'      => false,
                $this->nameMsg => 'Password lenght need be > 5 or blank.',
            ]);
            exit;
        }

        if (preg_match('/ /', $secret)) {
            echo json_encode([
                'success'      => false,
                $this->nameMsg => 'No space allow in password',
            ]);
            exit;
        }

        if ($secret == '123456' || $secret == '12345678' || $secret == '012345') {
            echo json_encode([
                'success'      => false,
                $this->nameMsg => 'No use sequence in the password',
            ]);
            exit;
        }

        $modelUser = User::model()->findByPk((int) $_POST['id_user']);

        if ($modelUser->idGroup->idUserType->id != 3) {
            return;
        }

        for ($i = 0; $i < $values['totalToCreate']; $i++) {

            if (strlen($secret) < 5) {

                $secret = Util::generatePassword(8, true, true, true, false);
            }

            $user                  = Util::getNewSip();
            $modelSip              = new Sip();
            $modelSip->id_user     = $modelUser->id;
            $modelSip->name        = $user;
            $modelSip->allow       = $this->config['global']['default_codeds'];
            $modelSip->host        = 'dynamic';
            $modelSip->insecure    = 'no';
            $modelSip->defaultuser = $user;
            $modelSip->secret      = $secret;
            $modelSip->sip_group   = $_POST['sip_group'];
            $modelSip->save();
        }

        AsteriskAccess::instance()->generateSipPeers();

        echo json_encode([
            $this->nameSuccess => true,
            $this->nameMsg     => $this->msgSuccess,
        ]);
    }

    public function actionImportFromCsv()
    {

        parent::actionImportFromCsv();

        $sql = "UPDATE pkg_sip SET accountcode = ( SELECT username FROM pkg_user WHERE pkg_user.id = pkg_sip.id_user)";
        Yii::app()->db->createCommand($sql)->execute();

        $sql = "UPDATE pkg_sip SET context = 'billing' WHERE context IS NULL";
        Yii::app()->db->createCommand($sql)->execute();

        $sql = "UPDATE pkg_sip SET host = 'dynamic' WHERE host IS NULL";
        Yii::app()->db->createCommand($sql)->execute();

        $sql = "UPDATE pkg_sip SET allow = 'g729,gsm,alaw,ulaw' WHERE allow IS NULL";
        Yii::app()->db->createCommand($sql)->execute();

        $sql = "UPDATE pkg_sip SET defaultuser = name";
        Yii::app()->db->createCommand($sql)->execute();

        AsteriskAccess::instance()->generateSipPeers();
    }
}
