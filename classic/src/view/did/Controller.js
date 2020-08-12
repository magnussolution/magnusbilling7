/**
 * Classe que define a lista de "CallShopCdr"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2020 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnussolution/magnusbilling7/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com>
 * 01/10/2013
 */
Ext.define('MBilling.view.did.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.did',
    isSubmitForm: true,
    init: function() {
        var me = this;
        me.control({
            'booleancombo[name=cbr]': {
                select: me.onSelectcbr
            },
            'noyescombo[name=cbr_ua]': {
                select: me.onSelectcbrAu
            }
        });
        me.callParent(arguments);
    },
    onSelectcbr: function(combo, records) {
        me = this,
            form = me.formPanel.getForm();
        form.findField('cbr_ua').setVisible(records.data.field1);
        form.findField('cbr_total_try').setVisible(records.data.field1);
        form.findField('cbr_time_try').setVisible(records.data.field1);
    },
    onSelectcbrAu: function(combo, records) {
        me = this,
            form = me.formPanel.getForm();
        form.findField('cbr_em').setVisible(records.data.field1);
        form.findField('TimeOfDay_monFri').setVisible(records.data.field1);
        form.findField('TimeOfDay_sat').setVisible(records.data.field1);
        form.findField('TimeOfDay_sun').setVisible(records.data.field1);
        form.findField('workaudio').setVisible(records.data.field1);
        form.findField('noworkaudio').setVisible(records.data.field1);
    },
    onNew: function(btn) {
        var me = this,
            form = me.formPanel.getForm();
        form.findField('cbr_ua').setVisible(false);
        form.findField('cbr_em').setVisible(false);
        form.findField('TimeOfDay_monFri').setVisible(false);
        form.findField('TimeOfDay_sat').setVisible(false);
        form.findField('TimeOfDay_sun').setVisible(false);
        form.findField('workaudio').setVisible(false);
        form.findField('noworkaudio').setVisible(false);
        form.findField('cbr_total_try').setVisible(false);
        form.findField('cbr_time_try').setVisible(false);
        me.callParent(arguments);
    },
    onEdit: function() {
        var me = this,
            record = me.list.getSelectionModel().getSelection()[0];
        if (record.get('cbr') == 0) {
            me.formPanel.getForm().findField('cbr_ua').setVisible(false);
            me.formPanel.getForm().findField('cbr_em').setVisible(false);
            me.formPanel.getForm().findField('TimeOfDay_monFri').setVisible(false);
            me.formPanel.getForm().findField('TimeOfDay_sat').setVisible(false);
            me.formPanel.getForm().findField('TimeOfDay_sun').setVisible(false);
            me.formPanel.getForm().findField('workaudio').setVisible(false);
            me.formPanel.getForm().findField('noworkaudio').setVisible(false);
            me.formPanel.getForm().findField('cbr_total_try').setVisible(false);
            me.formPanel.getForm().findField('cbr_time_try').setVisible(false);
        } else {
            me.formPanel.getForm().findField('cbr_ua').setVisible(true);
            if (record.get('cbr_ua') == 1) {
                me.formPanel.getForm().findField('cbr_em').setVisible(true);
                me.formPanel.getForm().findField('TimeOfDay_monFri').setVisible(true);
                me.formPanel.getForm().findField('TimeOfDay_sat').setVisible(true);
                me.formPanel.getForm().findField('TimeOfDay_sun').setVisible(true);
                me.formPanel.getForm().findField('workaudio').setVisible(true);
                me.formPanel.getForm().findField('noworkaudio').setVisible(true);
                me.formPanel.getForm().findField('cbr_total_try').setVisible(true);
                me.formPanel.getForm().findField('cbr_time_try').setVisible(true);
            }
        }
        me.callParent(arguments);
    },
    onDelete: function(btn) {
        var me = this,
            records = me.list.getSelectionModel().getSelection(),
            allowDelete = true;
        Ext.each(records, function(selected) {
            if (selected.get('reserved') === 1) {
                Ext.ux.Alert.alert(me.titleError, t('Please, first release the DID') + ' ' + selected.raw.did, 'error');
                allowDelete = false;
                return;
            }
        });
        if (allowDelete == true) {
            me.callParent(arguments);
        };
    },
    onRelease: function(btn, pressed) {
        var me = this,
            selected = me.list.getSelectionModel().getSelection()[0],
            msgConfirmation = t('Confirm release DID') + ' ' + selected.get('DID'),
            store = me.list.getStore();
        if (me.list.getSelectionModel().getSelection().length > 1) {
            Ext.ux.Alert.alert(me.titleError, t('Please select only one DID to release'), 'error');
        } else if (selected.get('reserved') === 0) {
            Ext.ux.Alert.alert(me.titleError, t('Did is not in use'), 'error');
            store.load();
        } else {
            Ext.Msg.confirm(me.titleConfirmation, msgConfirmation, function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'index.php/did/liberar',
                        params: {
                            id: selected.get('id')
                        },
                        success: function(response) {
                            response = Ext.decode(response.responseText);
                            if (response[me.nameSuccessRequest]) {
                                Ext.ux.Alert.alert(me.titleSuccess, response[me.nameMsgRequest], 'success');
                                store.load();
                            } else {
                                var errors = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                store.load();
                            }
                        }
                    });
                }
            }, me);
        }
    },
    onBuyDid: function() {
        var me = this,
            getForm = me.lookupReference('buydidPanel'),
            fieldDid = getForm.getForm().findField('did').getValue(),
            valueDid = getForm.getForm().findField('did').rawValue,
            msgConfirmation = t('Do you confirm buy this DID?');
        if (fieldDid < 1) Ext.ux.Alert.alert(me.titleError, t('Please, select a DID'), 'warning');
        else {
            Ext.Msg.confirm(t('Confirmation'), msgConfirmation + ' <br>' + valueDid, function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: 'index.php/did/buy',
                        params: {
                            id: fieldDid
                        },
                        success: function(response) {
                            response = Ext.decode(response.responseText);
                            if (response['success']) {
                                Ext.ux.Alert.alert(me.titleSuccess, t(response['msg']), 'success', true, true, 5000);
                            } else {
                                var errors = Helper.Util.convertErrorsJsonToString(response['msg']);
                                Ext.ux.Alert.alert(me.titleError, t(errors), 'error', true, true, 5000);
                            }
                        }
                    });
                }
            }, me);
        }
    }
});