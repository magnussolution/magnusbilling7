/**
 * Classe que define a lista de "Refill"
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
Ext.define('MBilling.view.refill.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.refilllist',
    store: 'Refill',
    fieldSearch: 'idUser.username',
    initComponent: function() {
        var me = this;
        me.buttonsTbar = [{
            xtype: 'tbtext',
            reference: 'tbTextTotal'
        }];
        if (App.user.isAdmin && me.buttonCleanFilter) {
            me.extraButtons = [{
                text: t('charts'),
                iconCls: 'icon-chart-column',
                handler: 'onChart',
                reference: 'chart',
                disabled: true
            }, {
                text: t('Invoice'),
                glyph: me.glyphPrint,
                handler: 'onInvoice',
                reference: 'invoice',
                hidden: !window.invoice,
                disabled: true
            }];
        }
        if (App.user.isClient) {
            me.extraButtons = [{
                text: t('Invoice'),
                glyph: me.glyphPrint,
                handler: 'onInvoice',
                reference: 'invoice',
                hidden: !window.invoice,
                disabled: true
            }];
        }
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
            renderer: Helper.Util.formatMoneyDecimal2,
            flex: 2
        }, {
            header: t('description'),
            dataIndex: 'description',
            flex: 5,
            hidden: window.isTablet
        }, {
            header: t('payment'),
            dataIndex: 'payment',
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            flex: 2
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 4,
            hidden: window.isTablet
        }];
        me.callParent(arguments);
    }
});