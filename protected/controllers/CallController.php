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
 * @copyright Copyright (C) 2005 - 2016 MagnusBilling. All rights reserved.
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
    );

    public function init()
    {
        ini_set('memory_limit', '-1');
        $this->instanceModel = new Call;
        $this->abstractModel = Call::model();
        $this->titleReport   = Yii::t('yii', 'Calls');

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
        ini_set('memory_limit', '-1');

        $filter       = isset($_GET['filter']) ? $_GET['filter'] : null;
        $filter       = $this->createCondition(json_decode($filter));
        $this->filter = $filter = $this->extraFilter($filter);

        $ids = json_decode($_GET['ids']);

        $uniID = count($ids) == 1 ? true : false;

        $criteria = new CDbCriteria();
        $criteria->addInCondition('id', $ids);
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
