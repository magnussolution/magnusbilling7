/**
 * Classe que define a lista de "Offer"
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
 * 17/08/2012
 */
Ext.define('MBilling.view.offer.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.offerlist',
    store: 'Offer',
    initComponent: function() {
        var me = this;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('name'),
            dataIndex: 'label',
            flex: 1
        }, {
            header: t('packagetype'),
            dataIndex: 'packagetype',
            renderer: Helper.Util.formatPackageType,
            comboRelated: 'offertypecombo',
            flex: 1,
            filter: {
                type: 'list',
                options: [
                    [0, t('unlimitedcalls')],
                    [1, t('numberfreecalls')],
                    [2, t('freeseconds')]
                ]
            }
        }, {
            header: t('freetimetocall'),
            dataIndex: 'freetimetocall',
            flex: 1
        }, {
            header: t('periode'),
            dataIndex: 'billingtype',
            renderer: Helper.Util.formatBillingType,
            comboRelated: 'billingtypecombo',
            flex: 1,
            filter: {
                type: 'list',
                options: [
                    [0, t('monthly')],
                    [1, t('weekly')]
                ]
            }
        }, {
            header: t('price'),
            dataIndex: 'price',
            renderer: Helper.Util.formatMoneyDecimal,
            hidden: !App.user.isAdmin,
            hideable: App.user.isAdmin,
            flex: 2
        }, {
            header: t('creationdate'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'creationdate',
            flex: 1
        }];
        me.callParent(arguments);
    }
});