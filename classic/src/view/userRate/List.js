/**
 * Classe que define a lista de "RateCallshop"
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
 * 30/07/2012
 */
Ext.define('MBilling.view.userRate.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.userratelist',
    store: 'UserRate',
    fieldSearch: 'idUser.username',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.allowPrint = false;
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
            header: t('prefix'),
            dataIndex: 'idPrefixprefix',
            flex: window.isTablet ? 2 : 3
        }, {
            dataIndex: 'idPrefixdestination',
            header: t('destination'),
            flex: window.isTablet ? 2 : 3
        }, {
            header: t('rateinitial'),
            dataIndex: 'rateinitial',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            header: t('initblock'),
            dataIndex: 'initblock',
            flex: 2
        }, {
            header: t('billingblock'),
            dataIndex: 'billingblock',
            flex: 2
        }]
        me.callParent(arguments);
    }
});