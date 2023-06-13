<?php
/**
 * Actions of module "User".
 *
 * MagnusBilling <info@magnusbilling.com>
 * 15/04/2013
 */

class UserController extends Controller
{

    public $attributeOrder = 't.credit DESC';
    public $titleReport    = 'User';
    public $subTitleReport = 'User';

    public $extraValues   = array('idGroup' => 'name,id_user_type', 'idPlan' => 'name', 'idUser' => 'username');
    public $nameFkRelated = 'idUser';

    public $fieldsFkReport = array(
        'id_group' => array(
            'table'       => 'pkg_group_user',
            'pk'          => 'id',
            'fieldReport' => 'name',
        ),
        'id_plan'  => array(
            'table'       => 'pkg_plan',
            'pk'          => 'id',
            'fieldReport' => 'name',
        ),
        'id_user'  => array(
            'table'       => 'pkg_user',
            'pk'          => 'id',
            'fieldReport' => 'username',
        ),
    );

    public $fieldsInvisibleClient = array(
        'active_paypal',
        'boleto',
        'boleto_day',
        'callshop',
        'creditlimit',
        'currency',
        'description',
        'enableexpire',
        'expirationdate',
        'expiredays',
        'firstusedate',
        'id_group',
        'idGroupname',
        'id_user',
        'idAgentlogin',
        'creationdate',
        'lastuse',
        'typepaid',
        'loginkey',
        'last_notification',
        'restriction',
        'plan_day',
        'idGroupid_user_type',
        'idPlanname',
    );

    public $fieldsInvisibleAgent = array(
        'id_group',
        'idGroupname',
        'enableexpire',
        'expirationdate',
        'loginkey',
    );

    public $fieldsNotUpdateClient = array(
        'credit',
        'id_plan',
        'id_user',
        'id_group_agent',
        'id_offer',
        'typepaid',
        'creditlimit',
        'calllimit',
        'restriction',
        'restriction_use',
    );

    public $fieldsNotUpdateAgent = array(
        'credit',
        'id_user',
        'id_group_agent',
        'calllimit',
        'restriction',
        'restriction_use',
    );

    public function init()
    {
        $this->instanceModel = new User;
        $this->abstractModel = User::model();
        parent::init();
    }

