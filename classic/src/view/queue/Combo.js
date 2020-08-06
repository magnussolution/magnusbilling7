Ext.define('MBilling.view.queue.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.queuestrategycombo',
    fieldLabel: t('Status'),
    value: 'ringall',
    forceSelection: true,
    editable: false,
    store: [
        ['ringall', t('Ringall') + ' - ' + t('Ring all available channels until one answers')],
        ['rrmemory', t('Rrmemory') + ' - ' + t('Round robin with memory, remember where we left off last ring pass')],
        ['leastrecent', t('Leastrecent') + ' - ' + t('Ring interface which was least recently called by this queue')],
        ['fewestcalls', t('Fewestcalls') + ' - ' + t('Ring the one with fewest completed calls from this queue')],
        ['random', t('Random') + ' -' + t('Ring random interface')],
        ['linear', t('Linear') + ' - ' + t('Rings interfaces in the order they are listed in the configuration file. Dynamic members will be rung in the order in which they were added')],
        ['wrandom', t('Wrandom') + ' -' + t('Rings a random interface, but uses the agent\'s penalty as a weight')]
    ]
});