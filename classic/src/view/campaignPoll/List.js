/**
 * Classe que define a lista de "Campaign"
 *
 * MagnusSolution.com <info@magnussolution.com>
 * 19/09/2012
 */
Ext.define('MBilling.view.campaignPoll.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.campaignpolllist',
    store: 'CampaignPoll',
    initComponent: function() {
        var me = this;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('name'),
            dataIndex: 'name',
            flex: 4
        }, {
            xtype: 'templatecolumn',
            tpl: '{idCampaignname}',
            header: t('campaign'),
            dataIndex: 'id_campaign',
            comboFilter: 'campaigncombo',
            flex: 4
        }, {
            header: t('description'),
            dataIndex: 'description',
            flex: 4
        }]
        me.callParent(arguments);
    }
});