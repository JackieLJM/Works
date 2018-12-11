Ext.define('JDKM.controller.system.SystemMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.systemmainviewcontroller',
    models : [],
	views : [],
	stores : [],
	layout: 'border',
    init : function() {
	},
	'itemclick':function(th, record, item, index, e, eOpts ){
	      var panel=th.up('systemmainview').down('panel[name="boderpanel"]');
	          panel.removeAll();
	      var grid = '';		
	      //界面告警及处理
		    /*if(record.data.id==1){
			   grid = Ext.create('JDKM.view.system.SystemGridView',{});
			}*/
		    //用户管理
			if(record.data.id==2){
				grid = Ext.create('JDKM.view.system.UserManage',{});		
			}
			//日志查询
			if(record.data.id==3){
				grid = Ext.create('JDKM.view.system.LogQueryMainView',{});		
			}
			//字典参数维护
			if(record.data.id==4){
				grid = Ext.create('JDKM.view.system.ParameterTypeView',{});
			}
			//系统参数维护
			if(record.data.id==5){
				grid = Ext.create('JDKM.view.system.Parameter',{});	
			}
			//入库服务器维护
			if(record.data.id==6){
				grid = Ext.create('JDKM.view.system.enterServer.EnterServerView',{});
			}
			//硬件处理分配
			if(record.data.id==7){
				grid = Ext.create('JDKM.view.system.hardwaremanage.HardwareManageMainView',{});
			}
			//设备面板图维护
			if(record.data.id==8){
				grid = Ext.create('JDKM.view.system.equipPanel.EquipMainView',{});
				
			}
			panel.add(grid);
	   },
	   
	   
		/**
		 * 用户管理 ： 删除用户
		 * 
		 */
		deleteUser : function(ids, store){
			Ext.Ajax.request({
				url: extPath+'system/deleteUser',
				method: 'POST',
				async: true,
				params: {
					ids: ids
				},
				success: function(response){
					var text = Ext.JSON.decode(response.responseText);
					var result = text.result;
					if(text.success){
						Ext.toast('删除' + result + '个用户信息', '成功');
						store.loadPage(store.currentPage);
					}else{
						Ext.Msg.alert('提示', '删除失败');
					}
				},
				failure : function(response) {
					Ext.Msg.alert('提示', response.responseText);
				}
			});
		},
		updateUser: function(myGrid, rowIndex, colIndex){
			var store = myGrid.getStore();
			var rec = store.getAt(rowIndex);
			var data = rec.data;
			var winTitle="编辑用戶信息";
			var addUserWindow= Ext.create('JDKM.view.system.UserAddWindow',{title: winTitle, store : store ,formdata: data});
			addUserWindow.show();
		},
		addUser: function(btn){
			var userGrid = btn.up('usermanage');
			var store = userGrid.getStore();
			var winTitle="添加用戶信息";
			var addUserWindow= Ext.create('JDKM.view.system.UserAddWindow',{title: winTitle, store : store ,formdata: null});
			addUserWindow.show();
		}
	
});

  