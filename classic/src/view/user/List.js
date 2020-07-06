/**
 * Class to define list of "User"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 15/04/2013 */
Ext.define('MBilling.view.user.List', {
    extend: 'Ext.ux.grid.Panel',
    alias: 'widget.userlist',
    store: 'User',
    fieldSearch: 'username',
    initComponent: function() {
        var me = this;
        me.extraButtons = [{
            text: t('Bulk user'),
            handler: 'onBulk',
            width: 80,
            disabled: false,
            hidden: App.user.isClient || !me.allowCreate || window.isTablet
        }];
        me.columns = me.columns || [{
            header: t('Id'),
            dataIndex: 'id',
            flex: 1,
            hidden: true,
            hideable: App.user.isAdmin
        }, {
            header: t('username'),
            dataIndex: 'username',
            flex: 2
        }, {
            header: t('lastname'),
            dataIndex: 'lastname',
            flex: 3
        }, {
            header: t('firstname'),
            dataIndex: 'firstname',
            flex: 3,
            hidden: window.isTablet
        }, {
            header: t('email'),
            dataIndex: 'email',
            flex: 4,
            hidden: window.isTablet
        }, {
            header: t('credit'),
            dataIndex: 'credit',
            renderer: Helper.Util.formatMoneyDecimal,
            flex: 2
        }, {
            xtype: 'templatecolumn',
            tpl: '{idPlanname}',
            header: t('plan'),
            dataIndex: 'id_plan',
            comboFilter: 'plancombo',
            hidden: window.isTablet,
            flex: 3
        }, {
            xtype: 'templatecolumn',
            tpl: '{idGroupname}',
            header: t('group'),
            dataIndex: 'id_group',
            comboFilter: 'groupusercombo',
            flex: 2,
            hidden: App.user.isClient || App.user.isAgent || window.isTablet,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('agent'),
            dataIndex: 'idUserusername',
            filter: {
                type: 'string',
                field: 'idUser.username'
            },
            flex: 2,
            hidden: !App.user.isAdmin || window.isTablet,
            hideable: App.user.isAdmin
        }, {
            header: t('status'),
            dataIndex: 'active',
            renderer: Helper.Util.formatBooleanActive,
            flex: 2,
            filter: {
                type: 'list',
                options: [
                    [1, t('active')],
                    [2, t('pending')],
                    [0, t('inactive')]
                ]
            },
            hidden: App.user.isClient || window.isTablet,
            hideable: !App.user.isClient
        }, {
            header: t('creationdate'),
            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
            dataIndex: 'creationdate',
            hidden: window.isTablet,
            flex: 4
        }, {
            dataIndex: 'id_offer',
            header: t('offer'),
            flex: 2,
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('typepaid'),
            dataIndex: 'typepaid',
            flex: 2,
            renderer: Helper.Util.formattypepaid,
            filter: {
                type: 'list',
                options: [
                    [0, t('prepaid')],
                    [1, t('pospaid')]
                ]
            },
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('company_name'),
            dataIndex: 'company_name',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 2
        }, {
            header: t('city'),
            dataIndex: 'city',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('state'),
            dataIndex: 'state',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('country'),
            dataIndex: 'country',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('zipcode'),
            dataIndex: 'zipcode',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('phone'),
            dataIndex: 'phone',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('creditlimit'),
            dataIndex: 'creditlimit',
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent,
            flex: 1
        }, {
            header: t('record_call'),
            dataIndex: 'record_call',
            flex: 1,
            renderer: Helper.Util.formattyyesno,
            filter: {
                type: 'list',
                options: [
                    [0, t('no')],
                    [1, t('yes')]
                ]
            },
            hidden: true,
            hideable: !App.user.isClient && !App.user.isAgent
        }, {
            header: t('CPS Limit'),
            dataIndex: 'cpslimit',
            hidden: true,
            hideable: window.dialC && App.user.isAdmin,
            flex: 2
        }];
        me.callParent(arguments);
    }
});