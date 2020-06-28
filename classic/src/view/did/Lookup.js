/**
 * Class to define lookup of "did"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 05/09/2019
 */
Ext.define('MBilling.view.did.Lookup', {
    extend: 'Ext.ux.form.field.Lookup',
    alias: 'widget.didlookup',
    name: 'id_did',
    fieldLabel: t('did'),
    displayField: 'idDiddid',
    displayFieldList: 'did',
    gridConfig: {
        xtype: 'didlist',
        fieldSearch: 'did',
        columns: [{
            header: t('did'),
            dataIndex: 'did',
            flex: 4
        }, {
            header: t('reserved'),
            dataIndex: 'reserved',
            renderer: Helper.Util.formattyyesno,
            flex: 2
        }, {
            header: t('status'),
            dataIndex: 'activated',
            renderer: Helper.Util.formatBooleanActive,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [1, t('active')],
                    [0, t('inactive')]
                ]
            }
        }]
    }
});