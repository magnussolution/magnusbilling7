/**
 * Classe que define a lista de "Voucher"
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
Ext.define('MBilling.view.voucher.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.voucherlist',
    store: 'Voucher',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
        me.buttonUpdateLot = false;
        me.allowUpdate = false;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 3,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('credit'),
            dataIndex: 'credit',
            renderer: Helper.Util.formatMoneyDecimal,
            filter: {
                type: 'int',
                field: 't.credit'
            },
            flex: 3
        }, {
            header: t('voucher'),
            dataIndex: 'voucher',
            flex: 5
        }, {
            header: t('description'),
            dataIndex: 'tag',
            flex: 3,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('usedate'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'usedate',
            flex: 4
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'creationdate',
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }];
        me.callParent(arguments);
    }
});