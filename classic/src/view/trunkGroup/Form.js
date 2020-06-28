/**
 * Classe que define o form de "Campaign"
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
 * 28/10/2012
 */
Ext.define('MBilling.view.trunkGroup.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.trunkgroupform',
    fieldsHideUpdateLot: ['name', 'id_trunk'],
    initComponent: function() {
        var me = this;
        me.items = [{
            name: 'name',
            fieldLabel: t('name'),
            hidden: App.user.isClient
        }, {
            xtype: 'combobox',
            name: 'type',
            fieldLabel: t('type'),
            forceSelection: true,
            editable: false,
            value: 1,
            store: [
                [1, t('Order')],
                [2, t('Random')]
            ]
        }, {
            style: 'margin-top:10px; overflow: visible;',
            xtype: 'fieldset',
            title: t('Select one or more') + ' ' + t('Trunks'),
            collapsible: false,
            collapsed: false,
            items: [{
                labelWidth: 10,
                name: 'id_trunk',
                fieldLabel: t('Trunk'),
                anchor: '100%',
                fieldLabel: '',
                xtype: 'trunktag',
                allowBlank: true
            }]
        }];
        me.callParent(arguments);
    }
});