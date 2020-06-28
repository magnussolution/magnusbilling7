/**
 * Classe que define o form de "Firewall"
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
 * 19/09/2012
 */
Ext.define('MBilling.view.firewall.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.firewallform',
    initComponent: function() {
        var me = this;
        me.items = [{
                name: 'ip',
                fieldLabel: t('Ip'),
                vtype: 'IPAddress'
            }, {
                xtype: 'yesnocombo',
                fieldLabel: t('perm_ban'),
                name: 'action'
            }, {
                xtype: 'textarea',
                name: 'description',
                fieldLabel: t('description'),
                allowBlank: true,
                height: 300,
                anchor: '100%',
                readOnly: true
            }
            /*, {
                        xtype: 'displayfield',
                        fieldLabel: t('Use '),
                        value: '<span style="color:green;">iptables -I fail2ban-ASTERISK -s THE_IP_TO_BAN -j DROP;</span>  To permanent ban',
                        allowBlank: true
                    }*/
        ];
        me.callParent(arguments);
    }
});