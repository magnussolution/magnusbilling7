<?php
/**
 * Acoes do modulo "Iax".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Todos os direitos reservados.
 * ###################################
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 23/06/2016
 */

class IaxController extends Controller
{
    public $attributeOrder = 'regseconds DESC';
    public $extraValues    = array('idUser' => 'username');

    private $host     = 'localhost';
    private $user     = 'magnus';
    private $password = 'magnussolution';

    public $fieldsFkReport = array(
        'id_user' => array(
            'table'       => 'pkg_user',
            'pk'          => 'id',
            'fieldReport' => 'username',
        ),
    );

    public function init()
    {
        $this->instanceModel = new Iax;
        $this->abstractModel = Iax::model();
        parent::init();
    }

    public function beforeSave($values)
    {

        $modelUser             = User::model()->findByPk((int) $values['id_user']);
        $values['accountcode'] = $modelUser->username;

        if ($this->isNewRecord) {
            $values['name'] = $values['username'] == '' ? $values['accountcode'] : $values['username'];

            $values['regseconds'] = 1;
            $values['context']    = 'billing';
            $values['regexten']   = $values['name'];
            if (!$values['callerid']) {
                $values['callerid'] = $values['name'];
            }

        }
        $values['allow'] = preg_replace("/,0/", "", $values['allow']);
        $values['allow'] = preg_replace("/0,/", "", $values['allow']);
        return $values;
    }

    public function afterSave($model, $values)
    {
        AsteriskAccess::instance()->generateIaxPeers();
        return;
    }

    public function afterDestroy($values)
    {
        AsteriskAccess::instance()->generateIaxPeers();
        return;
    }

    public function getAttributesModels2($models, $itemsExtras = array())
    {

        $asmanager = new AGI_AsteriskManager;
        $asmanager->connect($this->host, $this->user, $this->password);

        $attributes = false;
        foreach ($models as $key => $item) {
            $attributes[$key] = $item->attributes;

            $server = $asmanager->Command("iax2 show peer $item->name");
            $arr    = explode("\n", $server["data"]);
            $arr3   = explode("Addr->IP:", preg_replace("/ /", "", $arr[17]));
            $ipaddr = explode("Port", trim(rtrim($arr3[1])));
            $ipaddr = $ipaddr[0];

            $attributes[$key]['ipaddr'] = $ipaddr;

            if (isset(Yii::app()->session['idClient']) && Yii::app()->session['idClient']) {
                foreach ($this->fieldsInvisibleClient as $field) {
                    unset($attributes[$key][$field]);
                }
            }

            if (isset(Yii::app()->session['idAgent']) && Yii::app()->session['idAgent']) {
                foreach ($this->fieldsInvisibleAgent as $field) {
                    unset($attributes[$key][$field]);
                }
            }

            foreach ($itemsExtras as $relation => $fields) {
                $arrFields = explode(',', $fields);
                foreach ($arrFields as $field) {
                    $attributes[$key][$relation . $field] = $item->$relation->$field;
                    if (Yii::app()->session['idClient']) {
                        foreach ($this->fieldsInvisibleClient as $field) {
                            unset($attributes[$key][$field]);
                        }
                    }

                    if (Yii::app()->session['idAgent']) {
                        foreach ($this->fieldsInvisibleAgent as $field) {
                            unset($attributes[$key][$field]);
                        }
                    }
                }
            }
        }

        return $attributes;
    }
}
