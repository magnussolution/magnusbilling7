/**
 * Classe que define o form de "servicesUse"
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
 * 24/09/2017
 */
Ext.define('MBilling.view.servicesUse.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.servicesuseform',
    initComponent: function() {
        var me = this;
        me.bodyPadding = 15,
            me.items = [{
                name: 'id',
                hidden: true,
                allowBlank: true
            }, {
                xtype: 'userlookup',
                ownerForm: me,
                hidden: App.user.isClient,
                readOnly: true,
                allowBlank: App.user.isClient
            }, {
                xtype: 'serviceslookup',
                name: 'id_services',
                fieldLabel: t('Service'),
                ownerForm: me,
                readOnly: true
            }, {
                xtype: 'moneyfield',
                mask: App.user.currency + ' #9.999.990,00',
                name: 'price',
                fieldLabel: t('price'),
                hidden: true,
                allowBlank: true,
                readOnly: true
            }, {
                xtype: 'methodpaycombo',
                fieldLabel: t('paymentmethods'),
                name: 'method',
                allowBlank: true,
                hidden: true
            }, {
                xtype: 'datetimefield',
                fieldLabel: t('reservation_date'),
                name: 'reservationdate',
                format: 'Y-m-d H:i:s',
                value: new Date(),
                hidden: !App.user.isAdmin
            }];
        me.callParent(arguments);
    }
});