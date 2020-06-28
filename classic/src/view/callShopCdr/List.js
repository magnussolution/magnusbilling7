/**
 * Classe que define a lista de "CallShopCdr"
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
Ext.define('MBilling.view.callShopCdr.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.callshopcdrlist',
    store: 'CallShopCdr',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.buttonUpdateLot = false;
        me.allowUpdate = true;
        me.allowDelete = false;
        me.allowCreate = false;
        me.allowUpdate = false
        me.allowPrint = false;
        me.columns = [{
            header: t('cabina'),
            dataIndex: 'cabina',
            filter: {
                type: 'string'
            },
            flex: 2
        }, {
            header: t('number'),
            dataIndex: 'calledstation',
            filter: {
                type: 'string'
            },
            flex: 3
        }, {
            dataIndex: 'destination',
            header: t('destination'),
            flex: 3
        }, {
            header: 'Paid',
            dataIndex: 'status',
            renderer: Helper.Util.formattyyesno,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            }
        }, {
            header: t('buyrate'),
            dataIndex: 'buycost',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            header: t('rateinitial'),
            dataIndex: 'price',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            header: t('markup'),
            dataIndex: 'markup',
            renderer: Ext.util.Format.numberRenderer('0.00 %'),
            flex: 2
        }, {
            header: t('sessiontime'),
            dataIndex: 'sessiontime',
            renderer: Helper.Util.formatsecondsToTime,
            flex: 2
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 4
        }]
        me.callParent(arguments);
    }
});