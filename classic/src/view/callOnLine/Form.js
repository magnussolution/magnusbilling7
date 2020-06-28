/**
 * Classe que define o form de "Call"
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
 * 19/09/2012
 */
Ext.define('MBilling.view.callOnLine.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.callonlineform',
    initComponent: function() {
        var me = this;
        me.items = [{
            fieldLabel: t('number'),
            name: 'ndiscado',
            readOnly: true
        }, {
            fieldLabel: t('CallerID'),
            name: 'callerid',
            allowBlank: true,
            readOnly: true
        }, {
            fieldLabel: t('Reinvite'),
            name: 'reinvite',
            allowBlank: true,
            readOnly: true
        }, {
            fieldLabel: t('From IP'),
            name: 'from_ip',
            allowBlank: true,
            readOnly: true
        }, {
            xtype: 'textarea',
            name: 'description',
            readOnly: true,
            allowBlank: true,
            height: 350,
            anchor: '100%',
            hidden: !App.user.isAdmin
        }]
        me.callParent(arguments);
    }
});