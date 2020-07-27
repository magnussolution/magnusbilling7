/**
 * Classe que define o form de "Did"
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
 * 24/09/2012
 */
Ext.define('MBilling.view.did.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.didform',
    fieldsHideUpdateLot: ['did'],
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
                    labelWidth: 140
                }
            },
            items: [{
                title: t('general'),
                items: [{
                    name: 'did',
                    fieldLabel: t('did'),
                    readOnly: App.user.isClient || App.user.isAgent
                }, {
                    xtype: 'booleancombo',
                    name: 'activated',
                    fieldLabel: t('status'),
                    hidden: App.user.isClient || App.user.isAgent,
                    allowBlank: true
                }, {
                    name: 'callerid',
                    fieldLabel: t('callerid_name'),
                    allowBlank: true
                }, {
                    xtype: 'moneyfield',
                    mask: App.user.currency + ' #9.999.990,00',
                    name: 'connection_charge',
                    fieldLabel: t('connection_charge'),
                    value: '0',
                    hidden: App.user.isClient || App.user.isAgent
                }, {
                    xtype: 'moneyfield',
                    mask: App.user.currency + ' #9.999.990,00',
                    name: 'fixrate',
                    fieldLabel: t('monthly_price'),
                    value: '0',
                    hidden: App.user.isClient || App.user.isAgent
                }, {
                    style: 'margin-top:5px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Did') + ' ' + t('increment'),
                    collapsible: false,
                    collapsed: false,
                    hidden: !App.user.isAdmin,
                    defaults: {
                        labelWidth: 160,
                        anchor: '100%',
                        labelAlign: me.labelAlignFields
                    },
                    items: [{
                        xtype: 'moneyfield',
                        mask: App.user.currency + ' #9.999.990,00',
                        name: 'connection_sell',
                        fieldLabel: t('Connection charge'),
                        value: '0',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'numberfield',
                        name: 'minimal_time_charge',
                        fieldLabel: t('Minimum time to charge'),
                        value: '1',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'numberfield',
                        name: 'initblock',
                        fieldLabel: t('initblock'),
                        value: '1',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'numberfield',
                        name: 'increment',
                        fieldLabel: t('billingblock'),
                        value: '1',
                        hidden: !App.user.isAdmin
                    }]
                }, {
                    xtype: 'combobox',
                    name: 'charge_of',
                    fieldLabel: t('charge_who'),
                    value: 1,
                    forceSelection: true,
                    editable: false,
                    store: [
                        [1, t('DID owner')],
                        [0, t('CallerID, only allowing calls from registered callerIDs')]
                    ],
                    hidden: App.user.isClient || App.user.isAgent
                }, {
                    xtype: 'numberfield',
                    name: 'calllimit',
                    fieldLabel: t('Channel Limit'),
                    value: '-1',
                    minValue: '-1',
                    hidden: !window.didChannelLimit || !App.user.isAdmin
                }, {
                    xtype: 'textareafield',
                    allowBlank: true,
                    name: 'description',
                    fieldLabel: t('description'),
                    hidden: !App.user.isAdmin
                }]
            }, {
                title: t('Billing'),
                items: [{
                    style: 'margin-top:5px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Did Billing per minute') + ' ' + t('rate') + ' 1',
                    collapsible: false,
                    collapsed: false,
                    hidden: !App.user.isAdmin,
                    defaults: {
                        labelWidth: 170,
                        anchor: '100%',
                        labelAlign: me.labelAlignFields
                    },
                    items: [{
                        // mobile
                        //^55[1-9]{2}9[0-9]{8}|^55[1-9]{2}7[0-9]{7}
                        //fixed
                        // ^55[1-9][1-9][2-5].$|^[1-9][1-9][2-5].$
                        xtype: 'textfield',
                        name: 'expression_1',
                        fieldLabel: t('Regular expression'),
                        value: '*',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'moneyfield',
                        mask: App.user.currency + ' #9.999.990,00',
                        name: 'selling_rate_1',
                        fieldLabel: t('Sell price per min'),
                        value: '0',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'block_expression_1',
                        fieldLabel: t('Block calls from this expression'),
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'send_to_callback_1',
                        fieldLabel: t('Send the call to callback'),
                        hidden: !App.user.isAdmin
                    }]
                }, {
                    style: 'margin-top:25px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Did Billing per minute') + ' ' + t('rate') + ' 2',
                    collapsible: false,
                    collapsed: false,
                    hidden: !App.user.isAdmin,
                    defaults: {
                        labelWidth: 160,
                        anchor: '100%',
                        labelAlign: me.labelAlignFields
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'expression_2',
                        fieldLabel: t('Regular expression'),
                        value: '*',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'moneyfield',
                        mask: App.user.currency + ' #9.999.990,00',
                        name: 'selling_rate_2',
                        fieldLabel: t('Sell price per min'),
                        value: '0',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'block_expression_2',
                        fieldLabel: t('Block calls from this expression'),
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'send_to_callback_2',
                        fieldLabel: t('Send the call to callback'),
                        hidden: !App.user.isAdmin
                    }]
                }, {
                    style: 'margin-top:25px; overflow: visible;',
                    xtype: 'fieldset',
                    title: t('Did Billing per minute') + ' ' + t('rate') + ' 3',
                    collapsible: false,
                    collapsed: false,
                    hidden: !App.user.isAdmin,
                    defaults: {
                        labelWidth: 160,
                        anchor: '100%',
                        labelAlign: me.labelAlignFields
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'expression_3',
                        fieldLabel: t('Regular expression'),
                        value: '*',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'moneyfield',
                        mask: App.user.currency + ' #9.999.990,00',
                        name: 'selling_rate_3',
                        fieldLabel: t('Sell price per min'),
                        value: '0',
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'block_expression_3',
                        fieldLabel: t('Block calls from this expression'),
                        hidden: !App.user.isAdmin
                    }, {
                        xtype: 'noyescombo',
                        name: 'send_to_callback_3',
                        fieldLabel: t('Send the call to callback'),
                        hidden: !App.user.isAdmin
                    }]
                }]
            }, {
                title: t('CallBack Pro'),
                hidden: !window.cbr,
                items: [{
                    xtype: 'booleancombo',
                    name: 'cbr',
                    fieldLabel: t('CallBack Pro'),
                    value: 0,
                    //window.cbr=1; no index.html
                    hidden: !window.cbr,
                    allowBlank: true
                }, {
                    xtype: 'noyescombo',
                    name: 'cbr_ua',
                    fieldLabel: t('Use Audio'),
                    value: 0,
                    hidden: true,
                    allowBlank: true
                }, {
                    xtype: 'numberfield',
                    name: 'cbr_total_try',
                    fieldLabel: t('Maximum trying'),
                    value: 3,
                    hidden: true,
                    allowBlank: true,
                    minValue: 0
                }, {
                    xtype: 'numberfield',
                    name: 'cbr_time_try',
                    fieldLabel: t('Interval beteween trying'),
                    value: 30,
                    hidden: true,
                    allowBlank: true,
                    minValue: 10
                }, {
                    xtype: 'noyescombo',
                    name: 'cbr_em',
                    fieldLabel: t('Early Media'),
                    hidden: true,
                    allowBlank: true
                }, {
                    name: 'TimeOfDay_monFri',
                    fieldLabel: t('Mon-Fri'),
                    value: '09:00-12:00|14:00-18:00',
                    minLength: 11,
                    hidden: true
                }, {
                    name: 'TimeOfDay_sat',
                    fieldLabel: t('Sat'),
                    value: '09:00-12:00',
                    allowBlank: true,
                    hidden: true
                }, {
                    name: 'TimeOfDay_sun',
                    fieldLabel: t('Sun'),
                    value: '00:00',
                    allowBlank: true,
                    hidden: true
                }, {
                    xtype: 'uploadfield',
                    fieldLabel: t('workaudio'),
                    emptyText: 'Select an gsm File',
                    allowBlank: true,
                    name: 'workaudio',
                    extAllowed: ['wav', 'gsm'],
                    hidden: true
                }, {
                    xtype: 'uploadfield',
                    fieldLabel: t('noworkaudio'),
                    emptyText: 'Select an gsm File',
                    allowBlank: true,
                    name: 'noworkaudio',
                    extAllowed: ['wav', 'gsm'],
                    hidden: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});