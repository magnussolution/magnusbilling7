/**
 * Classe que define a combo de "Plan"
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
 * 13/08/2012
 */
Ext.define('MBilling.view.methodPay.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.methodpaycombo',
    name: 'id_methodpay',
    fieldLabel: t('methodPay'),
    displayField: 'show_name',
    valueField: 'id',
    forceSelection: true,
    editable: false,
    initComponent: function() {
        var me = this;
        me.store = Ext.create('MBilling.store.MethodPay', {
            proxy: {
                type: 'uxproxy',
                module: 'methodpay',
                limitParam: undefined
            }
        });
        me.callParent(arguments);
    }
});