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
                title: t('General'),
                items: [{
                    name: 'username',
                    fieldLabel: t('Username'),
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
                    xtype: 'groupusercombo',
                    name: 'id_group',
                    fieldLabel: t('Group'),
                    allowBlank: !App.user.isAdmin,
                    hidden: !App.user.isAdmin
                }, {
                    xtype: 'groupuseragentcombo',
                    name: 'id_group_agent',
                    fieldLabel: t('Group for agent users'),
                    emptyText: t('SELECT GROUP FOR AGENT USERS'),
                    hidden: true,
                    allowBlank: true
                }, {
                    xtype: 'planlookup',
                    ownerForm: me,
                    name: 'id_plan',
                    fieldLabel: t('Plan'),
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    xtype: 'languagecombo',
                    name: 'language',
                    fieldLabel: t('Language'),
                    value: App.user.language == 'pt_BR' ? 'br' : App.user.language
                }, {
                    name: 'prefix_local',
                    fieldLabel: t('Prefix rules'),
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
                    fieldLabel: t('Country'),
                    value: App.user.language == 'pt_BR' ? '55' : '1',
                    allowBlank: true
                }, {
                    xtype: 'offercombo',
                    name: 'id_offer',
                    fieldLabel: t('Activate offer'),
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
                defaults: {
                    labelAlign: 'right',
                    plugins: 'markallowblank',
                    allowBlank: false,
                    anchor: '100%',
                    enableKeyEvents: true,
                    labelWidth: 145
                },
                title: t('Personal data'),
                itemId: 'personalData',
                items: [{
                    name: 'company_website',
                    fieldLabel: t('Company website'),
                    allowBlank: true
                }, {
                    name: 'company_name',
                    fieldLabel: t('Company name'),
                    allowBlank: true
                }, {
                    name: 'state_number',
                    fieldLabel: t('State number'),
                    allowBlank: true,
                    hidden: App.user.base_country = !'BRL'
                }, {
                    name: 'lastname',
                    fieldLabel: t('Last name'),
                    allowBlank: true,
                    maxLength: 40,
                    minLength: 4
                }, {
                    name: 'firstname',
                    fieldLabel: t('First name'),
                    allowBlank: true,
                    maxLength: 40,
                    minLength: 4
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'city',
                        fieldLabel: t('City'),
                        allowBlank: true,
                        labelWidth: 145,
                        maxLength: 40,
                        minLength: 4,
                        flex: 2
                    }, {
                        name: 'state',
                        fieldLabel: t('State'),
                        allowBlank: true,
                        maxLength: 20,
                        minLength: 2
                    }]
                }, {
                    name: 'address',
                    fieldLabel: t('Address'),
                    allowBlank: true
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'neighborhood',
                        fieldLabel: t('Neighborhood'),
                        allowBlank: true,
                        labelWidth: 145,
                        flex: 2
                    }, {
                        name: 'zipcode',
                        fieldLabel: t('Zip code'),
                        allowBlank: true,
                        flex: 2
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        flex: 1
                    },
                    items: [{
                        name: 'phone',
                        fieldLabel: t('Phone'),
                        allowBlank: true,
                        labelWidth: 145,
                        maxLength: 13,
                        minLength: 8
                    }, {
                        name: 'mobile',
                        fieldLabel: t('Mobile'),
                        allowBlank: true,
                        maxLength: 20,
                        minLength: 8
                    }]
                }, {
                    name: 'email',
                    fieldLabel: t('Email'),
                    allowBlank: true,
                    vtype: 'email'
                }, {
                    name: 'doc',
                    fieldLabel: t('DOC'),
                    allowBlank: true
                }, {
                    name: 'vat',
                    fieldLabel: t('VAT'),
                    hidden: App.user.isClient,
                    allowBlank: true
                }]
            }, {
                title: t('Supplementary info'),
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
                    fieldLabel: t('Type paid'),
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
                        fieldLabel: t('Credit limit'),
                        value: 0,
                        allowBlank: true,
                        readOnly: App.user.isClient,
                        flex: 2
                    }, {
                        xtype: 'numberfield',
                        name: 'credit_notification',
                        fieldLabel: t('Credit notification'),
                        labelWidth: 170,
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
                        fieldLabel: t('Enable expire'),
                        allowBlank: true,
                        hidden: !App.user.isAdmin,
                        flex: 2
                    }, {
                        xtype: 'datefield',
                        name: 'expirationdate',
                        fieldLabel: t('Expiration date'),
                        format: 'Y-m-d H:i:s',
                        allowBlank: true,
                        hidden: !App.user.isAdmin,
                        labelWidth: 170,
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
                        xtype: 'numberfield',
                        name: 'calllimit',
                        fieldLabel: t('Call limit'),
                        labelWidth: 145,
                        value: '-1',
                        minValue: -1,
                        flex: 2
                    }, {
                        xtype: 'combobox',
                        name: 'calllimit_error',
                        fieldLabel: t('Limit error'),
                        labelWidth: 170,
                        forceSelection: true,
                        editable: false,
                        value: '503',
                        store: [
                            ['503', t('Congestion')],
                            ['403', t('Busy')]
                        ],
                        flex: 3
                    }]
                }, {
                    xtype: 'combobox',
                    store: [
                        ['gsm', 'gsm'],
                        ['wav', 'wav'],
                        ['wav49', 'wav49']
                    ],
                    name: 'mix_monitor_format',
                    fieldLabel: t('Record call format'),
                    forceSelection: true,
                    editable: false,
                    allowBlank: true,
                    value: 'gsm',
                    hidden: !App.user.isAdmin
                }, {
                    xtype: 'noyescombo',
                    name: 'callshop',
                    fieldLabel: t('Callshop'),
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
                    xtype: 'numberfield',
                    name: 'sipaccountlimit',
                    fieldLabel: t('SIP account limit'),
                    value: '-1',
                    minValue: -1,
                    allowBlank: !App.user.isAdmin,
                    readOnly: !App.user.isAdmin,
                    hidden: !haveServiceMenu
                }, {
                    xtype: 'numberfield',
                    name: 'callingcard_pin',
                    fieldLabel: t('CallingCard PIN'),
                    minValue: 100000,
                    maxLength: 6,
                    minLength: 6
                }, {
                    xtype: 'restrictioncombo',
                    name: 'restriction',
                    fieldLabel: t('Restriction'),
                    allowBlank: true,
                    hidden: App.user.isClient
                }]
            }, {
                title: window.showservices ? t('Services') : t('Send credit'),
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
                        fieldLabel: window.showservices ? t('Dynamic callerID') : t('Enable International')
                    }, {
                        xtype: 'numberfield',
                        name: 'transfer_international_profit',
                        fieldLabel: t('Profit'),
                        hidden: !window.transferToMobile,
                        labelWidth: 120,
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
                        fieldLabel: window.showservices ? t('Procom') : t('Enable flexiload')
                    }, {
                        xtype: 'numberfield',
                        name: 'transfer_flexiload_profit',
                        fieldLabel: t('Profit'),
                        hidden: !window.transferToMobile,
                        labelWidth: 120,
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
                        xtype: 'numberfield',
                        name: 'transfer_bkash_profit',
                        fieldLabel: t('Profit'),
                        hidden: !window.transferToMobile,
                        labelWidth: 120,
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
                        fieldLabel: t('Profit'),
                        labelWidth: 120,
                        minValue: -100
                    }]
                }, {
                    xtype: 'numberfield',
                    name: 'transfer_bdservice_rate',
                    fieldLabel: 'BDService rate',
                    minValue: 0,
                    hidden: !App.user.isAdmin || !window.transferToMobile,
                    allowBlank: true
                }, {
                    xtype: 'numberfield',
                    name: 'transfer_show_selling_price',
                    fieldLabel: t('Show selling price'),
                    hidden: !window.transferToMobile,
                    allowBlank: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});