/**
 * Classe que define a lista de "Refillprovider"
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
Ext.define('MBilling.view.refillprovider.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.refillproviderlist',
    store: 'Refillprovider',
    initComponent: function() {
        var me = this;
        me.columns = [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            xtype: 'templatecolumn',
            tpl: '{idProviderprovider_name}',
            header: t('provider'),
            dataIndex: 'id_provider',
            comboFilter: 'providercombo',
            flex: 2
        }, {
            header: t('credit'),
            dataIndex: 'credit',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            header: t('description'),
            dataIndex: 'description',
            flex: 4
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
            flex: 4
        }];
        me.callParent(arguments);
    }
});