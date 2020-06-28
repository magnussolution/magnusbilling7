/**
 * Classe que define o form de "Call"
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
Ext.define('MBilling.view.servers.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.serversform',
    fieldsHideUpdateLot: ['id_user'],
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'name',
            fieldLabel: t('name')
        }, {
            name: 'host',
            fieldLabel: t('Server IP')
        }, {
            name: 'public_ip',
            fieldLabel: t('Public IP'),
            allowBlank: true
        }, {
            name: 'username',
            fieldLabel: t('username'),
            allowBlank: true
        }, {
            name: 'password',
            fieldLabel: t('password'),
            allowBlank: true
        }, {
            name: 'port',
            fieldLabel: t('port'),
            allowBlank: true
        }, {
            name: 'sip_port',
            fieldLabel: t('SIPport'),
            value: '5060',
            allowBlank: true
        }, {
            xtype: 'combobox',
            name: 'type',
            fieldLabel: t('type'),
            forceSelection: true,
            editable: false,
            value: 'mbilling',
            store: [
                ['mbilling', t('Mbilling')],
                ['asterisk', t('Asterisk')],
                ['sipproxy', t('SipProxy')]
            ]
        }, {
            fieldLabel: t('Weight'),
            name: 'weight',
            hidden: true,
            allowBlank: true,
            emptyText: t('This is useful in order to get a different ratio of traffic between servers.')
        }, {
            xtype: 'booleancombo',
            name: 'status',
            fieldLabel: t('status'),
            allowBlank: true
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('description'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});