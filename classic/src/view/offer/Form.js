/**
 * Classe que define o form de "Offer"
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
Ext.define('MBilling.view.offer.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.offerform',
    fieldsHideUpdateLot: ['name'],
    items: [{
        name: 'label',
        fieldLabel: t('name')
    }, {
        xtype: 'offertypecombo',
        name: 'packagetype',
        fieldLabel: t('packagetype')
    }, {
        name: 'freetimetocall',
        fieldLabel: t('freetimetocall')
    }, {
        xtype: 'billingtypecombo',
        name: 'billingtype',
        fieldLabel: t('periode')
    }, {
        xtype: 'moneyfield',
        name: 'price',
        fieldLabel: t('price')
    }]
});