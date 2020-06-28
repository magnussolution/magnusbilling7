/**
 * Classe que define a combo "lcrtype"
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
 * 24/07/2012
 */
Ext.define('MBilling.view.general.LcrtypeCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.lcrtypecombo',
    fieldLabel: t('lcrtype'),
    forceSelection: true,
    editable: false,
    value: 1,
    store: [
        [1, t('LCRAccordingtothebuyerPrice')],
        [0, t('LCRAccordingtothesellerPrice')]
    ]
});