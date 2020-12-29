<?php
/**
 * Acoes do modulo "Call".
 *
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
 * 17/08/2012
 */

class CallController extends Controller
{
    public $attributeOrder = 't.id DESC';
    public $extraValues    = array(
        'idUser'     => 'username',
        'idPlan'     => 'name',
        'idTrunk'    => 'trunkcode',
        'idPrefix'   => 'destination',
        'idCampaign' => 'name',
        'idServer'   => 'name',
    );

    public $fieldsInvisibleClient = array(
        'username',
        'trunk',
        'buycost',
        'agent',
        'lucro',
        'id_user',
        'id_user',
        'provider_name',
        'id_server',
    );

    public $fieldsInvisibleAgent = array(
        'trunk',
        'buycost',
        'agent',
        'lucro',
        'id_user',
        'id_user',
        'provider_name',
    );

    public $fieldsFkReport = array(
        'id_user'     => array(
            'table'       => 'pkg_user',
            'pk'          => 'id',
            'fieldReport' => "username ",
        ),
        'id_trunk'    => array(
            'table'       => 'pkg_trunk',
            'pk'          => 'id',
            'fieldReport' => 'trunkcode',
        ),
        'id_prefix'   => array(
            'table'       => 'pkg_prefix',
            'pk'          => 'id',
            'fieldReport' => 'destination',
        ),
        'id'          => array(
            'table'       => 'pkg_prefix',
            'pk'          => 'id',
            'fieldReport' => 'destination',
        )
        ,
        'id_campaign' => array(
            'table'       => 'pkg_campaign',
            'pk'          => 'id',
            'fieldReport' => 'name',
        ),
        'id_server'   => array(
            'table'       => 'pkg_servers',
            'pk'          => 'id',
            'fieldReport' => 'name',
        ),
    );

    public function init()
    {
        $this->instanceModel = new Call;
        $this->abstractModel = Call::model();
        $this->titleReport   = Yii::t('zii', 'Calls');

        parent::init();

        if (!Yii::app()->session['isAdmin']) {
            $this->extraValues = array(
                'idUser'   => 'username',
                'idPlan'   => 'name',
                'idPrefix' => 'destination',
            );
        }
    }

    /**
     * Cria/Atualiza um registro da model
     */
    public function actionSave()
    {
        $values = $this->getAttributesRequest();

        if (isset($values['id']) && !$values['id']) {
            echo json_encode(array(
                $this->nameSuccess => false,
                $this->nameRoot    => 'error',
                $this->nameMsg     => 'Operation no allow',
            ));
            exit;
        }
        parent::actionSave();
    }

    public function getAttributesRequest()
    {
        $arrPost = array_key_exists($this->nameRoot, $_POST) ? json_decode($_POST[$this->nameRoot], true) : $_POST;
        //retira capos antes de salvar
        unset($arrPost['starttime']);
        unset($arrPost['callerid']);
        unset($arrPost['id_prefix']);
        unset($arrPost['username']);
        unset($arrPost['trunk']);
        unset($arrPost['terminatecauseid']);
        unset($arrPost['calltype']);
        unset($arrPost['agent']);
        unset($arrPost['lucro']);
        unset($arrPost['agent_bill']);
        unset($arrPost['idPrefixdestination']);

        return $arrPost;
    }

