/**
 * Classe que define a lista de "Boleto"
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
 * 19/09/2012
 */
Ext.define('MBilling.view.boleto.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.boletolist',
    store: 'Boleto',
    iconButtonCsv: 'boleto',
    textButtonCsv: t('Importar Retorno'),
    iconButtonImportCsv: 'boleto',
    textButtonImportCsv: t('Importar Retorno'),
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.buttonUpdateLot = false;
        me.buttonImportCsv = App.user.isAdmin;
        me.extraButtons = [{
            text: t('Segunda via'),
            iconCls: 'boleto',
            handler: 'onSecondVia',
            disabled: false
        }];
        me.columns = [{
            header: t('Nosso Número'),
            dataIndex: 'id',
            flex: 3,
            hidden: !App.user.isAdmin,
            hideable: App.user.isAdmin
        }, {
            header: t('user'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('value'),
            dataIndex: 'payment',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 4
        }, {
            header: 'Pago',
            dataIndex: 'status',
            renderer: Helper.Util.formattyyesno,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            }
        }, {
            header: t('description'),
            dataIndex: 'description',
            flex: 5
        }, {
            header: 'Vencimento',
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            dataIndex: 'vencimento',
            flex: 4
        }, {
            header: 'Gerado',
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 4
        }]
        me.callParent(arguments);
    }
});