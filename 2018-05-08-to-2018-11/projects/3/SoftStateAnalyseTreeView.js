Ext.define('JDKM.view.warning.SoftStateAnalyseTreeView', {
			extend : 'Ext.tree.Panel',
			xtype : 'softstateanalysetreeview',
			// margin:'2px',
			border : false,
			rootVisible : true,
			hideHeaders : true,
			animate : true,
			autoScroll : true,
			listeners : {
				'itemclick' : function(me, record, item, index, e, eOpts) {
//					console.log(record,item);
//					Ext.getCmp("measure").reset();
					// console.log(me, record, item, index, e)
					var matchCondition= record.data.text.match(/([\S]+)：/);
//					console.log(matchCondition[1]);
					if (record.data.id === "root"
							|| record.data.text === "分组统计"
							|| record.data.text === "单机统计"||matchCondition[1]==="分组"||matchCondition[1]==="设备") {
						Ext.toast({
									title : "提示",
									html : "未正确选中统计条件",
									timeout : '3000',
									alwaysOnTop : true
								});
					} else {
						// 1-----------------------------根据选择的软件栏信息更新echarts---------------------------------------------
						var cmp = Ext.getCmp('softstatus')
								.lookupReference('softstatuslinechart');
						// console.log(cmp.subtext.match(/[^x00-xff]+\s/));
						// console.log(cmp.subtext.match(/^已选择软件类型:^[\u0391-\uFFE5]+\s$/));
						// ^x00-xff
						var newSubtext = cmp.subtext.match(/[\S]+\s/);
						// console.log(newSubtext[0]);
						// var text =
						// record.data.text.match(/：\S*/)[0].substr(1);
						// console.log(record.data.text.match(/：\S*/)[0].substr(1));
						var newData = record.data.text.replace('：', '(') + ')';
						// console.log(newData);
						var newCmp = cmp.cloneConfig({
									subtext : newSubtext + "，已选择统计条件："
											+ newData
								});
						// console.log(newSubtext + "，已选择统计条件："
						// + record.data.text);
						Ext.getCmp('softstatus')
								.lookupReference('softstatuslinechart')
								.destroy();
						Ext.getCmp('softstatus').add(newCmp);
						// console.log(record.data.text.match(/统计条件：+/));
						// 2----------------------------根据treepanel已有的信息获取对应的softid的值-------------------------------------------------
						var jsonData = {};
						var match = record.data.text.match(/([\S]+：)([\S]+)/);
						// console.log(record.parentNode.data.text);
						var matchParent = record.parentNode.data.text
								.match(/([\S]+：)([\S]+)/);
						// console.log(match[1]);
						// console.log(match[2]);
						if (match[1] === "分组：") {
							jsonData.groupname = match[2];
						} else if (match[1] === "子分组：") {

							jsonData.groupsub = match[2];
							jsonData.groupname = matchParent[2];
						} else if (match[1] == "设备：") {
							jsonData.equid = match[2];
						}else if(match[1]=="软件编号："){
							jsonData.softid=match[2];
							jsonData.equid=matchParent[2];
						}
						// console.log(params);
//						getValue()返回key值,getRawValue()返回value值,getSelection()直接返回record
//						3-------------------------------获取软件类型约束条件以获取约束条件下的softid值----------------------------------------------------
//						if(){}
						
						var condition=Ext.getCmp("soft").getRawValue();
//						console.log(condition);
//						console.log(condition!=="");
						if(condition!==""){
							jsonData.condition = condition;
						};
//						console.log(jsonData);
//						console.log(condition);
						if(match[1]=="软件编号："){
							var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
							//		
									var softidStr=match[2];
									var legends = [];
									var soft = Ext.getCmp('soft').getRawValue();
									
										var match = soft.match(/[\S]+\(([\S]+)\)/);
									if(match!==null){
										var softname = match[1];
										var KV=Ext.getCmp('measure').getRawValue();
										var legend=softname+"("+KV+")-"+softidStr;
										legends.push(legend);
										var newCmp = cmp.cloneConfig({
											legend:legends
										});
										Ext.getCmp('softstatus').lookupReference('softstatuslinechart').destroy();
										Ext.getCmp('softstatus').add(newCmp);
									}
//									console.log(legend);
									
						}else{
						
						Ext.Ajax.request({
									url : extPath + 'softstateanalyse/softid',
									method : 'post',
									jsonData : jsonData,
									async : true,
									success : function(response, opts) {
										// 4---------------------------根据约束条件下的softid值去获取measure的值-------------------------------------------
										var obj = Ext.decode(response.responseText);
//										 console.dir(obj);
										var softidStr = "";
										var softidArr = obj.forEach(function(
														item) {
													if (softidStr == "") {
														softidStr = softidStr
																+ item.softid;
													} else {
														softidStr = softidStr
																+ ","
																+ item.softid;
													}
												})
//										console.dir(softidStr);
										var cmp = Ext.getCmp('softstatus').lookupReference('softstatuslinechart');
								//
										var legends = [];
										var soft = Ext.getCmp('soft').getRawValue();
										var match = soft.match(/[\S]+\(([\S]+)\)/);
										var softname = match[1];
										var KV=Ext.getCmp('measure').getRawValue();
										var legend=softname+"("+KV+")-"+softidStr;
										legends.push(legend);
//										console.log(legend);
										var newCmp = cmp.cloneConfig({
											legend:legends
										});
										Ext.getCmp('softstatus').lookupReference('softstatuslinechart').destroy();
										Ext.getCmp('softstatus').add(newCmp);
//										Ext.getCmp('measure').getStore().load({
//													params : {
//														softidStr : softidStr
//													}
//												});
//										Ext.toast({
//													title : "提示",
//													html : "统计指标显示为 \""
//															+ record.data.text
//															+ "\"条件下的软件参数",
//													timeout : '3000',
//													alwaysOnTop : true
//												});
									},

									failure : function(response, opts) {
										console.log('服务端失败状态码： '
												+ response.status);
									}
								});
					}
					}
				}
			},
			initComponent : function() {
				var _this = this;
				var store = Ext.create('Ext.data.TreeStore', {
							autoLoad : true,
							proxy : {
								type : 'ajax',
								actionMethods : {
									read : 'POST'
								},
								url : extPath + 'softstateanalyse/treenode'
							},
							reader : {
								type : 'json'
							},
//							writer:{
//								type:'json'
//							},
							root : {
								// tid: 'aaa',//默认的node值
								text : '（单击以下分类以选中指定条件下的软件）',
								expanded : true
								// ,
								// rootVisiable:false
							}
						});
				Ext.apply(this, {
							store : store
						});
				this.callParent(arguments);
			}
		})