/**
 * Classe que define o panel de "Campaign"
 *
 * MagnusSolution.com <info@magnussolution.com>
 * 17/08/2012
 */
Ext.define('MBilling.view.campaignSend.Module', {
    extend: 'Ext.form.Panel',
    alias: 'widget.campaignsendmodule',
    controller: 'campaignsend',
    resizable: false,
    autoShow: true,
    header: false,
    initComponent: function() {
        var me = this;
        me.items = [{
            reference: 'campaignSendPanel',
            xtype: 'form',
            margin: '10 10 10 10',
            autoShow: true,
            closable: false,
            resizable: false,
            bodyPadding: 10,
            defaultType: 'textfield',
            defaults: {
                labelAlign: 'right',
                labelWidth: 150,
                width: 280,
                allowBlank: false,
                msgTarget: 'side',
                enableKeyEvents: true,
                plugins: 'markallowblank',
                anchor: '100%'
            },
            items: [{
                xtype: 'campaignsendcombo',
                name: 'type',
                fieldLabel: t('Campaign') + ' ' + t('type')
            }, { //SMS
                name: 'sms_text',
                fieldLabel: 'SMS ' + t('Text'),
                xtype: 'textarea',
                height: 100,
                anchor: '100%',
                allowBlank: true,
                hidden: true
            }, { //TORPEDO
                xtype: 'filefield',
                emptyText: 'Select an audio file',
                fieldLabel: t('Audio file'),
                name: 'audio_path',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'upload-icon'
                },
                buttonText: t('Select Audio...'),
                allowBlank: true,
                hidden: true
            }, {
                xtype: 'filefield',
                emptyText: 'Select an csv file',
                fieldLabel: t('CSV file'),
                name: 'csv_path',
                allowBlank: true,
                hidden: true
            }, {
                name: 'numbers',
                fieldLabel: t('numbers'),
                xtype: 'textarea',
                height: 100,
                anchor: '100%',
                allowBlank: true,
                hidden: true
            }, {
                xtype: 'datefield',
                name: 'startingdate',
                fieldLabel: t('Date'),
                format: 'Y-m-d',
                value: new Date(),
                allowBlank: true,
                hidden: true
            }, {
                xtype: 'timefield',
                name: 'startingtime',
                fieldLabel: t('Hour'),
                format: 'H:i',
                value: '00:00',
                allowBlank: true,
                hidden: true
            }],
            bbar: [{
                width: '150px',
                text: t('Send'),
                tooltip: t('Send'),
                glyph: icons.disk,
                handler: 'onSendCampaign'
            }]
        }];
        me.callParent(arguments);
    }
});