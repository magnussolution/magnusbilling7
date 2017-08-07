<?php
/**
 * Acoes do modulo "Campaign".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2016 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v2.1
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 28/10/2012
 */

class CampaignController extends Controller
{
    public $attributeOrder     = 't.id DESC';
    public $nameModelRelated   = 'CampaignPhonebook';
    public $nameFkRelated      = 'id_campaign';
    public $nameOtherFkRelated = 'id_phonebook';
    public $extraValues        = array('idUser' => 'username', 'idPlan' => 'name');
    private $uploaddir;

    public $fieldsInvisibleClient = array(
        'id_user',
        'idCardusername',
        'enable_max_call',
        'nb_callmade',
        'secondusedreal',
    );

    public function init()
    {

        $this->uploaddir = $this->magnusFilesDirectory . 'sounds/';

        $this->instanceModel        = new Campaign;
        $this->abstractModel        = Campaign::model();
        $this->abstractModelRelated = CampaignPhonebook::model();
        $this->titleReport          = Yii::t('yii', 'Campaign');
        parent::init();
    }

    public function beforeSave($values)
    {

        if (isset($values['type_0'])) {

            if ($values['type_0'] == 'undefined' || $values['type_0'] == '') {
                $values['forward_number'] = '';
            } elseif (preg_match("/group|number|custom|hangup/", $values['type_0'])) {

                $values['forward_number'] = $values['type_0'] . '|' . $values['extension_0'];
            } else {
                $values['forward_number'] = $values['type_0'] . '|' . $values['id_' . $values['type_0'] . '_0'];
            }
        }

        //only allow edit max complet call, if campaign is inactive
        if ($values['status'] == 1 && !$this->isNewRecord) {
            unset($values['secondusedreal']);
        }

        if (isset($_FILES["audio"]) && strlen($_FILES["audio"]["name"]) > 1) {
            $typefile        = explode('.', $_FILES["audio"]["name"]);
            $values['audio'] = "idCampaign_" . $values['id'] . '.' . $typefile[1];
        }

        if (isset($_FILES["audio_2"]) && strlen($_FILES["audio_2"]["name"]) > 1) {
            $typefile          = explode('.', $_FILES["audio_2"]["name"]);
            $values['audio_2'] = "idCampaign_" . $values['id'] . '_2.' . $typefile[1];
        }

        return $values;
    }

    public function afterSave($model, $values)
    {
        if (isset($_FILES["audio"]) && strlen($_FILES["audio"]["name"]) > 1) {
            if (file_exists($this->uploaddir . 'idCampaign_' . $model->id . '.wav')) {
                unlink($this->uploaddir . 'idCampaign_' . $model->id . '.wav');
            }
            $typefile   = explode('.', $_FILES["audio"]["name"]);
            $uploadfile = $this->uploaddir . 'idCampaign_' . $model->id . '.' . $typefile[1];
            move_uploaded_file($_FILES["audio"]["tmp_name"], $uploadfile);
        }
        if (isset($_FILES["audio_2"]) && strlen($_FILES["audio_2"]["name"]) > 1) {
            if (file_exists($this->uploaddir . 'idCampaign_' . $model->id . '_2.wav')) {
                unlink($this->uploaddir . 'idCampaign_' . $model->id . '_2.wav');
            }
            $typefile   = explode('.', $_FILES["audio_2"]["name"]);
            $uploadfile = $this->uploaddir . 'idCampaign_' . $model->id . '_2.' . $typefile[1];
            move_uploaded_file($_FILES["audio_2"]["tmp_name"], $uploadfile);
        }

    }

