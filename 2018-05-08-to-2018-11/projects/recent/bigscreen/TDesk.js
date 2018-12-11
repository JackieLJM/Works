Ext.define('JDKSUPER.view.oa.TDesk', {
			extend : 'Ext.tab.Panel',
			frame : true,
			tabPosition  : 'left',
			textAlign :'bottom',
			defaults : {
				bodyPadding : 0,
				scrollable : false
			},
			items : [ {
				title : '面桌的我',
				html : "<iframe src='/desk?random="+(new Date()).getTime()+"' width='100%' height='100%' style='border: 0px;padding-bottom:25px'  />"
			},{
				title : '户门人个',
				//nmg 控制 根据登陆用户是否分配这个权限...系统管理里边
				hidden:OPTTOOLS.getDefultmodulByid()=='false'?false:true,
				//暂时住掉,门户未控制好具体权限
				//hidden:OPTTOOLS.getDefultProvince()=='530000'?true:false,
				//html : "<iframe src='/jsp/stat/managerportal/ManagerPortal.jsp?random="+(new Date()).getTime()+"' width='100%' height='100%' style='border: 0px;padding-bottom:25px'  />"
				html : "<iframe src='/jdkwit/bigscreen.jsp?random="+(new Date()).getTime()+"' width='100%' height='100%' style='border: 0px;padding-bottom:25px'  />"
			},{
				title :'大屏幕数据可视化跨平台应用',
				html : "<iframe src='' width='100%' height='100%' style='border: 0px;padding-bottom:25px'  />"
			}]
		});
