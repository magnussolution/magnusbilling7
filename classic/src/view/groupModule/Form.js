/**
 * Class to define form to "GroupModule"
 *
 * Adilson L. Magnus <info@magnussolution.com> 
 * 15/04/2013
 */
Ext.define('MBilling.view.groupModule.Form', {
    extend: 'Ext.ux.form.Panel',
    alias: 'widget.groupmoduleform',
    items: [{
        xtype: 'groupusercombo'
    }, {
        xtype: 'modulecombo'
    }]
});