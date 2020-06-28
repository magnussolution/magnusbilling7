/**
 * Classe que define o form de "Rate"
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
Ext.define('MBilling.view.rate.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.rateform',
    fieldsHideUpdateLot: ['id_prefix'],
    labelWidthFields: 140,
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'id_plan',
            fieldLabel: 'Plan',
            xtype: 'planlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: false
        }, {
            name: 'id_prefix',
            fieldLabel: 'Destination',
            xtype: 'prefixlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: false
        }, {
            name: 'id_trunk_group',
            fieldLabel: t('Trunk Groups'),
            xtype: 'trunkgrouplookup',
            ownerForm: me,
            hidden: !App.user.isAdmin,
            allowBlank: !App.user.isAdmin
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            name: 'rateinitial',
            fieldLabel: t('rateinitial'),
            readOnly: App.user.isClient
        }, {
            xtype: 'numberfield',
            name: 'initblock',
            fieldLabel: t('initblock'),
            value: 1,
            minValue: 1,
            hidden: App.user.isClient
        }, {
            xtype: 'numberfield',
            name: 'billingblock',
            value: 1,
            minValue: 1,
            fieldLabel: t('billingblock'),
            hidden: App.user.isClient
        }, {
            xtype: 'numberfield',
            name: 'minimal_time_charge',
            fieldLabel: t('Minimal time to charge'),
            value: 0,
            minValue: 0,
            hidden: App.user.isClient
        }, {
            name: 'additional_grace',
            fieldLabel: t('additional_grace'),
            allowBlank: true,
            hidden: !App.user.isAdmin
        }, {
            xtype: 'noyescombo',
            name: 'package_offer',
            fieldLabel: t('includeinpackage'),
            hidden: !App.user.isAdmin,
            allowBlank: true
        }, {
            xtype: 'booleancombo',
            name: 'status',
            fieldLabel: t('status'),
            hidden: !App.user.isAdmin,
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});