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
Ext.define('MBilling.view.sendCreditRates.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.sendcreditrateslist',
    store: 'SendCreditRates',
    fieldSearch: 'idProduct.operator_name',
    comparisonfilter: 'ct',
    initComponent: function() {
        var me = this;
        me.buttonUpdateLotCallShopRate = true;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.extraButtons = [{
            text: t('Reset') + ' ' + t('Sell price'),
            iconCls: 'icon-chart-column',
            width: 130,
            handler: 'onResetPrice',
            disabled: false
        }, {
            text: t('Reset') + ' ' + t('Retail price'),
            iconCls: 'icon-chart-column',
            width: 130,
            handler: 'onResetRetail',
            disabled: false
        }];
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductoperator_name}',
            header: t('Operator Name'),
            dataIndex: 'idProductoperator_name',
            filter: {
                type: 'string',
                field: 'idProduct.operator_name'
            },
            flex: 5
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductcountry}',
            header: t('Country'),
            dataIndex: 'idProductcountry',
            filter: {
                type: 'string',
                field: 'idProduct.country'
            },
            flex: 4
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductcurrency_dest}',
            header: t('Currency destination'),
            dataIndex: 'idProductcurrency_dest',
            filter: {
                type: 'string',
                field: 'idProduct.currency_dest'
            },
            flex: 3
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductproduct}',
            header: t('Product'),
            dataIndex: 'idProductproduct',
            filter: {
                type: 'string',
                field: 'idProduct.product'
            },
            flex: 2
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductcurrency_orig}',
            header: t('Currency Origin'),
            dataIndex: 'idProductcurrency_orig',
            filter: {
                type: 'string',
                field: 'idProduct.currency_orig'
            },
            flex: 3
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProductwholesale_price}',
            header: t('Wholesale Price'),
            dataIndex: 'idProductwholesale_price',
            filter: {
                type: 'string',
                field: 'idProduct.wholesale_price'
            },
            flex: 2
        }, {
            header: t('Sell Price'),
            dataIndex: 'sell_price',
            flex: 2
        }]
        me.callParent(arguments);
    }
});