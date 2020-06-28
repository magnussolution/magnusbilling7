/**
 * Classe que define a lista de "Did"
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
Ext.define('MBilling.view.sms.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.smslist',
    store: 'Sms',
    initComponent: function() {
        var me = this;
        me.buttonUpdateLot = false;
        me.allowUpdate = false;
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
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('send'),
            dataIndex: 'result',
            renderer: Helper.Util.formatBooleanSms,
            comboRelated: 'statuscombo',
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [0, t('error')],
                    [1, t('sent')],
                    [2, t('received')]
                ]
            }
        }, {
            header: t('destination'),
            dataIndex: 'telephone',
            flex: 2
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 5
        }, {
            header: t('description'),
            dataIndex: 'sms',
            hidden: true,
            hideable: true,
            flex: 6
        }, {
            header: t('From'),
            dataIndex: 'from',
            flex: 2
        }]
        me.callParent(arguments);
    }
});