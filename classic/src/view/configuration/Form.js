/**
 * Classe que define o form de "Admin"
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
 * 17/08/2012
 */
Ext.define('MBilling.view.configuration.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.configurationform',
    items: [{
        name: 'config_value',
        fieldLabel: t('value'),
        allowBlank: true
    }, {
        xtype: 'textarea',
        name: 'config_description',
        fieldLabel: t('description'),
        height: 200,
        anchor: '100%',
        readOnly: true
    }]
});