    public function setAttributesModels($attributes, $models)
    {

        for ($i = 0; $i < count($attributes) && is_array($attributes); $i++) {
            if (preg_match("/|/", $attributes[$i]['forward_number'])) {
                $itemOption               = explode("|", $attributes[$i]['forward_number']);
                $attributes[$i]['type_0'] = $itemOption[0];

                if (!isset($itemOption[1])) {
                    continue;
                }
                $type = $itemOption[0];

                if ($type == 'ivr' || $type == 'queue' || $type == 'sip') {
                    $attributes[$i]['id_' . $type . '_0'] = $itemOption[1];
                    $model                                = $type::model()->findByPk((int) $itemOption[1]);
                    if (count($model)) {
                        $attributes[$i]['id_' . $type . '_0' . '_name'] = $model->name;
                    }

                } elseif (preg_match("/number|group|custom|hangup/", $itemOption[0])) {
                    $attributes[$i]['extension_0'] = $itemOption[1];
                }
            }
        }
        return $attributes;
    }

    public function getAttributesRequest()
    {
        $arrPost = array_key_exists($this->nameRoot, $_POST) ? json_decode($_POST[$this->nameRoot], true) : $_POST;

        /*permite salvar quando tem audio e extrafield*/
        $id_phonebook = array();
        foreach ($arrPost as $key => $value) {
            if ($key == 'id_phonebook_array') {
                if (isset($_POST['id_phonebook_array']) && strlen($value) > 0) {
                    $arrPost['id_phonebook'] = explode(",", $_POST['id_phonebook_array']);
                }

            }
        };

        return $arrPost;
    }

    public function afterDestroy($values)
    {
        $namePk = $this->abstractModel->primaryKey();
        if (array_key_exists(0, $values)) {
            foreach ($values as $value) {
                $id = $value[$namePk];

                //deleta os audios da enquete

                $uploadfile = $this->uploaddir . 'idCampaign_' . $id . '.gsm';
                if (file_exists($uploadfile)) {
                    unlink($uploadfile);
                }
            }
        } else {
            $id = $values[$namePk];
            //deleta os audios da enquete

            $uploadfile = $this->uploaddir . 'idCampaign_' . $id . '.gsm';
            if (file_exists($uploadfile)) {
                unlink($uploadfile);
            }
        }
    }

