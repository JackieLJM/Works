Ext.define('JDKM.controller.system.hardwaremanage.HardwareManageController',{
	extend:'Ext.app.ViewController',
	alias:'controller.hardwaremanagecontroller',
	models : [],
	views : [],
	stores : [],
	layout: 'border',
    init : function() {
	},
	'hardwareItemClick':function(th, record, item, index, e, eOpts ){
		  var serverip ={serverip: record.data.serverip};
	      var panel=th.up('hardwaremanagemainview').down('panel[name="boderpanel"]');
	      var grid = panel.down("hardwaremanagegridview");
	      var scanning = grid.down('button[name="scanning"]');
	      var delthardware = grid.down('button[name="delthardware"]');
	      var store = grid.getStore();
	      store.searched=true;
	      store.on('beforeload', function(store,options) {
					
					Ext.apply(store.proxy.extraParams,serverip);
				});
	      if(serverip){
		     	scanning.setVisible(true);	
		     	delthardware.setVisible(true);
			}else{
			 	scanning.setVisible(false);		
			 	delthardware.setVisible(false);
			}
	      scanning.serverip = serverip;
	      delthardware.serverip = serverip;
		  store.loadPage(1);
	   },
	//删除设备
	 'delthardware' : function(btn,store,equids,serverip){
		 Ext.Ajax.request({
				url: extPath+'hardwaremanage/delThardware',
				method: 'POST',
				async: true,
				params: {
					equids: equids,
					serverip:serverip
				},
				success: function(response){
					var text = Ext.JSON.decode(response.responseText);
					var result = text.result;
					if(text.success){
						Ext.toast('删除' + result + '个设备信息', '成功');
						store.loadPage(store.currentPage);
					}else{
						Ext.Msg.alert('提示', '删除失败');
					}
				},
				failure : function(response) {
					Ext.Msg.alert('提示', response.responseText);
				}
			});
		 
	 } ,
	'thardwareinfoList' : function(btn){
		var manageStore = this.getView('hardwaremanagegridview').getStore();
		var winTitle="服务器信息";
		var hardwareScanningWin= Ext.create('JDKM.view.system.hardwaremanage.HardwareScanningWinView',{title: winTitle,serverip:btn.serverip,manageStore:manageStore,mdata: null});
		hardwareScanningWin.show();
		
	},
	   
	//分配保存
    'assignSave' : function(btn,rowIndex){
    	var serverip = btn.up('hardwarescanninggridview').serverip;
    	var grid = btn.up('hardwarescanninggridview');
    	var win = grid.up('hardwarescanningwinview');
    	var store = win.manageStore;
    	var models = grid.getSelection();
    	var equids = '';
    	for (var i in models) {
			var model = models[i];
			var equid = model.get('equid');
			equids += equid + ',';
		}
		if (equids.length == 0) {
			Ext.Msg.alert("提示", "您最少要选择一条数据!");
		} else {
			Ext.Ajax.request({
						url : extPath+'hardwaremanage/assignSave',
						method : 'post',
						params : {
							serverip : serverip,
							equids : equids
						},
						success: function(response){
							var text = Ext.JSON.decode(response.responseText);
							if(text.success){
								Ext.toast('分配成功');
								win.close();
								store.loadPage(store.currentPage);
							}else{
								Ext.Msg.alert('提示', '分配失败');
							}
						},
						failure : function(response) {
							Ext.Msg.alert('提示', response.responseText);
						}
					});
		}
    }
    
    
   
})