    public function actionDownloadRecord()
    {

        $filter = isset($_GET['filter']) ? json_decode($_GET['filter']) : null;
        $ids    = isset($_GET['ids']) ? json_decode($_GET['ids']) : null;

        //if try download only one audio  via button Download RED.
        if (count($filter) == 0 && count($ids) == 1) {
            $_GET['id'] = $ids[0];
        }

        if (isset($_GET['id'])) {

            $modelCall = Call::model()->findByPk((int) $_GET['id']);
            $day       = $modelCall->starttime;
            $uniqueid  = $modelCall->uniqueid;
            $day       = explode(' ', $day);
            $day       = explode('-', $day[0]);

            $day = $day[2] . $day[1] . $day[0];

            if ($modelCall->id_server > 0 && $modelCall->idServer->type == 'asterisk') {

                $host = $modelCall->idServer->public_ip > 0 ? $modelCall->idServer->public_ip : $modelCall->idServer->host;

                header('Location: http://' . $host . '/mbilling/record.php?id=' . $uniqueid . '&u=' . $modelCall->idUser->username);
                exit;
            }

            exec("ls /var/spool/asterisk/monitor/" . $modelCall->idUser->username . '/*.' . $uniqueid . '* ', $output);

            if (isset($output[0])) {

                $file_name = explode("/", $output[0]);

                header("Cache-Control: public");
                header("Content-Description: File Transfer");
                header("Content-Disposition: attachment; filename=" . end($file_name));
                header("Content-Type: audio/x-gsm");
                header("Content-Transfer-Encoding: binary");
                readfile($output[0]);

            } else {

                if (strlen($this->config['global']['external_record_link']) > 20) {
                    $url = $this->config['global']['external_record_link'];

                    $url = preg_replace("/\%user\%/", $modelCall->idUser->username, $url);
                    $url = preg_replace("/\%number\%/", $modelCall->calledstation, $url);
                    $url = preg_replace("/\%uniqueid\%/", $uniqueid, $url);
                    $url = preg_replace("/\%audio_exten\%/", preg_replace('/49/', '', $this->config['global']['MixMonitor_format']), $url);

                    header('Location: ' . $url);
                } else {
                    echo yii::t('zii', 'Audio no found');
                }
            }
            exit;
        } else {

            $filter = $this->createCondition($filter);

            $this->filter = $this->extraFilter($filter);

            $criteria = new CDbCriteria(array(
                'condition' => $this->filter,
                'params'    => $this->paramsFilter,
                'with'      => $this->relationFilter,
            ));
            if (count($ids)) {
                $criteria->addInCondition('t.id', $ids);
            }
            $modelCdr = Call::model()->findAll($criteria);

            $folder = $this->magnusFilesDirectory . 'monitor';

            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }
            array_map('unlink', glob("$folder/*"));

            if (count($modelCdr)) {
                foreach ($modelCdr as $records) {
                    $number   = $records->calledstation;
                    $day      = $records->starttime;
                    $uniqueid = $records->uniqueid;
                    $username = $records->idUser->username;

                    $mix_monitor_format = $this->config['global']['MixMonitor_format'];
                    exec('cp -rf  /var/spool/asterisk/monitor/' . $username . '/*.' . $uniqueid . '* ' . $folder . '/');
                }

                exec("cd $folder && tar -czf records_" . Yii::app()->session['username'] . ".tar.gz *");

                $file_name = 'records_' . Yii::app()->session['username'] . '.tar.gz';
                $path      = $folder . '/' . $file_name;
                header('Content-type: application/tar+gzip');

                echo json_encode(array(
                    $this->nameSuccess => true,
                    $this->nameMsg     => 'success',
                ));

                header('Content-Description: File Transfer');
                header("Content-Type: application/x-tar");
                header('Content-Disposition: attachment; filename=' . basename($file_name));
                header("Content-Transfer-Encoding: binary");
                header('Accept-Ranges: bytes');
                header('Content-type: application/force-download');
                ob_clean();
                flush();
                if (readfile($path)) {
                    unlink($path);
                }
                exec("rm -rf $folder/*");
            } else {
                echo json_encode(array(
                    $this->nameSuccess => false,
                    $this->nameMsg     => 'Audio no found',
                ));
                exit;
            }
        }
    }

    public function beforeReport($columns)
    {

        if (preg_match("/id_campaign/", $this->filter)) {

            $filterCampaign = json_decode($_GET['filter']);

            foreach ($filterCampaign as $f) {
                if (!isset($f->type) || $f->field != 'id_campaign') {
                    continue;
                }
                if (count($f->value) > 1) {
                    echo json_encode(array(
                        $this->nameSuccess => false,
                        $this->nameRoot    => 'error',
                        $this->nameMsg     => 'Please select one campaign',
                    ));
                    exit;
                }

                $id = $f->value[0];
            }

            $modelCampaign = Campaign::model()->findByPk($id);
            $nameCampaign  = $modelCampaign->name;
            $timeCampaign  = $modelCampaign->nb_callmade;

            if ($timeCampaign > 0) {

                $columns = array(
                    array('header' => "100%", 'dataIndex' => 'real_sessiontime'),
                    array('header' => "80% a 99% ", 'dataIndex' => 'uniqueid'),
                    array('header' => "60% a 79%", 'dataIndex' => 'id_plan'),
                    array('header' => "40% a 59% ", 'dataIndex' => 'id_did'),
                    array('header' => "20% a 39% ", 'dataIndex' => 'id_prefix'),
                    array('header' => "Menos que 20% ", 'dataIndex' => 'id_offer'),
                );

                $timeCampaign80 = $timeCampaign * 0.8;
                $timeCampaign60 = $timeCampaign * 0.6;
                $timeCampaign40 = $timeCampaign * 0.4;
                $timeCampaign20 = $timeCampaign * 0.2;

                $this->select = "
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign  ) AS real_sessiontime,
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign80 AND sessiontime < $timeCampaign ) AS uniqueid,
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign60 AND sessiontime < $timeCampaign80) AS id_plan,
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign40 AND sessiontime < $timeCampaign60 ) AS id_did,
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime >= $timeCampaign20 AND sessiontime < $timeCampaign40 ) AS id_prefix,
                ( SELECT COUNT(sessiontime) FROM pkg_cdr t $this->join WHERE $this->filter AND sessiontime <= $timeCampaign20   ) AS id_offer
                ";
                $count = $this->abstractModel->count(array(
                    'join'      => $this->join,
                    'condition' => $this->filter,
                    'params'    => $this->paramsFilter,
                ));
                $this->limit          = 1;
                $this->titleReport    = "Estatistica da campanha $nameCampaign";
                $this->subTitleReport = "Total de chamadas $count";

            }
        }

        return $columns;
    }

    public function actionGetTotal()
    {
        $filter   = isset($_POST['filter']) ? json_decode($_POST['filter']) : null;
        $filterIn = isset($_POST['filterIn']) ? json_decode($_POST['filterIn']) : null;

        if ($filter && $filterIn) {
            $filter = array_merge($filter, $filterIn);
        } else if ($filterIn) {
            $filter = $filterIn;
        }

        $filter       = $filter ? $this->createCondition($filter) : $this->defaultFilter;
        $this->filter = $this->fixedWhere ? $filter . ' ' . $this->fixedWhere : $filter;
        $this->filter = $this->extraFilter($filter);

        $modelCall = $this->abstractModel->find(array(
            'select'    => 'SUM(t.buycost) AS sumbuycost, SUM(t.sessionbill) AS sumsessionbill ',
            'join'      => $this->join,
            'condition' => $this->filter,
            'params'    => $this->paramsFilter,
            'with'      => $this->relationFilter,
        ));

        $modelCall->sumbuycost     = number_format($modelCall->sumbuycost, 4);
        $modelCall->sumsessionbill = number_format($modelCall->sumsessionbill, 4);
        $modelCall->totalCall      = number_format($modelCall->sumsessionbill - $modelCall->sumbuycost, 4);
        echo json_encode($modelCall);
    }

    public function createCondition($filter)
    {
        $condition = '1';

        if (!is_array($filter)) {
            return $condition;
        }

        foreach ($filter as $key => $f) {
            $isSubSelect = false;

            if (!isset($f->type)) {
                continue;
            }

            $type  = $f->type;
            $field = $f->field;

            if ($this->actionName != 'destroy' && !preg_match("/^id[A-Z]/", $field)) {

                if (is_array($field)) {
                    foreach ($field as $key => $fieldOr) {
                        $field[$key] = strpos($fieldOr, '.') === false ? 't.' . $fieldOr : $fieldOr;
                    }
                } else {
                    $field = strpos($field, '#') === 0 ? str_replace('#', '', $field) : (strpos($field, '.') === false ? 't.' . $field : $field);
                }
            }

            $value     = isset($f->value) ? $f->value : new CDbExpression('NULL');
            $paramName = "p$key";

            if (isset($f->data->comparison)) {
                $comparison = $f->data->comparison;
            } else if (isset($f->comparison)) {
                $comparison = $f->comparison;
            } else {
                $comparison = null;
            }
            switch ($type) {
                case 'date':
                    switch ($comparison) {
                        case 'eq':
                            $this->paramsFilter[$paramName] = strtok($value, ' ') . "%";
                            $condition .= " AND $field LIKE :$paramName";
                            break;
                        case 'lt':
                            $this->paramsFilter[$paramName] = $value;
                            $condition .= " AND $field < :$paramName";
                            break;
                        case 'gt':
                            $this->paramsFilter[$paramName] = $value;
                            $condition .= " AND $field > :$paramName";
                            break;
                    }
                    break;
                case 'string':
                    $field = isset($f->caseSensitive) && $f->caseSensitive && !is_array($field) ? "BINARY $field" : $field;

                    switch ($comparison) {
                        case 'st':

                            if ($field == 'idUser.username') {
                                $modelUser = User::model()->find('username LIKE :key', array(':key' => $value . '%'));
                                if (isset($modelUser->id)) {
                                    $condition .= ' AND id_user = :id_user_username';
                                    $this->paramsFilter['id_user_username'] = $modelUser->id;
                                    continue;
                                }
                            }

                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field LIKE :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field LIKE :$paramName",
                                    );
                                }

                            } else {
                                $condition .= " AND $field LIKE :$paramName";
                            }

                            $this->paramsFilter[$paramName] = "$value%";

                            break;
                        case 'ed':

                            if ($field == 'idUser.username') {
                                $modelUser = User::model()->find('username LIKE :key', array(':key' => '%' . $value));
                                if (isset($modelUser->id)) {
                                    $condition .= ' AND id_user = :id_user_username';
                                    $this->paramsFilter['id_user_username'] = $modelUser->id;
                                    continue;
                                }
                            }

                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field LIKE :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field LIKE :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field LIKE :$paramName";
                            }

                            $this->paramsFilter[$paramName] = "%$value";

                            break;
                        case 'ct':

                            if ($field == 'idUser.username') {
                                $modelUser = User::model()->find('username LIKE :key', array(':key' => '%' . $value . '%'));
                                if (isset($modelUser->id)) {
                                    $condition .= ' AND id_user = :id_user_username';
                                    $this->paramsFilter['id_user_username'] = $modelUser->id;
                                    continue;
                                }
                            }

                            if (is_array($field)) {
                                $conditionsOr = array();

                                foreach ($field as $keyOr => $fieldOr) {
                                    $this->paramsFilter["pOr$keyOr"] = "%$value%";
                                    $fieldOr                         = isset($f->caseSensitive) && $f->caseSensitive ? "BINARY $fieldOr" : $fieldOr;
                                    array_push($conditionsOr, "$fieldOr LIKE :pOr$keyOr");
                                }

                                $conditionsOr = implode(' OR ', $conditionsOr);
                                $condition .= " AND ($conditionsOr)";
                            } else {

                                if (preg_match("/^id[A-Z].*\./", $field)) {

                                    if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                        $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field LIKE :$paramName";
                                    } else {
                                        $this->relationFilter[strtok($field, '.')] = array(
                                            'condition' => "$field LIKE :$paramName",
                                        );
                                    }
                                    $this->paramsFilter[$paramName] = "%" . $value . "%";
                                } else {
                                    $condition .= " AND LOWER($field) LIKE :$paramName";
                                    $this->paramsFilter[$paramName] = "%" . strtolower($value) . "%";
                                }

                            }
                            break;
                        case 'eq':

                            if ($field == 'idUser.username') {
                                $modelUser = User::model()->find('username = :key', array(':key' => $value));
                                if (isset($modelUser->id)) {
                                    $condition .= ' AND id_user = :id_user_username';
                                    $this->paramsFilter['id_user_username'] = $modelUser->id;
                                    continue;
                                }
                            }

                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field = :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field = :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field = :$paramName";
                            }

                            $this->paramsFilter[$paramName] = $value;
                            break;
                        case 'df':
                            $this->paramsFilter[$paramName] = $value;
                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field != :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field != :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field != :$paramName";
                            }

                            break;
                    }

                    break;
                case 'boolean':
                    $this->paramsFilter[$paramName] = (int) $value;
                    $condition .= " AND $field = :$paramName";
                    break;
                case 'numeric':
                    $this->paramsFilter[$paramName] = $value;
                    switch ($comparison) {
                        case 'eq':
                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field = :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field = :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field = :$paramName";
                            }

                            break;
                        case 'lt':
                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field < :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field < :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field < :$paramName";
                            }

                            break;
                        case 'gt':
                            if (preg_match("/^id[A-Z].*\./", $field)) {
                                if (array_key_exists(strtok($field, '.'), $this->relationFilter)) {
                                    $this->relationFilter[strtok($field, '.')]['condition'] .= " AND $field > :$paramName";
                                } else {
                                    $this->relationFilter[strtok($field, '.')] = array(
                                        'condition' => "$field > :$paramName",
                                    );
                                }
                            } else {
                                $condition .= " AND $field > :$paramName";
                            }

                            break;
                    }

                case 'list':
                    $value = is_array($value) ? $value : array($value);

                    if (!isset($f->tableRelated)) {
                        $paramsIn = array();

                        foreach ($value as $keyIn => $v) {
                            $this->paramsFilter["pIn$key$keyIn"] = $v;
                            array_push($paramsIn, ":pIn$key$keyIn");
                        }

                        $paramsIn = implode(',', $paramsIn);
                        $condition .= " AND $field IN($paramsIn)";
                    } else {
                        $value             = $value[0];
                        $operatorSubSelect = isset($f->operatorSubSelect) ? $f->operatorSubSelect : '=';
                        $subSelect         = "SELECT DISTINCT $f->fieldSubSelect FROM $f->tableRelated WHERE $f->fieldWhere $operatorSubSelect $value";
                        $condition .= " AND $field IN($subSelect)";
                    }
                    break;
                case 'notlist':
                    $value = is_array($value) ? $value : array($value);

                    if (!isset($f->tableRelated)) {
                        $paramsNotIn = array();

                        if (count($value)) {
                            foreach ($value as $keyNotIn => $v) {
                                $this->paramsFilter["pNotIn$keyNotIn"] = $v;
                                array_push($paramsNotIn, ":pNotIn$keyNotIn");
                            }

                            $paramsNotIn = implode(',', $paramsNotIn);
                            $condition .= " AND $field NOT IN($paramsNotIn)";
                        }
                    } else {
                        $value                          = $value[0];
                        $operatorSubSelect              = isset($f->operatorSubSelect) ? $f->operatorSubSelect : '=';
                        $this->paramsFilter[$paramName] = $value;
                        $subSelect                      = "SELECT DISTINCT $f->fieldSubSelect FROM $f->tableRelated WHERE $f->fieldWhere $operatorSubSelect :$paramName";
                        $condition .= " AND $field NOT IN($subSelect)";
                    }
                    break;
            }
        }

        return $condition;
    }

}
