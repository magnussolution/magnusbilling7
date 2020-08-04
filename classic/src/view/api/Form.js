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
Ext.define('MBilling.view.api.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.apiform',
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            name: 'id_user',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            name: 'api_key',
            fieldLabel: t('Api') + ' ' + t('key')
        }, {
            name: 'api_secret',
            fieldLabel: t('Api') + ' ' + t('secret')
        }, {
            xtype: 'booleancombo',
            name: 'status',
            fieldLabel: t('status'),
            allowBlank: true
        }, {
            xtype: 'checkboxgroup',
            columns: 4,
            fieldLabel: t('Permissions'),
            allowBlank: true,
            name: 'action',
            items: [{
                boxLabel: t('Read'),
                name: 'action',
                inputValue: 'r',
                checked: true
            }, {
                boxLabel: t('Create'),
                name: 'action',
                inputValue: 'c'
            }, {
                boxLabel: t('Edit'),
                name: 'action',
                inputValue: 'u'
            }, {
                boxLabel: t('Delete'),
                name: 'action',
                inputValue: 'd',
                allowBlank: true
            }]
        }, {
            xtype: 'textareafield',
            name: 'api_restriction_ips',
            emptyText: t('comma separated. EX: 200.200.200.200, 200.2.5.88'),
            fieldLabel: t('Restriction') + ' IPs',
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});