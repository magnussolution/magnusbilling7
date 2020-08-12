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
Ext.define('MBilling.view.boleto.Controller', {
    extend: 'Ext.ux.app.ViewController',
    alias: 'controller.boleto',
    onAfterSave: function(formPanel) {
        var me = this;
        if (me.formPanel.idRecord == 0) {
            url = 'index.php/boleto/secondVia/?id=last';
            window.open(url);
        }
        me.callParent(arguments);
    },
    onSecondVia: function(btn) {
        var me = this,
            selected = me.list.getSelectionModel().getSelection()[0];
        if (me.list.getSelectionModel().getSelection().length == 0) {
            Ext.ux.Alert.alert(me.titleError, 'Por favor selecione um bolero', 'notification');
        } else if (me.list.getSelectionModel().getSelection().length > 1) {
            Ext.ux.Alert.alert(me.titleError, 'Por favor selecione somente um boleto', 'notification');
        } else {
            url = 'index.php/boleto/secondVia/?id=' + selected.get('id');
            window.open(url);
        }
    }
});