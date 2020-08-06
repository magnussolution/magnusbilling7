/**
 * Classe que define o form de "Admin"
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
            fieldLabel: t('Payment methods')
        }, {
            name: 'show_name',
            fieldLabel: t('Show name')
        }, {
            xtype: 'userlookup',
            ownerForm: me,
            name: 'id_user',
            fieldLabel: t('Username')
        }, {
            xtype: 'paymentcountrycombo',
            name: 'country',
            fieldLabel: t('Country')
        }, {
            xtype: 'booleancombo',
            name: 'active',
            fieldLabel: t('Active')
        }, {
            xtype: 'moneyfield',
            name: 'min',
            fieldLabel: t('Min amount'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            value: 10
        }, {
            xtype: 'moneyfield',
            name: 'max',
            fieldLabel: t('Max amount'),
            mask: App.user.currency + ' #9.999.990,' + App.user.decimalPrecision,
            value: 500
        }, {
            name: 'username',
            fieldLabel: t('Username'),
            allowBlank: true
        }, {
            name: 'url',
            fieldLabel: t('URL'),
            allowBlank: true
        }, {
            xtype: 'noyescombo',
            name: 'fee',
            fieldLabel: t('Discount fee'),
            allowBlank: true
        }, {
            xtype: 'paymentbanckcombo',
            name: 'boleto_banco',
            fieldLabel: t('Bank'),
            allowBlank: true
        }, {
            name: 'boleto_convenio',
            fieldLabel: 'Convenio',
            allowBlank: true
        }, {
            name: 'boleto_agencia',
            fieldLabel: t('Bank agency'),
            allowBlank: true
        }, {
            name: 'boleto_conta_corrente',
            fieldLabel: t('Bank account'),
            allowBlank: true
        }, {
            name: 'boleto_inicio_nosso_numeroa',
            fieldLabel: 'Inicio nosso numero',
            allowBlank: true
        }, {
            name: 'boleto_carteira',
            fieldLabel: 'Carteira',
            allowBlank: true
        }, {
            name: 'boleto_taxa',
            fieldLabel: t('Tax'),
            allowBlank: true
        }, {
            name: 'boleto_instrucoes',
            fieldLabel: t('Instructions'),
            maxLength: '100',
            allowBlank: true
        }, {
            name: 'boleto_nome_emp',
            fieldLabel: t('Company'),
            allowBlank: true
        }, {
            name: 'boleto_end_emp',
            fieldLabel: t('Address'),
            allowBlank: true
        }, {
            name: 'boleto_cidade_emp',
            fieldLabel: t('City'),
            allowBlank: true
        }, {
            name: 'boleto_estado_emp',
            fieldLabel: t('State'),
            allowBlank: true
        }, {
            name: 'boleto_cpf_emp',
            fieldLabel: t('DOC'),
            allowBlank: true
        }, {
            name: 'pagseguro_TOKEN',
            fieldLabel: t('TOKEN'),
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
            fieldLabel: t('Client secret'),
            allowBlank: true
        }];
        me.callParent(arguments);
    }
});