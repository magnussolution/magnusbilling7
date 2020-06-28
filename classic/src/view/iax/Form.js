/**
 * Classe que define o form de "iax"
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
 * 25/06/2016
 */
Ext.define('MBilling.view.iax.Form', {
    extend: 'Ext.ux.form.Panel',
    uses: ['Ext.ux.form.field.DateTime'],
    alias: 'widget.iaxform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_user', 'defaultuser', 'secret'],
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
                    enableKeyEvents: true,
                    labelAlign: 'right'
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
                    name: 'username',
                    fieldLabel: t('username'),
                    minLength: 4,
                    readOnly: App.user.isClient
                }, {
                    name: 'secret',
                    fieldLabel: t('password'),
                    allowBlank: true,
                    minLength: 6,
                    readOnly: App.user.isClient
                }, {
                    name: 'callerid',
                    fieldLabel: t('callerid'),
                    allowBlank: true
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
                    hidden: !App.user.isAdmin,
                    allowBlank: App.user.isClient
                }, {
                    name: 'host',
                    fieldLabel: t('host'),
                    value: 'dynamic',
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }]
            }, {
                title: t('natdetails'),
                hidden: !App.user.isAdmin,
                items: [{
                    name: 'nat',
                    fieldLabel: 'Nat',
                    value: App.user.asteriskVersion == '1.8' ? 'yes' : 'force_rport,comedia',
                    allowBlank: !App.user.isAdmin
                }]
            }, {
                title: t('suplementaryInfo'),
                hidden: !App.user.isAdmin,
                items: [{
                    name: 'context',
                    fieldLabel: t('context'),
                    value: 'billing',
                    hidden: !App.user.isAdmin,
                    allowBlank: true
                }, {
                    xtype: 'yesnostringcombo',
                    name: 'qualify',
                    fieldLabel: 'Qualify',
                    value: 'no',
                    allowBlank: !App.user.isAdmin
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
                    name: 'type',
                    fieldLabel: 'Type',
                    value: 'friend',
                    allowBlank: !App.user.isAdmin
                }, {
                    name: 'calllimit',
                    xtype: 'numberfield',
                    fieldLabel: t('calllimit'),
                    value: '0',
                    allowBlank: !App.user.isAdmin
                }]
            }]
        }];
        me.callParent(arguments);
    }
});