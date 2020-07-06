/**
 * Class to define form to "User"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 15/04/2013
 */
Ext.define('MBilling.view.user.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.userform',
    autoHeight: 300,
    bodyPadding: 0,
    fieldsHideUpdateLot: ['username', 'password', 'id_group_agent', 'id_offer', 'callingcard_pin'],
    initComponent: function() {
        var me = this;
        haveServiceMenu = false;
        Ext.each(App.user.menu, function(item) {
            if (item.text == "t('Services')") haveServiceMenu = true;
        });
        me.extraButtons = [{
            text: t('Resend') + ' Email',
            iconCls: 'x-fa fa-envelope',
            handler: 'onResendActivation',
            width: 130
        }];
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
                    name: 'username',
                    fieldLabel: t('username'),
                    maxLength: 20,
                    minLength: 4,
                    readOnly: App.user.isClient
                }, {
                    name: 'password',
                    fieldLabel: t('Password'),
                    minLength: 6,
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'id_group',
                    fieldLabel: t('IdGroup'),
                    xtype: 'groupusercombo',
                    allowBlank: !App.user.isAdmin,
                    hidden: !App.user.isAdmin
                }, {
                    name: 'id_group_agent',
                    fieldLabel: t('GroupUser'),
                    xtype: 'groupuseragentcombo',
                    emptyText: t('SELECT GROUP FOR AGENT USERS'),
                    fieldLabel: t('Group for Agent Users'),
                    hidden: true,
                    allowBlank: true
                }, {
                    fieldLabel: t('Plan'),
                    name: 'id_plan',
                    xtype: 'planlookup',
                    ownerForm: me,
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    xtype: 'languagecombo',
                    name: 'language',
                    value: App.user.language == 'pt_BR' ? 'br' : App.user.language,
                    fieldLabel: t('language')
                }, {
                    name: 'prefix_local',
                    fieldLabel: t('prefixlocal'),
                    value: App.user.base_country == 'BRL' ? '0/55/11,0/55/12,*/5511/8,*/5511/9' : App.user.base_country == 'ARG' ? '0/54,*/5411/8,15/54911/10,16/54911/10' : '',
                    allowBlank: true,
                    emptyText: 'match / replace / length',
                    hidden: App.user.isClient
                }, {
                    xtype: 'statususercombo',
                    name: 'active',
                    fieldLabel: t('Active'),
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    xtype: 'countrycombo',
                    name: 'country',
                    fieldLabel: t('country'),
                    value: App.user.language == 'pt_BR' ? '55' : '1',
                    allowBlank: true
                }, {
                    name: 'id_offer',
                    fieldLabel: t('offer'),
                    xtype: 'offercombo',
                    allowBlank: true
                }, {
                    xtype: 'numberfield',
                    name: 'cpslimit',
                    fieldLabel: t('CPS Limit'),
                    value: -1,
                    minValue: -1,
                    maxValue: 50,
                    hidden: !window.dialC || !App.user.isAdmin,
                    allowBlank: true
                }]
            }, {
                title: t('personalData'),
                itemId: 'personalData',
                items: [, {
                    name: 'company_name',
                    fieldLabel: t('company') + ' ' + t('name'),
                    allowBlank: true
                }, {
                    name: 'state_number',
                    fieldLabel: t('state_number'),
                    allowBlank: true,
                    hidden: App.user.base_country = !'BRL'
                }, {
                    name: 'lastname',
                    fieldLabel: t('lastname'),
                    allowBlank: true,
                    maxLength: 40,
                    minLength: 4
                }, {
                    name: 'firstname',
                    fieldLabel: t('firstname'),
                    allowBlank: true,
                    maxLength: 40,
                    minLength: 4
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelWidth: 100,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'city',
                        fieldLabel: t('city'),
                        allowBlank: true,
                        maxLength: 40,
                        minLength: 4,
                        flex: 2
                    }, {
                        name: 'state',
                        fieldLabel: t('state'),
                        allowBlank: true,
                        maxLength: 20,
                        minLength: 2
                    }]
                }, {
                    name: 'address',
                    fieldLabel: t('address'),
                    allowBlank: true
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelWidth: 100,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'neighborhood',
                        fieldLabel: t('Neighborhood'),
                        allowBlank: true,
                        flex: 2
                    }, {
                        name: 'zipcode',
                        fieldLabel: t('zipcode'),
                        allowBlank: true,
                        flex: 2
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelWidth: 100,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'phone',
                        fieldLabel: t('phone'),
                        allowBlank: true,
                        maxLength: 13,
                        minLength: 8
                    }, {
                        name: 'mobile',
                        fieldLabel: t('mobile'),
                        allowBlank: true,
                        maxLength: 20,
                        minLength: 8
                    }]
                }, {
                    name: 'email',
                    fieldLabel: t('email'),
                    allowBlank: true,
                    vtype: 'email'
                }, {
                    name: 'doc',
                    fieldLabel: t('Doc'),
                    allowBlank: true
                }, {
                    name: 'vat',
                    fieldLabel: t('VAT'),
                    hidden: App.user.isClient,
                    allowBlank: true
                }]
            }, {
                title: t('suplementaryInfo'),
                itemId: 'suplementaryInfo',
                defaults: {
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true,
                    labelWidth: 145
                },
                items: [{
                    xtype: 'typepaymentcombo',
                    name: 'typepaid',
                    fieldLabel: t('typepaid'),
                    allowBlank: true,
                    readOnly: App.user.isClient
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        labelWidth: 145,
                        flex: 1
                    },
                    items: [{
                        name: 'creditlimit',
                        fieldLabel: t('creditlimit'),
                        value: 0,
                        allowBlank: true,
                        readOnly: App.user.isClient,
                        flex: 2
                    }, {
                        xtype: 'numberfield',
                        name: 'credit_notification',
                        labelWidth: 150,
                        fieldLabel: t('creditnotification'),
                        value: '-1',
                        minValue: -1,
                        allowBlank: true,
                        flex: 3
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        labelWidth: 145,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'enableexpire',
                        fieldLabel: t('enableexpire'),
                        allowBlank: true,
                        hidden: !App.user.isAdmin,
                        flex: 2
                    }, {
                        xtype: 'datefield',
                        name: 'expirationdate',
                        fieldLabel: t('expirationdate'),
                        format: 'Y-m-d H:i:s',
                        allowBlank: true,
                        hidden: !App.user.isAdmin,
                        labelWidth: 150,
                        flex: 3
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        labelWidth: 145,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'record_call',
                        fieldLabel: t('record_call'),
                        allowBlank: true,
                        hidden: !haveServiceMenu || !App.user.isAdmin,
                        readOnly: !App.user.isAdmin,
                        flex: 2
                    }, {
                        labelWidth: 150,
                        xtype: 'combobox',
                        store: [
                            ['gsm', t('gsm')],
                            ['wav', t('wav')],
                            ['wav49', t('wav49')]
                        ],
                        name: 'mix_monitor_format',
                        fieldLabel: t('Record call format'),
                        forceSelection: true,
                        editable: false,
                        allowBlank: true,
                        value: 'gsm',
                        hidden: !haveServiceMenu,
                        flex: 3
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    labelWidth: 145,
                    defaults: {
                        labelAlign: 'right',
                        hidden: !haveServiceMenu,
                        readOnly: !App.user.isAdmin,
                        allowBlank: true,
                        flex: 1
                    },
                    items: [{
                        labelWidth: 145,
                        xtype: 'numberfield',
                        name: 'calllimit',
                        fieldLabel: t('calllimit'),
                        value: '-1',
                        minValue: -1,
                        flex: 2
                    }, {
                        labelWidth: 150,
                        xtype: 'combobox',
                        forceSelection: true,
                        editable: false,
                        name: 'calllimit_error',
                        fieldLabel: t('Limit error'),
                        value: '503',
                        store: [
                            ['503', t('Congestion')],
                            ['403', t('Busy')]
                        ],
                        flex: 3
                    }]
                }, {
                    xtype: 'noyescombo',
                    name: 'callshop',
                    fieldLabel: 'Callshop',
                    allowBlank: true,
                    hidden: App.user.isClient
                }, {
                    xtype: 'numberfield',
                    name: 'disk_space',
                    fieldLabel: t('Disk space'),
                    value: -1,
                    hidden: !haveServiceMenu,
                    minValue: -1,
                    readOnly: !App.user.isAdmin
                }, {
                    name: 'sipaccountlimit',
                    xtype: 'numberfield',
                    fieldLabel: t('Sip Account Limit'),
                    value: '-1',
                    minValue: -1,
                    allowBlank: !App.user.isAdmin,
                    readOnly: !App.user.isAdmin,
                    hidden: !haveServiceMenu
                }, {
                    xtype: 'numberfield',
                    name: 'callingcard_pin',
                    fieldLabel: t('lockpin'),
                    minValue: 100000,
                    maxLength: 6,
                    minLength: 6
                }, {
                    xtype: 'restrictioncombo',
                    name: 'restriction',
                    fieldLabel: t('restriction'),
                    allowBlank: true,
                    hidden: App.user.isClient
                }]
            }, {
                title: window.showservices ? t('Services') : t('Send Credit'),
                itemId: 'transferData',
                hidden: !window.transferToMobile && !window.showservices,
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    hidden: App.user.isClient,
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 145,
                        allowBlank: true,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'transfer_international',
                        fieldLabel: window.showservices ? t('CallerId Inteligente') : t('Enable International')
                    }, {
                        hidden: !window.transferToMobile,
                        xtype: 'numberfield',
                        name: 'transfer_international_profit',
                        labelWidth: 120,
                        fieldLabel: t('Profit'),
                        minValue: -100
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    hidden: App.user.isClient,
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 145,
                        allowBlank: true,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'transfer_flexiload',
                        fieldLabel: window.showservices ? t('Procom') : t('Enable Flexiload')
                    }, {
                        hidden: !window.transferToMobile,
                        xtype: 'numberfield',
                        name: 'transfer_flexiload_profit',
                        labelWidth: 120,
                        fieldLabel: t('Profit'),
                        minValue: -100
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    hidden: App.user.isClient,
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 145,
                        allowBlank: true,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'transfer_bkash',
                        fieldLabel: window.showservices ? t('Não perturbe') : t('Enable Bkash')
                    }, {
                        hidden: !window.transferToMobile,
                        xtype: 'numberfield',
                        name: 'transfer_bkash_profit',
                        labelWidth: 120,
                        fieldLabel: t('Profit'),
                        minValue: -100
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    hidden: App.user.isClient || !window.transferToMobile,
                    defaults: {
                        labelAlign: 'right',
                        labelWidth: 145,
                        allowBlank: true,
                        flex: 1
                    },
                    items: [{
                        xtype: 'noyescombo',
                        name: 'transfer_dbbl_rocket',
                        fieldLabel: t('Enable DBBL/Rocket')
                    }, {
                        xtype: 'numberfield',
                        name: 'transfer_dbbl_rocket_profit',
                        labelWidth: 120,
                        fieldLabel: t('Profit'),
                        minValue: -100
                    }]
                }, {
                    xtype: 'numberfield',
                    name: 'transfer_bdservice_rate',
                    fieldLabel: t('BDService rate'),
                    minValue: 0,
                    hidden: !App.user.isAdmin || !window.transferToMobile,
                    allowBlank: true
                }, {
                    hidden: !window.transferToMobile,
                    xtype: 'numberfield',
                    name: 'transfer_show_selling_price',
                    fieldLabel: t('show selling price'),
                    allowBlank: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});