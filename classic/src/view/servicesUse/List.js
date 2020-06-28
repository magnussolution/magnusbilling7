/**
 * Classe que define a lista de "servicesUse"
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
 * 24/09/2017
 */
Ext.define('MBilling.view.servicesUse.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.servicesuselist',
    store: 'ServicesUse',
    initComponent: function() {
        var me = this;
        me.buttonUpdateLot = false;
        me.buttonPrint = false;
        me.buttonCsv = false;
        me.buttonNewHeight = App.user.isAdmin ? 25 : 50,
            me.textNew = App.user.isAdmin ? t('Add New Service') : '<b><font color=green>' + t('Buy New Service') + '</font></b>';
        me.buttonNewWidth = 175;
        me.extraButtons = [{
            text: '<font color=red>' + t('Cancel Service') + '</font>',
            handler: 'onCancelService',
            disabled: true,
            iconCls: 'buycredit',
            width: 170,
            hidden: !me.allowDelete,
            reference: 'cancelService'
        }, {
            text: '<font color=blue>' + t('Pay') + ' ' + t('services') + ' ' + t('pendings') + '</font>',
            handler: 'onPayServiceLink',
            disabled: true,
            iconCls: 'buycredit',
            width: 190,
            reference: 'payService'
        }];
        me.allowDelete = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Services'),
            dataIndex: 'idServicesname',
            flex: 5
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('monthpayed'),
            dataIndex: 'month_payed',
            flex: 2
        }, {
            header: t('Price'),
            dataIndex: 'idServicesprice',
            renderer: Helper.Util.formatMoneyDecimal2,
            flex: 2
        }, {
            header: t('Active'),
            dataIndex: 'status',
            renderer: Helper.Util.formatBooleanActive,
            filter: {
                type: 'list',
                options: [
                    [1, t('active')],
                    [2, t('pending')],
                    [0, t('inactive')]
                ]
            },
            flex: 2
        }, {
            header: t('reservationdate'),
            renderer: Helper.Util.formatDateTime,
            dataIndex: 'reservationdate',
            flex: 5
        }, {
            header: t('releasedate'),
            renderer: Helper.Util.formatDateTime,
            dataIndex: 'releasedate',
            flex: 5
        }]
        me.callParent(arguments);
    }
});