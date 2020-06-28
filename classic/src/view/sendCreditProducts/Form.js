/**
 * Classe que define o form de "sendCreditProducts"
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
 * 19/09/2018
 */
Ext.define('MBilling.view.sendCreditProducts.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.sendcreditproductsform',
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'country',
            fieldLabel: t('country'),
            readOnly: true
        }, {
            name: 'operator_name',
            fieldLabel: t('Operator Name'),
            readOnly: true
        }, {
            name: 'operator_id',
            fieldLabel: t('Operator Id')
        }, {
            name: 'SkuCode',
            fieldLabel: t('SkuCode')
        }, {
            name: 'product',
            fieldLabel: t('Product')
        }, {
            name: 'send_value',
            fieldLabel: t('Send Value'),
            xtype: 'moneyfield',
            mask: '#9.999.990,000000',
            readOnly: !App.user.isAdmin
        }, {
            name: 'wholesale_price',
            fieldLabel: t('Wholesale Price'),
            xtype: 'moneyfield',
            mask: '#9.999.990,000000',
            readOnly: !App.user.isAdmin
        }, {
            xtype: 'combobox',
            name: 'provider',
            value: 'TransferTo',
            forceSelection: true,
            editable: false,
            store: [
                ['TransferTo', 'TransferTo'],
                ['Ding', 'Ding'],
                ['TanaSend', 'TanaSend'],
                ['Orange2', 'Orange2']
            ],
            fieldLabel: t('Provider')
        }, {
            xtype: 'yesnocombo',
            name: 'status',
            fieldLabel: t('status')
        }, {
            xtype: 'textareafield',
            name: 'info',
            fieldLabel: t('info'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});