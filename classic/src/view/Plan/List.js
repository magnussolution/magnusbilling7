/**
 * Classe que define a lista de "Plan"
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
 * 24/07/2012
 */
Ext.define('MBilling.view.plan.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.planlist',
    store: 'Plan',
    fieldSearch: 'name',
    initComponent: function() {
        var me = this;
        me.columns = me.columns || [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('name'),
            dataIndex: 'name',
            flex: 4
        }, {
            header: t('Tech prefix'),
            dataIndex: 'techprefix',
            flex: 4,
            hidden: !App.user.isAdmin || window.isTablet
        }, {
            header: t('date'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'creationdate',
            flex: 4,
            hidden: window.isTablet
        }, {
            header: t('Port. Celular'),
            dataIndex: 'portabilidadeMobile',
            flex: 2,
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            hidden: App.user.language != 'pt_BR' || window.isTablet,
            hideable: false
        }, {
            header: t('Port. Fixo'),
            dataIndex: 'portabilidadeFixed',
            flex: 2,
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            hidden: App.user.language != 'pt_BR' || window.isTablet,
            hideable: false
        }];
        me.callParent(arguments);
    }
});