/**
 * Classe que define a combo de "offercombo"
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
 * 04/07/2012
 */
Ext.define('MBilling.view.offer.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.offercombo',
    name: 'id_offer',
    fieldLabel: t('offer'),
    displayField: 'label',
    valueField: 'id',
    value: 0,
    extraValues: [{
        id: 0,
        label: t('undefined')
    }],
    initComponent: function() {
        var me = this;
        me.store = Ext.create('MBilling.store.Offer', {
            proxy: {
                type: 'uxproxy',
                module: 'offer',
                limitParam: undefined
            }
        });
        me.callParent(arguments);
    }
});