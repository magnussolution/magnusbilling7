/**
 * Classe que define a lista de "Rate"
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
 * 30/07/2012
 */
Ext.define('MBilling.view.rate.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.ratelist',
    store: 'Rate',
    fieldSearch: 'idPrefix.prefix',
    initComponent: function() {
        var me = this;
        me.buttonImportCsv = !App.user.isClient,
            me.columns = [{
                header: t('Id'),
                dataIndex: 'id',
                flex: 1,
                hidden: true,
                hideable: App.user.isAdmin
            }, {
                header: t('prefix'),
                dataIndex: 'idPrefixprefix',
                filter: {
                    type: 'string',
                    field: 'idPrefix.prefix'
                },
                flex: window.isTablet ? 2 : 3
            }, {
                dataIndex: 'idPrefixdestination',
                header: t('destination'),
                filter: {
                    type: 'string',
                    field: 'idPrefix.destination'
                },
                flex: window.isTablet ? 2 : 3
            }, {
                header: t('rateinitial'),
                dataIndex: 'rateinitial',
                renderer: Helper.Util.formatMoneyDecimal4,
                flex: 2
            }, {
                header: t('initblock'),
                dataIndex: 'initblock',
                hidden: window.isTablet,
                flex: 2
            }, {
                header: t('billingblock'),
                dataIndex: 'billingblock',
                hidden: window.isTablet,
                flex: 2
            }, {
                xtype: 'templatecolumn',
                tpl: '{idTrunkGroupname}',
                header: t('Trunk Groups'),
                dataIndex: 'id_trunk_group',
                comboFilter: 'trunkgroupcombo',
                flex: 3,
                hidden: !App.user.isAdmin,
                hideable: App.user.isAdmin
            }, {
                xtype: 'templatecolumn',
                tpl: '{idPlanname}',
                header: t('plan'),
                dataIndex: 'id_plan',
                comboFilter: 'plancombo',
                flex: 3
            }, {
                header: t('includeinpackage'),
                dataIndex: 'package_offer',
                hidden: true,
                hideable: App.user.isAdmin,
                flex: 1
            }, {
                header: t('status'),
                dataIndex: 'status',
                hidden: true,
                hideable: App.user.isAdmin,
                flex: 2,
                renderer: Helper.Util.formatBooleanActive,
                filter: {
                    type: 'list',
                    options: [
                        [1, t('active')],
                        [0, t('inactive')]
                    ]
                }
            }]
        me.callParent(arguments);
    }
});