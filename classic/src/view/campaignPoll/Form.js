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
                title: t('general'),
                items: [{
                    xtype: 'campaigncombo'
                }, {
                    name: 'name',
                    fieldLabel: t('name')
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
                    fieldLabel: t('Request') + ' ' + t('authorization')
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
                    fieldLabel: t('description'),
                    allowBlank: true
                }, {
                    xtype: 'uploadfield',
                    fieldLabel: 'Audio',
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    name: 'arq_audio',
                    extAllowed: ['wav', 'gsm']
                }]
            }, {
                title: t('options'),
                itemId: 'optionsData',
                items: [{
                    name: 'option0',
                    fieldLabel: t('option') + ' 0',
                    allowBlank: true
                }, {
                    name: 'option1',
                    fieldLabel: t('option') + ' 1',
                    allowBlank: true
                }, {
                    name: 'option2',
                    fieldLabel: t('option') + ' 2',
                    allowBlank: true
                }, {
                    name: 'option3',
                    fieldLabel: t('option') + ' 3',
                    allowBlank: true
                }, {
                    name: 'option4',
                    fieldLabel: t('option') + ' 4',
                    allowBlank: true
                }, {
                    name: 'option5',
                    fieldLabel: t('option') + ' 5',
                    allowBlank: true
                }, {
                    name: 'option6',
                    fieldLabel: t('option') + ' 6',
                    allowBlank: true
                }, {
                    name: 'option7',
                    fieldLabel: t('option') + ' 7',
                    allowBlank: true
                }, {
                    name: 'option8',
                    fieldLabel: t('option') + ' 8',
                    allowBlank: true
                }, {
                    name: 'option9',
                    fieldLabel: t('option') + ' 9',
                    allowBlank: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});