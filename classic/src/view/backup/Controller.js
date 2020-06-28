/**
 * Classe que define a lista de "CallShopCdr"
 *
 * =======================================
 * ###################################
 * MagnusBilling
 *
 * @package MagnusBilling
 * @author Adilson Leffa Magnus.
 * @copyright Copyright (C) 2005 - 2016 MagnusBilling. All rights reserved.
 * ###################################
 *
 * This software is released under the terms of the GNU Lesser General Public License v3
 * A copy of which is available from http://www.gnu.org/copyleft/lesser.html
 *
 * Please submit bug reports, patches, etc to https://github.com/magnusbilling/mbilling/issues
 * =======================================
 * Magnusbilling.org <info@magnussolution.com>
 * 01/10/2013
 */
Ext.define('MBilling.view.backup.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.backup',
    formHidden: true,
    onDownload: function(btn) {
        var me = this,
            records,
            record = me.list.getSelectionModel().getSelection()[0],
            idRecord = [];
        values = 'file=' + record.data.name;
        url = 'index.php/backup/download/?' + values;
        window.open(url);
    },
    onDelete: function(btn) {
        var me = this,
            records,
            record = me.list.getSelectionModel().getSelection()[0],
            idRecord = []
        destroyType = btn.menu.down('menucheckitem[checked=true]').value;
        var msgConfirmation = (destroyType === 'all') ? me.msgDeleteAll : me.msgConfirmation;
        if (!me.list.allowDelete) {
            return;
        }
        if (destroyType === 'all') {
            Ext.ux.Alert.alert(me.titleError, 'You cannot delete all backups', 'notification');
            return;
        };
        if (record) {
            Ext.Msg.confirm(me.titleConfirmation, msgConfirmation, function(btn) {
                if (btn === 'yes') {
                    Ext.each(me.list.getSelectionModel().getSelection(), function(record) {
                        idRecord.push(record.get('name'));
                    });
                    Ext.Ajax.request({
                        url: 'index.php/backup/destroy',
                        params: {
                            ids: Ext.encode(idRecord)
                        },
                        scope: me,
                        success: function(response) {
                            response = Ext.decode(response.responseText);
                            if (response[me.nameSuccessRequest]) {
                                var msg = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                Ext.ux.Alert.alert(me.titleSuccess, msg, 'success');
                            } else {
                                var errors = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                Ext.ux.Alert.alert(me.titleError, errors, 'notification');
                            }
                        }
                    });
                    me.store.load();
                }
            }, me);
        } else {
            Ext.ux.Alert.alert(me.titleError, t('Please select one or more register'), 'notification');
        }
    },
    onNew: function() {
        var me = this;
        Ext.Msg.confirm(me.titleConfirmation, t('Do you relly want create a new backup now? It can take many time and make your server slow. Mbilling make backup every day automatically.'), function(btn) {
            if (btn === 'yes') {
                Ext.Msg.confirm(me.titleConfirmation, t('This backup will override the backup held today! Do you sure?'), function(btn) {
                    if (btn === 'yes') {
                        Ext.Ajax.request({
                            url: 'index.php/backup/save',
                            params: {
                                ids: 0
                            },
                            scope: me,
                            success: function(response) {
                                response = Ext.decode(response.responseText);
                                if (response[me.nameSuccessRequest]) {
                                    var msg = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                    Ext.ux.Alert.alert(me.titleSuccess, msg, 'success');
                                } else {
                                    var errors = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                    Ext.ux.Alert.alert(me.titleError, errors, 'notification');
                                }
                            }
                        });
                        me.store.load();
                    }
                }, me);
            }
        }, me);
    }
    /*,

            onRecovery: function (btn) {
                var me = this,
                    records     = me.list.getSelectionModel().getSelection(),
                record     = me.list.getSelectionModel().getSelection()[0],
                idRecord = [];



            if (records.length > 1) {
                Ext.ux.Alert.alert(me.titleError, t('Please select only 1 backup'), 'notification');
            }else if(record){
                Ext.Msg.confirm(me.titleConfirmation, t('ALERT: Do you really recovery this BACKUP?'), function(btn) {
                        if(btn === 'yes') {
                            Ext.Msg.confirm(me.titleConfirmation, t('ALERT: It can spend many time? Do you sure?'), function(btn) {
                                if(btn === 'yes') {
                                    Ext.Msg.confirm(me.titleConfirmation, t('ALERT: It will delete your current database, after will import the sql file. Do you really wnat do it?'), function(btn) {
                                        if(btn === 'yes') {
                                            Ext.Msg.confirm(me.titleConfirmation, t('ALERT: It can spend many time? Do you sure?'), function(btn) {
                                                if(btn === 'yes') {
                                                    Ext.Msg.confirm(me.titleConfirmation, t('ALERT: At your own risk!!!! '), function(btn) {
                                                        if(btn === 'yes') {
                                                            Ext.ux.Alert.alert(me.titleError, t('It will be necessary to wait. Your server is down until recover all database.'), 'error');
                                                            Ext.Ajax.request({
                                                            url: 'index.php/backup/recovery',

                                                            params : {id: Ext.encode(record.get('name'))},
                                                            scope  : me,
                                                            success: function(response) {
                                                                response = Ext.decode(response.responseText);

                                                                if(response[me.nameSuccessRequest]){
                                                                    var msg = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                                                    Ext.ux.Alert.alert(me.titleSuccess, msg, 'success');
                                                                }
                                                                else {
                                                                    var errors = Helper.Util.convertErrorsJsonToString(response[me.nameMsgRequest]);
                                                                    Ext.ux.Alert.alert(me.titleError, errors, 'notification');
                                                                }
                                                            }
                                                        }); 
                                                        }
                                                    }, me);
                                                }
                                            }, me);
                                        }
                                    }, me);
                                }
                            }, me);
                        }
                    }, me);
            }else{
                Ext.ux.Alert.alert(me.titleError, t('Please select 1 backup'), 'notification');
            }
                

            }*/
});