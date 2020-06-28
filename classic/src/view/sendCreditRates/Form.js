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
Ext.define('MBilling.view.sendCreditRates.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.sendcreditratesform',
    fieldsHideUpdateLot: ['idProductcountry', 'idProductoperator_name'],
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'idProductcountry',
            fieldLabel: t('country'),
            readOnly: true
        }, {
            name: 'idProductoperator_name',
            fieldLabel: t('Operator Name'),
            readOnly: true
        }, {
            name: 'sell_price',
            fieldLabel: t('Sell Price'),
            xtype: 'moneyfield',
            mask: '#9.999.990,00',
            readOnly: App.user.isAdmin
        }];
        me.callParent(arguments);
    }
});