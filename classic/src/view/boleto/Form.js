/**
 * Classe que define o form de "Boleto"
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
            fieldLabel: t('Username'),
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            xtype: 'moneyfield',
            name: 'payment',
            fieldLabel: t('Value'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            readOnly: App.user.isClient
        }, {
            xtype: 'yesnocombo',
            name: 'status',
            fieldLabel: t('Paid'),
            hidden: App.user.isClient,
            value: 0
        }, {
            xtype: 'datefield',
            name: 'vencimento',
            fieldLabel: t('Due date'),
            format: 'Y-m-d H:i:s',
            hidden: App.user.isClient || App.user.isAgent
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('Description'),
            readOnly: App.user.isClient
        }];
        me.callParent(arguments);
    }
});