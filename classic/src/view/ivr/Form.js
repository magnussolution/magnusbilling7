/**
 * Classe que define o form de "Ivr"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2020 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnussolution/magnusbilling7/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com>
 * 28/10/2012
 */
Ext.define('MBilling.view.ivr.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.ivrform',
    bodyPadding: 0,
    fileUpload: true,
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
                    labelWidth: 140,
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    labelAlign: 'right'
                }
            },
            items: [{
                title: t('General'),
                items: [{
                    name: 'name',
                    fieldLabel: t('Name')
                }, {
                    xtype: 'userlookup',
                    ownerForm: me,
                    name: 'id_user',
                    fieldLabel: t('Username'),
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'monFriStart',
                    fieldLabel: t('MonFri intervals'),
                    value: '09:00-12:00|14:00-20:00'
                }, {
                    name: 'satStart',
                    fieldLabel: t('Saturday intervals'),
                    value: '09:00-12:00'
                }, {
                    name: 'sunStart',
                    fieldLabel: t('Sunday intervals'),
                    value: '00:00'
                }, {
                    xtype: 'uploadfield',
                    name: 'workaudio',
                    fieldLabel: t('Work audio'),
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    extAllowed: ['wav', 'gsm']
                }, {
                    xtype: 'uploadfield',
                    name: 'noworkaudio',
                    fieldLabel: t('Out work audio'),
                    emptyText: 'Select an wav or gsm File',
                    allowBlank: true,
                    extAllowed: ['wav', 'gsm']
                }]
            }, {
                title: t('Available options'),
                itemId: 'option',
                defaults: {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    plugins: 'markallowblank',
                    allowBlank: true,
                    anchor: '100%',
                    labelWidth: 100,
                    defaults: {
                        hideLabel: true,
                        hidden: true,
                        flex: 5,
                        startX: 100,
                        allowBlank: true,
                        ownerForm: me
                    }
                },
                items: [{
                    xtype: 'menuseparator',
                    width: '100%'
                }, {
                    xtype: 'displayfield',
                    labelStyle: 'font-weight:bold',
                    value: '<span style="color:green;">' + t('Sets the destination of the call when a specific digit is pressed.') + '</span>',
                    allowBlank: true
                }, {
                    xtype: 'menuseparator',
                    width: '100%'
                }, {
                    fieldLabel: t('Option') + ' 0',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_0',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_0',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_0_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_0',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_0_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_0',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_0_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_0',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 1',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_1',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_1',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_1_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_1',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_1_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_1',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_1_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_1',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 2',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_2',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_2',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_2_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_2',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_2_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_2',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_2_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_2',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 3',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_3',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_3',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_3_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_3',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_3_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_3',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_3_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_3',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 4',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_4',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_4',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_4_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_4',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_4_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_4',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_4_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_4',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 5',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_5',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_5',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_5_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_5',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_5_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_5',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_5_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_5',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 6',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_6',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_6',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_6_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_6',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_6_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_6',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_6_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_6',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 7',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_7',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_7',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_7_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_7',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_7_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_7',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_7_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_7',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 8',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_8',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_8',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_8_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_8',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_8_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_8',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_8_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_8',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 9',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_9',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_9',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_9_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_9',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_9_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_9',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_9_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_9',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Default option'),
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_10',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_10',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_10_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_10',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_10_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_10',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_10_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_10',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    xtype: 'noyescombo',
                    name: 'direct_extension',
                    fieldLabel: t('Enable known SIP user')
                }]
            }, {
                title: t('Unavailable options'),
                itemId: 'optionOut',
                defaults: {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    plugins: 'markallowblank',
                    allowBlank: true,
                    anchor: '100%',
                    labelWidth: 100,
                    defaults: {
                        hideLabel: true,
                        hidden: true,
                        flex: 5,
                        startX: 100,
                        allowBlank: true,
                        ownerForm: me
                    }
                },
                items: [{
                    xtype: 'menuseparator',
                    width: '100%'
                }, {
                    xtype: 'displayfield',
                    labelStyle: 'font-weight:bold',
                    value: '<span style="color:red;">' + t('Sets the destination of the call when a specific digit is pressed.') + '</span>',
                    allowBlank: true
                }, {
                    xtype: 'menuseparator',
                    width: '100%'
                }, {
                    fieldLabel: t('Option') + ' 0',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_0',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_0',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_0_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_0',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_0_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_0',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_0_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_0',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 1',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_1',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_1',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_1_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_1',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_1_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_1',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_1_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_1',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 2',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_2',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_2',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_2_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_2',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_2_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_2',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_2_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_2',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 3',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_3',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_3',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_3_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_3',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_3_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_3',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_3_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_3',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 4',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_4',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_4',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_4_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_4',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_4_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_4',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_4_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_4',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 5',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_5',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_5',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_5_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_5',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_5_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_5',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_5_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_5',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 6',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_6',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_6',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_6_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_6',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_6_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_6',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_6_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_6',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 7',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_7',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_7',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_7_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_7',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_7_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_7',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_7_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_7',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 8',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_8',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_8',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_8_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_8',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_8_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_8',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_8_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_8',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Option') + ' 9',
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_9',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_9',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_9_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_9',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_9_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_9',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_9_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_9',
                        fieldLabel: t('DialPlan')
                    }]
                }, {
                    fieldLabel: t('Default option'),
                    items: [{
                        xtype: 'typedestinationcombo',
                        name: 'type_out_10',
                        fieldLabel: t('Type'),
                        hidden: false,
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr_out_10',
                        fieldLabel: t('IVR'),
                        displayField: 'id_ivr_out_10_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue_out_10',
                        fieldLabel: t('Queue'),
                        displayField: 'id_queue_out_10_name'
                    }, {
                        xtype: 'siplookup',
                        name: 'id_sip_out_10',
                        fieldLabel: t('Sip user'),
                        displayField: 'id_sip_out_10_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension_out_10',
                        fieldLabel: t('DialPlan')
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});