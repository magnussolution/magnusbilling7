/**
 * Class to define lookup of "user"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 05/09/2014
 */
Ext.define('MBilling.view.user.Lookup', {
    extend: 'Ext.ux.form.field.Lookup',
    alias: 'widget.userlookup',
    name: 'id_user',
    fieldLabel: t('User'),
    displayField: 'idUserusername',
    displayFieldList: 'username',
    gridConfig: {
        xtype: 'userlist',
        fieldSearch: 'username',
        columns: [{
            header: t('username'),
            dataIndex: 'username',
            flex: 2
        }, {
            header: t('email'),
            dataIndex: 'email',
            flex: 2
        }, {
            header: t('lastname'),
            dataIndex: 'lastname',
            flex: 2
        }, {
            header: t('credit'),
            dataIndex: 'credit',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }]
    }
});