/**
 * Classe que define a lista de "queueMember"
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
Ext.define('MBilling.view.queueMember.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.queuememberlist',
    store: 'QueueMember',
    initComponent: function() {
        var me = this;
        me.columns = [{
            header: t('Uniqueid'),
            dataIndex: 'uniqueid',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('destination'),
            dataIndex: 'interface',
            flex: 4
        }, {
            header: t('queues'),
            dataIndex: 'queue_name',
            flex: 4
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('paused'),
            dataIndex: 'paused',
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