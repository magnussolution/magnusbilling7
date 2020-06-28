Ext.define('MBilling.view.diddestination.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.didtypefullcombo',
    fieldLabel: t('typepaid'),
    displayField: 'name',
    valueField: 'id',
    forceSelection: true,
    editable: false,
    value: 1,
    store: {
        fields: ['id', 'name'],
        data: [{
            id: '0',
            name: t('callforpstn'),
            showFields: ['voip_call', 'destination', 'id_did', 'id_user', 'activated']
        }, {
            id: '1',
            name: t('sipcall'),
            showFields: ['voip_call', 'id_sip', 'id_did', 'id_user', 'activated', 'priority']
        }, {
            id: '2',
            name: t('ivr'),
            showFields: ['voip_call', 'id_did', 'id_ivr', 'id_user', 'activated']
        }, {
            id: '3',
            name: 'CallingCard',
            showFields: ['voip_call', 'id_did', 'id_user', 'activated']
        }, {
            id: '4',
            name: t('portalDeVoz'),
            showFields: ['voip_call', 'id_did', 'id_user', 'activated']
        }, {
            id: '5',
            name: t('CID Callback'),
            showFields: ['voip_call', 'id_did', 'id_user', 'activated']
        }, {
            id: '6',
            name: t('0800 Callback'),
            showFields: ['voip_call', 'id_did', 'id_user', 'activated']
        }, {
            id: '7',
            name: t('Queue'),
            showFields: ['voip_call', 'id_did', 'id_queue', 'id_user', 'activated']
        }, {
            id: '8',
            name: t('Call Group'),
            showFields: ['voip_call', 'destination', 'id_did', 'id_user', 'activated']
        }, {
            id: '9',
            name: t('Custom'),
            showFields: ['voip_call', 'destination', 'id_did', 'id_user', 'activated']
        }]
    }
});
Ext.define('MBilling.view.diddestination.freeCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.didtypefreecombo',
    fieldLabel: t('typepaid'),
    displayField: 'name',
    forceSelection: true,
    editable: false,
    valueField: 'id',
    value: 1,
    store: {
        fields: ['id', 'name'],
        data: [{
            id: '0',
            name: t('callforpstn'),
            showFields: ['voip_call', 'id_did', 'destination', 'id_user', 'activated']
        }, {
            id: '1',
            name: t('sipcall'),
            showFields: ['voip_call', 'id_did', 'id_sip', 'id_user', 'activated', 'priority']
        }, {
            id: '2',
            name: t('ivr'),
            showFields: ['voip_call', 'id_did', 'id_ivr', 'id_user']
        }, {
            id: '3',
            name: 'CallingCard',
            showFields: ['voip_call', 'id_did', 'id_user']
        }, {
            id: '4',
            name: t('portalDeVoz'),
            showFields: ['voip_call', 'id_did', 'id_user']
        }]
    }
});