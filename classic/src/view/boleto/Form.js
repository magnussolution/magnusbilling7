/**
 * Classe que define o form de "Boleto"
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
Ext.define('MBilling.view.boleto.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.boletoform',
    fieldsHideEdit: ['cid'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            name: 'id_user',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            name: 'payment',
            fieldLabel: t('value'),
            readOnly: App.user.isClient
        }, {
            xtype: 'yesnocombo',
            name: 'status',
            fieldLabel: t('Pago'),
            hidden: App.user.isClient,
            value: 0
        }, {
            xtype: 'datefield',
            name: 'vencimento',
            fieldLabel: 'Vencimento',
            format: 'Y-m-d H:i:s',
            hidden: App.user.isClient || App.user.isAgent
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('description'),
            readOnly: App.user.isClient
        }];
        me.callParent(arguments);
    }
});