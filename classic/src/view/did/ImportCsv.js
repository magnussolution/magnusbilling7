/**
 * Classe que define a window import csv de "Did"
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
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com> 
 * 11/08/2014
 */
Ext.define('MBilling.view.did.ImportCsv', {
    extend: 'Ext.ux.window.ImportCsv',
    alias: 'widget.didimportcsv',
    htmlTipInfo: '<br><b>' + t('number') + ", " + t('price') + " " + t('by') + " " + t('monthly') + ", " + t('connection_charge') + "</b><br>" + "551156332233, 10, 5<br>" + "554153882200, 10, 5<br>" + "554155667788, 10, 5<br>" + "<b>" + t('monthly') + ' ' + t('and') + ' ' + t('connection_charge') + ' ' + t('optional') + "</b>",
    fieldsImport: [{
        fieldLabel: t('table'),
        hidden: true,
        allowBlank: true
    }]
});