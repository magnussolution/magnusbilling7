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
Ext.define('MBilling.view.campaignRestrictPhone.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.campaignrestrictphonelist',
    store: 'CampaignRestrictPhone',
    buttonImportCsv: true,
    initComponent: function() {
        var me = this;
        me.extraButtons = [{
            text: t('remove_duplicate'),
            iconCls: 'callshop',
            handler: 'deleteDuplicados',
            disabled: false
        }];
        me.buttonUpdateLot = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('number'),
            dataIndex: 'number',
            flex: 4
        }]
        me.callParent(arguments);
    }
});