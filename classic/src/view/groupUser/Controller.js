Ext.define('MBilling.view.groupUser.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.groupuser',
    init: function() {
        var me = this;
        me.control({
            'usertypecombo': {
                select: me.onSelectType
            }
        });
        me.callParent(arguments);
    },
    onSelectType: function(combo, records) {
        var me = this,
            fields = me.formPanel.getForm().getFields(),
            fieldHiddenPrices = me.formPanel.getForm().findField('hidden_prices'),
            typeUser = me.formPanel.getForm().findField('id_user_type').getValue(),
            form = me.formPanel.getForm();
        if (typeUser == 1) {
            fieldHiddenPrices['show']();
        } else {
            fieldHiddenPrices['hide']();
        }
    },
    onNew: function() {
        var me = this,
            fieldHiddenPrices = me.formPanel.getForm().findField('hidden_prices');
        fieldHiddenPrices['hide']();
    },
    onEdit: function() {
        var me = this,
            record = me.list.getSelectionModel().getSelection()[0];
        if (record.get('id_user_type') == 1) {
            me.formPanel.getForm().findField('hidden_prices')['show']();
        } else {
            me.formPanel.getForm().findField('hidden_prices')['hide']();
        }
        me.lookupReference('generalTab').show();
        me.callParent(arguments);
    },
    onSelectionChange: function(selModel, selections) {
        var me = this,
            btnClone = me.lookupReference('buttonCloneGroup');
        btnClone && btnClone.setDisabled(!selections.length);
        me.callParent(arguments);
    },
    onCloneGroupUser: function(btn) {
        var me = this,
            selected = me.list.getSelectionModel().getSelection()[0];
        if (me.list.getSelectionModel().getSelection().length == 1) {
            Ext.Ajax.request({
                url: 'index.php/groupUser/clone',
                params: {
                    id: selected.get('id')
                },
                scope: me,
                success: function(response) {
                    response = Ext.decode(response.responseText);
                    if (response[me.nameSuccessRequest]) {
                        Ext.ux.Alert.alert(me.titleSuccess, response[me.nameMsgRequest], 'success');
                    } else {
                        Ext.ux.Alert.alert(me.titleError, response[me.nameMsgRequest], 'error');
                    }
                }
            });
        } else {
            Ext.ux.Alert.alert(me.titleError, t('Please select only a record'), 'notification');
        };
        me.store.load()
    }
});