/**
 * Classe que define o grafico de "call"
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
 * 13/02/2012
 */
Ext.define('MBilling.view.callOnlineChart.Chart', {
    extend: 'Ext.ux.panel.Chart',
    alias: 'widget.callonlinechartchart',
    controller: 'callsummaryperday',
    store: 'CallOnlineChart',
    fieldValue: ['total', 'answer'],
    fieldDescription: 'date',
    labelYLine: t('total') + ' / Min',
    labelXLine: t('Time'),
    reference: 'callonlinechartchart',
    defaultChart: 'line',
    btnShowColumn: false,
    btnShowBar: false,
    btnShowLine: true,
    btnShowPie: false,
    animate: true,
    btnShowLineHidden: true,
    radius: 1,
    hiddenButtonsCharts: true,
    insetPadding: 0,
    initComponent: function() {
        var me = this;
        me.rendererFieldValue = function(axis, label, layoutContext) {
            return layoutContext.renderer(label);
        };
        me.tbarChart = [{
            text: t('1') + ' ' + t('hour'),
            scope: me,
            handler: 'onPerMinute',
            value: '1'
        }, {
            text: t('6') + ' ' + t('hours'),
            scope: me,
            handler: 'onPerMinute',
            value: '6'
        }, {
            text: t('12') + ' ' + t('hours'),
            scope: me,
            handler: 'onPerMinute',
            value: '12'
        }, {
            text: t('1') + ' ' + t('day'),
            scope: me,
            handler: 'onPerMinute',
            value: '24'
        }, {
            text: t('2') + ' ' + t('days'),
            scope: me,
            handler: 'onPerMinute',
            value: '48'
        }, {
            text: t('3') + ' ' + t('days'),
            scope: me,
            handler: 'onPerMinute',
            value: '36'
        }, {
            text: t('1') + ' ' + t('week'),
            scope: me,
            handler: 'onPerMinute',
            value: '168'
        }];
        me.legend = {
            position: 'right',
            boxStrokeWidth: 0,
            labelFont: '12px Helvetica',
            renderer: me.rendererLegend
        };
        me.bbarChart = [{
            xtype: 'tbtext',
            itemId: 'tbTextSum'
        }];
        me.sessionLoad = Ext.create('Ext.util.DelayedTask', function() {
            me.store.load();
        }, me);
        me.callParent(arguments);
        me.store.on('load', me.onLoadStore, me);
    },
    onPerMinute: function(btn) {
        var me = this;
        me.store.setRemoteFilter(true);
        me.store.filter('hours', btn.value);
        me.store.load();
    },
    onLoadStore: function() {
        this.onActivateModule();
    },
    onActivateModule: function() {
        this.sessionLoad && this.sessionLoad.delay(30000);
    }
});