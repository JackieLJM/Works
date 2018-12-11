var mystore;
var queryMode = 'normal';

function query() {
	var param ;
	if (queryMode == 'normal') {
		param = $('#form_normal').serializeArray();
	} else if (queryMode == 'advanced') {
		param = $('#form_adv').serializeArray();
	}
	param.push({'name' : 'query_mode','value' : queryMode});
	var json = OPTTOOLS.arrayToJSON(param);
	mystore.proxy.extraParams =  json;// 使store记住查询条件
	mystore.loadPage(1);
	
}
function changeTab() {
	if(queryMode == 'normal'){
		$('#search_normal_div').css('display', 'none');
		$('#search_adv_div').css('display', 'block');
		queryMode = 'advanced';
	}else if(queryMode == 'advanced'){
		$('#search_normal_div').css('display', 'block');
		$('#search_adv_div').css('display', 'none');
		queryMode = 'normal';
	}
}

Ext.onReady( function (){
	var gridHeight = (window.innerHeight-search_normal_div.offsetHeight);
	
	var operateTypeStore = Ext.create('Ext.data.Store', {
			autoLoad : true,
			pageSize : loginUser.pageSize,
			remoteSort : true,
			remoteFilter : true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : 'POST'
				},
				async : false,
				url : '/dba/operateType/getAllOperateType?pageSize='+loginUser.pageSize,
				reader : {
					type : 'json',
					rootProperty : 'result',
					//分页使用的
					totalProperty : 'totalProperty'
				},
				writer : {
					type : 'json'
				},
				successProperty : 'success',
				listeners : {
					exception : function(dataProxy, response) {
						var items = Ext.decode(response.responseText);
						if (!items.success) {
						}
					}
				}
			}
	 });
	mystore = operateTypeStore;
	
	var columns=[];
	columns = columns.concat({
				xtype : 'rownumberer',
				width : 40,
				align : 'center'
	          }, {
					xtype : 'actioncolumn',
					menuText : '编辑',
					text : '操作',
					width : 60,
					align : 'center',
					items : [{
							tooltip : '编辑',
							iconCls:'customicon-jdk-edit customicon-jdkactioncolor',
							handler : function(operateTypeGrid, rowIndex, colIndex) {
								var rec = operateTypeGrid.getStore().getAt(rowIndex);
								var id = rec.get('id');
								
//								console.log(id);
								Ext.Ajax.request({
									actionMethods:{read: 'POST'},
									async : false,
									url : '/dba/operateType/getOperateTypeById',
									params : {
										id : id
									},
									success : function(response) {
										var text = response.responseText;
										operateTypeWin.flag = 'update';
										var model = Ext.create('Ext.data.Model', Ext.JSON.decode(text).result[0]);
										operateTypeForm.reset();
										operateTypeForm.loadRecord(model);
										operateTypeWin.setTitle('修改操作类型');
										operateTypeWin.show();
									}
								});
							}
					}, {
							xtype: 'tbspacer'
					}, {
							tooltip : '删除',
							iconCls:'customicon-jdk-delete customicon-jdkactioncolor',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var id = rec.get('id');
								Ext.Msg.confirm('操作提示', '确认删除?', function(option) {
									if (option == 'yes') {
										Ext.Ajax.request({
											actionMethods:{read: 'POST'},
											async : false,
											url : '/dba/operateType/delOperateType',
											params : {
												id : id
											},
											success : function(response) {
												OPTTOOLS.responseAlert(response,'删除');
												operateTypeStore.reload();
											},
											failure : function(response) {
												Ext.Msg.alert('提示', '删除失败!');
												operateTypeStore.reload();
											}
										});
									}
								});
							}
					}]
			});
		    
	columns = OPTTOOLS.getDisplayModel('TOOLS_OPERATETYPE',columns);
	//页面表格
	 var operateTypeGrid = Ext.create('Ext.grid.Panel', {
		 	renderTo : 'operateType-grid',
		 	forceFit : true,
		 	height: gridHeight,
		 	columnLines: true,
		 	border : '0',
			store : operateTypeStore,
			enableColumnHide : false,
			viewConfig: {
    	    	enableTextSelection: true
	   	 	},
			plugins: 'gridfilters',
			controller : 'commonController',
			selModel : {
				selType : 'checkboxmodel'
			},
			columns : columns,
			tbar : [{
						xtype : 'button',
						glyph : 'xf067@FontAwesome',
						iconCls : 'addicons',
						text : '添加',
						name : 'operateType_add',
						handler : function(btn) {
							operateTypeWin.setTitle('添加操作类型');
							operateTypeWin.flag = 'add';
							operateTypeForm.reset();
							operateTypeWin.show();
						}
			      }/*,{
						xtype : 'tbspacer'
			      }*/,{
						xtype : 'button',
						glyph : 'xf00d@FontAwesome',
						iconCls : 'deleteicons',
						text : '删除',
						name : 'operateType_del',
						handler : function(btn) {
						var data = operateTypeGrid.getSelectionModel().getSelection();
						if (data.length == 0) {
							Ext.Msg.alert("提示", "您最少要选择一条数据!");
						} else {
							// 得到ID的数据(id)
							var ids = [];
							Ext.Array.each(data, function(record) {
								ids.push(record.get('id'));
							});
							var length = ids.length;
							Ext.Msg.confirm('操作提示', '确认删除选中'+length+'条数据?', function(option) {
								if (option == 'yes') {
									Ext.Ajax.request({
										actionMethods:{read: 'POST'},
										async : false,
										url : '/dba/operatetype/delOperateType',
										params : {
											id : ids.join(',')
										},
										success : function(response) {
											OPTTOOLS.responseAlert(response,'删除');
											operateTypeStore.reload();
											sm.deselectAll();
										},
										failure : function(response) {
											Ext.Msg.alert('提示', '删除失败!');
											operateTypeStore.reload();
											sm.deselectAll();
										}
									});
								}
							});
						}
					}
			    }, {
					xtype : 'button',
					glyph : 'xf05b@FontAwesome',
					iconCls : 'clearicons',
					text : '清除',
					tooltip :"清除Filters条件",
					handler : function() {
						mystore.clearFilter();
					}
				}, {
					xtype : 'button',
					glyph : 'xf013@FontAwesome',
					iconCls : 'seticons',
					text : '设置',
					handler : function() {
						OPTTOOLS.displayModelSet('tools_operatetype');
					}
				}, {
					xtype : 'button',
					glyph : 'xf01e@FontAwesome',
					iconCls : 'reloadicons',
					text : '重载',
					tooltip :'重载内存',
					handler : function() {
						Ext.Ajax.request({
							actionMethods:{read: 'POST'},
							async : false,
							url : '/dba/operateType/reloadOperateType',
							success : function(response) {
								OPTTOOLS.responseAlert(response,'重载');
							},
							failure : function(response) {
								Ext.Msg.alert('提示', '重载失败!');
							}
						});
					}
				}, {
					xtype : 'button',
					glyph : 'xf01e@FontAwesome',
					iconCls : 'reloadicons',
					text : '重载序列',
					tooltip :'重载序列',
					handler : function() {
						Ext.Ajax.request({
							actionMethods:{read: 'POST'},
							async : false,
							url : '/dba/operateType/reloadId',
							success : function(response) {
								OPTTOOLS.responseAlert(response,'重载');
							},
							failure : function(response) {
								Ext.Msg.alert('提示', '重载失败!');
							}
						});
					}
				}],
			dockedItems : [{
					xtype : 'pagingtoolbar',
					store : mystore,
					dock : 'bottom',
					displayInfo : true
			}]
	 });

	//系统参数表单
	var operateTypeForm = Ext.create('Ext.form.Panel', {
		style : 'border-width:0 0 0 0',
		frame : true,
		buttonAlign : 'center',
		defaultType : 'textfield',
		scrollable : true,
		defaults : {
			/*align : 'center',
			margin : '0 5 5 0',
			maxWidth : 300,
			minWidth : 240,
			labelWidth : 70,
			width : 300,*/
			align : 'center',
			anchor : '98%',
			labelWidth : 70
		},
		items : [{
				xtype : 'hidden',
				name : 'id'
		}, {
				xtype : 'textfield',
				name : 'code',
				fieldLabel : '代码',
				maxLength: 80,
				allowBlank : false,
				labelWidth : 70	
		},{
				xtype : 'textfield',
				name : 'name',
				fieldLabel : '中文描述',
				maxLength: 80,
				allowBlank : false,
				labelWidth : 70
		}, {
				xtype : 'textfield',
				name : 'servertype',
				fieldLabel : '服务类别',
				maxLength: 200,
				labelWidth : 70
		}, {
				xtype : 'textfield',
				name : 'remark',
				fieldLabel : '说明',
				maxLength: 200,
				labelWidth : 70
		},  
		{
				xtype : 'textfield',
				name : 'direction',
				fieldLabel : '方向',
				maxLength: 100,
				labelWidth : 70
		}
		],
		buttons : [ {
				text : '保存',
				handler : function(obj){
					var form =operateTypeForm;
					var flag = operateTypeWin.flag;
					if(!form.isValid()){
						return;
					}
					if(flag == 'add'){
						Ext.Ajax.request({
							actionMethods:{read: 'POST'},
							async : false,
							url : '/dba/operateType/addOperateType',
							params : {
								code : form.getValues().code,
								description : form.getValues().description,
								remark : form.getValues().remark,
								servertype : form.getValues().servertype,
								name : form.getValues().name,
								direction : form.getValues().direction
							},
							success : function(response) {
								OPTTOOLS.responseAlert(response,'添加');
								operateTypeForm.reset();
								operateTypeWin.close();
								operateTypeGrid.getStore().reload();
							},
							failure : function(response) {
								Ext.Msg.alert('提示', '添加失败'+ response.responseText);
								operateTypwWin.close();
							}
						});	
					}else if(flag == 'update'){
						Ext.Ajax.request({
							actionMethods:{read: 'POST'},
							async : false,
							url : '/dba/operateType/updateOperateType',
							params : {
								id : form.getValues().id,
								code : form.getValues().code,
								description : form.getValues().description,
								remark : form.getValues().remark,
								servertype : form.getValues().servertype,
								name : form.getValues().name,
								direction : form.getValues().direction
							},
							success : function(response) {
								OPTTOOLS.responseAlert(response,'编辑');
								operateTypeForm.reset();
								operateTypeWin.close();
								operateTypeGrid.getStore().reload();
							},
							failure : function(response) {
								Ext.Msg.alert('提示', '编辑失败' + response.responseText);
								operateTypeWin.close();
							}
						});
					}
				}
		}, {
			xtype : 'button',
			text : '取消',
			name : 'kindEdit_back',
			handler : function(btn) {
				this.up('form').reset();
				this.up('window').close();
			}
		}]
	});
	
	//弹框
	var operateTypeWin = Ext.create('Ext.window.Window', {
		title : '添加操作类型',
		height : 330,
		width : 400,
		//iconCls : 'win',
		closable : true,
		closeAction : 'hide',
		modal : true,
		align : 'center',
		layout : {
			type : 'hbox',
			align : 'stretch',
			padding : 5
		},
		defaults : {
			flex : 1
		},
		items : operateTypeForm,
		listeners : {
			beforeclose : function(panel, eOtps) {
				operateTypeForm.reset();
			}
		}
	});
	
	//自适应，必须添加,注意变量名称
  	window.addEventListener("resize", function() {
			operateTypeGrid.setWidth("100%");
			operateTypeGrid.setHeight(window.innerHeight - search_normal_div.scrollHeight);
  	}, false);
});