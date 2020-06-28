/**
 * Classe que define o form de "RestrictedPhonenumber"
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
Ext.define('MBilling.view.restrictedPhonenumber.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.restrictedphonenumberform',
    fieldsHideUpdateLot: ['id_user'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            readOnly: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            name: 'number',
            fieldLabel: t('number')
        }, {
            xtype: 'combobox',
            forceSelection: true,
            editable: false,
            value: '1',
            store: [
                [1, t('outbound')],
                [2, t('inbound')]
            ],
            fieldLabel: t('Direction'),
            name: 'direction'
        }];
        me.callParent(arguments);
    }
});