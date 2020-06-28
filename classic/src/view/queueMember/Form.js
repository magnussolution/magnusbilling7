/**
 * Classe que define o form de "queueMember"
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
Ext.define('MBilling.view.queueMember.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.queuememberform',
    fieldsHideUpdateLot: ['id_user', 'queue_name'],
    fieldsHideEdit: ['queue_name'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'queuelookup',
            ownerForm: me,
            displayField: 'queue_name',
            name: 'queue_name',
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            xtype: 'siplookup',
            ownerForm: me,
            name: 'interface',
            displayField: 'interface'
        }, {
            xtype: 'noyescombo',
            name: 'paused',
            fieldLabel: t('paused'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});