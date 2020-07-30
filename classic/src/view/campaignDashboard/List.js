/**
 * Classe que define o form de "Campaign"
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
 * 28/07/2020
 */
Ext.define('MBilling.view.campaignDashboard.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.campaigndashboardlist',
    store: 'CampaignDashBoard',
    refreshTime: 5,
    fieldSearch: 'name',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.allowCreate = false;
        me.allowDelete = false;
        me.buttonCleanFilter = false;
        me.buttonUpdateLot = false;
        me.refreshTime = (localStorage && localStorage.getItem('campaignDashBoardRefresh')) || me.refreshTime;
        me.extraButtons = [{
            xtype: 'numberfield',
            field: 'jmlhBrg',
            fieldLabel: t('Refresh rate'),
            editable: false,
            minValue: 5,
            labelWidth: 90,
            width: 150,
            selectOnFocus: true,
            allowDecimals: true,
            decimalPrecision: 2,
            value: me.refreshTime,
            listeners: {
                change: function(field) {
                    if (field.value > 0) {
                        me.refreshTime = field.value;
                        localStorage.setItem('campaignDashBoardRefresh', field.value);
                    };
                }
            }
        }];
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Campaign'),
            dataIndex: 'name',
            flex: 4
        }, {
            header: t('Calls Being Placed'),
            dataIndex: 'callsPlaced',
            flex: 4
        }, {
            header: t('Calls Ringing'),
            dataIndex: 'callsringing',
            flex: 4
        }, {
            header: t('Calls in Transfer'),
            dataIndex: 'callsInTransfer',
            flex: 4
        }, {
            header: t('Calls Transfered'),
            dataIndex: 'callsTransfered',
            flex: 4
        }, {
            header: t('Total Numbers'),
            dataIndex: 'callsTotalNumbers',
            flex: 4
        }, {
            header: t('Diales Today'),
            dataIndex: 'callsDialedtoday',
            flex: 4
        }, {
            header: t('Leads Remaining to Dial'),
            dataIndex: 'callsRemaningToDial',
            flex: 4
        }];
        me.sessionLoad = Ext.create('Ext.util.DelayedTask', function() {
            me.store.load();
        }, me);
        me.callParent(arguments);
        me.store.on('load', me.onLoadStore, me);
    },
    onLoadStore: function() {
        var me = this;
        me.onDeactivateModule();
        me.onActivateModule();
    },
    onRender: function() {
        var me = this;
        if (Ext.isObject(me.module)) {
            me.module.on('activate', me.onActivateModule, me);
            me.module.on('deactivate', me.onDeactivateModule, me);
            me.module.on('close', me.onCloseModule, me);
        };
        me.callParent(arguments);
    },
    onActivateModule: function() {
        this.sessionLoad && this.sessionLoad.delay(this.refreshTime * 1000);
    },
    onDeactivateModule: function() {
        this.sessionLoad && this.sessionLoad.cancel();
    },
    onCloseModule: function() {
        this.onDeactivateModule();
        this.sessionLoad = null;
    }
});