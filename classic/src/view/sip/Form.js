/**
 * Classe que define o form de "Sip"
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
 * 25/06/2012
 */
Ext.define('MBilling.view.sip.Form', {
    extend: 'Ext.ux.form.Panel',
    uses: ['Ext.ux.form.field.DateTime'],
    alias: 'widget.sipform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_user', 'defaultuser', 'secret'],
    initComponent: function() {
        var me = this;
        haveServiceMenu = false;
        Ext.each(App.user.menu, function(item) {
            if (item.text == "t('Services')") haveServiceMenu = true;
        });
        me.items = [{
            xtype: 'tabpanel',
            defaults: {
                border: false,
                defaultType: 'textfield',
                layout: 'anchor',
                bodyPadding: 5,
                defaults: {
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true
                }
            },
            items: [{
                title: t('general'),
                items: [{
                    xtype: 'userlookup',
                    ownerForm: me,
                    fieldLabel: t('accountcode'),
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'defaultuser',
                    fieldLabel: t('username'),
                    minLength: 4,
                    allowBlank: true,
                    readOnly: App.user.isClient
                }, {
                    name: 'secret',
                    fieldLabel: t('password'),
                    allowBlank: true,
                    minLength: 6
                }, {
                    name: 'callerid',
                    fieldLabel: t('callerid'),
                    allowBlank: true
                }, {
                    name: 'alias',
                    fieldLabel: t('Alias'),
                    allowBlank: true,
                    minLength: 3
                }, {
                    name: 'disallow',
                    fieldLabel: 'Disallow',
                    value: 'all',
                    hidden: !App.user.isAdmin,
                    allowBlank: App.user.isClient
                }, {
                    xtype: 'checkboxgroup',
                    columns: 3,
                    fieldLabel: t('codec'),
                    items: [{
                        boxLabel: 'g729',
                        name: 'allow',
                        inputValue: 'g729',
                        checked: window.default_codes.match(/g729/)
                    }, {
                        boxLabel: 'g723',
                        name: 'allow',
                        inputValue: 'g723',
                        checked: window.default_codes.match(/g723/)
                    }, {
                        boxLabel: 'gsm',
                        name: 'allow',
                        inputValue: 'gsm',
                        checked: window.default_codes.match(/gsm/)
                    }, {
                        boxLabel: 'g726',
                        name: 'allow',
                        inputValue: 'g726',
                        checked: window.default_codes.match(/g726/)
                    }, {
                        boxLabel: 'opus',
                        name: 'allow',
                        inputValue: 'opus',
                        checked: window.default_codes.match(/opus/)
                    }, {
                        boxLabel: 'alaw',
                        name: 'allow',
                        inputValue: 'alaw',
                        checked: window.default_codes.match(/alaw/)
                    }, {
                        boxLabel: 'ulaw',
                        name: 'allow',
                        inputValue: 'ulaw',
                        checked: window.default_codes.match(/ulaw/)
                    }, {
                        boxLabel: 'g722',
                        name: 'allow',
                        inputValue: 'g722',
                        checked: window.default_codes.match(/g722/)
                    }, {
                        boxLabel: 'ilbc',
                        name: 'allow',
                        inputValue: 'ilbc',
                        checked: window.default_codes.match(/ilbc/)
                    }, {
                        boxLabel: 'speex',
                        name: 'allow',
                        inputValue: 'speex',
                        checked: window.default_codes.match(/speex/)
                    }, {
                        boxLabel: 'h263p',
                        name: 'allow',
                        inputValue: 'h263p',
                        checked: window.default_codes.match(/h263p/)
                    }, {
                        boxLabel: 'h263',
                        name: 'allow',
                        inputValue: 'h263',
                        checked: window.default_codes.match(/h263/)
                    }, {
                        boxLabel: 'h264',
                        name: 'allow',
                        inputValue: 'h264',
                        checked: window.default_codes.match(/h264/)
                    }, {
                        boxLabel: 'vp8',
                        name: 'allow',
                        inputValue: 'vp8',
                        checked: window.default_codes.match(/vp8/)
                    }],
                    hidden: !App.user.isAdmin,
                    allowBlank: App.user.isClient
                }, {
                    name: 'host',
                    fieldLabel: t('host'),
                    value: 'dynamic',
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'sip_group',
                    fieldLabel: t('Group'),
                    allowBlank: true
                }, {
                    xtype: 'yesnostringcombo',
                    name: 'videosupport',
                    fieldLabel: 'Videosupport',
                    value: 'no',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'block_call_reg',
                    fieldLabel: t('block_call_regex'),
                    allowBlank: true,
                    hidden: App.user.isClient
                }, {
                    xtype: 'noyescombo',
                    name: 'record_call',
                    fieldLabel: t('record_call'),
                    allowBlank: true,
                    hidden: !App.user.isAdmin
                }, {
                    xtype: 'numberfield',
                    name: 'techprefix',
                    fieldLabel: t('Techprefix'),
                    hidden: !App.user.isAdmin,
                    allowBlank: true,
                    maxLength: 6
                }]
            }, {
                title: t('Nat'),
                hidden: !App.user.isAdmin,
                items: [{
                    name: 'nat',
                    fieldLabel: 'Nat',
                    value: 'force_rport,comedia',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'directmedia',
                    fieldLabel: 'Directmedia',
                    value: 'no',
                    allowBlank: !App.user.isAdmin
                }, {
                    xtype: 'yesnostringcombo',
                    name: 'qualify',
                    fieldLabel: 'Qualify',
                    value: 'no',
                    allowBlank: !App.user.isAdmin
                }]
            }, {
                title: t('Additional'),
                hidden: !App.user.isAdmin,
                defaults: {
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true,
                    labelWidth: 142
                },
                items: [{
                    name: 'context',
                    fieldLabel: t('context'),
                    value: 'billing',
                    hidden: !App.user.isAdmin,
                    allowBlank: true
                }, {
                    name: 'dtmfmode',
                    fieldLabel: 'Dtmfmode',
                    value: 'RFC2833',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'insecure',
                    fieldLabel: 'Insecure',
                    value: 'no',
                    allowBlank: true
                }, {
                    name: 'deny',
                    fieldLabel: 'Deny',
                    allowBlank: true,
                    hidden: !App.user.isAdmin
                }, {
                    name: 'permit',
                    fieldLabel: 'Permit',
                    allowBlank: true,
                    hidden: !App.user.isAdmin
                }, {
                    name: 'type',
                    fieldLabel: 'Type',
                    value: 'friend',
                    allowBlank: !App.user.isAdmin
                }, {
                    xtype: 'noyesstringcombo',
                    name: 'allowtransfer',
                    fieldLabel: 'Allowtransfer',
                    value: 'no',
                    allowBlank: !App.user.isAdmin
                }, {
                    xtype: 'noyescombo',
                    name: 'ringfalse',
                    fieldLabel: t('Ring false'),
                    value: '0',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'calllimit',
                    xtype: 'numberfield',
                    fieldLabel: t('calllimit'),
                    value: '0',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'mohsuggest',
                    fieldLabel: t('MOH'),
                    allowBlank: true,
                    hidden: !App.user.isAdmin
                }, {
                    name: 'url_events',
                    fieldLabel: t('Url Events notify'),
                    hidden: !App.user.isAdmin || !window.events === true,
                    allowBlank: true
                }, {
                    name: 'addparameter',
                    fieldLabel: t('addparameter'),
                    allowBlank: true,
                    hidden: !App.user.isAdmin,
                    emptyText: t('parameterdial')
                }, {
                    xtype: 'combobox',
                    store: [
                        ['0', t('Disable')],
                        ['1', t('Before Answer')],
                        ['2', t('After Answer')],
                        ['3', t('Both')]
                    ],
                    forceSelection: true,
                    editable: false,
                    name: 'amd',
                    value: '0',
                    fieldLabel: t('AMD'),
                    allowBlank: true,
                    hidden: !window.dma || !window.dialC
                }]
            }, {
                title: t('Forward'),
                itemId: 'option',
                bodyPadding: 10,
                defaults: {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    plugins: 'markallowblank',
                    allowBlank: true,
                    anchor: '100%',
                    labelWidth: 60,
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
                    fieldLabel: t('Forward'),
                    items: [{
                        name: 'type_forward',
                        xtype: 'typesipforwardcombo',
                        flex: 2
                    }, {
                        xtype: 'ivrlookup',
                        name: 'id_ivr',
                        displayField: 'id_ivr_name'
                    }, {
                        xtype: 'queuelookup',
                        name: 'id_queue',
                        displayField: 'id_queue_name'
                    }, {
                        xtype: 'sip2lookup',
                        name: 'id_sip',
                        displayField: 'id_sip_name'
                    }, {
                        xtype: 'textfield',
                        name: 'extension'
                    }]
                }, {
                    name: 'dial_timeout',
                    xtype: 'numberfield',
                    fieldLabel: t('Dial timeout'),
                    value: '60',
                    labelWidth: 90
                }]
            }, {
                title: t('VoiceMail'),
                itemId: 'voicemail',
                bodyPadding: 10,
                defaults: {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    plugins: 'markallowblank',
                    allowBlank: true,
                    anchor: '100%',
                    labelWidth: 150,
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
                    xtype: 'noyescombo',
                    name: 'voicemail',
                    fieldLabel: t('Enable') + ' ' + t('voicemail'),
                    value: '0'
                }, {
                    xtype: 'textfield',
                    name: 'voicemail_email',
                    fieldLabel: t('Email')
                }, {
                    xtype: 'numberfield',
                    name: 'voicemail_password',
                    fieldLabel: t('password'),
                    value: ''
                }]
            }, {
                title: t('SipShowPeer'),
                itemId: 'sipshowpeer',
                bodyPadding: 10,
                hidden: !App.user.isAdmin,
                defaults: {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    plugins: 'markallowblank',
                    allowBlank: true,
                    anchor: '100%',
                    labelWidth: 150,
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
                    xtype: 'textarea',
                    name: 'sipshowpeer',
                    readOnly: true,
                    allowBlank: true,
                    height: 700,
                    anchor: '100%',
                    hidden: !App.user.isAdmin
                }]
            }]
        }];
        me.callParent(arguments);
    }
});