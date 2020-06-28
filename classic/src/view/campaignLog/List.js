/**
 * Classe que define a lista de "Campaign"
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
Ext.define('MBilling.view.campaignLog.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.campaignloglist',
    store: 'CampaignLog',
    initComponent: function() {
        var me = this;
        me.buttonUpdateLot = false;
        me.buttonNew = false;
        me.allowUpdate = false;
        me.allowDelete = !App.user.isClient;
        me.columns = [{
            header: t('Total gerado'),
            dataIndex: 'total',
            flex: 4
        }, {
            header: t('Loops'),
            dataIndex: 'loops',
            flex: 4
        }, {
            header: t('Total por tronco'),
            dataIndex: 'trunks',
            flex: 4
        }, {
            header: t('Campanhas'),
            dataIndex: 'campaigns',
            flex: 4
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 4
        }]
        me.callParent(arguments);
    }
});