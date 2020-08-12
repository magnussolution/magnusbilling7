/**
 * Classe que define a lista de "Boleto"
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
 * 19/09/2012
 */
Ext.define('MBilling.view.boleto.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.boletolist',
    store: 'Boleto',
    iconButtonCsv: 'boleto',
    textButtonCsv: 'Importar Retorno',
    iconButtonImportCsv: 'boleto',
    textButtonImportCsv: 'Importar Retorno',
    initComponent: function() {
        var me = this;
        me.buttonCsv = false;
        me.buttonUpdateLot = false;
        me.buttonImportCsv = App.user.isAdmin;
        me.extraButtons = [{
            text: t('Duplicate'),
            iconCls: 'boleto',
            handler: 'onSecondVia',
            disabled: false
        }];
        me.columns = [{
            header: 'Nosso número',
            dataIndex: 'id',
            flex: 3,
            hidden: !App.user.isAdmin,
            hideable: App.user.isAdmin
        }, {
            header: t('Username'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 4,
            hidden: App.user.isClient,
            hideable: !App.user.isClient
        }, {
            header: t('Payment'),
            dataIndex: 'payment',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 4
        }, {
            header: t('Paid'),
            dataIndex: 'status',
            renderer: Helper.Util.formattyyesno,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [0, t('No')],
                    [1, t('Yes')]
                ]
            }
        }, {
            header: t('Description'),
            dataIndex: 'description',
            flex: 5
        }, {
            header: t('Due date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d'),
            dataIndex: 'vencimento',
            flex: 4
        }, {
            header: t('Created'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'date',
            flex: 4
        }]
        me.callParent(arguments);
    }
});