    public function actionQuick()
    {

        $creationdate = $_POST['startingdate'] . ' ' . $_POST['startingtime'];

        $name        = Yii::app()->session['username'] . '_' . $creationdate;
        $description = isset($_POST['sms_text']) ? $_POST['sms_text'] : false;

        $type = $_POST['type'] == 'CALL' ? 1 : 0;

        $modelCampaign                   = $this->instanceModel;
        $modelCampaign->name             = $name;
        $modelCampaign->startingdate     = $creationdate;
        $modelCampaign->expirationdate   = '2030-01-01 00:00:00';
        $modelCampaign->id_user          = Yii::app()->session['id_user'];
        $modelCampaign->type             = $type;
        $modelCampaign->description      = $description;
        $modelCampaign->frequency        = 10;
        $modelCampaign->daily_start_time = $_POST['startingtime'];
        $modelCampaign->save();
        $id_campaign = $modelCampaign->getPrimaryKey();

        $modelPhoneBook          = new PhoneBook();
        $modelPhoneBook->id_user = Yii::app()->session['id_user'];
        $modelPhoneBook->name    = $name;
        $modelPhoneBook->status  = 1;
        $modelPhoneBook->save();
        $id_phonebook = $modelPhoneBook->getPrimaryKey();

        $modelCampaignPhonebook               = new CampaignPhonebook();
        $modelCampaignPhonebook->id_campaign  = $id_campaign;
        $modelCampaignPhonebook->id_phonebook = $id_phonebook;
        $modelCampaignPhonebook->save();

        if ($type == 'CALL') {
            $audio                = $this->uploaddir . "idCampaign_" . $id_campaign;
            $modelCampaign->audio = $audio;
            $modelCampaign->save();
        }

        if (isset($_FILES['csv_path']['tmp_name']) && strlen($_FILES['csv_path']['tmp_name']) > 3) {
            $interpreter      = new CSVInterpreter($_FILES['csv_path']['tmp_name']);
            $array            = $interpreter->toArray();
            $additionalParams = [['key' => 'id_phonebook', 'value' => $id_phonebook], ['key' => 'creationdate', 'value' => $creationdate]];
            $errors           = array();
            if ($array) {
                $recorder = new CSVACtiveRecorder($array, 'PhoneNumber', $additionalParams);
                if ($recorder->save());
                $errors = $recorder->getErrors();

            } else {
                $errors = $interpreter->getErrors();
            }

            echo json_encode(array(
                $this->nameSuccess => count($errors) > 0 ? false : true,
                $this->nameMsg     => count($errors) > 0 ? implode(',', $errors) : $this->msgSuccess,
            ));

        }

        if (isset($_POST['numbers']) && $_POST['numbers'] != '') {
            $numbers = explode("\n", $_POST['numbers']);

            foreach ($numbers as $key => $number) {

                $modelPhoneNumber               = new PhoneNumber();
                $modelPhoneNumber->id_phonebook = $id_phonebook;
                $modelPhoneNumber->number       = $number;
                $modelPhoneNumber->creationdate = $creationdate;
                $modelPhoneNumber->save();
            }
        }

        if (isset($_FILES['audio_path']['tmp_name']) && strlen($_FILES['audio_path']['tmp_name']) > 3) {

            //import audio torpedo
            if (file_exists($this->uploaddir . 'idCampaign_' . $id_campaign . '.wav')) {
                unlink($this->uploaddir . 'idCampaign_' . $id_campaign . '.wav');
            }

            $typefile   = explode('.', $_FILES["audio_path"]["name"]);
            $uploadfile = $this->uploaddir . 'idCampaign_' . $id_campaign . '.' . $typefile[1];
            move_uploaded_file($_FILES["audio_path"]["tmp_name"], $uploadfile);
        }

        echo json_encode(array(
            $this->nameSuccess => $this->success,
            $this->nameMsg     => $this->msg,
        ));

    }

    public function actionTestCampaign()
    {

        if (isset($_POST['id']) && $_POST['id'] > 0) {
            $id_campaign = json_decode($_POST['id']);
        } else {
            echo json_encode(array(
                $this->nameSuccess => false,
                $this->nameMsg     => 'Please Select one campaign',
            ));
            exit;
        }

        Yii::log($id_campaign, 'info');
        $tab_day  = array(1 => 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
        $num_day  = date('N');
        $name_day = $tab_day[$num_day];

        $nbpage = 10;

        $campaignResult = Campaign::model()->checkCampaignActive($id_campaign, $nbpage, $name_day);

        if (count($campaignResult) == 0) {

            $sql     = "SELECT * FROM pkg_campaign  WHERE id = :id_campaign";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_campaign", $id_campaign, PDO::PARAM_INT);
            $resultCampaign = $command->queryAll();

            if ($resultCampaign[0]['status'] == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Please active this campaign',
                ));
                exit;
            }

            $sql = "SELECT pkg_user.credit, pkg_user.id_plan FROM pkg_campaign  JOIN pkg_user
                            ON pkg_campaign.id_user = pkg_user.id WHERE pkg_campaign.id = :id_campaign";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_campaign", $id_campaign, PDO::PARAM_INT);
            $resultUser = $command->queryAll();

