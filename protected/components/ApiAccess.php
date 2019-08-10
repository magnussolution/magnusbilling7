<?php
/**
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2019 MagnusSolution. All rights reserved.
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
class ApiAccess
{
    public static function checkAuthentication()
    {
        $config   = LoadConfig::getConfig();
        $modelApi = Api::model()->find('api_key = :key AND status = 1', array(
            ':key' => $_SERVER['HTTP_KEY'],
        ));

        if (!isset($modelApi->id)) {
            exit('invalid API access');
        }
        $api_key         = $modelApi->api_key;
        $api_secret      = $modelApi->api_secret;
        $ips_restriction = trim($modelApi->api_restriction_ips);

        $req = $_POST;

        $req['nonce'] = $_POST['nonce'];

        $post_data = http_build_query($req, '', '&');
        $sign      = hash_hmac('sha512', $post_data, $api_secret);

        if ($_SERVER['HTTP_SIGN'] === $sign && $_SERVER['HTTP_KEY'] == $api_key) {

            if (strlen($ips_restriction)) {
                $allowed = false;
                $ips     = explode(',', $ips_restriction);

                foreach ($ips as $ip) {

                    if ($_SERVER['REMOTE_ADDR'] == $ip) {
                        $allowed = true;
                        break;
                    }
                }

                if ($allowed === false) {
                    exit('invalid IP');
                }

            }

            if (isset($_POST['getFields']) || isset($_POST['getModules']) || isset($_POST['getMenu'])) {
                $_POST['action'] = 'read';
            } else if (isset($_POST['createUser'])) {
                $_POST['action'] = 'save';
            }

            $modelUser = $modelApi->idUser;
            if (isset($modelUser->id)) {

                ApiAccess::checkPermissions($modelApi);

                if (isset($_POST['createUser'])) {
                    ApiAccess::createUser();
                    exit;
                }
                if ($_POST['action'] == 'save') {

                    if ((isset($_POST['id']) && is_array($_POST['id'])) || ($_POST['action'] == 'save' && isset($_POST['filter']) && strlen($_POST['filter']) > 0)) {
                        exit('You only can edit one data per time');
                    }
                }

                $_GET['page']  = isset($_POST['page']) ? $_POST['page'] : 1;
                $_GET['start'] = isset($_POST['start']) ? $_POST['start'] : 0;
                $_GET['limit'] = isset($_POST['limit']) ? $_POST['limit'] : 25;

                $_GET['filter'] = isset($_POST['filter']) ? $_POST['filter'] : '';

                $idUserType                          = $modelUser->idGroup->idUserType->id;
                Yii::app()->session['isAdmin']       = $idUserType == 1 ? true : false;
                Yii::app()->session['isAgent']       = $idUserType == 2 ? true : false;
                Yii::app()->session['isClient']      = $idUserType == 3 ? true : false;
                Yii::app()->session['isClientAgent'] = isset($modelUser->id_user) && $modelUser->id_user > 1 ? true : false;
                Yii::app()->session['id_plan']       = $modelUser->id_plan;
                Yii::app()->session['credit']        = isset($modelUser->credit) ? $modelUser->idUser->credit : 0;
                Yii::app()->session['username']      = $modelUser->username;
                Yii::app()->session['logged']        = true;
                Yii::app()->session['id_user']       = $modelUser->id;
                Yii::app()->session['id_agent']      = is_null($modelUser->id_user) ? 1 : $modelUser->id_user;
                Yii::app()->session['name_user']     = $modelUser->firstname . ' ' . $modelUser->lastname;
                Yii::app()->session['id_group']      = $modelUser->id_group;
                Yii::app()->session['user_type']     = $idUserType;
                Yii::app()->session['language']      = $modelUser->language;
                Yii::app()->session['currency']      = $config['global']['base_currency'];

                $modelGroupModule             = GroupModule::model()->getGroupModule(Yii::app()->session['id_group'], Yii::app()->session['isClient'], Yii::app()->session['id_user']);
                Yii::app()->session['action'] = ApiAccess::getActions($modelGroupModule);

                if (isset($_POST['getMenu']) && isset($_POST['username'])) {

                    $modelUser = User::model()->find('username = :key', array(':key' => $_POST['username']));

                    if (isset($modelUser->id)) {

                        $modelGroupModule = GroupModule::model()->getGroupModule($modelUser->id_group, $idUserType == 3 ? true : false, $modelUser->id);
                        echo json_encode([
                            'menu'    => ApiAccess::getMenu($modelGroupModule),
                            'actions' => ApiAccess::getActions($modelGroupModule),
                        ]);
                    } else {
                        echo 'not found user';
                    }
                    exit;
                }

                if (isset($_POST['getFields'])) {
                    if (!AccessManager::getInstance($_POST['module'])->canRead()) {
                        header('HTTP/1.0 401 Unauthorized');
                        die("Access denied to $action in module:" . $_POST['module']);
                    }
                    $module = $_POST['module'];
                    $rules  = $module::model()->rules();

                    echo json_encode($rules);
                    exit;

                } else if (isset($_POST['getModules'])) {
                    $modelGroupModule = GroupModule::model()->findAll('id_group = :key', array(':key' => Yii::app()->session['id_group']));
                    $modules          = [];
                    foreach ($modelGroupModule as $values) {
                        if ($values->idModule->module != "") {
                            $modules[] = $values->idModule->module;
                        }
                    }
                    exit(json_encode($modules));
                }

                return true;
            } else {
                exit('invalid user');
            }
        } else {
            exit('invalid API access');
        }

    }

    public static function checkPermissions($modelApi)
    {

        if ($_POST['action'] == 'save' && $_POST['id'] == 0) {
            $action = 'c';
        } else if ($_POST['action'] == 'read') {
            $action = 'r';
        } else if ($_POST['action'] == 'save' && $_POST['id'] > 0) {
            $action = 'u';
        } else if ($_POST['action'] == 'destroy') {
            $action = 'd';
        }

        if (!preg_match('/' . $action . '/', $modelApi->action)) {
            exit('invalid API action');
        }

    }

    private static function getMenu($modules)
    {
        $menu = array();

        foreach ($modules as $value) {
            if ($value['module'] != 'buycredit') {
                if (!$value['show_menu']) {
                    continue;
                }
            }

            if (empty($value['id_module'])) {
                array_push($menu, array(
                    'text'    => preg_replace("/ Module/", "", $value['text']),
                    'iconCls' => $value['icon_cls'],
                    'rows'    => ApiAccess::getSubMenu($modules, $value['id']),
                ));
            }
        }

        return $menu;
    }

    private function getSubMenu($modules, $idOwner)
    {
        $subModulesOwner = Util::arrayFindByProperty($modules, 'id_module', $idOwner);
        $subMenu         = array();

        foreach ($subModulesOwner as $value) {

            if ($value['module'] != 'buycredit') {
                if (!$value['show_menu']) {
                    continue;
                }
            }

            if (!empty($value['module'])) {
                array_push($subMenu, array(
                    'text'             => $value['text'],
                    'iconCls'          => $value['icon_cls'],
                    'module'           => $value['module'],
                    'action'           => $value['action'],
                    'leaf'             => true,
                    'createShortCut'   => $value['createShortCut'],
                    'createQuickStart' => $value['createQuickStart'],
                ));
            } else {
                array_push($subMenu, array(
                    'text'    => $value['text'],
                    'iconCls' => $value['icon_cls'],
                    'rows'    => ApiAccess::getSubMenu($modules, $value['id']),
                ));
            }
        }

        return $subMenu;
    }

    private static function getActions($modules)
    {
        $actions = array();

        foreach ($modules as $key => $value) {
            if (!empty($value['action'])) {
                $actions[$value['module']] = $value['action'];
            }
        }

        return $actions;
    }

    private static function createUser()
    {

        $modelUser = User::model()->find('email = :key', array(':key' => $_POST['email']));

        if (count($modelUser)) {
            exit('COM_USERS_PROFILE_EMAIL1_MESSAGE');

        }
        $modelUser = User::model()->find('username = :key', array(':key' => $_POST['user']));

        if (count($modelUser)) {
            exit('COM_USERS_PROFILE_USERNAME_MESSAGE');
        }

        $modelPlan = Plan::model()->find('signup = 1');

        if (count($modelPlan)) {
            $id_plan = $modelPlan->id;
        } else {
            exit('No plan active');
        }

        $credit = $modelPlan->ini_credit;

        if (isset($_POST['id_group'])) {
            $id_group = $_POST['id_group'];

        } else {

            $modelGroupUser = GroupUser::model()->findAllByAttributes(array("id_user_type" => 3));
            if (count($modelGroupUser)) {
                $id_group = $modelGroupUser[0]['id'];
            } else {
                exit('No plan group for user');
            }
        }

        $callingcard_pin = Util::getNewLock_pin();

        $modelUser                  = new User();
        $modelUser->username        = $_POST['user'];
        $modelUser->password        = $_POST['password'];
        $modelUser->email           = $_POST['email'];
        $modelUser->firstname       = $_POST['firstname'];
        $modelUser->id_group        = $id_group;
        $modelUser->id_plan         = $id_plan;
        $modelUser->active          = $_POST['active'];
        $modelUser->callingcard_pin = $callingcard_pin;
        $modelUser->id_user         = 1;
        $modelUser->credit          = $credit;
        if (isset($_POST['phone']) && strlen($_POST['phone']) > 5) {
            $modelUser->phone = $_POST['phone'];
        }
        $success = $modelUser->save();

        if ($success) {

            $modelSip              = new Sip();
            $modelSip->id_user     = $modelUser->id;
            $modelSip->accountcode = $modelUser->username;
            $modelSip->name        = $modelUser->username;
            $modelSip->allow       = 'g729,gsm,alaw,ulaw';
            $modelSip->host        = 'dynamic';
            $modelSip->insecure    = 'no';
            $modelSip->defaultuser = $modelUser->username;
            $modelSip->secret      = $modelUser->password;
            if (strlen($modelUser->phone) > 5) {
                $modelSip->callerid   = $modelUser->phone;
                $modelSip->cid_number = $modelUser->phone;
            }
            $modelSip->save();

        }
        echo json_encode(['success' => true]);
    }
}
