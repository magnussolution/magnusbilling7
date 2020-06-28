/**
 * Classe que define o form de "Admin"
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
 * 01/08/2012
 */
Ext.define('MBilling.view.sipuras.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.sipurasform',
    bodyPadding: 0,
    fieldsHideUpdateLot: ['id_user', 'nserie', 'macadr'],
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
                    hidden: App.user.isClient,
                    allowBlank: App.user.isClient
                }, {
                    name: 'nserie',
                    fieldLabel: 'Serial'
                }, {
                    name: 'macadr',
                    fieldLabel: 'Mac'
                }, {
                    name: 'senha_user',
                    fieldLabel: t('password') + ' ' + t('username'),
                    allowBlank: true
                }, {
                    name: 'senha_admin',
                    fieldLabel: t('password') + ' ' + t('admin'),
                    allowBlank: true
                }, {
                    name: 'antireset',
                    fieldLabel: t('antireset'),
                    xtype: 'noyescombo'
                }, {
                    name: 'Enable_Web_Server',
                    fieldLabel: t('Enable_Web_Server'),
                    xtype: 'yesnocombo'
                }, {
                    name: 'marca',
                    fieldLabel: 'marca',
                    value: '*',
                    hidden: true
                }, {
                    name: 'altera',
                    fieldLabel: 'altera',
                    value: 'si',
                    hidden: true
                }]
            }, {
                title: t('line') + ' 1',
                items: [{
                    name: 'User_ID_1',
                    fieldLabel: t('username'),
                    allowBlank: true
                }, {
                    name: 'Password_1',
                    fieldLabel: t('password'),
                    allowBlank: true
                }, {
                    name: 'Use_Pref_Codec_Only_1',
                    fieldLabel: t('Use_Pref_Codec'),
                    xtype: 'noyescombo'
                }, {
                    name: 'Preferred_Codec_1',
                    fieldLabel: t('codec'),
                    allowBlank: true,
                    value: 'G729a'
                }, {
                    name: 'Register_Expires_1',
                    fieldLabel: 'Register Expires',
                    allowBlank: true,
                    value: '360'
                }, {
                    name: 'Dial_Plan_1',
                    fieldLabel: 'Dial Plan',
                    allowBlank: true,
                    value: '(*xx|[3469]11|0|00|[2-9]xxxxxx|1xxx[2-9]xxxxxxS0|xxxxxxxxxxxx.)'
                }, {
                    name: 'NAT_Mapping_Enable_1_',
                    fieldLabel: 'NAT Mapping',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }, {
                    name: 'NAT_Keep_Alive_Enable_1_',
                    fieldLabel: 'NAT Keep Alive',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }]
            }, {
                title: t('line') + ' 2',
                items: [{
                    name: 'User_ID_2',
                    fieldLabel: t('username'),
                    allowBlank: true
                }, {
                    name: 'Password_2',
                    fieldLabel: t('password'),
                    allowBlank: true
                }, {
                    name: 'Use_Pref_Codec_Only_2',
                    fieldLabel: t('Use_Pref_Codec'),
                    xtype: 'noyescombo'
                }, {
                    name: 'Preferred_Codec_2',
                    fieldLabel: t('codec'),
                    allowBlank: true,
                    value: 'G729a'
                }, {
                    name: 'Register_Expires_2',
                    fieldLabel: 'Register Expires',
                    allowBlank: true,
                    value: '360'
                }, {
                    name: 'Dial_Plan_2',
                    fieldLabel: 'Dial Plan',
                    allowBlank: true,
                    value: '(*xx|[3469]11|0|00|[2-9]xxxxxx|1xxx[2-9]xxxxxxS0|xxxxxxxxxxxx.)'
                }, {
                    name: 'NAT_Mapping_Enable_2_',
                    fieldLabel: 'NAT Mapping',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }, {
                    name: 'NAT_Keep_Alive_Enable_2_',
                    fieldLabel: 'NAT Keep Alive',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }]
            }, {
                title: 'Stun',
                items: [{
                    name: 'STUN_Enable',
                    fieldLabel: t('active') + 'Stun',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }, {
                    name: 'STUN_Test_Enable',
                    fieldLabel: 'STUN Test',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }, {
                    name: 'Substitute_VIA_Addr',
                    fieldLabel: 'Substitute VIA Addr',
                    allowBlank: true,
                    xtype: 'noyescombo'
                }, {
                    name: 'STUN_Server',
                    fieldLabel: 'STUN Server',
                    allowBlank: true
                }]
            }]
        }];
        me.callParent(arguments);
    }
});