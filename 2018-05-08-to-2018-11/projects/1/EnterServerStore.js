/**
 * 入库服务器所有列表获取
 * 
 * @author liujm
 */
Ext.define('JDKM.store.system.EnterServerStore', {
	extend : 'Ext.data.Store',
	alias : 'store.enterserver',
//	autoload : true,
	model : 'JDKM.model.system.EnterServerModel',
	// model : 'enterserver',
	// storeId : 'enterserverstore',
	// remoteFilter : true,
	// remoteSort : true,
	sorters : {
		property : 'id',
		direction:'DESC'
	},
	data : [ {
		'id' : '1',
		'serverip' : '2',
		'servername' : '3'
	} ],
	proxy : {
		type : 'ajax',
		async : true,
		actionMethods : {
			read : 'POST'
		},
		url : extPath + 'system/server',
//		extraParams : {
//			pageSize : 100
//		},
		reader : {
			model : 'JDKM.model.system.EnterServerModel',
			type : 'json',
			rootProperty : 'result',
			totalProperty : 'totalProperty',
			successProperty : 'success'
		},
		writer : {
			type : 'json'
		},

		listeners : {
			exception : function(dataProxy, response) {
				var items = Ext.decode(response.responseText);
				if (items && !items.success) {
					Ext.Msg.alert('错误', '获取数据错误!');
				}
			}
		}
	}
})