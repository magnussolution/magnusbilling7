/**
 * Classe que define o form de "Trunk"
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
Ext.define('MBilling.view.trunk.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.trunkform',
    autoHeight: 300,
    bodyPadding: 0,
    fieldsHideUpdateLot: ['trunkcode'],
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
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true,
                    labelWidth: 142
                }
            },
            items: [{
                title: t('general'),
                items: [{
                    xtype: 'providerlookup',
                    ownerForm: me
                }, {
                    name: 'trunkcode',
                    fieldLabel: t('trunkcode')
                }, {
                    name: 'user',
                    fieldLabel: t('user'),
                    allowBlank: true
                }, {
                    name: 'secret',
                    fieldLabel: t('password'),
                    allowBlank: true
                }, {
                    name: 'host',
                    fieldLabel: t('host')
                }, {
                    name: 'trunkprefix',
                    fieldLabel: t('add_prefix'),
                    allowBlank: true
                }, {
                    name: 'removeprefix',
                    fieldLabel: t('remove_prefix'),
                    allowBlank: true
                }, {
                    xtype: 'checkboxgroup',
                    columns: 3,
                    name: 'allow',
                    fieldLabel: t('codec'),
                    items: [{
                        boxLabel: 'g729',
                        name: 'allow',
                        inputValue: 'g729',
                        checked: true
                    }, {
                        boxLabel: 'g723',
                        name: 'allow',
                        inputValue: 'g723'
                    }, {
                        boxLabel: 'gsm',
                        name: 'allow',
                        inputValue: 'gsm',
                        checked: true
                    }, {
                        boxLabel: 'g726',
                        name: 'allow',
                        inputValue: 'g726'
                    }, {
                        boxLabel: 'opus',
                        name: 'allow',
                        inputValue: 'opus',
                        checked: true
                    }, {
                        boxLabel: 'alaw',
                        name: 'allow',
                        inputValue: 'alaw',
                        checked: true
                    }, {
                        boxLabel: 'ulaw',
                        name: 'allow',
                        inputValue: 'ulaw',
                        checked: true
                    }, {
                        boxLabel: 'g722',
                        name: 'allow',
                        inputValue: 'g722'
                    }, {
                        boxLabel: 'ilbc',
                        name: 'allow',
                        inputValue: 'ilbc'
                    }, {
                        boxLabel: 'speex',
                        name: 'allow',
                        inputValue: 'speex'
                    }, {
                        boxLabel: 'h261',
                        name: 'allow',
                        inputValue: 'h261'
                    }, {
                        boxLabel: 'h263',
                        name: 'allow',
                        inputValue: 'h263'
                    }],
                    allowBlank: true
                }, {
                    xtype: 'sipcombo',
                    name: 'providertech',
                    fieldLabel: t('providertech')
                }, {
                    xtype: 'booleancombo',
                    name: 'status',
                    fieldLabel: t('status')
                }, {
                    xtype: 'noyescombo',
                    name: 'allow_error',
                    fieldLabel: t('allow_error'),
                    hidden: true
                }, {
                    xtype: 'noyescombo',
                    name: 'register',
                    fieldLabel: t('registertrunk')
                }, {
                    name: 'register_string',
                    fieldLabel: t('Register String'),
                    allowBlank: true,
                    hidden: true
                }]
            }, {
                title: t('suplementaryInfo'),
                defaults: {
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true,
                    labelWidth: 142
                },
                items: [{
                    name: 'fromuser',
                    fieldLabel: 'Fromuser',
                    allowBlank: true
                }, {
                    name: 'fromdomain',
                    fieldLabel: 'Fromdomain',
                    allowBlank: true
                }, {
                    name: 'language',
                    fieldLabel: t('language'),
                    allowBlank: true
                }, {
                    name: 'context',
                    fieldLabel: t('context'),
                    allowBlank: true,
                    value: 'billing'
                }, {
                    name: 'dtmfmode',
                    fieldLabel: 'Dtmfmode',
                    allowBlank: true,
                    value: 'RFC2833'
                }, {
                    name: 'insecure',
                    fieldLabel: 'Insecure',
                    allowBlank: true,
                    value: 'port,invite'
                }, {
                    xtype: 'numberfield',
                    name: 'maxuse',
                    fieldLabel: t('maxuse'),
                    allowBlank: true,
                    value: -1,
                    minValue: -1
                }, {
                    name: 'nat',
                    fieldLabel: 'Nat',
                    value: App.user.asteriskVersion == '1.8' ? 'yes' : 'force_rport,comedia',
                    allowBlank: true
                }, {
                    name: 'directmedia',
                    allowBlank: true,
                    value: 'no',
                    fieldLabel: 'Directmedia'
                }, {
                    name: 'qualify',
                    fieldLabel: 'Qualify',
                    allowBlank: true,
                    value: 'yes'
                }, {
                    name: 'type',
                    fieldLabel: 'Type',
                    allowBlank: true,
                    value: 'peer'
                }, {
                    name: 'disallow',
                    fieldLabel: 'Disallow',
                    allowBlank: true,
                    value: 'all'
                }, {
                    name: 'sendrpid',
                    fieldLabel: 'Sendrpid',
                    allowBlank: true,
                    value: 'no'
                }, {
                    name: 'addparameter',
                    fieldLabel: t('addparameter'),
                    allowBlank: true,
                    emptyText: t('parameterdial')
                }, {
                    xtype: 'numberfield',
                    name: 'port',
                    fieldLabel: t('Port'),
                    value: '5060',
                    readOnly: !App.user.isAdmin,
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    xtype: 'textarea',
                    name: 'link_sms',
                    fieldLabel: t('link_sms'),
                    allowBlank: true,
                    emptyText: t('linksmsobs'),
                    height: 100,
                    anchor: '100%'
                }, {
                    name: 'sms_res',
                    fieldLabel: t('sms_res'),
                    allowBlank: true
                }]
            }, {
                title: t('Asterisk extra config'),
                items: [{
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    labelWidth: 90,
                    xtype: 'textarea',
                    name: 'sip_config',
                    fieldLabel: t('asterisk_config'),
                    allowBlank: true,
                    height: 400,
                    anchor: '100%',
                    hidden: !App.user.isAdmin
                }]
            }]
        }];
        me.callParent(arguments);
    }
});