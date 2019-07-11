<?php
/**
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2018 MagnusSolution. All rights reserved.
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

class Util
{

    public static function arrayFindByProperty($array, $key, $value)
    {
        $results = array();

        if (is_array($array)) {
            if (isset($array[$key]) && $array[$key] == $value) {
                $results[] = $array;
            }

            foreach ($array as $subArray) {
                $results = array_merge($results, Util::arrayFindByProperty($subArray, $key, $value));
            }
        }

        return $results;
    }

    public static function getColumnsFromModel($model)
    {

        foreach ($model as $values) {
            $result[] = array_filter($values->attributes);
        }

        return $result;
    }
    public static function getNewUsername()
    {
        $existsUsername = true;

        $config            = LoadConfig::getConfig();
        $generate_username = $config['global']['username_generate'];

        if ($generate_username == 1) {
            $length = $config['global']['generate_length'] == 0 ? 5 : $config['global']['generate_length'];
            $prefix = $config['global']['generate_prefix'] == '0' ? '' : $config['global']['generate_prefix'];
            while ($existsUsername) {
                $randUserName   = $prefix . Util::generatePassword($length, false, false, true, false) . "\n";
                $countUsername  = User::model()->count('username LIKE :key', array(':key' => $randUserName));
                $existsUsername = ($countUsername > 0);
            }
        } else {
            $randUserName = Util::getNewUsername2();
        }

        return trim($randUserName);
    }

    public static function getNewUsername2()
    {
        $existsUsername = true;

        while ($existsUsername) {
            $randUserName  = mt_rand(10000, 99999);
            $countUsername = User::model()->count('username LIKE :key', array(':key' => $randUserName));

            $existsUsername = ($countUsername > 0);
        }
        return $randUserName;
    }

    public static function generatePinCallingcard()
    {
        $existsVoucher = true;
        while ($existsVoucher) {
            $randVoucher = Util::generatePassword(6, false, false, true, false);
            $sql         = "SELECT count(id) FROM pkg_voucher
            WHERE voucher LIKE :randVoucher OR (SELECT count(id) FROM pkg_user WHERE callingcard_pin LIKE :randVoucher) > 0";
            $command = Yii::app()->db->createCommand($sql);
            $command->bindValue(":randVoucher", $randVoucher, PDO::PARAM_STR);
            $countVoucher = $command->queryAll();

            if (count($countVoucher) > 0) {
                $existsVoucher = false;
                break;
            }
        }
        return $randVoucher;
    }

    public static function generateTechPrefix()
    {

        $config = LoadConfig::getConfig();
        $length = $config['global']['ip_tech_length'];

        $exists = true;
        while ($exists) {
            $randPrefix = Util::generatePassword($length, false, false, true, false);
            $sql        = "SELECT count(id) FROM pkg_user WHERE techprefix = :key";
            $command    = Yii::app()->db->createCommand($sql);
            $command->bindValue(":key", $randPrefix, PDO::PARAM_STR);
            $countUser = $command->queryAll();

            if (count($countUser) > 0) {
                $exists = false;
                break;
            }
        }
        return $randPrefix;
    }

    public static function generatePassword($tamanho, $maiuscula, $minuscula, $numeros, $codigos)
    {
        $maius = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
        $minus = "abcdefghijklmnopqrstuwxyz";
        $numer = "123456789";
        $codig = '!@#%';

        $base = '';
        $base .= ($maiuscula) ? $maius : '';
        $base .= ($minuscula) ? $minus : '';
        $base .= ($numeros) ? $numer : '';
        $base .= ($codigos) ? $codig : '';

        srand((float) microtime() * 10000000);
        $password = '';
        for ($i = 0; $i < $tamanho; $i++) {
            $password .= substr($base, rand(0, strlen($base) - 1), 1);
        }

        return $password;
    }

    public static function getNewLock_pin()
    {
        $existsLock_pin = true;

        while ($existsLock_pin) {
            $randLock_Pin  = mt_rand(100000, 999999);
            $countLock_pin = Signup::model()->count(array(
                'condition' => "callingcard_pin LIKE '$randLock_Pin'",
            ));

            $existsLock_pin = ($countLock_pin > 0);
        }
        return $randLock_Pin;
    }

    public static function unique_multidim_array($array, $key)
    {
        $temp_array = array();
        $i          = 0;
        $key_array  = array();

        foreach ($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i]  = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    public static function unique_multidim_obj($obj, $key)
    {
        $temp_array = array();
        $i          = 0;
        $key_array  = array();

        foreach ($obj as $val) {
            if (!in_array($val->$key, $key_array)) {
                $key_array[$i]  = $val->$key;
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    public static function getDataFromMethodPay($code)
    {
        $code = explode("-", $code);
        if (count($code) != 3) {
            return false;
        } else {
            return array(
                'date'     => $code[0],
                'username' => $code[1],
                'id_user'  => $code[2],
            );
        }
    }

    public static function number_translation($prefix_local, $destination)
    {
        #match / replace / if match length
        #0/54,4/543424/7,15/549342/9

        //$this->prefix_local = "0/54,*/5511/8,15/549342/9";
        $config = LoadConfig::getConfig();
        $regexs = preg_split("/,/", $prefix_local);

        foreach ($regexs as $key => $regex) {

            $regra   = preg_split('/\//', $regex);
            $grab    = $regra[0];
            $replace = isset($regra[1]) ? $regra[1] : '';
            $digit   = isset($regra[2]) ? $regra[2] : '';

            $number_prefix = substr($destination, 0, strlen($grab));

            if (strtoupper($config['global']['base_country']) == 'BRL' || strtoupper($config['global']['base_country']) == 'ARG') {
                if ($grab == '*' && strlen($destination) == $digit) {
                    $destination = $replace . $destination;
                } else if (strlen($destination) == $digit && $number_prefix == $grab) {
                    $destination = $replace . substr($destination, strlen($grab));
                } elseif ($number_prefix == $grab) {
                    $destination = $replace . substr($destination, strlen($grab));
                }

            } else {

                if (strlen($destination) == $digit) {
                    if ($grab == '*' && strlen($destination) == $digit) {
                        $destination = $replace . $destination;
                    } else if ($number_prefix == $grab) {
                        $destination = $replace . substr($destination, strlen($grab));
                    }
                }
            }
        }

        return $destination;
    }

    public static function calculation_price($buyrate, $duration, $initblock, $increment)
    {
        $ratecallduration = $duration;
        $buyratecost      = 0;
        if ($ratecallduration < $initblock) {
            $ratecallduration = $initblock;
        }

        if (($increment > 0) && ($ratecallduration > $initblock)) {
            $mod_sec = $ratecallduration % $increment;
            if ($mod_sec > 0) {
                $ratecallduration += ($increment - $mod_sec);
            }

        }
        $ratecost = ($ratecallduration / 60) * $buyrate;
        $ratecost = $ratecost;
        return $ratecost;
    }
}
