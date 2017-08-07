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
 * 19/09/2012
 */

class CampaignRestrictPhoneController extends Controller
{
    public $attributeOrder = 't.id';

    public function init()
    {
        $this->instanceModel = new CampaignRestrictPhone;
        $this->abstractModel = CampaignRestrictPhone::model();
        $this->titleReport   = Yii::t('yii', 'Campaign Restrict Phone');
        parent::init();
    }

    public function actionDeleteDuplicados()
    {

        $this->abstractModel->deleteDuplicatedrows();
        echo json_encode(array(
            $this->nameSuccess => true,
            $this->nameMsg     => 'Números duplicado deletados com successo',
        ));

    }

}
