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
/**
 * Url for paypal ruturn http://ip/mbilling/index.php/ata .
 */
class AtaController extends Controller
{

    public function actionIndex()
    {
        $config       = LoadConfig::getConfig();
        $mac          = isset($_GET['mac']) ? $_GET['mac'] : null;
        $date         = date("Y-m-d H:i:s");
        $mac          = strtoupper(preg_replace("/:/", "", $mac));
        $mac          = substr($mac, 0);
        $proxy        = $this->config['global']['ip_servers'];
        $Profile_Rule = "http://" . $proxy . "/mbilling/index.php/ata?mac=\$MAC";
        $modelo       = explode(" ", $_SERVER["HTTP_USER_AGENT"]);

        $modelSipuras = Sipuras::model()->find('macadr = :mac', array(':mac' => $mac));

        if (count($modelSipuras) == 0) {
            echo 'Ata no found';
            $info = 'Username or password is wrong - User ' . $mac . ' from IP - ' . $_SERVER['REMOTE_ADDR'];
            Yii::log($info, 'error');
            exit;
        }
        $modelSipuras->fultmov      = $date;
        $modelSipuras->fultlig      = $date;
        $modelSipuras->Profile_Rule = $Profile_Rule;
        $modelSipuras->last_ip      = $_SERVER["REMOTE_ADDR"];
        $modelSipuras->fultlig      = $date;
        $modelSipuras->obs          = $modelo[0];
        $modelSipuras->fultlig      = $date;

        //verfica se a senha da linha 1 foi alterada
        $modelSip = Sip::model()->find('name = :name', array(':name' => $modelSipuras->User_ID_1));

        if (count($modelSip) > 0 && $modelSip->secret != $modelSipuras->Password_1) {
            $modelSipuras->Password_1 = $modelSip->secret;
            $modelSipuras->altera     = 'si';
            $modelSipuras->Password_1 = $modelSip->secret;
        }

        //verfica se a senha da linha 2 foi alterada
        $modelSip = Sip::model()->find("name = :name", array(':name' => $modelSipuras->User_ID_2));

        if (count($modelSip) > 0 && $modelSip->secret != $modelSipuras->Password_2) {
            $modelSipuras->Password_2 = $modelSip->secret;
            $modelSipuras->altera     = 'si';
            $modelSipuras->Password_2 = $modelSip->secret;
        }

        $modelSipuras->save();

        if ($modelSipuras->id > 0 && $modelSipuras->altera == 'si') {
            //marca como nao alterar mais
            $modelSipuras->altera = 'no';
            $modelSipuras->save();

            $this->render('index',
                array(
                    'modelSipuras' => $modelSipuras,
                    'Profile_Rule' => $Profile_Rule,
                    'proxy'        => $proxy,
                ));
        }
    }

}
