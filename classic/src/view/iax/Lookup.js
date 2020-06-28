/**
 * Class to define lookup of "user"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 05/09/2014
 */
Ext.define('MBilling.view.iax.Lookup', {
    extend: 'Ext.ux.form.field.Lookup',
    alias: 'widget.siaxlookup',
    name: 'id_iax',
    fieldLabel: t('Iax'),
    displayField: 'idIaxname',
    displayFieldList: 'name',
    gridConfig: {
        xtype: 'iaxlist',
        fieldSearch: 'name',
        columns: [{
            header: t('Account'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 2
        }, {
            header: t('name'),
            dataIndex: 'name',
            flex: 2
        }]
    }
});