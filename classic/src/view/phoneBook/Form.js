/**
 * Classe que define o form de "PhoneBook"
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
 * 28/10/2012
 */
Ext.define('MBilling.view.phoneBook.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.phonebookform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_user', 'name'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: App.user.isClient ? 'textfield' : 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            name: 'name',
            fieldLabel: t('name')
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