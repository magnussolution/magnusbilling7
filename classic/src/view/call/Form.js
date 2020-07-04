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
 * 17/08/2012
 */
Ext.define('MBilling.view.call.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.callform',
    fieldsHideUpdateLot: ['calledstation'],
    initComponent: function() {
        var me = this;
        me.extraButtons = [{
            text: '<font color=green>' + t('Download rec') + '</font>',
            iconCls: 'call',
            handler: 'onRecordCall',
            width: 130,
            height: 30,
            hidden: !window.isTablet
        }];
        me.defaults = {
            readOnly: true,
            allowBlank: true
        };
        me.items = [{
            xtype: 'datetimefield',
            name: 'starttime',
            fieldLabel: t('date'),
            format: 'Y-m-d H:i:s'
        }, {
            name: 'src',
            fieldLabel: t('Sip Account')
        }, {
            name: 'callerid',
            fieldLabel: t('Callerid')
        }, {
            name: 'calledstation',
            fieldLabel: t('number')
        }, {
            name: 'idPrefixdestination',
            fieldLabel: t('destination')
        }, {
            name: 'idUserusername',
            fieldLabel: t('user')
        }, {
            name: 'idTrunktrunkcode',
            fieldLabel: t('trunk')
        }, {
            name: 'sessiontime',
            fieldLabel: t('sessiontime') + ' Sec',
            readOnly: App.user.isClient || App.user.isAgent,
            hidden: App.user.isClient || App.user.isAgent
        }, {
            xtype: 'moneyfield',
            name: 'buycost',
            fieldLabel: t('buycost'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            hidden: App.user.isClient || App.user.isAgent,
            readOnly: !App.user.isAdmin
        }, {
            xtype: 'moneyfield',
            name: 'sessionbill',
            fieldLabel: t('sessionbill'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            readOnly: App.user.isClient || App.user.isAgent,
            hidden: App.user.isAgent || App.user.isClientAgent
        }, {
            xtype: 'moneyfield',
            name: 'agent_bill',
            fieldLabel: t('sessionbill'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            readOnly: App.user.isAgent,
            hidden: !App.user.isAgent && !App.user.isClientAgent
        }, {
            name: 'uniqueid',
            fieldLabel: t('Uniqueid')
        }];
        me.callParent(arguments);
    }
});