/**
 * Classe que define o form de "Voucher"
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
 * 25/06/2012
 */
Ext.define('MBilling.view.voucher.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.voucherform',
    initComponent: function() {
        var me = this;
        if (!App.user.isClient) {
            me.fieldsHideEdit = ['quantity'];
        }
        if (App.user.isClient) {
            me.textNew = t('Insert Voucher');
            me.buttonNewWidth = 150;
        }
        me.items = [{
            xtype: 'moneyfield',
            name: 'credit',
            fieldLabel: t('credit'),
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            name: 'id_plan',
            fieldLabel: t('Plan'),
            xtype: 'plancombo',
            hidden: !App.user.isAdmin,
            allowBlank: !App.user.isAdmin
        }, {
            xtype: 'languagecombo',
            name: 'language',
            fieldLabel: t('language'),
            hidden: !App.user.isAdmin,
            allowBlank: !App.user.isAdmin
        }, {
            name: 'prefix_local',
            fieldLabel: t('prefixlocal'),
            value: App.user.base_country == 'BRL' ? '0/55,*/5511/8,*/5511/9' : App.user.base_country == 'ARG' ? '0/54,*/5411/8,15/54911/10,16/54911/10' : '',
            emptyText: 'match / replace / length',
            hidden: !App.user.isAdmin,
            allowBlank: true
        }, {
            xtype: 'numberfield',
            name: 'quantity',
            fieldLabel: t('Quantity'),
            hidden: !App.user.isAdmin,
            allowBlank: !App.user.isAdmin,
            value: 10
        }, {
            name: 'tag',
            fieldLabel: t('description'),
            hidden: App.user.isClient,
            allowBlank: true
        }, {
            xtype: 'numberfield',
            name: 'voucher',
            fieldLabel: t('voucher'),
            value: '',
            maxLength: 6,
            minLength: 6,
            hidden: !App.user.isClient,
            allowBlank: !App.user.isClient
        }];
        me.callParent(arguments);
    }
});