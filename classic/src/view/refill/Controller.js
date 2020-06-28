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
 * 01/10/2013
 */
Ext.define('MBilling.view.refill.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.refill',
    aliasChart: 'refillchart',
    onPrint: function(btn) {
        var me = this;
        if (App.user.isClient) {
            var me = this,
                selected = me.list.getSelectionModel().getSelection()[0];
            if (me.list.getSelectionModel().getSelection().length == 1) {
                console.log(selected.data.description.indexOf("Send Credit "));
                if (selected.data.description.indexOf("Send Credit ") !== -1) {
                    url = 'index.php/transferToMobile/printRefill/?id=' + selected.get('id');
                    window.open(url);
                } else {
                    me.callParent(arguments);
                }
            } else {
                me.callParent(arguments);
            }
        } else {
            me.callParent(arguments);
        }
    },
    onInvoice: function(btn) {
        var me = this;
        var me = this,
            selected = me.list.getSelectionModel().getSelection()[0];
        if (me.list.getSelectionModel().getSelection().length == 1) {
            url = 'index.php/invoices/printInvoice/?id=' + selected.get('id');
            window.open(url);
        } else {
            Ext.ux.Alert.alert(me.titleError, t('Not available to multi refill.'), 'error');
        }
    },
    onSelectionChange: function(selModel, selections) {
        var me = this,
            btnInvoice = me.lookupReference('invoice');
        btnInvoice && btnInvoice.setDisabled(!selections.length);
        me.callParent(arguments);
    },
    onRenderModule: function() {
        var me = this,
            btnChart = me.lookupReference('chart');
        me.callParent(arguments);
        if (App.user.isAdmin) {
            me.store.on({
                scope: me,
                beforeload: function() {
                    btnChart.el && btnChart.disable();
                },
                load: function(store) {
                    btnChart.el && btnChart.enable();
                    me.onSetTotal();
                }
            });
        } else {
            me.store.on({
                scope: me,
                load: function(store) {
                    me.onSetTotal();
                }
            });
        }
    },
    onChart: function() {
        var me = this;
        me.chart = Ext.widget('window', {
            title: t('charts'),
            iconCls: 'icon-chart-column',
            layout: 'fit',
            autoShow: true,
            modal: true,
            resizable: false,
            width: window.isThemeNeptune ? 740 : 710,
            items: {
                xtype: me.aliasChart
            }
        });
        me.chart.down('#tbTextSum').setText('<b>' + t('total') + ': ' + App.user.currency + ' ' + me.sumData.sumCredit + '</b>');
    },
    onSetTotal: function(win) {
        var me = this;
        if (!me.store.getData().items[0]) return;
        me.sumData = me.store.getData().items[0].getData();
        if (!me.sumData) {
            return;
        }
        me.lookupReference('tbTextTotal') && me.lookupReference('tbTextTotal').setText('<b>' + t('Refill Total') + ': ' + App.user.currency + ' ' + me.sumData.sumCredit + '</b>');
    }
});