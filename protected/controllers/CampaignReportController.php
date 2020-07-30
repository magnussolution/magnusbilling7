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
    public $defaultFilter  = 't.status = 1';
    private $interval      = 0;
    public function init()
    {
        $this->instanceModel = new Campaign;
        $this->abstractModel = Campaign::model();
        $this->titleReport   = Yii::t('yii', 'Campaign Report');
        parent::init();
    }

    public function actionRead($asJson = true, $condition = null)
    {

        $filter = isset($_GET['filter']) ? json_decode($_GET['filter']) : null;

        if (isset($filter[0]->field) && $filter[0]->field == 'interval') {
            switch ($filter[0]->value) {
                case 'day':
                    $this->interval = strtotime(date('Y-m-d'));
                    break;
                default:
                    $this->interval = strtotime('-1 ' . $filter[0]->value, strtotime(date('Y-m-d H:i:s')));
                    break;
            }

        } else {
            $this->interval = strtotime('-1 hour', strtotime(date('Y-m-d H:i:s')));
        }

        $_GET['filter'] = '';

        parent::actionRead();

    }
    public function getAttributesModels($models, $itemsExtras = array())
    {
        $attributes = false;
        foreach ($models as $key => $item) {
            $attributes[$key]    = $item->attributes;
            $modelCampaignReport = CampaignReport::model()->find([
                'select'    => 'count(*) totalDialed ',
                'condition' => 'id_campaign = :key AND unix_timestamp > :key1',
                'params'    => [
                    ':key'  => $item->id,
                    ':key1' => $this->interval,

                ],
            ]);

            $attributes[$key]['totalDialed'] = $modelCampaignReport->totalDialed;

            $modelCampaignReport = CampaignReport::model()->find([
                'select'    => 'count(*) totalAmd',
                'condition' => 'id_campaign = :key AND status = 5 AND unix_timestamp > :key1',
                'params'    => [
                    ':key'  => $item->id,
                    ':key1' => $this->interval,

                ],
            ]);

            $attributes[$key]['totalAmd'] = $modelCampaignReport->totalAmd;

            $modelCampaignReport = CampaignReport::model()->find([
                'select'    => 'count(*) totalAnswered ',
                'condition' => 'id_campaign = :key AND status IN (3,7) AND unix_timestamp > :key1',
                'params'    => [
                    ':key'  => $item->id,
                    ':key1' => $this->interval,

                ],
            ]);

            $attributes[$key]['totalAnswered'] = $modelCampaignReport->totalAnswered;

            $modelCampaignReport = CampaignReport::model()->find([
                'select'    => 'count(*) transfered',
                'condition' => 'id_campaign = :key AND status = 7 AND unix_timestamp > :key1',
                'params'    => [
                    ':key'  => $item->id,
                    ':key1' => $this->interval,

                ],
            ]);

            $attributes[$key]['transfered'] = $modelCampaignReport->transfered;

        }

        return $attributes;

    }
}
