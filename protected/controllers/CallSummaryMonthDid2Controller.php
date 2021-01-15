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

    public $extraValues    = array('idDid' => 'id_did');
    public $join           = 'JOIN pkg_did c ON t.id_did = c.id';
    public $fieldsFkReport = array(
        'id_did' => array(
            'table'       => 'pkg_did',
            'pk'          => 'id',
            'fieldReport' => 'id_did',
        ),
    );

    public function init()
    {
        $this->instanceModel = new CallSummaryMonthDid;
        $this->abstractModel = CallSummaryMonthDid::model();
        $this->titleReport   = Yii::t('zii', 'Summary Month Did');
        parent::init();
    }

    public function getAttributesModels($models, $itemsExtras = array())
    {
        $attributes = false;
        foreach ($models as $key => $item) {
            $attributes[$key]['month']       = substr($item->month, 0, 7);
            $attributes[$key]['time'] = $item->time;
            $did       = Did::model()->findByPk($item->id_did);
            $attributes[$key]['id_did'] = $did->did;

            if (isset(Yii::app()->session['isClient']) && Yii::app()->session['isClient']) {
                foreach ($this->fieldsInvisibleClient as $field) {
                    unset($attributes[$key][$field]);
                }
            }

            if (isset(Yii::app()->session['isAgent']) && Yii::app()->session['isAgent']) {
                foreach ($this->fieldsInvisibleAgent as $field) {
                    unset($attributes[$key][$field]);
                }
            }
        }

        return $attributes;
    }
}
