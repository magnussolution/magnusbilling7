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
Ext.define('MBilling.view.sip.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.siplist',
    store: 'Sip',
    fieldSearch: 'name',
    initComponent: function() {
        var me = this;
        me.columns = me.columns || [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Status'),
            dataIndex: 'lineStatus',
            width: 3,
            menuDisabled: true,
            renderer: Helper.Util.formatStatusImage,
            hidden: window.isTablet
        }, {
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
        }, {
            header: t('host'),
            dataIndex: 'host',
            flex: 4,
            hidden: window.isTablet
        }, {
            header: t('codec'),
            dataIndex: 'allow',
            flex: 5,
            hidden: window.isTablet
        }, {
            header: t('Group'),
            dataIndex: 'sip_group',
            hidden: true,
            flex: 3
        }, { //HIDDEN COLUNNS
            header: t('context'),
            dataIndex: 'context',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: t('record_call'),
            dataIndex: 'record_call',
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            flex: 2,
            hidden: true,
            hideable: !App.user.isClient
        }, {
            header: t('callerid'),
            dataIndex: 'callerid',
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
            header: 'directmedia',
            dataIndex: 'directmedia',
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
        }, {
            header: 'allowtransfer',
            dataIndex: 'allowtransfer',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'calllimit',
            dataIndex: 'calllimit',
            hidden: true,
            hideable: !App.user.isClient,
            flex: 1
        }, {
            header: 'AMD',
            dataIndex: 'amd',
            hidden: true,
            hideable: window.dma && window.dialC,
            flex: 2,
            renderer: function(value) {
                return value == 1 ? t('Enable') : t('Disable');
            },
            filter: {
                type: 'list',
                options: [
                    ['0', t('Disable')],
                    ['1', t('Before Answer')],
                    ['2', t('After Answer')],
                    ['3', t('Both')]
                ]
            }
        }];
        me.callParent(arguments);
    }
});