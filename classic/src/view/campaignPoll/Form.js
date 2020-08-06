/**
 * Classe que define o form de "CampaignPoll"
 *
 * MagnusSolution.com <info@magnussolution.com>
 * 19/09/2012
 */
Ext.define('MBilling.view.campaignPoll.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.campaignpollform',
    bodyPadding: 0,
    fileUpload: true,
    fieldsHideUpdateLot: ['id_campaign', 'name', 'arq_audio'],
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'tabpanel',
            defaults: {
                border: false,
                defaultType: 'textfield',
                layout: 'anchor',
                bodyPadding: 5,
                defaults: {
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    labelAlign: 'right'
                }
            },
            items: [{
                title: t('General'),
                items: [{
                    xtype: 'campaigncombo'
                }, {
                    name: 'name',
                    fieldLabel: t('Name')
                }, {
                    xtype: 'numberfield',
                    name: 'repeat',
                    fieldLabel: t('How many time to repeat, if the client press invalid option?'),
                    minValue: 0,
                    maxValue: 9,
                    allowBlank: true
                }, {
                    xtype: 'noyescombo',
                    name: 'request_authorize',
                    fieldLabel: t('Request authorization')
                }, {
                    xtype: 'numberfield',
                    name: 'digit_authorize',
                    fieldLabel: t('Number for authorize'),
                    value: '1',
                    minValue: 1,
                    maxValue: 9,
                    allowBlank: true
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: t('Description'),
                    allowBlank: true
                }, {
                    xtype: 'uploadfield',
                    name: 'arq_audio',
                    fieldLabel: t('Audio'),
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    extAllowed: ['wav', 'gsm']
                }]
            }, {
                title: t('Options'),
                itemId: 'optionsData',
                items: [{
                    name: 'option0',
                    fieldLabel: t('Option') + ' 0',
                    allowBlank: true
                }, {
                    name: 'option1',
                    fieldLabel: t('Option') + ' 1',
                    allowBlank: true
                }, {
                    name: 'option2',
                    fieldLabel: t('Option') + ' 2',
                    allowBlank: true
                }, {
                    name: 'option3',
                    fieldLabel: t('Option') + ' 3',
                    allowBlank: true
                }, {
                    name: 'option4',
                    fieldLabel: t('Option') + ' 4',
                    allowBlank: true
                }, {
                    name: 'option5',
                    fieldLabel: t('Option') + ' 5',
                    allowBlank: true
                }, {
                    name: 'option6',
                    fieldLabel: t('Option') + ' 6',
                    allowBlank: true
                }, {
                    name: 'option7',
                    fieldLabel: t('Option') + ' 7',
                    allowBlank: true
                }, {
                    name: 'option8',
                    fieldLabel: t('Option') + ' 8',
                    allowBlank: true
                }, {
                    name: 'option9',
                    fieldLabel: t('Option') + ' 9',
                    allowBlank: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});