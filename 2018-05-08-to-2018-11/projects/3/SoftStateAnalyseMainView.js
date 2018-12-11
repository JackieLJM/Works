Ext.define('JDKM.view.warning.SoftStateAnalyseMainView', {
	extend : 'Ext.panel.Panel',
	xtype : 'softstateanalysemainview',
	// rootVisible: true,
	// hideHeaders: true,
	requires : ['JDKM.view.warning.SoftStateAnalyseTreeView'],
	height : window.innerHeight - 78,
	// width:window.innerWidth,
	layout : 'auto',
	margin : '0px 0px 0px 0px',
	border : '1px',
	padding : '0px 0px 0px 0px',
	closable : false,
	frame : true,
	scrollable : true,
	// animate: true,
	autoScroll : true,
	listeners : {
// itemclick:
	},
	// width:'100%',
	// height:55,
	// layout : {
	// type : 'hbox',
	// align : 'center',
	// pack : 'center'
	// },
	// defaults : {
	// xtype : 'textfield',
	// labelAlign : 'left',
	// labelWidth:60,
	// maxWidth : 500,
	// minWidth : 240,
	// margin : '5 0 5 0',
	// width : 250
	// },

	initComponent : function() {
		// var datas
		// Ext.Ajax.request({
		// url:extPath+'softstateanalyse/soft',
		// method:'post',
		// async:true,
		// // jsonData:datas,
		// success:function(res){
		// // context.record.commit();
		// // Ext.toast({title:"提示",html:"",alwaysOnTop:true});
		// // console.log('hasValueExId');
		// // console.log(context.record);
		// console.log(res);
		// },
		// failure:function(res){
		// // Ext.toast({title:"提示",html:"",alwaysOnTop:true});
		// console.log(res);
		// }
		// });
//		如果窗口的宽高都小于900，给两行工具栏
		var height = window.innerHeight - 190;
		var width = window.innerWidth - 570;
		window.addEventListener('resize',function(){
//			console.log(window.innerHeight,window.innerWidth);
			var height = window.innerHeight - 190;
			var width = window.innerWidth - 570;
//			var tree=Ext.getCmp('treepanel');
//			tree.setHeight(height);
//			tree.render(Ext.get('treepanel'));
//			var chart=Ext.getCmp('softstatuslinechart');
//			chart.setHeight(height);
//			chart.setWidth(width);
//			chart.render(Ext.get('softstatuslinechart'));
			var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
			var newCmp = cmp.cloneConfig({
						width:width,
						height:height
					});
			Ext.getCmp('softstatus')
					.lookupReference('softstatuslinechart')
					.destroy();
			Ext.getCmp('softstatus').add(newCmp);
			
			var cmpp = Ext.getCmp('treepanel').lookupReference('treeview');
//			console.log(Ext.getCmp('treepanel'));
//			console.log(cmpp);
			var newCmpp = cmpp.cloneConfig({
				height:height
			});
			Ext.getCmp('treepanel').lookupReference('treeview')
					.destroy();
			Ext.getCmp('treepanel').add(newCmpp);
			if(window.innerWidth<1024){
						// {
						// xtype : 'combobox',
						// tpl : "12345"
						// },
//				this.items.unshift
			}
			
		});
		
		// var time = 7;
		// Ext.create('Ext.data.Store', {
		// storeId:'employeeStore',
		// fields:['firstname', 'lastname', 'seniority', 'dep', 'hired'],
		// data:[
		// {firstname:"Michael", lastname:"Scott", seniority:7,
		// dep:"Management", hired:"01/10/2004"},
		// {firstname:"Dwight", lastname:"Schrute", seniority:2, dep:"Sales",
		// hired:"04/01/2004"},
		// {firstname:"Jim", lastname:"Halpert", seniority:3, dep:"Sales",
		// hired:"02/22/2006"},
		// {firstname:"Kevin", lastname:"Malone", seniority:4, dep:"Accounting",
		// hired:"06/10/2007"},
		// {firstname:"Angela", lastname:"Martin", seniority:5,
		// dep:"Accounting", hired:"10/21/2008"}
		// ]
		// });
		Ext.apply(this, {
			tbar:[{
				xtype : 'combobox',
				// region : 'west',
				id : 'soft',
				margin:"0",
				padding:"0",
				
				style : 'background:#35baf6;',
				labelAlign : 'right',
				labelWidth : 60,
				maxWidth : 550,
				minWidth : 150,
				margin : '5 5 5 5',
				width : window.innerWidth>=1024&&window.innerWidth<=1440?200:230,
				fieldLabel : '软件类型',
				displayField : 'value',
				valueField : 'key',
				editable : false,
				value : '0',
				// store:Ext.create('Ext.data.Store',{
				// data:[]
				// })
				// label:'软件类型',
				// name:'软件类型',
				// maxLen:20
				emptyText : '没有选择软件类型',
				store : Ext.create('Ext.data.Store', {
							fields : ['key', 'value'],
							// data : [{
							// 'key' : '0',
							// 'value' : '未选中，软件分类默认显示所有软件'
							// }],
							proxy : {
								type : 'ajax',
								async : true,
								actionMethods : {
									read : 'POST'
								},
								url : extPath + "softstateanalyse/soft",
								reader : {
									type : 'json'
									// ,
									// model:'JDKM.model.warning.SoftTypeModel',
									// rootProperty : 'result',
									// totalProperty :
									// 'totalProperty',
									// successProperty : 'success'
								},
								writer : {
									type : 'json'
								},
								listeners : {
				// 'success' : function(dataProxy,
								// response) {
								// console.log(response)
								// },
								// 'metachange':function(me){
								// console.log(me)
								// }
								}
							},
							listeners : {
								'load' : function(me, records) {
									// console.log(me);
									// console.log(this);
									// this指向这个store

								}
							}
						}),
				listeners : {
					'afterrender' : function(me) {

						// Register the new tip with an element's ID
						Ext.tip.QuickTipManager.register({
							target : me.getId(), // Target
							// button's
							// ID
							// title : '', // QuickTip
							// Header
							text : '默认显示所有软件分类条件下的所有软件类型，即没有选中软件类型，选中软件分类即选中此软件分类下的多个软件类型' // Tip
								// content
						});

					},
					'change' : function() {
					},
					'select' : function(combobox, record, eOpts) {
						// 1-------------------------------------更新echarts图表信息，单页面无刷新-----------------------------------------------
						var cmp = Ext.getCmp('softstatus')
								.lookupReference('softstatuslinechart');
						var sub = cmp.subtext.match(/\s[^x00-xff]+.+/);
						// console.log(sub);
						// console.log(sub===null);
						if (sub === null) {
							var newCmp = cmp.cloneConfig({
										subtext : "已选择软件类型："
												+ record.data.value + " "
									})
						} else {
							var newCmp = cmp.cloneConfig({
										subtext : "已选择软件类型："
												+ record.data.value + sub
									});
						}
						Ext.getCmp('softstatus')
								.lookupReference('softstatuslinechart')
								.destroy();
						Ext.getCmp('softstatus').add(newCmp);
						// 2-----------------------------------传值select里的值到treepanel去发起请求------------------------------------------------
						// console.log(record.data.value);
						var match = record.data.value.match(/([\S]+)\(([\S]+)/);
						// console.log(match[1]);
						var chinesename = match[1];
						// console.log(match[2].slice(0,-1));
						var softname = match[2].slice(0, -1);

						// console.log(Ext.getCmp('treeview').getStore());
						Ext.getCmp('treepanel').lookupReference('treeview').getStore().load({
							params : {
								softtype : chinesename + ',' + softname
							}
							// jsonData : {
							// softtype : {
							// softname:softname, 
							// chinesename:chinesename
							// }
							// }
							,
							callback : function(records, operation, success) {
//								 console.log(records);
								if (success) {
									// 3----------------------------将选中到的值传值到measure去过滤指定条件下的信息------------------------------
									// filterBy函数只有在获取了store之后才会执行，在这里是异步行为,执行多次相当于给store添加了多个过滤行为，要执行多次记得先清空过滤行为；
									Ext.getCmp("measure").clearValue();
									Ext.getCmp("measure").getStore().load();
									Ext.getCmp("measure").getStore()
											.clearFilter();
									Ext.getCmp("measure").getStore().filterBy(
											function(record) {
//												console.log(record);
												// console.log(chinesename,softname);
//												var match = record.data.value
//														.match(/([\S]+)(\([\S]+)/);
//												if (match[1] === softname) {
//													return true;
//												} else {
//													return false;
//												};
////												console.log(match[1]);
//												// console.log(record);
												return true;
											});
									// TODO：如果为空值添加“显示为空值”的字样
									Ext.toast({
												title : "提示",
												// top : window.innerHeight -
												// 300,
												timeout : 2000,
												html : "统计指标和软件分类已过滤为软件类型为"
														+ record.data.value
														+ "的软件",
												alwaysOnTop : true
											});
								} else {
									Ext.toast({
												title : "提示",
												// top : window.innerHeight -
												// 300,
												timeout : 2000,
												html : "统计指标和软件分类未过滤成功",
												alwaysOnTop : true
											});
								}
								// Ext.toast({
								// title : "提示",
								// // top : window.innerHeight -
								// // 300,
								// timeout : 2000,
								// html : "软件分类已过滤为软件类型为"
								// + record.data.value
								// + "的软件",
								// alwaysOnTop : true
								// })

							}
						});

						// Ext.toast({
						// title : "提示",
						// html : "软件分类已过滤为软件类型为"+record.data.value+"的软件",
						// alwaysOnTop : true
						// })
						// treeStore.filterBy(function(record){console.log(record)});
					}
				}
			},
					// , {
					// // xtype:'multiselect',
					// // item:[{xtype:"checkbox"}]
					// xtype : 'dataview',
					// store : {
					// fields : ['name'],
					// data : [{
					// name : 'Item 1'
					// }, {
					// name : 'Item 2'
					// }]
					// },
					// tpl : ['<ul>', '<tpl for=".">', '<li>{name}</li>',
					// '</tpl>',
					// '</ul>'],
					// // Match the li, since each one maps to a record
					// itemSelector : 'li',
					// items:[{xtype:'checkbox'}]
					//
					// },
					{
						// 有参数时应该替换掉空格里面的字条
						xtype : 'combobox',
						// region : 'east',
						id : 'measure',
						style : 'background:#35baf6;',
						// multiSelect : false,
						labelAlign : 'right',
						labelWidth : 60,
						maxWidth : 550,
						minWidth : 150,
						margin : '5 5 5 5',
						width : window.innerWidth>=1024&&window.innerWidth<=1440?220:280,
						labelWidth : 100,
						fieldLabel : '统计指标(必选)',
						displayField : 'value',
						valueField : 'key',
						editable : false,
						// value : '0',
//						multiSelect : true,
						emptyText : '没有选中统计指标',
						// store :Ext.create('Ext.data.Store',{
						// fields:['key','value'],
						// data:[{"key":"0","value":"123"},
						// {"key":"1","value":"123"},
						// {"key":"2","value":"123"}]
						// }),
						store : Ext.create('Ext.data.Store', {
									autoLoad : true,
									fields : ['key', 'value'],
									// data : [{
									// 'key' : '0',
									// 'value' : '无参数，请优先在软件分类选中指定软件'
									// }],
									proxy : {
										type : 'ajax',
										async : true,
										// actionMethods : {
										// read : 'POST'
										// },

										url : extPath
												+ "softstateanalyse/measure",
										extraParams : {
											softidStr : "all"
										},
										reader : {
											type : 'json'
											// ,
											// model:'JDKM.model.warning.SoftTypeModel',
											// rootProperty : 'result',
											// totalProperty :
											// 'totalProperty',
											// successProperty : 'success'
										},
										writer : {
											type : 'json'

										},
										listeners : {
						// exception : function(dataProxy,
										// response) {
										// console.log(response);
										// Ext.toast({
										//													
										// title : "提示",
										// // top : window.innerHeight - 300,
										// html : "请先选择软件分类里的信息",
										// alwaysOnTop : true
										// })
										// }
										}
									}
								}),
						listeners : {
							'afterrender' : function(me) {

								// Register the new tip with an element's ID
								Ext.tip.QuickTipManager.register({
									target : me.getId(), // Target
									// button's
									// ID
									// title : '', // QuickTip
									// Header
									text : '当选中一个类型值时，选项会被过滤为相同的类型值' // Tip
										// content
									});

							},
							// 'update':function(me,record,operation,modifiedFieldNames,details,eOpts){
							// console.log(record);
							// },
							'select' : function(combo, records, eOpts) {
								// console.log(records);

								// console.log(legends);
								// console.log(records.length===1);
								// 3------------------------以下是点击统计指标一个类型后该指标的选项自动过滤为同为该类型的值----------------------------------------
//								if (records.length === 1) {
//									var value = records[0].data.value
//											.match(/([\S]+)\(([\S]+)\)/);
//									var key = value[2].split('，')[1];
//									// console.log(key);
//									combo.getStore().filterBy(function(record) {
//										// console.log(records[0].data.value);
//										var valueRecord = record.data.value
//												.match(/([\S]+)\(([\S]+)\)/);
//										var keyRecord = valueRecord[2]
//												.split('，')[1];
//										if (key === keyRecord) {
//											return true;
//										}
//
//									})
//									Ext.toast({
//												title : "提示",
//												// top : window.innerHeight -
//												// 300,
//												timeout : "6000",
//												html : "统计指标的选项已自动过滤为相同的类型值（"
//														+ key + "），取消选中时恢复选项",
//												alwaysOnTop : true
//											});
//								};
								// console.log(combo.getRawValue());
								// 4--------------------------------以下是单页面无刷新更新页面中echarts图表的代码片段---------------------------------------------------
//								console.log(Ext.getCmp("soft").getRawValue());
//								var legends = [];
//								records.forEach(function(item) {
//											// console.log(item);
//											legends.push(item.data.value);
//										});
//								console.log(records);
//								console.log(legends);
//								var cmp = Ext.getCmp('softstatus')
//										.lookupReference('softstatuslinechart');
//								var newCmp = cmp.cloneConfig({
//											legend : legends
//										});
//								Ext.getCmp('softstatus')
//										.lookupReference('softstatuslinechart')
//										.destroy();
//								Ext.getCmp('softstatus').add(newCmp);
								// TODO：选中统计指标过滤软件分类
								// 如何选中tree不过滤measure
								// for(var i=0;i<records.length;i++){
								// console.log(records[i]);
								// }
								// combo.reset();
							},
							'change' : function(me, newValue, oldValue, eOpts) {
								// console.log(newValue);
								// console.log(oldValue);
								// console.log(newValue.length===0);
								// console.log(me);
//								if (newValue.length === 0) {
//									// TODO：如果是all就不要过滤，不是all就要过滤
//									me.getStore().clearFilter();
//									if (me.getStore().getProxy().extraParams.softidStr === "all") {
//										var soft = Ext.getCmp('soft')
//												.getRawValue();
//										if (soft !== "") {
//
//											var match = soft
//													.match(/[\S]+\(([\S]+)\)/);
//											var softname = match[1];
//											// console.log(softname);
//											me.getStore().filterBy(
//													function(record) {
//														// console.log(chinesename,softname);
//														var match = record.data.value
//																.match(/([\S]+)(\([\S]+)/);
//														if (match[1] === softname) {
//															return true;
//														} else {
//															return false;
//														};
//														console.log(match[1]);
//														// console.log(record);
//														return true;
//													});
//										}
//									}
//									// console.log(me.getStore().getFilters().getId());
//									//										
//
//								}
							}
							// ,'render':function(me,eOpts){
							// console.log(me.getStore());
							// }
						}
						// label:'统计指标',
						// name:'统计指标',
						// maxLen:20

					},
					{
						xtype:"toolbar",
						id:"rtbar",
						layout:"hbox",
						referenceHolder : true,
						hidden:
//							(function(){if(window.innerWidth>1024){return false;}else{return true;}})(),
								window.innerWidth>=1366?false:true,
						items:[{
							xtype : 'tbfill'
						}, {
							xtype : 'datefield',
							editable : false,
							reference:'from',
//							id : 'from',
							labelAlign : 'right',
							labelWidth : 60,
							maxWidth : 450,
							minWidth : 220,
//							margin : '5 5 5 5',
							width : window.innerWidth>=1024&&window.innerWidth<=1440?80:175,
							fieldLabel : '开始时间',
							name : 'starttime',
							format : 'Y-m-d',
							value : Ext.Date.format(Ext.Date.add(new Date(),
											Ext.Date.DAY, -7), 'Y-m-d'),
							allowBlank : false,
							listeners : {
								'select' : function(field, value, eOpts) {
//									console.log(field);
									// console.log(value);
									// console.log(eOpts)
									// console.log(arguments);
									var start = new Date(value).getTime();
									var today = new Date().getTime();
									var end = new Date(Ext.getCmp('rtbar').lookupReference('to').getValue())
											.getTime();
									if (end <= start) {
										start = end - 86400000;
										field.setValue(Ext.Date.format(Ext.Date
														.add(new Date(start),
																Ext.Date.DAY, 0),
												'Y-m-d'));
										Ext.toast({
													title : "提示",
													timeout : 2000,
													html : "开始日期大于结束日期",
													alwaysOnTop : true
												});
									} else if (end > today) {
										field.setValue(Ext.Date.format(Ext.Date
														.add(new Date(),
																Ext.Date.DAY, -1),
												'Y-m-d'));
										Ext.toast({
													title : "提示",
													timeout : 2000,
													html : "选择了未来的日期",
													alwaysOnTop : true
												});
									}
									// console.log(start);
									// console.log(end);
									var time1 = parseInt((today - end) / 86400000);
									var time = parseInt((today - start) / 86400000);
									// console.log(time1);
									// console.log(time);
									// 以下填充xdata的信息
									var xdata = [];
									for (var i = time; i >= time1; i--) {
										xdata.push(Ext.Date.format(Ext.Date.add(
														new Date(), Ext.Date.DAY,
														-i), 'Y-m-d'))
									}
									// 以下是填充ydata置零
									var ydata = (function() {
										var arr = [];
										for (var i = 0; i < xdata.length; i++) {
											arr.push(0);
										}
										return arr;
									})();
									// console.log(ydata);
									// 以下是单页面无刷新更新页面中echarts图表的代码片段
									var cmp = Ext.getCmp('softstatus')
											.lookupReference('softstatuslinechart');
									var newCmp = cmp.cloneConfig({
												text : "所选日期的状态分析",
												xdata : xdata,
												ydata : ydata
											});
									Ext.getCmp('softstatus')
											.lookupReference('softstatuslinechart')
											.destroy();
									Ext.getCmp('softstatus').add(newCmp);

							}
						}
					}, {
						xtype : 'datefield',
						editable : false,
						reference : 'to',
						labelAlign : 'right',
						labelWidth : 60,
						maxWidth : 450,
						minWidth : 220,
//						margin : '5 5 5 5',
						width : window.innerWidth>=1024&&window.innerWidth<=1440?80:175,
						fieldLabel : '结束时间',
						name : 'endtime',
						format : 'Y-m-d',
						value : Ext.Date.format(Ext.Date.add(new Date(),
										Ext.Date.DAY), 'Y-m-d'),
						allowBlank : false,
						listeners : {
							'select' : function(field, value, eOpts) {
								// console.log(field);
								// console.log(value);
								// console.log(eOpts)
								// console.log(arguments);
								var end = new Date(value).getTime();
								var today = new Date().getTime();
								var start = new Date(Ext.getCmp('rtbar').lookupReference('from')
										.getValue()).getTime();
								if (start >= end) {
									end = start + 86400000;
									field.setValue(Ext.Date.format(
											Ext.Date.add(new Date(end),
													Ext.Date.DAY, 0), 'Y-m-d'));
									Ext.toast({
												title : "提示",
												timeout : 2000,
												html : "结束日期小于开始日期",
												alwaysOnTop : true
											});
								} else if (end > today) {
									field.setValue(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY, 0),
											'Y-m-d'));
									Ext.toast({
												title : "提示",
												timeout : 2000,
												html : "选择了未来的日期",
												alwaysOnTop : true
											});
								}
								// console.log(start);
								// console.log(end);
								var time1 = parseInt((today - end) / 86400000);
								var time = parseInt((today - start) / 86400000);
								// console.log(time1);
								// console.log(time);
								// 以下填充xdata的信息
								var xdata = [];
								for (var i = time; i >= time1; i--) {
									xdata.push(Ext.Date.format(Ext.Date.add(
													new Date(), Ext.Date.DAY,
													-i), 'Y-m-d'))
								}
								// 以下是填充ydata置零
								var ydata = (function() {
									var arr = [];
									for (var i = 0; i < xdata.length; i++) {
										arr.push(0);
									}
									return arr;
								})();
								// console.log(ydata);
								// 以下是单页面无刷新更新页面中echarts图表的代码片段
								var cmp = Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart');
								var newCmp = cmp.cloneConfig({
											text : "所选日期的状态分析",
											xdata : xdata,
											ydata : ydata
										});
								Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart')
										.destroy();
								Ext.getCmp('softstatus').add(newCmp);

							}
						}
					}, {
						xtype : 'combobox',
						multiSelect : false,
						displayField : 'value',// 显示值
						width : 110,
						valueField : 'key',
						value : '1',
						editable : false,
						store : Ext.create('Ext.data.Store', {
									fields : ['key', 'value'],
									data : [
											{
												"key" : "0",
												"value" : "最近两天"
											},{
												"key" : "1",
												"value" : "近一周"
											}, {
												"key" : "2",
												"value" : "近一个月"
											}, {
												"key" : "3",
												"value" : "近三个月"
											}, {
												"key" : "4",
												"value" : "近半年"
											}, {
												"key" : "5",
												"value" : "过去一年"
											}]
								}),
						listeners : {
							'select' : function(combobox, record, eOpts) {
								// console.log(Ext.getCmp('from'))
								// console.log(combobox,record,eOpts);
//								console.log(record);
								var time = 7;
								// 以下填充xdata的信息
								var xdata = [];
								if (record.data.value === "近一周") {
									time;
									xdata = ['六天前', '五天前', '四天前', '三天前', '前天',
											'昨天', '今天'];
								} else if (record.data.value === "近一个月") {
									time = 30;

									for (var i = 30; i >= 0; i--) {
										xdata.push(Ext.Date.format(Ext.Date
														.add(new Date(),
																Ext.Date.DAY,
																-i), 'Y-m-d'))
									}
									// console.log(xdata);
								} else if (record.data.value === "近三个月") {
									time = 90;
									for (var i = 90; i >= 0; i--) {
										xdata.push(Ext.Date.format(Ext.Date
														.add(new Date(),
																Ext.Date.DAY,
																-i), 'Y-m-d'))
									}
								} else if (record.data.value === "近半年") {
									time = 180;
									for (var i = 180; i >= 0; i--) {
										xdata.push(Ext.Date.format(Ext.Date
														.add(new Date(),
																Ext.Date.DAY,
																-i), 'Y-m-d'))
									}
								} else if (record.data.value === "过去一年") {
									time = 365;
									for (var i = 365; i >= 0; i--) {
										xdata.push(Ext.Date.format(Ext.Date
														.add(new Date(),
																Ext.Date.DAY,
																-i), 'Y-m-d'))
									}
								} else if(record.data.value === "最近两天"){
									time=2;
								}
								Ext.getCmp('rtbar').lookupReference('from').setValue(Ext.Date.format(
										Ext.Date.add(new Date(), Ext.Date.DAY,
												-time), 'Y-m-d'));
								Ext.getCmp('rtbar').lookupReference('to').setValue(Ext.Date.format(
										Ext.Date.add(new Date(), Ext.Date.DAY,
												0), 'Y-m-d'));
								// Ext.getCmp('softstatuslinechart')
								// .setText(record.data.value + '的状态分析');
								// var newCmp=Ext.getCmp('softstatuslinechart');
								// Ext.getCmp()
								// Ext.getCmp('softstatuslinechart').rendered=false;
								// Ext.getCmp('softstatuslinechart').fireEvent();
								// 以下是填充ydata置零
								var ydata = (function() {
									var arr = [];
									for (var i = 0; i < xdata.length; i++) {
										arr.push(0);
									}
									return arr;
								})();
								// console.log(ydata);
								// 以下是单页面无刷新更新页面中echarts图表的代码片段
								var cmp = Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart');
								//

								var newCmp = cmp.cloneConfig({
											text : record.data.value + "的状态分析",
											xdata : xdata,
											ydata : ydata
										});
								Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart')
										.destroy();
								Ext.getCmp('softstatus').add(newCmp);
								// newCmp.render('');
								// Ext.getCmp('softstatuslinechart').addConfig({text:record.data.value});

								// console.log(Ext.getCmp('softstatuslinechart').setText(record.data.value));
							}
						}
					}, {
						xtype : 'tbfill'
					}, {

						xtype : 'button',
						glyph : 'xf1ec@FontAwesome',
						iconCls : 'fa-color-5',
						text : '统计',
						border : 1,
//						margin : '15px 35px',
						style : {
							borderColor : 'gray',
							borderStyle : 'solid'
						},
						tooltip : '按条件进行数据计算',
						listeners : {
							'click' : function() {
								var legend= Ext.getCmp('softstatus').lookupReference('softstatuslinechart').getLegend()[0];
								var mm= legend.match(/[\S]+-([\S]+)-([\S]+)/);
//								console.log(mm);
								if (Ext.getCmp('measure').getRawValue() === "") {
									Ext.Msg.alert('错误提示', '无选中统计指标');
								}else if(mm!==null){
									Ext.Msg.alert('错误提示', '重复提交数据');
								} 
								else if(mm===null){
//									var cmp = Ext.getCmp('softstatus')
//									.lookupReference('softstatuslinechart');
//									var newCmp = cmp.cloneConfig({
//												ydata : [],
//												legend:[]
//											});
//									Ext.getCmp('softstatus')
//											.lookupReference('softstatuslinechart')
//											.destroy();
//									Ext.getCmp('softstatus').add(newCmp);
									var from = Ext.getCmp('rtbar').lookupReference('from').getRawValue();
									var to = Ext.getCmp('rtbar').lookupReference('to').getRawValue();
									var target = Ext.getCmp('softstatus').lookupReference('softstatuslinechart').getLegend()[0];
//									console.log(target);
									
//									var matchmm=target.match(/[\S]+-([\S]+)-([\S]+)/);
									var matchmatch=target.match(/[\S]+-([\S]+)/);
									// var records;
//									var keys = Ext.getCmp('measure').getValue();
//									var data = Ext.getCmp('measure').getStore().data.items;
									// var
									// displayData=Ext.getCmp('measure').getRecordDisplayData();
									// Ext.getCmp('measure').on("select",function(combo,records,eOpts){console.log(combo,records,eOpts)});
									// console.log(from,to,target,keys,data);
									// 统计指标的选项里面都有softid，直接遍历record里的softid就可以得到softid
//									if(matchmm===null){
										var softid=[matchmatch[1]];
										
//									}else{
//										console.log(matchmm);
//										var softid = [matchmm[1]];
//									}
									// console.log(["5"].includes("5"));
//									for (var i = 0; i < data.length; i++) {
//										// console.log(data[i].data["key"]);
//										// console.log(typeof
//										// data[i].data["key"]);
//										// console.log(keys);
//										// console.log(typeof keys);
//										// console.log(keys.includes(data[i].data["key"]));
//										if (keys.includes(data[i].data["key"])) {
//											softid.push(data[i].data["softid"]);
//										}
//										
//									}
									
//									 console.log(softid);
									// console.log(records);
									// TODO：统计表要获取图表的信息而不是选择栏的信息
									
									Ext.Ajax.request({
												url : extPath
														+ 'softstateanalyse/analyse',
												method : 'post',
												params : {
													starttime : from,
													endtime : to,
													target : target,
													softid : softid
												},
												async : true,
												success : function(response,opts) {
													var obj=Ext.decode(response.responseText);
//													console.log(obj);
//													console.log(obj);
													var legends=[];
													var legend=Ext.getCmp('softstatus').lookupReference('softstatuslinechart').getLegend()[0];
//													console.log(legend);
													if(obj.length>1){
														for(var i=0;i<obj.length;i++){
															var partid=obj[i][0].partid;
															legends.push(legend+"-"+partid);
														}
														var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
														var newCmp = cmp.cloneConfig({
//																	text : record.data.value + "的状态分析",
//																	xdata : xdata,
																	legend : legends 
																});
														Ext.getCmp('softstatus').lookupReference('softstatuslinechart').destroy();
														Ext.getCmp('softstatus').add(newCmp);
													}
													var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
													var newCmp = cmp.cloneConfig({
//																text : record.data.value + "的状态分析",
//																xdata : xdata,
																ydata : obj
															});
													Ext.getCmp('softstatus').lookupReference('softstatuslinechart').destroy();
													Ext.getCmp('softstatus').add(newCmp);
													},
												failure : function(response,opts) {
		
													}
												})
								}
							}
						}
					}]
					}
					],
//			lbar:[{xtype:'textfield',border:'1px'}],
			items : [
				{	
					xtype:"toolbar",
					id:'second-toolbar',
					region:"north",
					margin:'-15px 0px',
					padding:'0',
					referenceHolder : true,
					hidden:window.innerWidth>=1366?true:false,
					items:[{
						xtype : 'tbfill'
					}, {
						xtype : 'datefield',
						editable : false,
						reference : 'from',
						labelAlign : 'right',
						labelWidth : 60,
						maxWidth : 450,
						minWidth : 220,
						margin : '5 5 5 5',
						width : 175,
						fieldLabel : '开始时间',
						name : 'starttime',
						format : 'Y-m-d',
						value : Ext.Date.format(Ext.Date.add(new Date(),
										Ext.Date.DAY, -7), 'Y-m-d'),
						allowBlank : false,
						listeners : {
							'select' : function(field, value, eOpts) {
//								console.log(field);
								// console.log(value);
								// console.log(eOpts)
								// console.log(arguments);
								var start = new Date(value).getTime();
								var today = new Date().getTime();
								var end = new Date(Ext.getCmp('second-toolbar').lookupReference('to').getValue())
										.getTime();
								if (end <= start) {
									start = end - 86400000;
									field.setValue(Ext.Date.format(Ext.Date
													.add(new Date(start),
															Ext.Date.DAY, 0),
											'Y-m-d'));
									Ext.toast({
												title : "提示",
												timeout : 2000,
												html : "开始日期大于结束日期",
												alwaysOnTop : true
											});
								} else if (end > today) {
									field.setValue(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY, -1),
											'Y-m-d'));
									Ext.toast({
												title : "提示",
												timeout : 2000,
												html : "选择了未来的日期",
												alwaysOnTop : true
											});
								}
								// console.log(start);
								// console.log(end);
								var time1 = parseInt((today - end) / 86400000);
								var time = parseInt((today - start) / 86400000);
								// console.log(time1);
								// console.log(time);
								// 以下填充xdata的信息
								var xdata = [];
								for (var i = time; i >= time1; i--) {
									xdata.push(Ext.Date.format(Ext.Date.add(
													new Date(), Ext.Date.DAY,
													-i), 'Y-m-d'))
								}
								// 以下是填充ydata置零
								var ydata = (function() {
									var arr = [];
									for (var i = 0; i < xdata.length; i++) {
										arr.push(0);
									}
									return arr;
								})();
								// console.log(ydata);
								// 以下是单页面无刷新更新页面中echarts图表的代码片段
								var cmp = Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart');
								var newCmp = cmp.cloneConfig({
											text : "所选日期的状态分析",
											xdata : xdata,
											ydata : ydata
										});
								Ext.getCmp('softstatus')
										.lookupReference('softstatuslinechart')
										.destroy();
								Ext.getCmp('softstatus').add(newCmp);

						}
					}
				}, {
					xtype : 'datefield',
					editable : false,
					reference:'to',
					labelAlign : 'right',
					labelWidth : 60,
					maxWidth : 450,
					minWidth : 220,
					margin : '5 5 5 5',
					width : 175,
					fieldLabel : '结束时间',
					name : 'endtime',
					format : 'Y-m-d',
					value : Ext.Date.format(Ext.Date.add(new Date(),
									Ext.Date.DAY), 'Y-m-d'),
					allowBlank : false,
					listeners : {
						'select' : function(field, value, eOpts) {
							// console.log(field);
							// console.log(value);
							// console.log(eOpts)
							// console.log(arguments);
							var end = new Date(value).getTime();
							var today = new Date().getTime();
							var start = new Date(Ext.getCmp('second-toolbar').lookupReference('from')
									.getValue()).getTime();
							if (start >= end) {
								end = start + 86400000;
								field.setValue(Ext.Date.format(
										Ext.Date.add(new Date(end),
												Ext.Date.DAY, 0), 'Y-m-d'));
								Ext.toast({
											title : "提示",
											timeout : 2000,
											html : "结束日期小于开始日期",
											alwaysOnTop : true
										});
							} else if (end > today) {
								field.setValue(Ext.Date.format(Ext.Date
												.add(new Date(),
														Ext.Date.DAY, 0),
										'Y-m-d'));
								Ext.toast({
											title : "提示",
											timeout : 2000,
											html : "选择了未来的日期",
											alwaysOnTop : true
										});
							}
							// console.log(start);
							// console.log(end);
							var time1 = parseInt((today - end) / 86400000);
							var time = parseInt((today - start) / 86400000);
							// console.log(time1);
							// console.log(time);
							// 以下填充xdata的信息
							var xdata = [];
							for (var i = time; i >= time1; i--) {
								xdata.push(Ext.Date.format(Ext.Date.add(
												new Date(), Ext.Date.DAY,
												-i), 'Y-m-d'))
							}
							// 以下是填充ydata置零
							var ydata = (function() {
								var arr = [];
								for (var i = 0; i < xdata.length; i++) {
									arr.push(0);
								}
								return arr;
							})();
							// console.log(ydata);
							// 以下是单页面无刷新更新页面中echarts图表的代码片段
							var cmp = Ext.getCmp('softstatus')
									.lookupReference('softstatuslinechart');
							var newCmp = cmp.cloneConfig({
										text : "所选日期的状态分析",
										xdata : xdata,
										ydata : ydata
									});
							Ext.getCmp('softstatus')
									.lookupReference('softstatuslinechart')
									.destroy();
							Ext.getCmp('softstatus').add(newCmp);

						}
					}
				}, {
					xtype : 'combobox',
					multiSelect : false,
					displayField : 'value',// 显示值
					width : 110,
					valueField : 'key',
					value : '1',
					editable : false,
					store : Ext.create('Ext.data.Store', {
								fields : ['key', 'value'],
								data : [
										{
											"key" : "0",
											"value" : "最近两天"
										},{
											"key" : "1",
											"value" : "近一周"
										}, {
											"key" : "2",
											"value" : "近一个月"
										}, {
											"key" : "3",
											"value" : "近三个月"
										}, {
											"key" : "4",
											"value" : "近半年"
										}, {
											"key" : "5",
											"value" : "过去一年"
										}]
							}),
					listeners : {
						'select' : function(combobox, record, eOpts) {
							// console.log(Ext.getCmp('from'))
							// console.log(combobox,record,eOpts);
							console.log(record);
							var time = 7;
							// 以下填充xdata的信息
							var xdata = [];
							if (record.data.value === "近一周") {
								time;
								xdata = ['六天前', '五天前', '四天前', '三天前', '前天',
										'昨天', '今天'];
							} else if (record.data.value === "近一个月") {
								time = 30;

								for (var i = 30; i >= 0; i--) {
									xdata.push(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY,
															-i), 'Y-m-d'))
								}
								// console.log(xdata);
							} else if (record.data.value === "近三个月") {
								time = 90;
								for (var i = 90; i >= 0; i--) {
									xdata.push(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY,
															-i), 'Y-m-d'))
								}
							} else if (record.data.value === "近半年") {
								time = 180;
								for (var i = 180; i >= 0; i--) {
									xdata.push(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY,
															-i), 'Y-m-d'))
								}
							} else if (record.data.value === "过去一年") {
								time = 365;
								for (var i = 365; i >= 0; i--) {
									xdata.push(Ext.Date.format(Ext.Date
													.add(new Date(),
															Ext.Date.DAY,
															-i), 'Y-m-d'))
								}
							} else if(record.data.value === "最近两天"){
								time=2;
							}
							Ext.getCmp('second-toolbar').lookupReference('from').setValue(Ext.Date.format(
									Ext.Date.add(new Date(), Ext.Date.DAY,
											-time), 'Y-m-d'));
							Ext.getCmp('second-toolbar').lookupReference('to').setValue(Ext.Date.format(
									Ext.Date.add(new Date(), Ext.Date.DAY,
											0), 'Y-m-d'));
							// Ext.getCmp('softstatuslinechart')
							// .setText(record.data.value + '的状态分析');
							// var newCmp=Ext.getCmp('softstatuslinechart');
							// Ext.getCmp()
							// Ext.getCmp('softstatuslinechart').rendered=false;
							// Ext.getCmp('softstatuslinechart').fireEvent();
							// 以下是填充ydata置零
							var ydata = (function() {
								var arr = [];
								for (var i = 0; i < xdata.length; i++) {
									arr.push(0);
								}
								return arr;
							})();
							// console.log(ydata);
							// 以下是单页面无刷新更新页面中echarts图表的代码片段
							var cmp = Ext.getCmp('softstatus')
									.lookupReference('softstatuslinechart');
							//

							var newCmp = cmp.cloneConfig({
										text : record.data.value + "的状态分析",
										xdata : xdata,
										ydata : ydata
									});
							Ext.getCmp('softstatus')
									.lookupReference('softstatuslinechart')
									.destroy();
							Ext.getCmp('softstatus').add(newCmp);
							// newCmp.render('');
							// Ext.getCmp('softstatuslinechart').addConfig({text:record.data.value});

							// console.log(Ext.getCmp('softstatuslinechart').setText(record.data.value));
						}
					}
				}, {
					xtype : 'tbfill'
				}, {

					xtype : 'button',
					glyph : 'xf1ec@FontAwesome',
					iconCls : 'fa-color-5',
					text : '统计',
					border : 1,
					margin : '15px 35px',
					style : {
						borderColor : 'gray',
						borderStyle : 'solid'
					},
					tooltip : '按条件进行数据计算',
					listeners : {
						'click' : function() {
							if (Ext.getCmp('measure').getRawValue() === "") {
								Ext.Msg.alert('错误提示', '无选中统计指标');
							} else {
//								var cmp = Ext.getCmp('softstatus')
//								.lookupReference('softstatuslinechart');
//								var newCmp = cmp.cloneConfig({
//											ydata : [],
//											legend:[]
//										});
//								Ext.getCmp('softstatus')
//										.lookupReference('softstatuslinechart')
//										.destroy();
//								Ext.getCmp('softstatus').add(newCmp);
								var from = Ext.getCmp('second-toolbar').lookupReference('from').getRawValue();
								var to = Ext.getCmp('second-toolbar').lookupReference('to').getRawValue();
								var target = Ext.getCmp('softstatus').lookupReference('softstatuslinechart').getLegend()[0];
								console.log(target);
								var matchmatch=target.match(/[\S]+-([\S]+)/);
								var matchmm=target.match(/[\S]+-([\S]+)-([\S]+)/);
								
								// var records;
//								var keys = Ext.getCmp('measure').getValue();
//								var data = Ext.getCmp('measure').getStore().data.items;
								// var
								// displayData=Ext.getCmp('measure').getRecordDisplayData();
								// Ext.getCmp('measure').on("select",function(combo,records,eOpts){console.log(combo,records,eOpts)});
								// console.log(from,to,target,keys,data);
								// 统计指标的选项里面都有softid，直接遍历record里的softid就可以得到softid
								if(matchmatch===null){
									var softid=[matchmm[1]];
								}else{
									var softid = [matchmatch[1]];
								}
								// console.log(["5"].includes("5"));
//								for (var i = 0; i < data.length; i++) {
//									// console.log(data[i].data["key"]);
//									// console.log(typeof
//									// data[i].data["key"]);
//									// console.log(keys);
//									// console.log(typeof keys);
//									// console.log(keys.includes(data[i].data["key"]));
//									if (keys.includes(data[i].data["key"])) {
//										softid.push(data[i].data["softid"]);
//									}
//									
//								}
								
								 console.log(softid);
								// console.log(records);
								// TODO：统计表要获取图表的信息而不是选择栏的信息
								
								Ext.Ajax.request({
											url : extPath
													+ 'softstateanalyse/analyse',
											method : 'post',
											params : {
												starttime : from,
												endtime : to,
												target : target,
												softid : softid
											},
											async : true,
											success : function(response,opts) {
												var obj=Ext.decode(response.responseText);
//												console.log(obj);
												var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
												var newCmp = cmp.cloneConfig({
//															text : record.data.value + "的状态分析",
//															xdata : xdata,
															ydata : obj
														});
												Ext.getCmp('softstatus').lookupReference('softstatuslinechart').destroy();
												Ext.getCmp('softstatus').add(newCmp);
												},
											failure : function(response,opts) {
	
												}
											})
							}
						}
					}
				}]
				},
				{
					xtype:'panel',
					region:"south",
					layout:'hbox',
					id:"south",
					referenceHolder : true,
					items:[
						{
							xtype : 'panel',
							// collapseMode:'mini',
							reference:'treepanel',
							id:'treepanel',
							scrollable : 'y',
							width : 300,
							height : height,
							border : '1px',
							margin : '12px 5px 12px 15px',
							padding : '1px',
							// border:'1px 0px 1px 0px',
							referenceHolder : true,
							region : 'center',
							items : [{
								xtype : 'panel',
								html : '<p style="background-color:#35baf6;margin:0px;padding:10px;text-align:center;font-size:1rem;">软件分类：</p>'
							}, {
								xtype : 'softstateanalysetreeview',
								reference:'treeview'
							}]
					}, {
							xtype : 'panel',
							id : 'softstatus',
//							height : height,
//							width : width,
							region : 'center',
							// scrollable:'x',
							// border:0,
							referenceHolder : true,
							margin : '12px 18px 18px 18px',
							border : '1px',
							// html:'<p>你是个杀鸡吧</p>'
							items : [{
										xtype : 'extline',
										id:'softstatuslinechart',
										reference : 'softstatuslinechart',
										height : height,
										// id : 'softstatuslinechart',
										width : width,
										xdata : ['六天前', '五天前', '四天前', '三天前', '前天', '昨天',
												'今天'],
										ydata : [0, 0, 0, 0, 0, 0, 0],
										text : '近一周的状态分析',
										subtext : '已选择软件类型：无  ',
										legend : ['没有选中统计指标']
									}]
					}
					]
				}
				
			]
		});
		this.callParent(arguments);
	}
})