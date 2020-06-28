/**
 * Classe que define a lista de "CallSummary"
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
Ext.define('MBilling.view.callSummaryDayAgent.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.callsummarydayagentlist',
    store: 'CallSummaryDayAgent',
    initComponent: function() {
        var me = this;
        me.fieldSearch = App.user.isAdmin ? 'idUser.username' : '';
        me.buttonImportCsv = false
        me.buttonUpdateLot = false;
        me.allowCreate = false;
        me.allowUpdate = false;
        me.allowDelete = false;
        me.columns = [{
            header: t('day'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            dataIndex: 'day',
            filter: {
                type: 'date',
                field: 'day'
            },
            flex: 3
        }, {
            header: t('Agent'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            menuDisabled: true,
            header: t('min_sessiontime'),
            dataIndex: 'sessiontime',
            flex: 2
        }, {
            header: t('aloc_all_calls'),
            dataIndex: 'aloc_all_calls',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 3
        }, {
            header: t('Answered calls'),
            dataIndex: 'nbcall',
            flex: 3
        }, {
            header: t('Failed calls'),
            dataIndex: 'nbcall_fail',
            flex: 3
        }, {
            header: t('buycost'),
            dataIndex: App.user.isAdmin ? 'buycost' : 'sessionbill',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 3,
            hidden: App.user.isClient,
            hideable: App.user.isAdmin
        }, {
            header: t('sessionbill'),
            dataIndex: App.user.isAdmin ? 'sessionbill' : 'agent_bill',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 3
        }, {
            header: t('markup'),
            dataIndex: App.user.isAdmin ? 'lucro' : 'agent_lucro',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 3,
            hidden: App.user.isClient,
            hideable: App.user.isAdmin
        }, {
            header: t('ASR'),
            dataIndex: 'asr',
            renderer: Helper.Util.formatPorcente,
            flex: 3,
            hidden: App.user.isClient,
            hideable: App.user.isAdmin
        }];
        me.callParent(arguments);
    }
});