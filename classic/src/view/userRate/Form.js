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
Ext.define('MBilling.view.userRate.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.userrateform',
    initComponent: function() {
        var me = this;
        me.items = [{
            fieldLabel: t('User'),
            name: 'id_user',
            xtype: !App.user.isAdmin ? 'textfield' : 'userlookup',
            ownerForm: me,
            hidden: !App.user.isAdmin,
            allowBlank: !App.user.isAdmin
        }, {
            fieldLabel: t('Destination'),
            name: 'id_prefix',
            xtype: 'prefixlookup',
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
            hidden: App.user.isClient
        }, {
            xtype: 'numberfield',
            name: 'billingblock',
            fieldLabel: t('billingblock'),
            hidden: App.user.isClient
        }];
        me.callParent(arguments);
    }
});