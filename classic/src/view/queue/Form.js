/**
 * Classe que define o form de "Queue"
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
Ext.define('MBilling.view.queue.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.queueform',
    fieldsHideUpdateLot: ['id_user', 'name'],
    fileUpload: true,
    initComponent: function() {
        var me = this;
        me.labelWidthFields = 175;
        me.items = [{
            xtype: 'userlookup',
            ownerForm: me,
            hidden: App.user.isClient,
            allowBlank: App.user.isClient
        }, {
            name: 'name',
            fieldLabel: t('name')
        }, {
            xtype: 'languagecombo',
            name: 'language',
            value: App.user.language == 'pt_BR' ? 'br' : App.user.language,
            fieldLabel: t('language')
        }, {
            xtype: 'queuestrategycombo',
            name: 'strategy',
            fieldLabel: t('Strategy')
        }, {
            xtype: 'yesnostringcombo',
            name: 'ringinuse',
            fieldLabel: t('Ringinuse')
        }, {
            xtype: 'numberfield',
            name: 'timeout',
            fieldLabel: t('Ring for'),
            value: 30
        }, {
            xtype: 'numberfield',
            name: 'retry',
            fieldLabel: t('Time for another agent'),
            value: 1
        }, {
            xtype: 'numberfield',
            name: 'wrapuptime',
            fieldLabel: t('Time for another call'),
            value: 1
        }, {
            xtype: 'numberfield',
            name: 'weight',
            fieldLabel: t('Weight'),
            value: 0
        }, {
            name: 'periodic-announce', //audio para anuncio
            fieldLabel: t('Periodic announce'),
            value: 'queue-periodic-announce'
        }, {
            xtype: 'numberfield',
            name: 'periodic-announce-frequency', //cada cuanto executar el anuncio
            fieldLabel: t('Frequency'),
            value: 30
        }, {
            xtype: 'yesnostringcombo',
            name: 'announce-position', //anuncioar la posicion en la cola
            fieldLabel: t('Announce position')
        }, {
            xtype: 'yesnostringcombo',
            name: 'announce-holdtime', //anuncioar tiempo de espera
            fieldLabel: t('Announce holdtime')
        }, {
            xtype: 'numberfield',
            name: 'announce-frequency', //frequencia del los avisos
            fieldLabel: t('Announce frequency'),
            value: 45
        }, {
            xtype: 'combobox',
            forceSelection: true,
            editable: false,
            value: 'yes',
            store: [
                ['no', t('No')],
                ['yes', t('Yes')],
                ['unavailable,invalid,unknown', t('unavailable,invalid,unknown')],
                ['penalty,paused,invalid,unavailable', t('penalty,paused,invalid,unavailable')]
            ],
            name: 'joinempty',
            fieldLabel: t('Join empty')
        }, {
            xtype: 'combobox',
            forceSelection: true,
            editable: false,
            value: 'no',
            store: [
                ['no', t('No')],
                ['yes', t('Yes')],
                ['unavailable,invalid,unknown', t('unavailable,invalid,unknown')],
                ['penalty,paused,invalid,unavailable', t('penalty,paused,invalid,unavailable')]
            ],
            fieldLabel: t('Leave when empty'),
            name: 'leavewhenempty'
        }, {
            xtype: 'numberfield',
            name: 'max_wait_time',
            fieldLabel: t('Max wait time'),
            value: 0,
            allowBlank: true
        }, {
            name: 'max_wait_time_action',
            fieldLabel: t('Max wait time action'),
            allowBlank: true
        }, {
            xtype: 'combobox',
            forceSelection: true,
            editable: false,
            value: 'moh',
            store: [
                ['moh', t('MOH')],
                ['ring', t('Ring')]
            ],
            fieldLabel: t('Ring or playing MOH'),
            name: 'ring_or_moh'
        }, {
            xtype: 'uploadfield',
            fieldLabel: t('Audio') + ' ' + t('musiconhold'),
            emptyText: t('Select an wav mono 8khz or gsm File'),
            allowBlank: true,
            name: 'musiconhold',
            extAllowed: ['wav', 'gsm']
        }];
        me.callParent(arguments);
    }
});