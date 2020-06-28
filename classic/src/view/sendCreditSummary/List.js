/**
 * Classe que define a lista de "Callerid"
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
 * 19/09/2012
 */
Ext.define('MBilling.view.sendCreditSummary.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.sendcreditsummarylist',
    store: 'SendCreditSummary',
    initComponent: function() {
        var me = this;
        me.extraButtons = [{
            emptyText: t('From Day'),
            xtype: 'searchfield',
            fieldFilter: 'date',
            filterOnClick: me.filterFieldOnClick,
            store: me.store,
            comparison: 'gt',
            type: 'date'
        }, {
            emptyText: t('To Day'),
            xtype: 'searchfield',
            fieldFilter: 'date',
            filterOnClick: me.filterFieldOnClick,
            store: me.store,
            comparison: 'lt',
            type: 'date'
        }];
        me.buttonCsv = false;
        me.buttonPrint = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('day'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            dataIndex: 'day',
            menuDisabled: true,
            flex: 3
        }, {
            header: t('service'),
            dataIndex: 'service',
            flex: 5
        }, {
            header: t('Total cost'),
            dataIndex: 'total_cost',
            flex: 5,
            renderer: Helper.Util.formatMoneyDecimal2
        }, {
            header: t('Total sale'),
            dataIndex: 'total_sale',
            flex: 5,
            renderer: Helper.Util.formatMoneyDecimal2
        }, {
            header: t('Earned'),
            dataIndex: 'earned',
            flex: 5,
            renderer: Helper.Util.formatMoneyDecimal2
        }]
        me.callParent(arguments);
    }
});