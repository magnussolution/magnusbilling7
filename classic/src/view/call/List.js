/**
 * Classe que define a lista de "Call"
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
Ext.define('MBilling.view.call.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.calllist',
    store: 'Call',
    standardSubmit: true,
    initComponent: function() {
        var me = this;
        me.fieldSearch = App.user.isAdmin ? 'idUser.username' : '';
        me.grupableColumns = false;
        me.paginationButton = ['-', {
            xtype: 'button',
            width: '120',
            text: t('Show Total'),
            handler: 'onShowTotal',
            hidden: !App.user.isAdmin,
            cls: 'x-btn-text-icon details'
        }, {
            xtype: 'tbtext',
            reference: 'tbTextTotal'
        }];
        me.extraButtons = [{
            text: t('Download rec'),
            iconCls: 'call',
            handler: 'onRecordCall',
            disabled: false,
            width: 130
        }];
        me.buttonUpdateLot = App.user.isAdmin;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            xtype: 'actioncolumn',
            width: 26,
            sortable: false,
            menuDisabled: true,
            header: t(''),
            dataIndex: 'id',
            items: [{
                iconCls: 'icon-play',
                tooltip: t('Download Rec'),
                handler: 'onDownloadClick'
            }],
            hidden: App.user.show_playicon_cdr == 0,
            hideable: true
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'starttime',
            flex: 4,
            hidden: window.isTablet
        }, {
            header: t('Sip Account'),
            dataIndex: 'src',
            flex: 2,
            hidden: window.isTablet
        }, {
            header: t('CallerId'),
            dataIndex: 'callerid',
            flex: 2,
            hidden: window.isTablet
        }, {
            header: t('number'),
            dataIndex: 'calledstation',
            flex: 3
        }, {
            header: t('destination'),
            dataIndex: 'idPrefixdestination',
            filter: {
                type: 'string',
                field: 'idPrefix.destination'
            },
            flex: 4,
            hidden: window.isTablet
        }, {
            header: t('sessiontime'),
            dataIndex: 'sessiontime',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 2
        }, {
            header: t('Real') + ' ' + t('sessiontime'),
            dataIndex: 'real_sessiontime',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 3,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 2,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            xtype: 'templatecolumn',
            tpl: '{idTrunktrunkcode}',
            header: t('trunk'),
            dataIndex: 'id_trunk',
            comboFilter: 'trunkcombo',
            header: t('trunk'),
            flex: 3,
            hidden: App.user.isClient || App.user.isAgent || window.isTablet,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('type'),
            dataIndex: 'sipiax',
            renderer: Helper.Util.formatCallType,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [0, t('standard')],
                    [1, t('sipcall')],
                    [2, t('did')],
                    [3, t('didvoip')],
                    [4, t('callback')],
                    [5, t('callcenter')],
                    [6, 'sms'],
                    [7, t('transfer')],
                    [8, t('queue')],
                    [9, t('ivr')]
                ]
            },
            hidden: window.isTablet
        }, { //oculta para cliente e revendedores
            header: t('buycost'),
            dataIndex: 'buycost',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 3,
            hidden: App.user.isClient || App.user.isAgent,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('sessionbill'),
            dataIndex: 'sessionbill',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 3,
            hidden: App.user.isAgent || App.user.isClientAgent,
            hideable: !App.user.isAgent && !App.user.isClientAgent
        }, { //mostra o preço de compra de revendedor
            header: t('buycost'),
            dataIndex: 'sessionbill',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 3,
            hidden: !App.user.isAgent,
            hideable: App.user.isAgent
        }, { //mostra o preço de venda de revendedor
            header: t('sessionbill'),
            dataIndex: 'agent_bill',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 3,
            hidden: !App.user.isAgent,
            hideable: App.user.isAgent
        }, { //mostra o preço de venda para clientes de revendedor
            header: t('sessionbill'),
            dataIndex: 'agent_bill',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 3,
            hidden: !App.user.isClientAgent,
            hideable: App.user.isClientAgent
        }, {
            header: t('uniqueid'),
            dataIndex: 'uniqueid',
            flex: 3,
            hidden: true,
            hideable: true
        }, {
            xtype: 'templatecolumn',
            tpl: '{idCampaignname}',
            header: t('Campaign'),
            dataIndex: 'id_campaign',
            comboFilter: 'campaigncombo',
            flex: 3,
            hidden: true,
            hideable: !App.user.isClient
        }, {
            xtype: 'templatecolumn',
            tpl: '{idServername}',
            header: t('Server'),
            dataIndex: 'id_server',
            comboFilter: 'serverscombo',
            flex: 3,
            hidden: true,
            hideable: App.user.isAdmin
        }]
        me.callParent(arguments);
    }
});