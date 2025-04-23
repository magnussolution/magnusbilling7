<?php

/**
 * Modelo para a tabela "Firewall".
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2023 MagnusSolution. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 19/09/2012
 */

class Firewall extends Model
{
    protected $_module = 'firewall';
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     *
     *
     * @return nome da tabela.
     */
    public function tableName()
    {
        return 'pkg_firewall';
    }

    /**
     * @return nome da(s) chave(s) primaria(s).
     */
    public function primaryKey()
    {
        return 'id';
    }

    /**
     *
     *
     * @return array validacao dos campos da model.
     */
    public function rules()
    {
        $rules = [
            ['ip, action', 'required'],
            ['action, id_server', 'numerical', 'integerOnly' => true],
            ['description,jail', 'length', 'max' => 200],
            ['ip', 'checkip'],

        ];
        return $this->getExtraField($rules);
    }

    public function checkip($attribute, $params)
    {
        if (!preg_match('/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\z/', $this->ip)) {
            $this->addError($attribute, Yii::t('zii', 'The IP is not valid'));
        }
    }

    public function relations()
    {
        return [
            'idServer' => [self::BELONGS_TO, 'Servers', 'id_server'],
        ];
    }
    public function beforeSave()
    {
        if ($this->getIsNewRecord()) {
            $this->id_server = 1;
        }
        return parent::beforeSave();
    }
}
