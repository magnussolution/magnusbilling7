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
Ext.define('MBilling.view.prefix.ImportCsv', {
    extend: 'Ext.ux.window.ImportCsv',
    alias: 'widget.prefiximportcsv',
    htmlTipInfo: '<br><b>' + t('dialprefix') + ", " + t('destination') + "</b>",
    labelWidthFields: 160,
    height: window.isThemeTriton ? 300 : 205,
    initComponent: function() {
        var me = this;
        me.fieldsImport = [{
            style: 'margin-top:25px; overflow: visible;',
            xtype: 'fieldset',
            title: t('Csv Format'),
            collapsible: true,
            collapsed: false,
            defaults: {
                labelWidth: 190,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    labelAlign: me.labelAlignFields
                }
            },
            items: [{
                xtype: 'pontovirgulacombo',
                name: 'delimiter',
                fieldLabel: t('Delimiter'),
                width: 230
            }]
        }];
        me.callParent(arguments);
    }
});