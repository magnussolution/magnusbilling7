/**
 * Classe que define a combo "OferType"
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
 * 12/09/2012
 */
Ext.define('MBilling.view.general.OfferTypeCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.offertypecombo',
    fieldLabel: t('offertype'),
    forceSelection: true,
    editable: false,
    value: 0,
    store: [
        [0, t('unlimitedcalls')],
        [1, t('numberfreecalls')],
        [2, t('freeseconds')]
    ]
});
Ext.define('MBilling.view.general.BillingTypeCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.billingtypecombo',
    fieldLabel: t('billingtype'),
    forceSelection: true,
    editable: false,
    value: 0,
    store: [
        [0, t('monthly')],
        [1, t('weekly')]
    ]
});