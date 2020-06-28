/**
 * Classe que define o form de "CallBack"
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
 * 17/08/2012
 */
Ext.define('MBilling.view.callBack.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.callbackform',
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient
        }, , {
            name: 'exten',
            fieldLabel: t('destinationnumber')
        }, {
            name: 'status',
            xtype: 'callbackcombo',
            fieldLabel: t('status')
        }];
        me.callParent(arguments);
    }
});