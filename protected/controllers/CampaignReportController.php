<?php
/**
 * Acoes do modulo "CampaignReport".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author  Adilson Leffa Magnus.
 * @copyright   Todos os direitos reservados.
 * ###################################
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 28/07/2020
 */

class CampaignReportController extends Controller
{
    public $attributeOrder = 't.id';
    public $extraValues    = array(
        'idCampaign'    => 'name',
        'idPhonenumber' => 'number',
        'idTrunk'       => 'trunkcode',
        'idUser'        => 'username',
    );

    public function init()
    {
        $this->instanceModel = new CampaignReport;
        $this->abstractModel = CampaignReport::model();
        $this->titleReport   = Yii::t('yii', 'Campaign Report');
        parent::init();
    }
}
