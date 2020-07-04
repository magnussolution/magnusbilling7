/**
 * Classe que define o panel de "Boleto"
 *
 * MagnusSolution.com <info@magnussolution.com>
 * 17/08/2012
 */
Ext.define('MBilling.view.dashboard.Module', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboardmodule',
    autoShow: true,
    xtype: 'container',
    bodyPadding: 5,
    requires: ['MBilling.view.dashboard.Trunks', 'Ext.ux.layout.ResponsiveColumn', 'MBilling.view.dashboard.Network', 'MBilling.view.dashboard.NetworkChart', 'MBilling.view.dashboard.DashboardController'],
    layout: 'responsivecolumn',
    controller: 'dashboard',
    listeners: {
        render: 'onRenderModule'
    },
    initComponent: function() {
        var me = this;
        if (window.isTablet) {
            me.items = [{}]
        } else if (window.customDashboard && !App.user.isAdmin) {
            me.items = [{
                header: false,
                bodyPadding: 0,
                style: 'background-color:transparent;',
                bodyStyle: 'background-color:transparent !important;',
                html: '<br><iframe src="index.php/notice/read" scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:600px; margin-top:0px" allowTransparency="true"></iframe>',
                collapseDirection: 'bottom',
                collapsible: true,
                autoScroll: true,
                height: Ext.Element.getViewportHeight()
            }];
        } else {
            //verifica se a opção comprar credito e did estao ativos
            showDid = showBuy = false;
            if (!App.user.isAdmin) {
                Ext.each(App.user.menu, function(menuItem) {
                    if (!Ext.isEmpty(menuItem.rows)) {
                        Ext.each(menuItem.rows, function(item) {
                            if (item.module == 'didbuy') {
                                showDid = true;
                            }
                            if (item.module == 'buycredit') {
                                showBuy = true;
                            }
                        }, me);
                    }
                }, me);
                if (App.user.social_media_network.length > 10) {
                    facebookhtml = '<br><iframe src="' + App.user.social_media_network + '" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:600px; margin-top:0px" allowTransparency="true"></iframe>';
                }
            }
            width = window.isTablet ? Ext.Element.getViewportWidth() - 240 : Ext.Element.getViewportWidth() - 220;
            height = (Ext.Element.getViewportHeight() - 130) / 2;
            if (App.user.isAdmin) {
                me.items = [{
                    xtype: 'network',
                    // 60% width when viewport is big enough,
                    // 100% when viewport is small
                    height: height,
                    userCls: 'big-60 small-100'
                }, {
                    bodyPadding: 5,
                    xtype: 'component',
                    baseCls: 'weather-panel',
                    border: false,
                    height: (height - 60) / 4,
                    reference: 'totalusersdiv',
                    cls: 'weather-panel shadow',
                    userCls: 'big-40 small-100'
                }, {
                    xtype: 'component',
                    baseCls: 'weather-panel',
                    border: false,
                    height: (height - 60) / 4,
                    reference: 'maximumcc',
                    cls: 'weather-panel shadow',
                    userCls: 'big-40 small-100'
                }, {
                    xtype: 'component',
                    baseCls: 'weather-panel',
                    border: false,
                    height: (height - 60) / 4,
                    reference: 'monthprofitdiv',
                    cls: 'weather-panel shadow',
                    userCls: 'big-40 small-100'
                }, {
                    xtype: 'component',
                    baseCls: 'weather-panel',
                    border: false,
                    height: (height - 60) / 4,
                    reference: 'totalrefill',
                    cls: 'weather-panel shadow',
                    userCls: 'big-40 small-100'
                }, {
                    title: t('Simultaneous calls'),
                    cls: 'dashboard-main-chart shadow',
                    height: height,
                    showDownload: false,
                    hiddenButtonsCharts: true,
                    xtype: 'callonlinechartchart',
                    userCls: 'big-60 small-100'
                }, {
                    xtype: 'trunks',
                    userCls: 'big-40 small-100'
                }]
            } else {
                me.items = [{
                    header: true,
                    title: t('Buy') + ' ' + 'Credit',
                    xtype: 'buycreditmodule',
                    // 60% width when viewport is big enough,
                    // 100% when viewport is small
                    height: height,
                    userCls: 'big-50 small-100',
                    hidden: !showBuy,
                    cls: 'dashboard-main-chart shadow'
                }, {
                    header: true,
                    title: t('Buy') + ' ' + 'DID',
                    xtype: 'didbuymodule',
                    height: height,
                    userCls: 'big-50 small-100',
                    hidden: !showDid || !App.user.isClient,
                    cls: 'dashboard-main-chart shadow'
                }]
            }
        }
        me.callParent(arguments);
    }
});