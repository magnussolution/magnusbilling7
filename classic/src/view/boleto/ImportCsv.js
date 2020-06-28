/**
 * Classe que define a window import csv de "Rate"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author  Adilson Leffa Magnus.
 * @copyright   Todos os direitos reservados.
 * ###################################
 * =======================================
 * MagnusSolution.com <info@magnussolution.com>
 * 08/11/2012
 */
Ext.define('MBilling.view.boleto.ImportCsv', {
    extend: 'Ext.ux.window.ImportBoleto',
    alias: 'widget.boletoimportcsv',
    title: t('Importar Retorno'),
    labelWidthFields: 250,
    height: 275,
    fieldsImport: [{
        xtype: 'boletobanckcombo',
        name: 'banco',
        fieldLabel: t('Banco'),
        width: 350
    }]
});