            if ($resultUser[0]['credit'] < 1) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The user not have enough credit',
                ));
                exit;
            }

            if ($resultCampaign[0]['startingdate'] > date('Y-m-d H:i:s')) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The startdate is in the future',
                ));
                exit;
            }

            if ($resultCampaign[0]['expirationdate'] < date('Y-m-d H:i:s')) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The expirationdate is in the past',
                ));
                exit;
            }

            $sql     = "SELECT id_phonebook FROM pkg_campaign_phonebook WHERE id_campaign = :id_campaign";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_campaign", $id_campaign, PDO::PARAM_INT);
            $resultPhonebook = $command->queryAll();

            if (count($resultPhonebook) == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Please select one o more phonebook',
                ));
                exit;
            }

            if ($resultCampaign[0]['daily_start_time'] > date('H:i:s')) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The start time is out of the hour of work',
                ));
                exit;
            }

            if ($resultCampaign[0]['daily_stop_time'] < date('H:i:s')) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The stop time is out of the hour of work',
                ));
                exit;
            }

            if ($resultCampaign[0][$name_day] == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Campaign is not active to start in ' . $name_day,
                ));
                exit;
            }

            $sql     = "SELECT * FROM pkg_phonenumber  WHERE id_phonebook = :id_phonebook";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_phonebook", $resultPhonebook[0]['id_phonebook'], PDO::PARAM_INT);
            $resultPhonenumber = $command->queryAll();

            if (count($resultPhonenumber) == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The phonebook not have numbers',
                ));
                exit;
            } else {
                $sql     = "SELECT * FROM pkg_phonenumber  WHERE id_phonebook = :id_phonebook AND status = 1";
                $command = Yii::app()->db->createCommand($sql);
                $command->bindValue(":id_phonebook", $resultPhonebook[0]['id_phonebook'], PDO::PARAM_INT);
                $resultPhonenumber = $command->queryAll();

                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The phonebook have numbers, but NOT have active numbers',
                ));
                exit;
            }

            $sql     = "SELECT * FROM pkg_phonebook  WHERE id = :id_phonebook AND status = 0";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_phonebook", $resultPhonebook[0]['id_phonebook'], PDO::PARAM_INT);
            $resultPhonebook = $command->queryAll();

            Yii::log($sql, 'info');
            if (count($resultPhonebook) == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'The phonebook is inactive',
                ));
                exit;
            }

            //tem erro mais nao foi identificado

            echo json_encode(array(
                $this->nameSuccess => false,
                $this->nameMsg     => 'error',
            ));
            exit;

        }

        if ($campaignResult[0]['type'] == 0) {

            $sql     = "SELECT * FROM pkg_user WHERE id = :id ";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id", $campaignResult[0]['id'], PDO::PARAM_INT);
            $resultUser = $command->queryAll();

            if ($resultUser[0]['id_user'] > 1) {
                $sql     = "SELECT * FROM pkg_user WHERE id = :id";
                $command = Yii::app()->db->createCommand($sql);
                $command->bindValue(":id", $resultUser[0]['id_user'], PDO::PARAM_INT);
                $campaingAgent = $command->queryAll();

                $sql = "SELECT id FROM pkg_rate_agent  WHERE id_plan = :id_plan AND id_prefix IN
                                (SELECT id FROM pkg_prefix WHERE prefix LIKE '999%' ORDER BY prefix DESC)";
            } else {
                $sql = "SELECT id FROM pkg_rate  WHERE id_plan = :id_plan AND pkg_rate.status = 1 AND id_prefix =
                                (SELECT id FROM pkg_prefix  WHERE prefix LIKE '999%' LIMIT 1)";

            }
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id_plan", $resultUser[0]['id_plan'], PDO::PARAM_INT);
            $resultPrefix = $command->queryAll();

            if (count($resultPrefix) == 0) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Not existe the prefix 999 to send SMS',
                ));
                exit;
            }
        } else {
            //verificar se exite audio
            Yii::log($this->uploaddir . 'idCampaign_' . $id_campaign . '.wav', 'info');
            if (!file_exists($this->uploaddir . 'idCampaign_' . $id_campaign . '.wav') && !file_exists($this->uploaddir . 'idCampaign_' . $id_campaign . '.gsm')) {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Not existe audio to this Campaign',
                ));
                exit;
            }
        }

        echo json_encode(array(
            $this->nameSuccess => true,
            $this->nameMsg     => 'Campaign is ok',
        ));
    }
}
