<?php
/**
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
 *
 */
class SmsCommand extends ConsoleCommand
{

    public $success;
    public $nameRoot    = 'rows';
    public $nameCount   = 'count';
    public $nameSuccess = 'success';
    public $nameMsg     = 'msg';

    public function run($args)
    {
        $UNIX_TIMESTAMP = "UNIX_TIMESTAMP(";

        $tab_day  = array(1 => 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
        $num_day  = date('N');
        $name_day = $tab_day[$num_day];

        $filter = 'status = :key AND type = :key  AND ' . $name_day . ' = :key AND startingdate <= :key1 AND expirationdate > :key1
                        AND  daily_start_time <= :key1 AND daily_stop_time > :key1';

        $params = array(
            ':key'  => 0,
            ':key1' => date('Y-m-d H:i:s'),
        );

        if (isset($args[1])) {
            $filter .= 'name = :campaignName';
            $params['campaignName'] = $args[1];
        }

        $modelCampaign = Campaign::model()->findAll(array(
            'condition' => $filter,
            'params'    => $params,
        ));

        if ($this->debug >= 1) {
            echo "\nFound " . count($modelCampaign) . " Campaign\n\n";
        }

        foreach ($modelCampaign as $campaign) {

            if ($this->debug >= 1) {
                echo "SEARCH NUMBER IN CAMPAIGN " . $campaign->name . "\n";
            }

            $nbpage = $campaign->frequency;

            //get all campaign phonebook
            $modelCampaignPhonebook = CampaignPhonebook::model()->findAll('id_campaign = :key', array(':key' => $campaign->id));
            $ids_phone_books        = array();
            foreach ($modelCampaignPhonebook as $key => $phonebook) {
                $ids_phone_books[] = $phonebook->id_phonebook;
            }

            $criteria = new CDbCriteria();
            $criteria->addInCondition('id_phonebook', $ids_phone_books);
            $criteria->addCondition('status = :key AND creationdate < :key1');
            $criteria->params[':key']  = 1;
            $criteria->params[':key1'] = date('Y-m-d H:i:s');
            $modelPhoneNumber          = PhoneNumber::model()->findAll($criteria);

            if ($this->debug >= 1) {
                echo 'Found ' . count($modelPhoneNumber) . ' Numbers in Campaign ' . "\n";
            }

            if (!count($modelPhoneNumber)) {
                if ($this->debug >= 1) {
                    echo "NO PHONE FOR CALL" . "\n\n\n";
                }

                continue;
            }

            include_once Yii::app()->baseUrl . '/protected/controllers/SmsSendController.php';

            $send = new SmsSendController(false);
            foreach ($modelPhoneNumber as $sms) {
                if (date("s") > 55) {
                    exit;
                }

                $id_plan  = $campaign->id_plan > 0 ? $campaign->id_plan : $phone->idPhonebook->idUser->id_plan;
                $id_user  = $phone->idPhonebook->idUser->id;
                $username = $phone->idPhonebook->idUser->username;
                $id_agent = $phone->idPhonebook->idUser->id_user;

                if (UserCreditManager::checkGlobalCredit($id_user) === false) {
                    if ($this->debug >= 1) {
                        echo " USER NO CREDIT FOR CALL " . $sms['username'] . "\n\n\n";
                    }

                    continue;
                }

                $text = preg_replace("/\%name\%/", $sms['name'], $sms['description']);

                if ($sms->number == '' || !is_numeric($sms->number)) {
                    PhoneNumber::model()->deleteByPk((int) $sms->id);
                    continue;
                }
                echo $phone->idPhonebook->idUser->username . " -" . $phone->idPhonebook->idUser->password . " -" . $sms->number . " -" . $text . "\n";
                $smsResult = SmsSend::send($$phone->idPhonebook->idUser, $sms->number, $text);
                $sms->try++;
                $sms->status = $smsResult['success'];
                $sms->save();
            }
        }
    }
}