    public function applyFilterToLimitedAdmin()
    {
        if (Yii::app()->session['user_type'] == 1 && Yii::app()->session['adminLimitUsers'] == true) {
            $this->filter .= " AND t.id_group IN (SELECT gug.id_group
                                FROM pkg_group_user_group gug
                                WHERE gug.id_group_user = :idgA0)";
            $this->paramsFilter['idgA0'] = Yii::app()->session['id_group'];
        }
    }

    public function checkAgentEdit($values)
    {
        //not allow agent edit his account.
        if (Yii::app()->session['isAgent'] && !$this->isNewRecord && Yii::app()->session['id_user'] == $values['id']) {
            echo json_encode(array(
                'success' => false,
                'rows'    => array(),
                'errors'  => Yii::t('zii', 'You cannot EDIT your account.'),
            ));
            exit();

        }
    }
    public function afterDestroy($values)
    {
        AsteriskAccess::instance()->generateSipPeers();
        AsteriskAccess::instance()->generateSipDid();

        return;
    }

    public function beforeDestroy($values)
    {
        $this->checkAgentEdit($values);
        return $values;
    }

    public function beforeSave($values)
    {

        if (isset($values['id_group_agent'])) {
            if (Yii::app()->session['user_type'] == 1 && $values['id_group_agent'] > 0) {

                $modelGroupUser = GroupUser::model()->find('id_user_type = 3 AND id = :key',
                    array(':key' => $values['id_group_agent'])
                );

                if (!isset($modelGroupUser)) {
                    echo json_encode(array(
                        'success' => false,
                        'rows'    => array(),
                        'errors'  => Yii::t('zii', 'Group no allow for agent users'),
                    ));
                    exit();
                }
            }
        }

        $methodModel = Methodpay::Model()->findAll(
            "payment_method=:field1 AND active=:field12",
            array(
                "field1"  => 'SuperLogica',
                "field12" => '1',
            )
        );

        $values = $this->superLogica($methodModel, $values);

        if (Yii::app()->session['isAgent']) {
            //get the group id_group_agent
            $modelUser          = User::model()->findByPk((int) Yii::app()->session['id_user']);
            $values['id_group'] = $modelUser->id_group_agent;

            $this->checkAgentEdit($values);

            if (isset($values['transfer_international']) && $values['transfer_international'] == 1 && $modelUser->transfer_international == 0) {
                $error = 'You cant enable Mobile Credit';
            } elseif (isset($values['transfer_flexiload']) && $values['transfer_flexiload'] == 1 && $modelUser->transfer_flexiload == 0) {
                $error = 'You cant enable Mobile Money';
            } elseif (isset($values['transfer_bkash']) && $values['transfer_bkash'] == 1 && $modelUser->transfer_bkash == 0) {
                $error = 'You cant enable Payment';
            }

            if (isset($error)) {
                echo json_encode(array(
                    'success' => false,
                    'rows'    => array(),
                    'errors'  => $error,
                ));
                exit();
            }
        }

        if ($this->isNewRecord) {

            $groupType = GroupUser::model()->find(
                "id=:field1",
                array(
                    'field1' => $values['id_group'],
                )
            );
            $idUserType = $groupType->id_user_type;

            if (Yii::app()->session['isAdmin'] == true && $idUserType == 1) {
                $values['password'] = sha1($values['password']);
            }

            if (count($methodModel) > 0 && $idUserType == 3) {

                if (strlen($values['lastname']) < 5) {
                    $error = Yii::t('zii', 'Last name');
                } else if (strlen($values['firstname']) < 5) {
                    $error = Yii::t('zii', 'First name');
                } else if (strlen($values['doc']) < 11) {
                    $error = Yii::t('zii', 'DOC');
                } else if (!preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $values['email'])) {
                    $error = Yii::t('zii', 'Email');
                }
                if (isset($error)) {
                    echo json_encode(array(
                        'success' => false,
                        'rows'    => array(),
                        'errors'  => Yii::t('zii', $error) . ' ' . Yii::t('zii', 'Is required'),
                    ));
                    exit();
                }

            }

            if (Yii::app()->session['user_type'] == 2) {
                $values['id_user'] = Yii::app()->session['id_user'];

                $modelAgent = User::model()->findByPk((int) $values['id_user']);

                $values['id_group'] = $modelAgent->id_group_agent;

            } else {
                $values['id_user'] = 1;
            }

        } else {

            $modelUser = User::model()->findByPk((int) $values['id']);

            $idUserTypeOld = $modelUser->idGroup->idUserType->id;

            if (isset($idUserTypeOld) && $idUserTypeOld == 1 && isset($values['password'])) {
                MagnusLog::insertLOG(2, 'User try change the password');

                echo json_encode(array(
                    'success' => false,
                    'rows'    => array(),
                    'errors'  => Yii::t('zii', 'You are not allowed to edit this field'),
                ));
                exit;
            }

            if (isset($idUserType) && $idUserType != $idUserTypeOld) {
                MagnusLog::insertLOG(2, 'User try change the group');
                echo json_encode(array(
                    'success' => false,
                    'rows'    => array(),
                    'errors'  => Yii::t('zii', 'You cannot change user type group'),
                ));
                exit;
            }

            if (isset($values['enableexpire']) && $values['enableexpire'] == 0) {
                $values['expirationdate'] = '0000-00-00 00:00:00';
            }
        }
        if (isset($values['id_plan'])) {
            $values['id_plan'] = $values['id_plan'] < 1 ? null : $values['id_plan'];
        }

        if (isset($values['id_group_agent'])) {
            $values['id_group_agent'] = $values['id_group_agent'] == 0 || !is_numeric($values['id_group_agent'])
            ? null :
            $values['id_group_agent'];
        }

        if (isset($values['id_offer'])) {
            $values['id_offer'] = $values['id_offer'] === 0 ? null : $values['id_offer'];
        }

        return $values;
    }

    public function afterSave($model, $values)
    {

        if ($model->idGroup->idUserType->id == 3) {
            $modelSip = $this->isNewRecord ?
            new Sip() :
            Sip::model()->findByAttributes(array('id_user' => $model->id));

            if ($this->isNewRecord || isset($modelSip->id_user)) {
                $modelSip->id_user = $model->id;
                if ($this->isNewRecord) {
                    $modelSip->name         = $model->username;
                    $modelSip->allow        = 'g729,gsm,alaw,ulaw';
                    $modelSip->host         = 'dynamic';
                    $modelSip->insecure     = 'no';
                    $modelSip->defaultuser  = $model->username;
                    $modelSip->secret       = $model->password;
                    $modelSip->videosupport = 'no';
                    $modelSip->context      = 'billing';
                }

                $modelSip->save();
            }

            AsteriskAccess::instance()->generateSipPeers();
        }

        if (!$this->isNewRecord && isset($model->id_group_agent) && $model->id_group_agent > 1) {
            $modelUser = User::model()->find("id_user = :key", array(':key' => $model->id));
            if (isset($modelUser->id)) {
                $modelUser->id_group = $model->id_group_agent;
                $modelUser->save();
            }
        }

        $modelOfferUse = OfferUse::model()->findAll(
            "id_user = :id_user AND releasedate = '0000-00-00 00:00:00' AND status = 1 ",
            array(
                ':id_user' => $model->id,
            )
        );

        if ($model->id_offer > 0) {
            //if exists a offer to this user, disable that to add the new.
            if (count($modelOfferUse) > 0) {
                $modelOfferUse[0]->releasedate = date('Y-m-d H:i:s');
                $modelOfferUse[0]->status      = 0;
                $modelOfferUse[0]->save();
            }

            $modelOfferUse              = new OfferUse();
            $modelOfferUse->id_user     = $model->id;
            $modelOfferUse->id_offer    = $model->id_offer;
            $modelOfferUse->status      = 1;
            $modelOfferUse->month_payed = 1;
            $modelOfferUse->save();
        } else if ($model->id_offer == 0 and count($modelOfferUse)) {

            $modelOfferUse[0]->releasedate = date('Y-m-d H:i:s');
            $modelOfferUse[0]->status      = 0;
            $modelOfferUse[0]->save();
        }

        if ($model->idGroup->idUserType->id == 3) {
            $this->createCallshopRates($model, $values);
        }

        AsteriskAccess::instance()->generateSipDid();

        return;
    }

    public function createCallshopRates($model, $values)
    {

        if ($model->callshop == 0) {

            $modelRateCallshop = RateCallshop::model()->deleteAll('id_user = :id_user',
                array(':id_user' => $model->id)
            );
        } elseif ($model->callshop == 1) {

            $modelRateCallshop = RateCallshop::model()->findAll('id_user = :id_user',
                array(':id_user' => $model->id)
            );
            if (count($modelRateCallshop) == 0) {
                RateCallshop::model()->createCallShopRates($model);
            }

        }
    }

    public function superLogica($methodModel, $values)
    {
        if ($this->isNewRecord) {
            if (isset($methodModel[0]->SLAppToken)) {
                $response = SLUserSave::saveUserSLCurl($this, $methodModel[0]->SLAppToken
                    , $methodModel[0]->SLAccessToken);
                $values['id_sacado_sac'] = $response[0]->data->id_sacado_sac;
            }
        } else {
            if (isset($methodModel[0]->SLAppToken)) {
                $response = SLUserSave::saveUserSLCurl($this, $methodModel[0]->SLAppToken
                    , $methodModel[0]->SLAccessToken, false);
            }
        }

        return $values;
    }

    public function actionCredit()
    {
        if (!Yii::app()->session['id_user']) {
            die("Access denied to save in module: $module");
            exit;
        }

        $modelUser = $this->abstractModel->findByPk((int) $_POST['id']);
        $credit    = array('rows' => array('credit' => $modelUser->credit));

        echo json_encode($credit);
    }

    public function extraFilterCustomClient($filter)
    {
        //se for cliente filtrar pelo pkg_user.id
        $filter .= ' AND t.id = :dfby';
        $this->paramsFilter[':dfby'] = Yii::app()->session['id_user'];

        return $filter;
    }

    public function extraFilterCustomAgent($filter)
    {
        //se é agente filtrar pelo t.id_user e t.id
        $this->join .= ' JOIN pkg_user user ON t.id_user = user.id ';
        $filter .= ' AND ( t.id_user = :agfby OR t.id = :agfby)';
        $this->paramsFilter[':agfby'] = Yii::app()->session['id_user'];

        return $filter;
    }

    public function actionGetNewUsername()
    {
        echo json_encode(array(
            $this->nameSuccess => true,
            'newUsername'      => Util::getNewUsername(false),
        ));
    }

    public function actionGetNewPassword()
    {
        echo json_encode(array(
            $this->nameSuccess => true,
            'newPassword'      => Util::generatePassword(8, true, true, true, false),
        ));
    }

    public function actionGetNewPinCallingcard()
    {
        echo json_encode(array(
            $this->nameSuccess  => true,
            'newCallingcardPin' => Util::generatePinCallingcard(),
        ));
    }

    public function actionBulk()
    {
        $values = $this->getAttributesRequest();

        if (Yii::app()->session['user_type'] == 3) {
            exit;
        } else if (Yii::app()->session['user_type'] == 2) {
            $id_user = Yii::app()->getSession()->get('id_user');

            $sql     = "SELECT id_group_agent FROM pkg_user WHERE id = :id";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":id", $id_user, PDO::PARAM_INT);
            $result = $command->queryAll();

            $values['id_group'] = $result[0]['id_group_agent'];
        } else {
            $id_user = 1;
        }

        $modelGroupUser = GroupUser::model()->findByPk((int) $values['id_group']);

        if ($modelGroupUser->id_user_type != 3) {
            echo json_encode(array(
                $this->nameSuccess => false,
                $this->nameMsg     => 'Only allowed create user. you try create admin or agent',
            ));
            exit;
        }
        for ($i = 0; $i < $values['totalToCreate']; $i++) {

            $modelUser                  = new User();
            $modelUser->username        = Util::getNewUsername();
            $modelUser->password        = Util::generatePassword(8, true, true, true, false);
            $modelUser->callingcard_pin = Util::generatePinCallingcard();
            $modelUser->id_group        = $values['id_group'];
            $modelUser->language        = $values['language'];
            $modelUser->id_plan         = $values['id_plan'];
            $modelUser->active          = $values['active'];
            $modelUser->id_user         = $id_user;
            $modelUser->credit          = $values['credit'] > 0 ? $values['credit'] : 0;
            $modelUser->save();

            if ($modelUser->idGroup->idUserType->id == 3) {
                $modelSip              = new Sip();
                $modelSip->id_user     = $modelUser->id;
                $modelSip->name        = $modelUser->username;
                $modelSip->allow       = $this->config['global']['default_codeds'];
                $modelSip->host        = 'dynamic';
                $modelSip->insecure    = 'no';
                $modelSip->defaultuser = $modelUser->username;
                $modelSip->secret      = $modelUser->password;
                $modelSip->save();
            }

            if ($values['credit'] > 0) {
                $modelRefill              = new Refill();
                $modelRefill->id_user     = $modelUser->id;
                $modelRefill->payment     = 1;
                $modelRefill->credit      = $values['credit'];
                $modelRefill->description = Yii::t('zii', 'Automatic credit');
                $modelRefill->save();
            }

        }

        AsteriskAccess::instance()->generateSipPeers();

        echo json_encode(array(
            $this->nameSuccess => true,
            $this->nameMsg     => $this->msgSuccess,
        ));
    }

    public function actionResendActivationEmail()
    {

        $modelUser = User::model()->findByPk((int) $_POST['id']);
        $mail      = new Mail(Mail::$TYPE_SIGNUPCONFIRM, $modelUser->id);
        try {
            $mail->send();
        } catch (Exception $e) {
        }
    }

    public function setAttributesModels($attributes, $models)
    {

        $pkCount = is_array($attributes) || is_object($attributes) ? $attributes : [];
        for ($i = 0; $i < count($pkCount); $i++) {

            if ($attributes[$i]['id_offer'] > 0) {

                $modelOfferUse = OfferUse::model()->find('id_offer = :key AND id_user = :key1 AND status = 1 AND releasedate = "0000-00-00 00:00:00"', array(
                    ':key'  => $attributes[$i]['id_offer'],
                    ':key1' => $attributes[$i]['id'],
                ));

                if (!isset($modelOfferUse->id)) {
                    $attributes[$i]['offer'] = 0;
                    continue;
                }

                $modelOffer     = Offer::model()->findByPk($attributes[$i]['id_offer']);
                $freetimetocall = $modelOffer->freetimetocall;
                $packagetype    = $modelOffer->packagetype;
                $billingtype    = $modelOffer->billingtype;
                $startday       = date('d', strtotime($modelOfferUse->reservationdate));
                $id_offer       = $modelOffer->id;
                $id_user        = $attributes[$i]['id'];

                switch ($packagetype) {
                    case 0:
                        $attributes[$i]['offer'] = -1;
                        break;
                    case 1:
                        $attributes[$i]['offer'] = $freetimetocall;
                        if ($freetimetocall > 0) {

                            $number_calls_used = $this->freeCallUsed($id_user, $id_offer, $billingtype, $startday);

                            if ($number_calls_used > 0) {
                                $attributes[$i]['offer'] = $freetimetocall - $number_calls_used;
                            }
                        }
                        break;
                    case 2:

                        $attributes[$i]['offer'] = $freetimetocall / 60;
                        if ($freetimetocall > 0) {
                            $freetimetocall_used = $this->packageUsedSeconds($id_user, $id_offer, $billingtype, $startday);
                            if ($freetimetocall_used > 0) {
                                $attributes[$i]['offer'] = ($freetimetocall - $freetimetocall_used) / 60;
                            }
                        }
                        break;
                }

            } else {

                $modelSip                    = Sip::model()->count('id_user = :key', array(':key' => $attributes[$i]['id']));
                $attributes[$i]['sip_count'] = $modelSip;
                $attributes[$i]['offer']     = 0;
            }

        }
        return $attributes;
    }

    public function freeCallUsed($id_user, $id_offer, $billingtype, $startday)
    {

        $CLAUSE_DATE   = $this->checkDaysPackage($startday, $billingtype);
        $sql           = "SELECT  COUNT(*) AS id FROM pkg_offer_cdr " . "WHERE $CLAUSE_DATE AND id_user = '$id_user' AND id_offer = '$id_offer' LIMIT 1";
        $modelOfferCdr = OfferCdr::model()->findBySql($sql);

        return isset($modelOfferCdr->id) ? $modelOfferCdr->id : 0;
    }

    public function packageUsedSeconds($id_user, $id_offer, $billingtype, $startday)
    {
        $CLAUSE_DATE   = $this->checkDaysPackage($startday, $billingtype);
        $sql           = "SELECT sum(used_secondes) AS used_secondes FROM pkg_offer_cdr " . "WHERE $CLAUSE_DATE AND id_user = '$id_user' AND id_offer = '$id_offer' ";
        $modelOfferCdr = OfferCdr::model()->findBySql($sql);

        return isset($modelOfferCdr->used_secondes) ? $modelOfferCdr->used_secondes : 0;

    }

    public function checkDaysPackage($startday, $billingtype)
    {
        if ($billingtype == 0) {
            /* PROCESSING FOR MONTHLY*/
            /* if > last day of the month*/
            if ($startday > date("t")) {
                $startday = date("t");
            }

            if ($startday <= 0) {
                $startday = 1;
            }

            /* Check if the startday is upper that the current day*/
            if ($startday > date("j")) {
                $year_month = date('Y-m', strtotime('-1 month'));
            } else {
                $year_month = date('Y-m');
            }

            $yearmonth   = sprintf("%s-%02d", $year_month, $startday);
            $CLAUSE_DATE = " TIMESTAMP(date_consumption) >= TIMESTAMP('$yearmonth')";
        } else {

            /* PROCESSING FOR WEEKLY*/
            $startday  = $startday % 7;
            $dayofweek = date("w");
            /* Numeric representation of the day of the week 0 (for Sunday) through 6 (for Saturday)*/
            if ($dayofweek == 0) {
                $dayofweek = 7;
            }

            if ($dayofweek < $startday) {
                $dayofweek = $dayofweek + 7;
            }

            $diffday     = $dayofweek - $startday;
            $CLAUSE_DATE = "date_consumption >= DATE_SUB(CURRENT_DATE, INTERVAL $diffday DAY) ";
        }

        return $CLAUSE_DATE;
    }

    public function removeColumns($columns)
    {

        foreach ($columns as $key => $column) {
            if ($column['dataIndex'] == 'sip_count') {
                unset($columns[$key]);
            }
        }

        return $columns;
    }
}
