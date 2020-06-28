/**
 * Classe que define a lista de "RestrictedPhonenumber"
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
 * 24/09/2012
 */
Ext.define('MBilling.view.restrictedPhonenumber.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.restrictedphonenumberlist',
    store: 'RestrictedPhonenumber',
    buttonImportCsv: true,
    initComponent: function() {
        var me = this;
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
            flex: 2,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('number'),
            dataIndex: 'number',
            flex: 2
        }, {
            header: t('Direction'),
            dataIndex: 'direction',
            renderer: Helper.Util.formatDirection,
            filter: {
                type: 'list',
                options: [
                    [1, t('outbound')],
                    [2, t('inbound')]
                ]
            },
            flex: 1
        }]
        me.callParent(arguments);
    }
});