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
Ext.define('MBilling.view.rateCallshop.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.ratecallshopform',
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'numberfield',
            name: 'dialprefix',
            fieldLabel: t('prefix')
        }, {
            name: 'destination',
            fieldLabel: t('destination')
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            name: 'buyrate',
            fieldLabel: t('rateinitial')
        }, {
            xtype: 'numberfield',
            name: 'minimo',
            value: 1,
            minValue: 1,
            fieldLabel: t('buyrateinitblock')
        }, {
            xtype: 'numberfield',
            name: 'block',
            value: 1,
            minValue: 1,
            fieldLabel: t('buyrateincrement')
        }, {
            xtype: 'numberfield',
            name: 'minimal_time_charge',
            value: 0,
            minValue: 0,
            fieldLabel: t('Minimal time to charge')
        }];
        me.callParent(arguments);
    }
});