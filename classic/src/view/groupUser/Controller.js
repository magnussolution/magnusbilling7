Ext.define('MBilling.view.groupUser.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.groupuser',
    onEdit: function() {
        var me = this;
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
            Ext.ux.Alert.alert(me.titleError, t('Please Select only a record'), 'notification');
        };
        me.store.load()
    }
});