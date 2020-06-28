/**
 * Classe que define a combo de "trunkcombo"
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
 * 04/07/2012
 */
Ext.define('MBilling.view.trunk.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.trunkcombo',
    name: 'id_trunk',
    fieldLabel: t('trunk'),
    forceSelection: true,
    editable: false,
    displayField: 'trunkcode',
    valueField: 'id',
    initComponent: function() {
        var me = this;
        me.store = Ext.create('MBilling.store.Trunk', {
            proxy: {
                type: 'uxproxy',
                module: 'trunk',
                limitParam: undefined
            }
        });
        me.callParent(arguments);
    }
});
Ext.define('MBilling.view.trunk.ComboBackup', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.trunkcombobackup',
    name: 'failover_trunk',
    fieldLabel: t('failover_trunk'),
    displayField: 'trunkcode',
    valueField: 'id',
    value: 0,
    limitParam: undefined,
    forceSelection: true,
    editable: true,
    extraValues: [{
        id: 0,
        trunkcode: t('undefined')
    }],
    listeners: {
        focus: function(combo) {
            combo.expand();
        }
    },
    //permite buscar sem limite de tronco backup
    initComponent: function() {
        var me = this;
        me.store = Ext.create('MBilling.store.Trunk', {
            proxy: {
                type: 'uxproxy',
                module: 'trunk',
                limitParam: undefined
            }
        });
        me.on('render', me.loadStore, me);
        me.callParent(arguments);
    },
    loadStore: function(combo) {
        var me = this,
            store = combo.store,
            record;
        store.load({
            callback: function() {
                if (me.extraValues.length) {
                    store.insert(0, me.extraValues);
                }
            }
        });
    }
});