/**
 * Classe que define a lista de "Firewall"
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
Ext.define('MBilling.view.firewall.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.firewalllist',
    store: 'Firewall',
    initComponent: function() {
        var me = this;
        me.textDelete = 'Unban';
        me.textNew = 'Ban new Ip';
        me.buttonCsv = false;
        me.buttonUpdateLot = false;
        me.buttonCleanFilter = true;
        me.allowPrint = false;
        me.allowCreate = true;
        me.allowDelete = true;
        me.columns = [{
            header: t('Ip'),
            dataIndex: 'ip',
            flex: 4
        }, {
            header: t('Type'),
            dataIndex: 'jail',
            flex: 4
        }, {
            header: t('perm_ban'),
            dataIndex: 'action',
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            flex: 2
        }]
        me.callParent(arguments);
    }
});