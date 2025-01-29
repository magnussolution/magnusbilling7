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
class sqlInject
{

    public static function sanitize($src)
    {
        $codes = [
            'UPDATE ',
            'SELECT ',
            ' SET ',
            ' TABLE ',
            'DELETE FROM',
            ' DATABASE ',
            'DROP TABLE',
            'DROP DATABASE',
            'SCHEMA',
            'CONCAT',
            'foreign_key',
            'TRUNCATE ',
            'CREATE ',
            'print',
            'echo',
            'while',
            'shell_exec',
            'popen',
            'proc_open',
            'passthru',
            'eval',
            'assert',
            'fopen',
            'file_get_contents',
            'file_put_contents',
            'unlink',
            'mkdir',
            'rmdir',
            'copy',
            'rename',
            'curl_exec',
            'curl_init',
            'fsockopen',
            'socket_connect',
            'mysql_query',
            'mysqli_query',
            'pg_query',
            'sqlite_query',
            'prepare',

        ];


        foreach ($src as $key => $value) {


            foreach ($codes as $code) {

                $code = strtolower($code);

                if (is_array($value)) {
                    foreach ($value as $key => $valuearray) {

                        if (is_array($valuearray)) {
                            foreach ($valuearray as $key => $value) {

                                $value = strtolower($value);
                                if (strlen($value) > 250) {
                                    $info    = 'Variable to long: ' . $value . '. Controller => ' . Yii::app()->controller->id;
                                    $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                                    MagnusLog::insertLOG('EDIT', $id_user, $_SERVER['REMOTE_ADDR'], $info);
                                    echo json_encode([
                                        'rows'  => [],
                                        'count' => 0,
                                        'sum'   => [],
                                        'msg'   => $info
                                    ]);
                                    exit;
                                }


                                if (preg_match("/$code/", $value)) {


                                    $info    = 'Trying SQL inject, code: ' . $value . '. Controller => ' . Yii::app()->controller->id . '. Code ' . $code;
                                    $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                                    MagnusLog::insertLOG(2, $info);
                                    echo json_encode([
                                        'rows'  => [],
                                        'count' => 0,
                                        'sum'   => [],
                                        'msg'   => $info
                                    ]);
                                    exit;
                                }
                            }
                        } else {
                            $value = strtolower($valuearray);
                            if (strlen($value) > 250) {
                                $info    = 'Variable to long: ' . $valuearray . '. Controller => ' . Yii::app()->controller->id;
                                $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                                MagnusLog::insertLOG('EDIT', $id_user, $_SERVER['REMOTE_ADDR'], $info);
                                echo json_encode([
                                    'rows'  => [],
                                    'count' => 0,
                                    'sum'   => [],
                                    'msg'   => $info
                                ]);
                                exit;
                            }


                            if (preg_match("/$code/", $valuearray)) {


                                $info    = 'Trying SQL inject, code: ' . $valuearray . '. Controller => ' . Yii::app()->controller->id . '. Code ' . $code;
                                $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                                MagnusLog::insertLOG(2, $info);
                                echo json_encode([
                                    'rows'  => [],
                                    'count' => 0,
                                    'sum'   => [],
                                    'msg'   => $info
                                ]);
                                exit;
                            }
                        }
                    }
                } else {

                    if (strlen($value) > 250) {
                        $info    = 'Variable to long2: ' . $value . '. Controller => ' . Yii::app()->controller->id;
                        $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                        MagnusLog::insertLOG('EDIT', $id_user, $_SERVER['REMOTE_ADDR'], $info);
                        echo json_encode([
                            'rows'  => [],
                            'count' => 0,
                            'sum'   => [],
                            'msg'   => $info
                        ]);
                        exit;
                    }
                    $value = strtolower($value);
                    if (preg_match("/$code/", $value)) {
                        $info    = 'Trying SQL inject, code: ' . $value . '. Controller => ' . Yii::app()->controller->id . '. Code ' . $code;
                        $id_user = isset(Yii::app()->session['id_user']) ? Yii::app()->session['id_user'] : 'NULL';
                        MagnusLog::insertLOG('EDIT', $id_user, $_SERVER['REMOTE_ADDR'], $info);
                        echo json_encode([
                            'rows'  => [],
                            'count' => 0,
                            'sum'   => [],
                            'msg'   => $info
                        ]);
                        exit;
                    }
                }
            }
        }
    }
}
