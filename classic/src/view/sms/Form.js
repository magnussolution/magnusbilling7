/**
 * Classe que define o form de "Did"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author  Adilson Leffa Magnus.
 * @copyright Todos os direitos reservados.
 * ###################################
 * =======================================
 * MagnusSolution.com <info@magnussolution.com>
 * 24/09/2012
 */
Ext.define('MBilling.view.sms.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.smsform',
    fieldsHide: ['id_user'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            xtype: 'numberfield',
            name: 'telephone',
            fieldLabel: t('number'),
            emptyText: 'DDI DDD Nº',
            maxLength: 16,
            minLength: 11
        }, {
            xtype: 'textareafield',
            name: 'sms',
            fieldLabel: t('sms'),
            maxLength: 160
        }, {
            name: 'sms_from',
            fieldLabel: t('From'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});