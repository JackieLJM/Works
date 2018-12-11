/***
 * 硬件处理分配
 * liqq
 * 
 */
Ext.define('JDKM.view.system.hardwaremanage.HardwareManageMainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'hardwaremanagemainview',
    requires: [ 'JDKM.controller.system.hardwaremanage.HardwareManageController',
		        'JDKM.view.system.hardwaremanage.HardwareManageTree',
		        'JDKM.view.system.hardwaremanage.HardwareManageGridView'],
    controller: 'hardwaremanagecontroller',
    height: window.innerHeight - 60,
    frame: true,
    layout: 'border',
    padding: '0px 0px 0px 0px',
    closable: false,
    initComponent: function () {
        var me = this;
        this.items = [{
            xtype: 'hardwaremanagetree',
            collapseMode: 'mini',
            width: 220,
            border: 0,
            region: 'west'
        }, {
            xtype: 'panel',
            name: 'boderpanel',
            height: '100%',
            region: 'center',
            border: false,
            items: [{
                xtype: 'hardwaremanagegridview'
            }]
        }];
        this.callParent(arguments);

    }
});


