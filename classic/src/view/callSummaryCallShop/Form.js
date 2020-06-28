/**
 * Classe que define o panel de "CallSummary"
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
 * 05/11/2012
 */
Ext.define('MBilling.view.callSummaryCallShop.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.callsummarycallshopform',
    defaults: {},
    labelWidthFields: 150,
    defaultType: 'displayfield',
    initComponent: function() {
        var me = this;
        me.allowUpdate = false;
        me.allowCreate = false;
        me.items = [{
            name: 'sumsessiontime',
            fieldLabel: t('min_sessiontime')
        }, {
            name: 'sumprice',
            fieldLabel: t('sessionbill'),
            renderer: Helper.Util.formatMoneyDecimal,
            hidden: !App.user.isClient
        }, {
            name: 'sumlucro',
            fieldLabel: t('markup'),
            renderer: Helper.Util.formatMoneyDecimal,
            hidden: !App.user.isClient
        }, {
            name: 'sumbuycost',
            fieldLabel: t('buycost'),
            renderer: Helper.Util.formatMoneyDecimal,
            hidden: !App.user.isClient
        }, {
            name: 'sumnbcall',
            fieldLabel: t('nbcall'),
            hidden: !App.user.isClient
        }];
        me.callParent(arguments);
    }
});