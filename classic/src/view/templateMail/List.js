/**
 * Class to define list of "Cliente"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 15/04/2013
 */
Ext.define('MBilling.view.templateMail.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.templatemaillist',
    store: 'TemplateMail',
    initComponent: function() {
        var me = this;
        me.allowPrint = false;
        me.buttonCsv = false;
        me.buttonUpdateLot = false;
        me.allowCreate = false;
        me.allowDelete = false;
        me.columns = [{
            header: t('ID'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('Type'),
            dataIndex: 'mailtype',
            flex: 3
        }, {
            header: t('Language'),
            renderer: Helper.Util.formatLanguageImage,
            dataIndex: 'language',
            flex: 2
        }, {
            header: t('Subject'),
            dataIndex: 'subject',
            flex: 7
        }]
        me.callParent(arguments);
    }
});