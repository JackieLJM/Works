Ext.define('JDKM.view.system.hardwaremanage.HardwareManageGridView', {
    extend: 'Ext.grid.Panel',
    xtype: 'hardwaremanagegridview',
    name: 'hardwaremanagegridview',
    requires : ['JDKM.controller.system.hardwaremanage.HardwareManageController'],
	controller : 'hardwaremanagecontroller',
    frame: true,
    autoScroll: true,
    height: window.innerHeight - 60,
    width: '100%',
    border: 0,
    multiSelect: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    initComponent: function () {
        var _this = this;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            pageSize: pageSize,
            remoteFilter: true,
            remoteSort: true,
            proxy: {
                type: 'ajax',
                async: true,
                actionMethods: {
                    read: 'POST'
                },
                url: extPath + 'hardwaremanage/findHardwareInfo',
                extraParams: {
                    pageSize: pageSize
                },
                reader: {
                    type: 'json',
                    rootProperty: 'result',
                    totalProperty: 'totalProperty'
                },
                writer: {
                    type: 'json'
                },
                successProperty: 'success',
                listeners: {
                    exception: function (dataProxy, response) {
//												var items = Ext.decode(response.responseText);
                        //alert(items);
                    }
                }
            }
        });
        store.load();
       
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing');
        var win;//添加弹出窗口
        var form;
        Ext.apply(this, {
            plugins: [cellEditing],
            store: store,
            columns: [{
                xtype: 'rownumberer',
                align: 'center',
                width: 36},
                {text: '设备类型', dataIndex: 'hardtype', align: 'center', width: 250},
                {text: '设备名称', dataIndex: 'equname', align: 'center', width: 250},
                {text: '管理网口IP', dataIndex: 'manageip', align: 'center', width: 250},
                {text: '业务网络IP', dataIndex: 'ipaddress', align: 'center', width: 250},
                {text: '设备型号', dataIndex: 'hardmodel', align: 'center', width: 250}
               ],

               tbar : [{
					xtype : 'button',
					name:'scanning',
					iconCls: 'x-fa fa-circle-o-notch fa-color-3',
					text : '分配',
					hidden : true,
					border: 1,
					style: {
					    borderColor: 'gray',
					    borderStyle: 'solid'
					},
					tooltip : '分配',
					handler : 'thardwareinfoList'
				},{
					xtype : 'button',
					name : 'delthardware',
					glyph : 'xf00d@FontAwesome',
					iconCls : 'deleteicons fa-color-2',
					text : '删除',
					hidden : true,
					border: 1,
					style: {
					    borderColor: 'gray',
					    borderStyle: 'solid'
					},
					tooltip : '删除设备',
					handler : function(btn) {
						var serverip = btn.serverip.serverip;
						Ext.Msg.show({
						    title:'提示',
						    message: '确定删除选中的设备吗?',
						    buttons: Ext.Msg.OKCANCEL,
						    icon: Ext.Msg.QUESTION,
						    fn: function(btn) {
						        if (btn === 'ok') {
						    		var models = _this.getSelection();
									var equids = '';
									for (var i in models) {
										var model = models[i];
										var equid = model.get('equid');
										equids += equid + ',';
									}
						        	_this.controller.delthardware(btn,store,equids,serverip)
						        }
						    }
						});
						
					}
				},{
					xtype : 'numberfield',
					fieldLabel : '每页数',
					labelWidth : 45,
					size : 9,
					value : 100,
					minValue : 1,
					allowBlank : false,
					listeners : {								
						change : function(_this, newValue, oldValue, eOpts ) {
							store.pageSize = newValue;
							store.proxy.extraParams.pageSize = newValue;
						}
					
					}
				}],
				dockedItems : [{
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom',
					displayInfo : true,
					page : '页数',
					margin : '0 0 0 0',
					beforePageText : '第',
					afterPageText : '页,共 {0} 页',
					displayMsg : '显示 {0} - {1} 条,共 {2} 条',
					emptyMsg : '没有记录'
				}],
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: false

            }
        });

        this.callParent(arguments);
    }
});
 