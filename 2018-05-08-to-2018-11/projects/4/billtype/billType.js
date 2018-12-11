var mystore;
var queryMode = 'normal';

function query() {
	var param;
	if (queryMode == 'normal') {
		param = $('#form_normal').serializeArray();
	} else if (queryMode == 'advanced') {
		param = $('#form_adv').serializeArray();
	}
	param.push({
				'name' : 'query_mode',
				'value' : queryMode
			});
	var json = OPTTOOLS.arrayToJSON(param);
	mystore.proxy.extraParams = json;// 使store记住查询条件
	mystore.loadPage(1);

}
function changeTab() {
	if (queryMode == 'normal') {
		$('#search_normal_div').css('display', 'none');
		$('#search_adv_div').css('display', 'block');
		queryMode = 'advanced';
	} else if (queryMode == 'advanced') {
		$('#search_normal_div').css('display', 'block');
		$('#search_adv_div').css('display', 'none');
		queryMode = 'normal';
	}
}

Ext.onReady(function() {
	var gridHeight = (window.innerHeight - search_normal_div.offsetHeight);

	var billTypeStore = Ext.create('Ext.data.Store', {
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
			url : '/dba/billType/getAllBillType?pageSize=' + loginUser.pageSize,
			reader : {
				type : 'json',
				rootProperty : 'result',
				// 分页使用的
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
	mystore = billTypeStore;

	var columns = [];
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
					iconCls : 'customicon-jdk-edit customicon-jdkactioncolor',
					handler : function(billTypeGrid, rowIndex, colIndex) {
						var rec = billTypeGrid.getStore().getAt(rowIndex);
						var id = rec.get('id');
						Ext.Ajax.request({
									actionMethods : {
										read : 'POST'
									},
									async : false,
									url : '/dba/billType/getBillTypeById',
									params : {
										id : id
									},
									success : function(response) {
										var text = response.responseText;
										billTypeWin.flag = 'update';
										var model = Ext
												.create(
														'Ext.data.Model',
														Ext.JSON.decode(text).result[0]);
										billTypeForm.reset();
										billTypeForm.loadRecord(model);
										billTypeWin.setTitle('修改话单类型');
										billTypeWin.show();
									}
								});
					}
				}, {
					xtype : 'tbspacer'
				}, {
					tooltip : '删除',
					iconCls : 'customicon-jdk-delete customicon-jdkactioncolor',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var id = rec.get('id');
						Ext.Msg.confirm('操作提示', '确认删除?', function(option) {
									if (option == 'yes') {
										Ext.Ajax.request({
													actionMethods : {
														read : 'POST'
													},
													async : false,
													url : '/dba/billType/delBillType',
													params : {
														id : id
													},
													success : function(response) {
														OPTTOOLS.responseAlert(
																response, '删除');
														billTypeStore.reload();
													},
													failure : function(response) {
														Ext.Msg.alert('提示',
																'删除失败!');
														billTypeStore.reload();
													}
												});
									}
								});
					}
				}]
			});

	columns = OPTTOOLS.getDisplayModel('TOOLS_BILLTYPE', columns);
	// 页面表格
	var billTypeGrid = Ext.create('Ext.grid.Panel', {
		renderTo : 'billType-grid',
		forceFit : true,
		height : gridHeight,
		columnLines : true,
		border : '0',
		store : billTypeStore,
		enableColumnHide : false,
		viewConfig : {
			enableTextSelection : true
		},
		plugins : 'gridfilters',
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
					name : 'billType_add',
					handler : function(btn) {
						billTypeWin.setTitle('添加话单类型');
						billTypeWin.flag = 'add';
						billTypeForm.reset();
						billTypeWin.show();
					}
				}/*
					 * ,{ xtype : 'tbspacer' }
					 */, {
					xtype : 'button',
					glyph : 'xf00d@FontAwesome',
					iconCls : 'deleteicons',
					text : '删除',
					name : 'billType_del',
					handler : function(btn) {
						var data = billTypeGrid.getSelectionModel()
								.getSelection();
						if (data.length == 0) {
							Ext.Msg.alert("提示", "您最少要选择一条数据!");
						} else {
							// 得到ID的数据(id)
							var ids = [];
							Ext.Array.each(data, function(record) {
										ids.push(record.get('id'));
									});
							var length = ids.length;
							Ext.Msg.confirm('操作提示', '确认删除选中' + length + '条数据?',
									function(option) {
										if (option == 'yes') {
											Ext.Ajax.request({
												actionMethods : {
													read : 'POST'
												},
												async : false,
												url : '/dba/billType/delBillType',
												params : {
													id : ids.join(',')
												},
												success : function(response) {
													OPTTOOLS.responseAlert(
															response, '删除');
													billTypeStore.reload();
													sm.deselectAll();
												},
												failure : function(response) {
													Ext.Msg
															.alert('提示',
																	'删除失败!');
													billTypeStore.reload();
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
					tooltip : "清除Filters条件",
					handler : function() {
						mystore.clearFilter();
					}
				}, {
					xtype : 'button',
					glyph : 'xf013@FontAwesome',
					iconCls : 'seticons',
					text : '设置',
					handler : function() {
						OPTTOOLS.displayModelSet('TOOLS_BILLTYPE');
					}
				}, {
					xtype : 'button',
					glyph : 'xf01e@FontAwesome',
					iconCls : 'reloadicons',
					text : '重载',
					tooltip : '重载内存',
					handler : function() {
						Ext.Ajax.request({
									actionMethods : {
										read : 'POST'
									},
									async : false,
									url : '/dba/billType/reloadBillType',
									success : function(response) {
										OPTTOOLS.responseAlert(response, '重载');
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
					tooltip : '重载序列',
					handler : function() {
						Ext.Ajax.request({
									actionMethods : {
										read : 'POST'
									},
									async : false,
									url : '/dba/billType/reloadId',
									success : function(response) {
										OPTTOOLS.responseAlert(response, '重载');
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

	var billTypeForm = Ext.create('Ext.form.Panel', {
		style : 'border-width:0 0 0 0',
		frame : true,
		buttonAlign : 'center',
		defaultType : 'textfield',
		scrollable : true,
		defaults : {
			/*
			 * align : 'center', margin : '0 5 5 0', maxWidth : 300, minWidth :
			 * 240, labelWidth : 70, width : 300,
			 */
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
					maxLength : 25,
					allowBlank : false,
					labelWidth : 70
				}, {
					xtype : 'textfield',
					name : 'sortmark',
					fieldLabel : '排序',
					maxLength : 500,
					allowBlank : false,
					labelWidth : 70
				}, {
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					maxLength : 50,
					allowBlank : false,
					labelWidth : 70
				}, {
					xtype : 'textfield',
					name : 'remark',
					fieldLabel : '备注',
					maxLength : 100,
					labelWidth : 70
				}, {
					xtype : 'textfield',
					name : 'kind',
					fieldLabel : '分类',
					maxLength : 100,
					labelWidth : 70
				}
				, {
					xtype : 'textfield',
					name : 'subkind',
					fieldLabel : '子分类',
					maxLength : 10,
					labelWidth : 70
				}
				, {
					xtype : 'textfield',
					name : 'unitekind',
					fieldLabel : '合并类别',
					maxLength : 100,
					labelWidth : 70
				}
				],
		buttons : [{
			text : '保存',
			handler : function(obj) {
				var form = billTypeForm;
				var flag = billTypeWin.flag;
				if (!form.isValid()) {
					return;
				}
				if (flag == 'add') {
					Ext.Ajax.request({
						actionMethods : {
							read : 'POST'
						},
						async : false,
						url : '/dba/billType/addBillType',
						params : {
							code : form.getValues().code,
							kind : form.getValues().kind,
							remark : form.getValues().remark,
							subkind : form.getValues().subkind,
							unitekind : form.getValues().unitekind,
							name : form.getValues().name,
							sortmark : form.getValues().sortmark
						},
						success : function(response) {
							OPTTOOLS.responseAlert(response, '添加');
							billTypeForm.reset();
							billTypeWin.close();
							billTypeGrid.getStore().reload();
						},
						failure : function(response) {
							Ext.Msg.alert('提示', '添加失败' + response.responseText);
							billTypeWin.close();
						}
					});
				} else if (flag == 'update') {
					Ext.Ajax.request({
						actionMethods : {
							read : 'POST'
						},
						async : false,
						url : '/dba/billType/updateBillType',
						params : {
							id : form.getValues().id,
							code : form.getValues().code,
							kind : form.getValues().kind,
							remark : form.getValues().remark,
							subkind : form.getValues().subkind,
							unitekind : form.getValues().unitekind,
							name : form.getValues().name,
							sortmark : form.getValues().sortmark
						},
						success : function(response) {
							OPTTOOLS.responseAlert(response, '编辑');
							billTypeForm.reset();
							billTypeWin.close();
							billTypeGrid.getStore().reload();
						},
						failure : function(response) {
							Ext.Msg.alert('提示', '编辑失败' + response.responseText);
							billTypeWin.close();
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

	// 弹框
	var billTypeWin = Ext.create('Ext.window.Window', {
				title : '添加 话单类型',
				height : 330,
				width : 400,
				// iconCls : 'win',
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
				items : billTypeForm,
				listeners : {
					beforeclose : function(panel, eOtps) {
						billTypeForm.reset();
					}
				}
			});

	// 自适应，必须添加,注意变量名称
	window.addEventListener("resize", function() {
				billTypeGrid.setWidth("100%");
				billTypeGrid.setHeight(window.innerHeight
						- search_normal_div.scrollHeight);
			}, false);
});