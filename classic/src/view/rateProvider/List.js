/**
 * Classe que define a lista de "RateCallshop"
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
Ext.define('MBilling.view.rateProvider.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.rateproviderlist',
    store: 'RateProvider',
    fieldSearch: 'idPrefix.prefix',
    initComponent: function() {
        var me = this;
        me.buttonImportCsv = !App.user.isClient;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Provider'),
            dataIndex: 'idProviderprovider_name',
            filter: {
                type: 'string',
                field: 'idProvider.provider_name'
            },
            flex: 3
        }, {
            header: t('prefix'),
            dataIndex: 'idPrefixprefix',
            filter: {
                type: 'string',
                field: 'idPrefix.prefix'
            },
            flex: 3
        }, {
            dataIndex: 'idPrefixdestination',
            header: t('destination'),
            filter: {
                type: 'string',
                field: 'idPrefix.destination'
            },
            flex: 4
        }, {
            header: t('buyrate'),
            dataIndex: 'buyrate',
            renderer: Helper.Util.formatMoneyDecimal4,
            flex: 2
        }, {
            header: t('buyrateinitblock'),
            dataIndex: 'buyrateinitblock',
            flex: 2
        }, {
            header: t('buyrateincrement'),
            dataIndex: 'buyrateincrement',
            flex: 2
        }]
        me.callParent(arguments);
    }
});