/**
 * Classe que define o form de "SubModule"
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
 * 04/07/2012
 */
Ext.define('MBilling.view.plan.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.planform',
    labelWidthFields: 115,
    fieldsHideUpdateLot: ['name'],
    initComponent: function() {
        var me = this;
        me.defaults = {
            labelWidth: 142
        };
        me.items = [{
            name: 'name',
            fieldLabel: t('name'),
            maxLength: 100
        }, {
            xtype: 'noyescombo',
            name: 'signup',
            fieldLabel: t('useInSignup'),
            allowBlank: true
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,00',
            name: 'ini_credit',
            fieldLabel: t('Initial Credit to new users'),
            allowBlank: true,
            hidden: true,
            value: 0
        }, {
            xtype: 'yesnocombo',
            name: 'play_audio',
            fieldLabel: t('Notices with audio'),
            allowBlank: true,
            hidden: App.user.isClient
        }, {
            style: 'margin-top:25px; overflow: visible;',
            xtype: 'fieldset',
            title: t('Ativar portabilidade?'),
            collapsible: true,
            collapsed: false,
            hidden: App.user.language != 'pt_BR',
            defaults: {
                labelWidth: 190,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    labelAlign: me.labelAlignFields
                }
            },
            items: [{
                xtype: 'noyescombo',
                name: 'portabilidadeMobile',
                fieldLabel: t('Para Celular'),
                allowBlank: true,
                hidden: App.user.language != 'pt_BR'
            }, {
                xtype: 'noyescombo',
                name: 'portabilidadeFixed',
                fieldLabel: t('Para Fixo'),
                allowBlank: true,
                hidden: App.user.language != 'pt_BR'
            }]
        }, {
            name: 'techprefix',
            fieldLabel: t('Tech prefix'),
            allowBlank: true,
            maxLength: 5,
            minLength: 5,
            hidden: !App.user.isAdmin
        }, {
            style: 'margin-top:25px; overflow: visible;',
            xtype: 'fieldset',
            title: t('Select one or more Services'),
            collapsible: true,
            collapsed: false,
            items: [{
                anchor: '100%',
                fieldLabel: '',
                xtype: 'servicestag',
                allowBlank: true
            }]
        }];
        me.callParent(arguments);
    }
});