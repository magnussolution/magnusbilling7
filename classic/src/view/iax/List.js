/**
 * Classe que define a lista de "iax"
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
Ext.define('MBilling.view.iax.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.iaxlist',
    store: 'Iax',
    fieldSearch: 'username',
    initComponent: function() {
        var me = this;
        me.columns = me.columns || [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('username'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 3
        }, {
            header: t('ramal'),
            dataIndex: 'name',
            flex: 3
        }, {
            header: t('password'),
            dataIndex: 'secret',
            flex: 2
        }, {
            header: t('host'),
            dataIndex: 'host',
            flex: 3
        }, {
            header: 'IP',
            dataIndex: 'ipaddr',
            flex: 5
        }, { //HIDDEN COLUNNS
            header: t('context'),
            dataIndex: 'context',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: t('callerid'),
            dataIndex: 'callerid',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: t('codec'),
            dataIndex: 'allow',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'nat',
            dataIndex: 'nat',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'qualify',
            dataIndex: 'qualify',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'dtmfmode',
            dataIndex: 'dtmfmode',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'insecure',
            dataIndex: 'insecure',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'type',
            dataIndex: 'type',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }];
        me.callParent(arguments);
    }
});