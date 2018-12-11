/**
 * 入库服务器数据更改，引入这个层是为了把所有store的处理逻辑放在这里，将store配置在这里
 * 
 * @author liujm
 */
Ext.define('JDKM.view.system.enterServer.EnterServerViewModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.enterserver',
	stores : {
		enterserverstore : {
//			storeId: 'enterserverstore',//用于view层bind引入
			type:'enterserver'//在这里引入enterserver
		}
	},
	data:{
//		isRowediting:true,
//		isSended:true
	}
})