/**
 * Classe que define a combo "codec"
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
 * 10/07/2012
 */
Ext.define('MBilling.view.general.SipCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.sipcombo',
    fieldLabel: t('providertech'),
    forceSelection: true,
    editable: false,
    value: 'sip',
    store: [
        ['sip', 'sip'],
        ['dahdi', 'dahdi'],
        ['khomp', 'khomp'],
        ['iax2', 'iax2'],
        ['dgv', 'dgv'],
        ['ooh323', 'ooh323'],
        ['extra', 'extra'],
        ['Dongle', 'Dongle'],
        ['Local', 'Local']
    ]
});