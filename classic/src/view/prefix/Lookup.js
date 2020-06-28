/**
 * Class to define lookup of "user"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 05/09/2014
 */
Ext.define('MBilling.view.prefix.Lookup', {
    extend: 'Ext.ux.form.field.Lookup',
    alias: 'widget.prefixlookup',
    name: 'id_prefix',
    fieldLabel: t('Destination'),
    displayField: 'idPrefixdestination',
    displayFieldList: 'destination',
    gridConfig: {
        xtype: 'prefixlist',
        fieldSearch: 'destination',
        columns: [{
            header: t('prefix'),
            dataIndex: 'prefix',
            flex: 2
        }, {
            header: t('destination'),
            dataIndex: 'destination',
            flex: 2
        }]
    }
});