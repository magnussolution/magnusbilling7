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
Ext.define('MBilling.view.logUsers.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.logusersform',
    fieldsHideEdit: ['cid'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'usercombo',
            allowBlank: true,
            readOnly: true
        }, {
            name: 'id_log_actions',
            fieldLabel: t('action'),
            readOnly: true
        }, {
            name: 'ip',
            fieldLabel: t('ip'),
            readOnly: true
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('description'),
            height: 400,
            anchor: '100%',
            allowBlank: true,
            readOnly: true
        }];
        me.callParent(arguments);
    }
});