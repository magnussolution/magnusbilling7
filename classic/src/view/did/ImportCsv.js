/**
 * Classe que define a window import csv de "Did"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2020 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnussolution/magnusbilling7/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com> 
 * 11/08/2014
 */
Ext.define('MBilling.view.did.ImportCsv', {
    extend: 'Ext.ux.window.ImportCsv',
    alias: 'widget.didimportcsv',
    htmlTipInfo: '<br><b>' + t('Number') + ", " + t('Monthly price') + ", " + t('Connection charge') + "</b><br>" + "551156332233, 10, 5<br>" + "554153882200, 10, 5<br>" + "554155667788, 10, 5<br>" + "<b>" + t('Monthly price') + ',' + t('Connection charge') + ' ' + t('is optional') + "</b>",
    fieldsImport: [{
        fieldLabel: t('Table'),
        hidden: true,
        allowBlank: true
    }]
});