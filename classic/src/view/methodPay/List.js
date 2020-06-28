/**
 * Classe que define a lista de "MethodPay"
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
 * 04/07/2012
 */
Ext.define('MBilling.view.methodPay.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.methodpaylist',
    store: 'MethodPay',
    initComponent: function() {
        var me = this;
        me.buttonUpdateLot = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('paymentmethods'),
            dataIndex: 'payment_method',
            flex: 2
        }, {
            header: t('country'),
            dataIndex: 'country',
            flex: 2
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 2
        }, {
            header: t('active'),
            dataIndex: 'active',
            flex: 1,
            comboRelated: 'booleancombo',
            renderer: Helper.Util.formatBooleanActive,
            filter: {
                type: 'list',
                options: [
                    [1, t('active')],
                    [0, t('inactive')]
                ]
            }
        }];
        me.callParent(arguments);
    }
});