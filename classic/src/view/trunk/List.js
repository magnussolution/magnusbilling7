/**
 * Classe que define a lista de "Trunk"
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
 * 25/06/2012
 */
Ext.define('MBilling.view.trunk.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.trunklist',
    store: 'Trunk',
    fieldSearch: 'trunkcode',
    initComponent: function() {
        var me = this;
        me.columns = me.columns || [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('trunkcode'),
            dataIndex: 'trunkcode',
            flex: 3
        }, {
            header: t('add_prefix'),
            dataIndex: 'trunkprefix',
            flex: 2
        }, {
            header: t('remove_prefix'),
            dataIndex: 'removeprefix',
            flex: 2
        }, {
            header: t('host'),
            dataIndex: 'host',
            flex: 2
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProviderprovider_name}',
            header: t('provider'),
            dataIndex: 'id_provider',
            comboFilter: 'providercombo',
            flex: 2
        }, {
            header: t('secondusedreal'),
            renderer: Helper.Util.formatsecondsToTime,
            dataIndex: 'secondusedreal',
            flex: 3
        }, {
            header: t('status'),
            dataIndex: 'status',
            renderer: Helper.Util.formatBooleanActive,
            comboFilter: 'booleancombo',
            flex: 1,
            filter: {
                type: 'list',
                options: [
                    [1, t('active')],
                    [0, t('inactive')]
                ]
            }
        }, {
            header: t('creationdate'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'creationdate',
            flex: 3
        }];
        me.callParent(arguments);
    }
});