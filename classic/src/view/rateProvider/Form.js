/**
 * Classe que define o form de "RateCallshop"
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
 * 30/07/2012
 */
Ext.define('MBilling.view.rateProvider.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.rateproviderform',
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'id_provider',
            fieldLabel: t('Provider') + ' ' + t('Name'),
            xtype: 'providerlookup',
            ownerForm: me,
            allowBlank: false
        }, {
            name: 'id_prefix',
            fieldLabel: t('Destination'),
            xtype: 'prefixlookup',
            ownerForm: me,
            allowBlank: false
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            name: 'buyrate',
            fieldLabel: t('buyrate')
        }, {
            xtype: 'numberfield',
            name: 'buyrateinitblock',
            fieldLabel: t('buyrateinitblock'),
            value: 1,
            minValue: 1
        }, {
            xtype: 'numberfield',
            name: 'buyrateincrement',
            fieldLabel: t('buyrateincrement'),
            value: 1,
            minValue: 1
        }, {
            xtype: 'numberfield',
            name: 'minimal_time_buy',
            fieldLabel: t('Minimal time to buy'),
            value: 0,
            minValue: 0
        }];
        me.callParent(arguments);
    }
});