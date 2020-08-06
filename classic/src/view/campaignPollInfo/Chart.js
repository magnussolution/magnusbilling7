/**
 * Classe que define o grafico de "refill"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2020 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnussolution/magnusbilling7/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com>
 * 13/02/2012
 */
Ext.define('MBilling.view.campaignPollInfo.Chart', {
    extend: 'Ext.ux.panel.Chart',
    alias: 'widget.campaignpollinfochart',
    controller: 'campaignpollinfo',
    store: 'CampaignPollInfoChart',
    fieldValue: 'sumresposta',
    fieldDescription: 'resposta2',
    labelYLine: t('Count votes'),
    labelXLine: t('Result'),
    fieldLabel: t('Percentage'),
    initComponent: function() {
        var me = this,
            buttonsChart;
        if (window.newChartCampaignInfo) {
            me.fieldDescription = 'resposta_name';
        }
        me.bbarChart = [{
            xtype: 'tbtext',
            itemId: 'tbTextSum',
            reference: 'tbTextSum'
        }];
        me.store = Ext.data.StoreManager.lookup(me.store);
        me.store.setRemoteFilter(true);
        filters = me.list.filters.getFilterData();
        me.store.filter('filter', Ext.encode(filters));
        me.store.load({
            scope: me,
            callback: function() {
                if (me.store.getData().items[0]) me.sumData = me.store.getData().items[0].getData();
                if (window.newChartCampaignInfo) me.lookupReference('tbTextSum').setText(me.sumData.total_votos);
            }
        });
        me.callParent(arguments);
    }
});