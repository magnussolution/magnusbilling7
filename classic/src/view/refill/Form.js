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
 * 25/06/2012
 */
Ext.define('MBilling.view.refill.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.refillform',
    fieldsHideUpdateLot: ['id_user'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,00',
            name: 'credit',
            fieldLabel: t('credit'),
            readOnly: App.user.isClient
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('description'),
            readOnly: App.user.isClient
        }, {
            xtype: 'yesnocombo',
            name: 'payment',
            fieldLabel: t('add_payment'),
            hidden: App.user.isClient
        }, {
            name: 'invoice_number',
            fieldLabel: t('Invoice') + ' ' + t('number'),
            hidden: !window.invoice,
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});