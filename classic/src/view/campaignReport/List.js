/**
 * Classe que define o list de "campaignReport"
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
Ext.define('MBilling.view.campaignReport.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.campaignreportlist',
    store: 'CampaignReport',
    fieldSearch: 'idCampaignname',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.allowCreate = false;
        me.allowDelete = false;
        me.buttonCleanFilter = false;
        me.buttonUpdateLot = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Campaign'),
            dataIndex: 'idCampaignname',
            filter: {
                type: 'string',
                field: 'idCampaign.name'
            },
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
            header: t('status'),
            dataIndex: 'status',
            renderer: Helper.Util.formatBooleanActive,
            comboRelated: 'statuscombo',
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [1, t('Active')],
                    [0, t('Inactivated')],
                    [2, t('Pending')],
                    [3, t('Sent')],
                    [4, t('Blocked')],
                    [5, t('AMD')]
                ]
            }
        }, {
            header: t('Date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'unix_timestamp',
            flex: 4,
            hidden: window.isTablet
        }]
        me.callParent(arguments);
    }
});