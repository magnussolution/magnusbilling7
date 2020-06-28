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
Ext.define('MBilling.view.callFailed.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.callfailedlist',
    store: 'CallFailed',
    initComponent: function() {
        var me = this;
        me.fieldSearch = App.user.isAdmin ? 'calledstation' : '';
        me.buttonUpdateLot = false;
        me.allowCreate = false;
        me.grupableColumns = false;
        me.extraButtons = [{
            text: t('Call Details'),
            glyph: icons.info,
            handler: 'onCallDetails',
            disabled: false,
            width: 130
        }];
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'starttime',
            flex: 3
        }, {
            header: t('Sip Account'),
            dataIndex: 'src',
            flex: 3
        }, {
            header: t('CallerId'),
            dataIndex: 'callerid',
            flex: 3,
            hidden: true,
            hideable: true
        }, {
            header: t('number'),
            dataIndex: 'calledstation',
            flex: 3
        }, {
            header: t('destination'),
            dataIndex: 'idPrefixdestination',
            flex: 4
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
            flex: 4,
            hidden: App.user.isClient || App.user.isAgent,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('status'),
            dataIndex: 'terminatecauseid',
            renderer: Helper.Util.formatDialStatus,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [1, t('answer')],
                    [2, t('busy')],
                    [3, t('no') + ' ' + t('answer')],
                    [4, t('cancelcall')],
                    [5, 'congestion'],
                    [6, 'chanunavail'],
                    [7, 'dontcall'],
                    [8, 'torture'],
                    [9, 'invalidargs']
                ]
            }
        }, {
            header: t('HangupCause'),
            dataIndex: 'hangupcause',
            renderer: Helper.Util.formatHangupCause,
            hidden: !window.dialC,
            flex: 3
        }, {
            header: t('uniqueid'),
            dataIndex: 'uniqueid',
            flex: 3,
            hidden: true,
            hideable: true
        }, {
            xtype: 'templatecolumn',
            tpl: '{idServername}',
            header: t('Server'),
            dataIndex: 'id_server',
            comboFilter: 'serverscombo',
            flex: 3,
            hidden: !App.user.isAdmin
        }]
        me.callParent(arguments);
    }
});