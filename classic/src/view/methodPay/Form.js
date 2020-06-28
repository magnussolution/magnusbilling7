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
 * 25/06/2012
 */
Ext.define('MBilling.view.methodPay.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.methodpayform',
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'methodpaycombo',
            name: 'payment_method',
            valueField: 'payment_method',
            fieldLabel: t('paymentmethods')
        }, {
            name: 'show_name',
            fieldLabel: t('showName')
        }, {
            xtype: 'userlookup',
            ownerForm: me,
            name: 'id_user'
        }, {
            xtype: 'paymentcountrycombo',
            name: 'country',
            fieldLabel: t('country')
        }, {
            xtype: 'booleancombo',
            name: 'active',
            fieldLabel: t('active')
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,00',
            name: 'min',
            value: 10,
            fieldLabel: t('Min amount')
        }, {
            xtype: 'moneyfield',
            mask: App.user.currency + ' #9.999.990,00',
            name: 'max',
            value: 500,
            fieldLabel: t('Max amount')
        }, {
            name: 'username',
            fieldLabel: t('Username'),
            allowBlank: true
        }, {
            name: 'url',
            fieldLabel: 'Url',
            allowBlank: true
        }, {
            xtype: 'noyescombo',
            name: 'fee',
            fieldLabel: t('Discount') + ' ' + t('Fee'),
            allowBlank: true
        }, {
            xtype: 'paymentbanckcombo',
            name: 'boleto_banco',
            fieldLabel: t('Bank'),
            allowBlank: true
        }, {
            name: 'boleto_convenio',
            fieldLabel: t('numeroconvenio'),
            allowBlank: true
        }, {
            name: 'boleto_agencia',
            fieldLabel: t('agencia'),
            allowBlank: true
        }, {
            name: 'boleto_conta_corrente',
            fieldLabel: t('contacorrente'),
            allowBlank: true
        }, {
            name: 'boleto_inicio_nosso_numeroa',
            fieldLabel: t('Inicio nosso nº'),
            allowBlank: true
        }, {
            name: 'boleto_carteira',
            fieldLabel: t('carteira'),
            allowBlank: true
        }, {
            name: 'boleto_taxa',
            fieldLabel: t('taxa'),
            allowBlank: true
        }, {
            name: 'boleto_instrucoes',
            fieldLabel: t('instructions'),
            maxLength: '100',
            allowBlank: true
        }, {
            name: 'boleto_nome_emp',
            fieldLabel: t('company'),
            allowBlank: true
        }, {
            name: 'boleto_end_emp',
            fieldLabel: t('address'),
            allowBlank: true
        }, {
            name: 'boleto_cidade_emp',
            fieldLabel: t('city'),
            allowBlank: true
        }, {
            name: 'boleto_estado_emp',
            fieldLabel: t('state'),
            allowBlank: true
        }, {
            name: 'boleto_cpf_emp',
            fieldLabel: 'CNPJ CPF',
            allowBlank: true
        }, {
            name: 'pagseguro_TOKEN',
            fieldLabel: 'TOKEN',
            allowBlank: true
        }, {
            name: 'P2P_CustomerSiteID',
            fieldLabel: t('P2P CustomerSiteID'),
            allowBlank: true
        }, {
            name: 'P2P_KeyID',
            fieldLabel: t('P2P KeyID'),
            allowBlank: true
        }, {
            name: 'P2P_Passphrase',
            fieldLabel: t('P2P Passphrase'),
            allowBlank: true
        }, {
            name: 'P2P_RecipientKeyID',
            fieldLabel: t('P2P RecipientKeyID'),
            allowBlank: true
        }, {
            name: 'P2P_tax_amount',
            fieldLabel: t('P2P Tax Amount'),
            allowBlank: true
        }, {
            name: 'client_id',
            fieldLabel: t('Client id'),
            allowBlank: true
        }, {
            name: 'client_secret',
            fieldLabel: t('Client Secret'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});