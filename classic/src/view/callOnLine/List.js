/**
 * Classe que define a lista de "CallOnLine"
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
 * 10/08/2012
 */
Ext.define('MBilling.view.callOnLine.List', {
    extend: 'Ext.ux.grid.Panel',
    requires: ['MBilling.view.callOnLine.SpyCall'],
    alias: 'widget.callonlinelist',
    store: 'CallOnLine',
    fieldSearch: 'idUser.username',
    refreshTime: 15,
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.buttonUpdateLot = false;
        me.allowCreate = false;
        me.allowUpdate = false;
        me.allowDelete = !App.user.isClient;
        me.buttonsTbar = [{
            xtype: 'tbtext',
            reference: 'tbTextTotal'
        }];
        me.textDelete = t('Hangup Call'),
            me.buttonDeleteWidth = 140,
            me.refreshTime = (localStorage && localStorage.getItem('callonlinerefresh')) || me.refreshTime;
        me.extraButtons = [{
            text: t('Spy') + ' ' + t('call'),
            iconCls: 'call',
            handler: 'onSpyCall',
            width: 130,
            disabled: false
        }, {
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
                        localStorage.setItem('callonlinerefresh', field.value);
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
            header: t('Channel'),
            dataIndex: 'canal',
            hidden: true,
            flex: 3
        }, {
            header: t('Sip Account'),
            dataIndex: 'sip_account',
            flex: 3
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 3
        }, {
            header: t('credit'),
            dataIndex: 'idUsercredit',
            filter: {
                type: 'int',
                field: 'idUser.credit'
            },
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            header: t('number'),
            dataIndex: 'ndiscado',
            flex: 3
        }, {
            header: t('status'),
            dataIndex: 'status',
            filter: {
                type: 'string',
                field: 'status'
            },
            flex: 2
        }, {
            header: t('Codec'),
            dataIndex: 'codec',
            flex: 2
        }, {
            header: t('duration'),
            dataIndex: 'duration',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 2
        }, {
            header: t('trunk'),
            dataIndex: 'tronco',
            flex: 4,
            hidden: !App.user.isAdmin,
            hideable: App.user.isAdmin
        }, {
            header: t('Server'),
            dataIndex: 'server',
            flex: 3,
            hidden: !window.slave || !App.user.isAdmin,
            hideable: App.user.isAdmin
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
Ext.define('MBilling.view.callOnLine.List2', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.callonlinelist2',
    store: 'CallOnLine',
    fieldSearch: 'username',
    refreshTime: 10,
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.buttonUpdateLot = false;
        me.allowCreate = false;
        me.buttonCleanFilter = false;
        me.allowUpdate = false;
        me.allowDelete = false;
        me.refreshTime = (localStorage && localStorage.getItem('callonlinerefresh')) || me.refreshTime;
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
                        localStorage.setItem('callonlinerefresh', field.value);
                    };
                }
            }
        }];
        me.columns = [{
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 2
        }, {
            header: t('Sip Account'),
            dataIndex: 'canal',
            flex: 3,
            hidden: true,
            hideable: true
        }, {
            header: t('number'),
            dataIndex: 'ndiscado',
            flex: 3
        }, {
            header: t('status'),
            dataIndex: 'status',
            filter: {
                type: 'string',
                field: 'status'
            },
            flex: 2
        }, {
            header: t('duration'),
            dataIndex: 'duration',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 2
        }, {
            header: t('trunk'),
            dataIndex: 'tronco',
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
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