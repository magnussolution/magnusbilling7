<?php
/**
 * Acoes do modulo "Call".
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
 * 17/08/2012
 */

class CallSummaryMonthDidController extends Controller
{
    public $attributeOrder = 'month DESC';

    public $extraValues    = array('idDid' => 'did');
    public $fieldsFkReport = array(
        'id_did' => array(
            'table'       => 'pkg_did',
            'pk'          => 'id',
            'fieldReport' => 'did',
        ),
    );

    public function init()
    {
        $this->instanceModel = new CallSummaryMonthDid;
        $this->abstractModel = CallSummaryMonthDid::model();
        $this->titleReport   = Yii::t('zii', 'Summary Month Did');
        parent::init();
    }

    public function recordsExtraSum($records = array())
    {
        foreach ($records as $key => $value) {
            $records[0]->sumsessiontime += $value['sessiontime'] / 60;
            $records[0]->sumaloc_all_calls += $value['sessiontime'] / $value['nbcall'];
            $records[0]->sumnbcall += $value['nbcall'];
        }

        $this->nameSum = 'sum';

        return $records;
    }

    public function getAttributesModels($models, $itemsExtras = array())
    {
        $attributes = false;
        foreach ($models as $key => $item) {
            $attributes[$key]                   = $item->attributes;
            $attributes[$key]['nbcall']         = $item->nbcall;
            $attributes[$key]['aloc_all_calls'] = $item->aloc_all_calls;

            $attributes[$key]['month']       = substr($item->month, 0, 7);
            $did       = Did::model()->findByPk($item->id_did);
            $attributes[$key]['id_did'] = $did->did;
            $attributes[$key]['sessiontime'] = $item->sessiontime / 60;

            $attributes[$key]['aloc_all_calls'] = $item->nbcall > 0
            ? $item->sessiontime / $item->nbcall
            : 0;

            $attributes[$key]['sumsessiontime']    = $item->sumsessiontime;
            $attributes[$key]['sumaloc_all_calls'] = $item->sumaloc_all_calls;
            $attributes[$key]['sumnbcall']         = $item->sumnbcall;

        }

        return $attributes;
    }
}
