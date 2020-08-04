/**
 * Classe que define o form de "PhoneNumber"
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
Ext.define('MBilling.view.phoneNumber.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.phonenumberform',
    fieldsHideUpdateLot: ['number'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'phonebookcombo',
            name: 'id_phonebook',
            fieldLabel: t('Phonebook')
        }, {
            name: 'number',
            fieldLabel: t('number')
        }, {
            name: 'name',
            fieldLabel: t('name'),
            allowBlank: true
        }, {
            name: 'city',
            fieldLabel: t('city'),
            allowBlank: true
        }, {
            xtype: 'statuscombo',
            name: 'status',
            fieldLabel: t('status'),
            allowBlank: true
        }, {
            xtype: 'textareafield',
            name: 'info',
            fieldLabel: t('description'),
            allowBlank: true,
            hidden: !App.user.isAdmin
        }];
        me.callParent(arguments);
    }
});