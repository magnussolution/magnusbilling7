/**
 * Class to define form to "Module"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 15/04/2013
 */
Ext.define('MBilling.view.module.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.moduleform',
    items: [{
        name: 'text',
        fieldLabel: t('Text'),
        maxLength: 100
    }, {
        name: 'icon_cls',
        fieldLabel: t('IconCls'),
        maxLength: 100
    }, {
        xtype: 'modulecombo',
        name: 'id_module',
        fieldLabel: t('Main Menu'),
        readOnly: true,
        allowBlank: true
    }, {
        xtype: 'numberfield',
        fieldLabel: t('Order'),
        name: 'priority',
        minValue: 1,
        allowBlank: false
    }]
});