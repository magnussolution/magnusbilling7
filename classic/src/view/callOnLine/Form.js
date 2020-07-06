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

         me.defaults = {
            readOnly: true,
            allowBlank: true
        };

        me.items = [{
            fieldLabel: t('Username'),
            name: 'idUserusername'
        },{
            fieldLabel: t('Sip Account'),
            name: 'sip_account'
        },{
            fieldLabel: t('credit'),
            name: 'idUsercredit'
        },{
            fieldLabel: t('number'),
            name: 'ndiscado'
        },{
            fieldLabel: t('codec'),
            name: 'Codec'
        }, {
            fieldLabel: t('CallerID'),
            name: 'callerid'
        }, {
            fieldLabel: t('trunk'),
            name: 'tronco'
        }, {
            fieldLabel: t('Reinvite'),
            name: 'reinvite'
        }, {
            fieldLabel: t('From IP'),
            name: 'from_ip'
        }, {
            xtype: 'textarea',
            name: 'description',
            height: 350,
            anchor: '100%',
            hidden: !App.user.isAdmin
        }]
        me.callParent(arguments);
    }
});