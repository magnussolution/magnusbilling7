/**
 * Classe que define o form de "Refillprovider"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author  Adilson Leffa Magnus.
 * @copyright   Todos os direitos reservados.
 * ###################################
 * =======================================
 * MagnusSolution.com <info@magnussolution.com>
 * 25/06/2012
 */
Ext.define('MBilling.view.refillprovider.Form', {
    extend: 'Ext.ux.form.Panel',
    uses: ['Ext.ux.form.field.DateTime'],
    alias: 'widget.refillproviderform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_provider'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'providercombo',
            fieldLabel: t('Provider'),
            name: 'id_provider'
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,00',
            name: 'credit',
            fieldLabel: t('credit')
        }, {
            xtype: 'textareafield',
            name: 'description',
            fieldLabel: t('description'),
            allowBlank: true
        }, {
            xtype: 'yesnocombo',
            name: 'payment',
            fieldLabel: t('add_payment'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});