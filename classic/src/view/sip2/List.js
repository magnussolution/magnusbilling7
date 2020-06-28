/**
 * Classe que define a lista de "Sip"
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
Ext.define('MBilling.view.sip2.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.sip2list',
    store: 'Sip2',
    fieldSearch: 'name',
    initComponent: function() {
        var me = this;
        me.columns = me.columns || [{
            header: t('accountcode'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4
        }, {
            header: t('username'),
            dataIndex: 'name',
            flex: 4
        }];
        me.callParent(arguments);
    }
});