/**
 * Class to define combo of "groupUser"
 *
 * MagnusBilling <info@magnussolution.com>
 * 15/04/2013
 */
Ext.define('MBilling.view.userType.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.usertypecombo',
    name: 'id_user_type',
    fieldLabel: t('userType'),
    displayField: 'name',
    valueField: 'id',
    forceSelection: true,
    editable: false,
    value: 1,
    store: [
        [1, t('admin')],
        [2, t('agent')],
        [3, t('client')]
    ]
});