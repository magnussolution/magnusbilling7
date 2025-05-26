<?php

/**
 * Acoes do modulo "Provider".
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2023 MagnusSolution. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v2.1
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.com <info@magnusbilling.com>
 * 23/06/2012
 */

class ProviderController extends Controller
{
    public $attributeOrder      = 't.provider_name ASC';
    public $filterByUser   = false;

    public function init()
    {
        $this->instanceModel = new Provider;
        $this->abstractModel = Provider::model();
        $this->titleReport   = Yii::t('zii', 'Provider');
        parent::init();
    }
}
