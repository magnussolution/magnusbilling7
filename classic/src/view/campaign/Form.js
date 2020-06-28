/**
 * Classe que define o form de "Campaign"
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
 * 28/10/2012
 */
Ext.define('MBilling.view.campaign.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.campaignform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_user', 'name', 'audio', 'audio_2', 'id_phonebook'],
    fileUpload: true,
    initComponent: function() {
        var me = this;
        me.labelWidthFields = 120;
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
                    xtype: App.user.isClient ? 'textfield' : 'userlookup',
                    ownerForm: me,
                    hidden: App.user.isClient
                }, {
                    fieldLabel: t('Plan'),
                    xtype: 'plancombo',
                    name: 'id_plan',
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'name',
                    fieldLabel: t('name')
                }, {
                    xtype: 'booleancombo',
                    name: 'status',
                    fieldLabel: t('status')
                }, {
                    xtype: 'datetimefield',
                    name: 'startingdate',
                    fieldLabel: t('startingdate'),
                    format: 'Y-m-d H:i:s',
                    value: new Date()
                }, {
                    xtype: 'datetimefield',
                    name: 'expirationdate',
                    fieldLabel: t('expirationdate'),
                    format: 'Y-m-d H:i:s',
                    value: '2030-01-01 00:00:00'
                }, {
                    xtype: 'campaigntypefullcombo',
                    name: 'type',
                    fieldLabel: t('type')
                }, {
                    xtype: 'uploadfield',
                    fieldLabel: t('Audio'),
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    name: 'audio',
                    extAllowed: ['wav', 'gsm']
                }, {
                    xtype: 'uploadfield',
                    fieldLabel: t('Audio') + '2',
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    name: 'audio_2',
                    extAllowed: ['wav', 'gsm']
                }, {
                    xtype: 'yesnocombo',
                    name: 'restrict_phone',
                    fieldLabel: t('Restrict phone'),
                    hidden: App.user.isClient,
                    allowBlank: true
                }, {
                    xtype: 'noyescombo',
                    name: 'auto_reprocess',
                    fieldLabel: t('Auto reprocess')
                }, {
                    style: 'margin-top:10px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Select one or more phonebook'),
                    collapsible: true,
                    collapsed: false,
                    items: [{
                        labelWidth: 10,
                        name: 'id_phonebook',
                        fieldLabel: t('phonebook'),
                        anchor: '100%',
                        fieldLabel: '',
                        xtype: 'phonebooktag',
                        allowBlank: true
                    }]
                }]
            }, {
                title: t('Forward'),
                items: [{
                    style: 'margin-top:25px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Forward to'),
                    collapsible: true,
                    collapsed: false,
                    height: 110,
                    defaults: {
                        labelWidth: 190,
                        anchor: '100%',
                        labelAlign: me.labelAlignFields
                    },
                    items: [{
                        xtype: 'combobox',
                        forceSelection: true,
                        editable: false,
                        value: '-1',
                        name: 'digit_authorize',
                        fieldLabel: t('Number to forward'),
                        store: [
                            ['-1', t('Disable')],
                            ['-2', t('Any Digit')],
                            ['-3', t('Every')],
                            ['0', '0'],
                            ['1', '1'],
                            ['2', '2'],
                            ['3', '3'],
                            ['4', '4'],
                            ['5', '5'],
                            ['6', '6'],
                            ['7', '7'],
                            ['8', '8'],
                            ['9', '9']
                        ]
                    }, {
                        fieldLabel: t('Forward type'),
                        name: 'type_0',
                        xtype: 'typecampaigndestinationcombo',
                        allowBlank: true
                    }, {
                        xtype: 'textfield',
                        name: 'extensions_0',
                        fieldLabel: t('Destination'),
                        value: '0',
                        allowBlank: true,
                        hidden: true
                    }, {
                        xtype: 'ivrlookup',
                        ownerForm: me,
                        name: 'id_ivr_0',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_0_name',
                        allowBlank: true,
                        hidden: true
                    }, {
                        xtype: 'queuelookup',
                        ownerForm: me,
                        name: 'id_queue_0',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_0_name',
                        allowBlank: true,
                        hidden: true
                    }, {
                        xtype: 'siplookup',
                        ownerForm: me,
                        name: 'id_sip_0',
                        displayField: 'id_sip_0_name',
                        fieldLabel: t('SIP'),
                        allowBlank: true,
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: t('Destination'),
                        name: 'extension_0',
                        hidden: true
                    }]
                }]
            }, {
                title: t('schedules'),
                items: [{
                    name: 'daily_start_time',
                    fieldLabel: t('daily_start_time'),
                    value: '09:00'
                }, {
                    name: 'daily_stop_time',
                    fieldLabel: t('daily_stop_time'),
                    value: '18:00'
                }, {
                    xtype: 'yesnocombo',
                    fieldLabel: t('monday'),
                    name: 'monday'
                }, {
                    xtype: 'yesnocombo',
                    fieldLabel: t('tuesday'),
                    name: 'tuesday'
                }, {
                    xtype: 'yesnocombo',
                    fieldLabel: t('wednesday'),
                    name: 'wednesday'
                }, {
                    xtype: 'yesnocombo',
                    fieldLabel: t('thursday'),
                    name: 'thursday'
                }, {
                    xtype: 'yesnocombo',
                    fieldLabel: t('friday'),
                    name: 'friday'
                }, {
                    xtype: 'noyescombo',
                    fieldLabel: t('saturday'),
                    name: 'saturday'
                }, {
                    xtype: 'noyescombo',
                    fieldLabel: t('sunday'),
                    name: 'sunday'
                }]
            }, {
                title: t('Limit'),
                defaults: {
                    anchor: '0',
                    enableKeyEvents: true,
                    labelWidth: 200,
                    msgTarget: 'side',
                    plugins: 'markallowblank',
                    allowBlank: false
                },
                items: [{
                    name: 'frequency',
                    fieldLabel: t('Call limit'),
                    minValue: 1,
                    value: App.user.isClient ? App.user.campaign_user_limit : 10
                }, {
                    name: 'max_frequency',
                    fieldLabel: t('Maximum call limit'),
                    hidden: !App.user.isAdmin,
                    minValue: 1,
                    value: App.user.isClient ? App.user.campaign_user_limit : 10
                }, {
                    name: 'nb_callmade',
                    fieldLabel: t('Total audio time'),
                    hidden: !App.user.isAdmin,
                    allowBlank: true,
                    value: 0
                }, {
                    xtype: 'booleancombo',
                    name: 'enable_max_call',
                    fieldLabel: t('toggle_max_completed_calls'),
                    hidden: !App.user.isAdmin,
                    allowBlank: true,
                    value: 0
                }, {
                    name: 'secondusedreal',
                    fieldLabel: t('max_completed_calls'),
                    hidden: !App.user.isAdmin,
                    allowBlank: true,
                    value: 0
                }]
            }, {
                title: t('SMS'),
                items: [{
                    name: 'from',
                    fieldLabel: t('From'),
                    allowBlank: true
                }, {
                    xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: t('descriptionOrSmsText'),
                    allowBlank: true,
                    maxLength: 300
                }]
            }, {
                title: t('TTS/ASR'),
                hidden: !window.ttsasr,
                items: [{
                    name: 'tts_audio',
                    fieldLabel: t('Audio 1 TTS'),
                    allowBlank: true,
                    maxLength: 200
                }, {
                    name: 'tts_audio2',
                    fieldLabel: t('Audio 2 TTS'),
                    allowBlank: true,
                    maxLength: 200
                }, {
                    xtype: 'box',
                    hidden: false,
                    autoEl: {
                        tag: 'br'
                    }
                }, {
                    name: 'asr_options',
                    fieldLabel: t('Option to validate ASR'),
                    allowBlank: true,
                    maxLength: 160
                }]
            }]
        }];
        me.callParent(arguments);
    }
});