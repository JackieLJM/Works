Ext.define('JDKM.view.equip.EquipNetcard', {
	extend : 'Ext.panel.Panel',
	xtype : 'equipnetcard',
	frame : true,
	autoScroll : true,
	height : '100%',
	width : '100%',
	border : '0',
	store:Ext.create('JDKM.store.equip.EquipNetcardStore',{}),
	constructor : function(config) {
		var data = config.data;
//		console.log(config);
		
		var ip = data.ipaddress;
		var equid=data.equid;
//		console.log(equid);
//		console.log(this);
		var store=this.store;
		// console.log(store);
//		var storeLoad={},storeUnload={};
//		store.load();
//		console.log(store.getData());
//		var data=this.getData();
//		console.log(data);这里获取data，值是null
//		console.log(store.loadRawData());
//		console.log(store.getProxy().getReader().getKeepRawData());
//		var data1=Ext.clone(data);
//		var data2=Ext.clone(data);
		
		//		setTimeout(function(){store.load()});
//		var load=store.load();
//		console.log(load);
//		if(store.load()){
//		var storeLoad=deepCloneStore(load);//也是没有值，要等待请求返回数据后
		
//}
//		setTimeout(function(){
//			var storeLoad=deepCloneStore(store);
//			var storeUnload=deepCloneStore(store);
//			console.log(storeLoad);
//			console.log(storeUnload);
//		});
//		var a=Ext.clone(store);
//		console.log(a);
//		deepCloneStore(store);
//		deepCloneStore(store);
//		console.log(storeLoad);
//		console.log(storeUnload);
//		var storePromise=new Promise(function(resolve,reject){store.load();resolve(store)});
//		storePromise.then(function(store){
//		});
//		console.log(Ext.clone(store));
//		new Promise(function(resolve,reject){resolve(store)}).then(function(store){store.load()}).then(function(store){
//		var storeLoad=deepCloneStore(store);
//		var storeUnload=deepCloneStore(store);
//		console.log(storeLoad);
//		console.log(storeUnload);});
//		var me=this;
////		console.log(me);
//		store.load(function(records,operation,success){
//		var storeLoad=deepCloneStore(store);
////		window.storeLoad=storeLoad;
//		me.storeLoad=storeLoad;
////		对于有proxy的store，深复制只有在store.load方法里有效
//		var storeUnload=deepCloneStore(store);
//		me.storeUnload=storeUnload;
//		storeLoad.filterBy(function(record){
////			console.log(record);
////			服务端返回的数据是直接没有ipv4键值的
//			var data= record.data;
//			if(data.IPV4!==null
//			&&data.IPV4mask!==null
//			&&data.IPV6!==null
//			&&data.IPV6mask!==null){
//				return true;
//			}
//		});
//		storeUnload.filterBy(function(record){
//			var data=record.data;
//			if(data.IPV4===null
//			&&data.IPV4mask===null
//			&&data.IPV6===null
//			&&data.IPV6mask===null){
//				return true;
//			}
//		});
//		console.log(operation);
//		console.log(storeLoad);
//		console.log(storeUnload);
//		});
//		var store1=Ext.create('Ext.data.Store',{});
		var store2=Ext.create('Ext.data.Store',{});
//		store1.loadData(data);
//		console.log(store.isLoaded());
		if(store.isLoaded()===true){
			var store1=deepCloneStoreRecords(store);
			var store2=deepCloneStoreRecords(store);
			
//			console.log(store1);
//			console.log(store2);
		}
//		var store2=deepCloneStore(store1);
		function deepCloneStoreRecords (source) {
//			console.log(source);
//			console.log(source.$className);定义的store的名字
		    source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;
//		    console.log(source);
		    var target = Ext.create("Ext.data.Store", {
//		        model: source.model //用source.model会把proxy的信息也拷贝过去
//		        ,
//		        proxy:{type:'ajax'}
		    });
//		    console.log(target);
//		    console.log(source.getRange());
		    
		    target.add(Ext.Array.map(source.getRange(), function (record) {
////		        console.log(record);
		    	return record.copy();
		    }));

		    return target;
		}
		// var datad={equid:'876',ipv4:'a',ipv4mask:'b',ipv6:'c',ipv6mask:null};
		// var datad=store.getAt(0).data;
		// console.log(datad);
		// if ((datad.equid===equid)
		// 			&&(
		// 				((datad.hasOwnProperty('ipv4')===true)||(datad.hasOwnProperty('ipv4mask')===true)||(datad.hasOwnProperty('ipv6')===true)||(datad.hasOwnProperty('ipv6mask')===true))
		// 				&&(datad.ipv4!==null||datad.ipv4mask!==null||datad.ipv6!==null||datad.ipv6mask!==null)
		// 				&&(datad.ipv4!==undefined||datad.ipv4mask!==undefined||datad.ipv6!==undefined||datad.ipv6mask!==undefined)
		// 				&&(datad.ipv4!==''||datad.ipv4mask!==''||datad.ipv6!==''||datad.ipv6mask!=='')
		// 			)
		// 		){
		// 		console.log(datad);
				
		// }
//		console.log(store1,store2);//store filterBy的执行是提前执行
		// console.log(store.getAt(0));
		store1.filterBy(function(record){
			var data= record.data;
//			console.log(!data.hasOwnProperty('ipv4'));
//			console.log(data.hasOwnProperty('ipv4'));
//			console.log(data.equid===equid);
		
			if ((data.equid===equid)
					&&(
						((data.hasOwnProperty('ipv4')===true)||(data.hasOwnProperty('ipv4mask')===true)||(data.hasOwnProperty('ipv6')===true)||(data.hasOwnProperty('ipv6mask')===true))
						&&(data.ipv4!==null||data.ipv4mask!==null||data.ipv6!==null||data.ipv6mask!==null)
						&&(data.ipv4!==undefined||data.ipv4mask!==undefined||data.ipv6!==undefined||data.ipv6mask!==undefined)
//						&&(data.ipv4!==''||data.ipv4mask!==''||data.ipv6!==''||data.ipv6mask!=='')
					)
				){
				// console.log(data);
				return true;
			}		
			
		});
		store2.filterBy(function(record){
			var data=record.data;
//			console.log((!data.hasOwnProperty('ipv4')&&!data.hasOwnProperty('ipv4mask')&&!data.hasOwnProperty('ipv6')&&!data.hasOwnProperty('ipv6mask')));
			if((data.equid===equid)
					&&(
						((data.hasOwnProperty('ipv4')===false)&&(data.hasOwnProperty('ipv4mask')===false)&&(data.hasOwnProperty('ipv6')===false)&&(data.hasOwnProperty('ipv6mask')===false))
						||(data.ipv4===null&&data.ipv4mask===null&&data.ipv6===null&&data.ipv6mask===null)
						||(data.ipv4===undefined&&data.ipv4mask===undefined&&data.ipv6===undefined&&data.ipv6mask===undefined)
						||(data.ipv4===''&&data.ipv4mask===''&&data.ipv6===''&&data.ipv6mask==='')
					)		
			)
			{
				return true;
			}
//			if{
//					return true;
//				}
		});
//		console.log(store1,store2);
//		var storeLoad=Ext.clone(me.storeUnload);
//		delete me.storeUnload;
//		var storeUnload=Ext.clone(me.storeLoad);
//		delete me.storeLoad;
//		console.log(window);
//		console.log(window.storeLoad);
//		console.log(new me.storeLoad);
//		function deepCloneStore (source) {
////			console.log(source);
////			console.log(source.$className);
//		    source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;
////		    console.log(source);
//		    var target = Ext.create(source.$className, {
//		        model: source.model,
//		    });
////		    console.log(target);
////		    console.log(source.getRange());
//		    target.add(Ext.Array.map(source.getRange(), function (record) {
////		        console.log(record);
//		    	return record.copy();
//		    }));
//
//		    return target;
//		}
//		
//		
//		setTimeout(function(){
//		console.log(storeLoad);
//		console.log(storeUnload);})
//		
		Ext.apply(this, {
			defaultType : 'treepanel',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			defaults : {
				rootVisible : false,
				flex : 1
			},
			items : [ {
				title : '当前设备正在使用的网卡',
				itemId:'grid1',
				xtype : 'gridpanel',
				// dockedItems:{xtype:'pagingtoolbar',store :store1,dock:'bottom',displayInfo:true},
				header : {
					style : 'background:#4682B4',
					padding : '1',
					items : [ {
						xtype : 'button',
						glyph : 'xf01a@FontAwesome',
						text : '卸载使用中的网卡',
						listeners : {
							click : function() {
//								console.log(this.up('gridpanel'))
								var me=this.up('gridpanel');
								var sm=me.getSelectionModel();
								var records=sm.getSelection();
//								console.log(storeLoad.getData());
//								console.log(records[0].data);
//								console.log(storeLoad);
								
//								console.log(Object.prototype.toString.call(records));
//								console.log(records);
//								records[0].data.id=null;
//								console.log(records[0].data.id);
//								var data=[];
//								for(var i=0;i<records.length;i++){
//									var item=Ext.clone(records[i].data);
//									item.id=null;
//									console.log(item.id);
//									data.push(item);
//									console.log(data);
//								}
//								var datas={};
//								var datas=records.map(function(item){item.data.id=null;return item.data;});
//								console.log(datas);
//								console.log(data);
//								console.log(record);
//								console.log(data);
//								storeUnload.add((function(){records[0].data.id=null;
//								console.log(records[0].data);
//								return records[0].data})());
//								storeUnload.removeAll();
//								storeLoad.add(records);
//								Ext.Ajax.request({url:extPath+'updateNC'})
//								console.log(storeLoad.getData());
//								storeLoad.reload();
//								storeUnload.loadRecords(records);
//								storeUnload.reload();
//								console.log(records);
								var datas=[];
								records.forEach(function(record){
									record.data.ipv4=null;record.data.ipv4mask=null;record.data.ipv6=null;record.data.ipv6mask=null;
//									console.log(record.data);
									delete record.data.row_num;
									datas.push(record.data)});
								console.log(datas);
								
								Ext.Ajax.request({
									url:extPath+'equip/updateNC',
									method:'post',
									async:true,
									jsonData:datas,
									success:function(response){
//										localChange();
//										console.log(response);
										Ext.toast({title:"提示",html:"卸载网卡成功",alwaysOnTop:true});
										localChange();

									},
									failure:function(res){
										Ext.toast({title:"提示",html:"卸载网卡失败",alwaysOnTop:true});
									}
								})
								function localChange(){
									store1.remove(records);
									for(var i=0;i<records.length;i++){
										var data=records[i].data;
										store2.add({
											id:data.id,
											equid:data.equid,
											netcardid :data.netcardid,
											cardname : data.cardname,
											mac : data.mac,
											netcardtype : data.netcardtype,
											ipv4 : null,
											ipv4mask : null,
											ipv6 : null,
											ipv6mask : null,
											gateway : data.gateway,
											purpose : data.purpose,
											notes : data.notes
										});
									}
								}
							}
						}
					} ]
				},
				margin : '0',
				border : '0',
				plugins : [ {
					ptype : 'rowediting',
					clicksToEdit : 2,
					listeners : {
						edit : function(editor, context, eOpts) {
							
							var data = context.record.data;
							// console.log(context);
//							 console.log(data);
//							var data={a:null,b:null};
							function hasValueExId(data){
//								console.log(data);
								for(var name in data){
									if((name!=='id')&&(name!=='equid')&&(name!=='row_num')&&(name!=='port')&&(name!=="netequid")){
//										console.log(data[name]);
										if(data[name]!==undefined&&data[name]!==null&&data[name]!==''){

											return true
										}
									}
								}
								return false
							}
							function hasIP(data){
								if((data.ipv4!==''||data.ipv4mask!==''||data.ipv6!==''||data.ipv6mask!=='')&&(data.ipv4!==null||data.ipv4mask!==null||data.ipv6!==null||data.ipv6mask!==null)&&(data.ipv4!==undefined||data.ipv4mask!==undefined||data.ipv6!==undefined||data.ipv6mask!==undefined)){
									return true;
								}
							}
							
							data=context.newValues;
							data.id=context.record.data.id;
							data.equid=context.record.data.equid;
							context.record.data=data;
//							context.value=context.newValues;
							delete data[""];
							var datas=[];
							datas.push(data);
//							console.log(context.value)
							
//							console.log(hasValueExId(data));
							if(hasValueExId(data)===false){
//								console.log("hasValueExId");
//								console.log(data);
								
								Ext.toast({title:"提示",html:"值为空，请为该网卡重新输入，取消则永久移除该网卡",alwaysOnTop:true});
								var editor=context.grid.getPlugin();
//								console.log(typeof (data.row_num)-1);
								editor.startEdit(context.record);
								// context.grid.getStore().remove(context.record);

							}
							else if(hasIP(data)){
								// console.log("hasIP");
								// console.log(data);
								// console.log(context.record);
								// context.record.data=data;
								context.record.commit();
								if(data.id.includes('ext')===false){
									Ext.Ajax.request({
										url : extPath + 'equip/updateNC',
										method : 'post',
										async : true,
										jsonData : datas,
										success : function(response) {
											Ext.toast({title:"提示",html:"该网卡已成功更新",alwaysOnTop:true});
											// console.log(response)
										},
										failure : function(response) {
											Ext.toast({title:"提示",html:"该网卡保存失败",alwaysOnTop:true});
											// console.log(response)
										}
									})
								}else if(data.id.inclues('ext')==true){
									Ext.Ajax.request({
										url : extPath + 'equip/addNC',
										method : 'post',
										async : true,
										params : data,
										// (function(){data.id='';return data;})(),
										success : function(response) {
											var text=Ext.decode(response.responseText);
											if(text.id!==undefined){
												context.record.setId(text.id)
												context.record.commit();
												Ext.toast({title:"提示",html:"该网卡已成功保存",alwaysOnTop:true});
											}
											// context.record.id=text.id;
											else{
												Ext.toast({title:"提示",html:"保存失败，请键入更多信息",alwaysOnTop:true});
												context.record.commit();
												context.grid.getPlugin().startEdit(context.record);
											};
										},
										failure : function(response) {
											Ext.toast({title:"提示",html:"该网卡保存失败",alwaysOnTop:true});
											// console.log(response)
										}
									})
								}	
							}
							//保存时没有输入ip的处理
							else if(hasIP(data)!==true){
								// console.log("noip");
								// console.log(data);
//								delete context.record.data.row_num;
//								如果在这里删除record会把store的record删除
//								console.log(store1,store2);
								Ext.Ajax.request({
									url : extPath + 'equip/updateNC',
									method : 'post',
									async : true,
									jsonData : datas,
									success : function(response) {
										Ext.toast({title:"提示",html:"网卡信息更新，IP值为空，该网卡已卸载",alwaysOnTop:true});
										
										
										store2.add(context.record.data);
										context.record.drop();

										// console.log(response)
									},
									failure : function(response) {
										Ext.toast({title:"提示",html:"该网卡保存失败",alwaysOnTop:true});
										// console.log(response)
									}
								})

								
//								console.log(context.grid.store);就是store1
//								console.log(context.record.data);
//								context.grid.up('panel').getComponent('grid2').store.add(context.record.data); 
//								console.log(context.grid.up('panel').getComponent('grid2').store);
							}

						},
						canceledit : function(editor, context, eOpts) {
							var data = context.record.data;
							// console.log(data);
							delete data[""];
							var datas=[];
							datas.push(data);
							function isEmptyExId(data) {
								for ( var name in data) {
//									console.log(data[name])
									if (name !== 'id'&&name!=='equid'&&name!=='port'&&name!=='netequid'&&name!=='row_num') {
										if (data[name] !== undefined&&data[name]!==''&&data[name]!==null) {
											return false
										}
									}
								}
								return true
							}
							// console.log(isEmptyExId(data));
							if (isEmptyExId(data)) {
								var Ids = [];
								Ids.push(data.id);
								var Idstring = '';
								Idstring = Ids.join(',');
								Ext.Ajax.request({
									url : extPath + 'equip/delNC',
									method : 'post',
									async : true,
									jsonData : {id:Idstring},
									success : function(response) {
										Ext.toast({title:"提示",html:"值为空，该网卡已被永久移除",alwaysOnTop:true});
										context.record.drop();
										// console.log(response)
									},
									failure : function(response) {
										Ext.toast({title:"提示",html:"值为空，该网卡移除失败",alwaysOnTop:true});
										// console.log(response)
									}
								})
							} else if (data) {
//								加载网卡后点击取消按键时没有输入相应ip字段的处理
								if((data.ipv4===undefined&&data.ipv4mask===undefined&&data.ipv6===undefined&&data.ipv6mask===undefined)||(data.ipv4===null&&data.ipv4mask===null&&data.ipv6===null&&data.ipv6mask===null)||(data.ipv4===''&&data.ipv4mask===''&&data.ipv6===''&&data.ipv6mask==='')){
									
										Ext.toast({title:"提示",html:"IP值为空，该网卡已卸载",alwaysOnTop:true});
										store2.add(context.record.data);
										context.record.drop();
										// console.log(response)
									
								
								}else{
									Ext.toast({title:"提示", html:"数据没有被改变",alwaysOnTop:true});
								}
							}
						},
						beforeedit : function() {
						}
					},
					saveBtnText : '保存',
					cancelBtnText : '取消',
					autoCancel : true
				} ],
				store : store1,
				columns : [  {
					xtype : 'rownumberer',
					hidden:true,
					align : 'center',
					width : '3%'
				},{
					text : '网卡编号',
					dataIndex : 'netcardid',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡名称',
					dataIndex : 'cardname',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡物理地址',
					dataIndex : 'mac',
					width : '10%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡类型',
					dataIndex : 'netcardtype',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡ipv4',
					dataIndex : 'ipv4',
					width : '9%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡ipv4掩码',
					dataIndex : 'ipv4mask',
					width : '11%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡ipv6',
					dataIndex : 'ipv6',
					width : '9%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡ipv6掩码',
					dataIndex : 'ipv6mask',
					width : '11%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡网关',
					dataIndex : 'gateway',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡用途',
					dataIndex : 'purpose',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '备注',
					dataIndex : 'notes',
					width : '5%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				} ],
				// store : Ext.create('Ext.data.TreeStore', {
				// root : {
				// expanded : true,
				// children : [ {
				// text : 'detention',
				// leaf : true
				// }, {
				// text : 'homework',
				// expanded : true,
				// children : [ {
				// text : 'book report',
				// leaf : true
				// }, {
				// text : 'algebra',
				// leaf : true
				// } ]
				// }, {
				// text : 'buy lottery tickets',
				// leaf : true
				// } ]
				// }
				// }),

				// viewConfig : {
				// plugins : {
				// ptype : 'treeviewdragdrop',
				// enableDrag : true,
				// enableDrop : true
				// }
				// },
				selModel : {
					selType : 'checkboxmodel',
					checkOnly : true
				}
			}, {
				title : '当前设备下未使用的网卡',
				itemId:'grid2',
				xtype : 'gridpanel',
				// dockedItems:{xtype:'pagingtoolbar',store :store2,dock:'bottom',displayInfo:true},
				header : {
					style : 'background:#4682B4',
					padding : '1',
					items : [ {
						xtype : 'button',
						glyph : 'xf067@FontAwesome',
						text : '添加新的网卡',
						border : 1,
						listeners : {
							click : function() {
								var editor = this.up('gridpanel').getPlugin();
								// editor.cancelEdit();
								// var store = this.up('gridpanel').getStore();
//								console.log(editor,store);

								store2.insert(0,{
									// id:"ext",
									equid:data.equid,
									netcardid : null,
									cardname : null,
									mac : null,
									netcardtype : null,
									ipv4 : null,
									ipv4mask : null,
									ipv6 : null,
									ipv6mask : null,
									gateway : null,
									purpose : null,
									notes : null
								});
								editor.startEdit(0, 0);
							}
						}
					}, {
						xtype : 'button',
						glyph : 'xf00d@FontAwesome',
						text : '移除未使用的网卡',
						border : 1,
						listeners : {
							click : function() {
								var me=this.up('gridpanel');
								var store=me.getStore();
								var sm=me.getSelectionModel();
								var records=sm.getSelection();
								var Ids = [];
								for (var i = 0; i < records.length; i++) {
									Ids.push(records[i].data.id);
								}
								var Idstring = '';
								Idstring = Ids.join(',');
								if (Idstring == '') {
									Ext.Msg.alert('提示', '请选择记录!');
									return;
								}
								// console.log(records);
								// console.log(Ids);
								// console.log(Idstring);
								Ext.Msg.confirm('系统提示', '确定要删除？', function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											method : 'post',
											cors : true,
											async : true,
											url : extPath + 'equip/delNC',
											jsonData : {
												id : Idstring
											},
											success : function(response) {
												Ext.toast({title:'提示',html:'永久移除网卡成功',alwaysOnTop:true})
												store.remove(records);
											},
											failure : function(response) {
												Ext.toast('删除提示', '删除失败!');
											}
										})
									}
								});
							}
						}
					}, {
						xtype : 'button',
						glyph : 'xf01b@FontAwesome',
						text : '加载并编辑网卡的IP',
						listeners : {
							click : function() {
//								var editor = this.up('gridpanel').getPlugin();
//								editor.cancelEdit();
//								console.log(this.up().up().up().getComponent('grid1'));
								var editor1=this.up().up().up().getComponent('grid1').getPlugin();
								var me=this.up('gridpanel');
								var sm=me.getSelectionModel();
								var records=sm.getSelection();
//								console.log(records);
								localChange();

								function localChange(){
									store2.remove(records);
									for(var i=0;i<records.length;i++){
										var data=records[i].data;
	//									console.log(records[i]);
										store1.insert(0,{
											id:data.id,
											equid:data.equid,
											netcardid :data.netcardid,
											cardname : data.cardname,
											mac : data.mac,
											netcardtype : data.netcardtype,
											ipv4 : '',
											ipv4mask : '',
											ipv6 : '',
											ipv6mask : '',
											gateway : data.gateway,
											purpose : data.purpose,
											notes : data.notes,
											row_num:undefined
											
										});
									}
									// console.log('1');
									// console.log(store1.getAt(0));
									Ext.toast({title:"提示",html:"加载网卡成功，未键入ip的网卡将自动进行卸载",alwaysOnTop:true});
//									store1.filterBy(function(record){
//										var data= record.data;
//										return (((data.equid===equid)&&((data.hasOwnProperty('ipv4')===true)||(data.hasOwnProperty('ipv4mask')===true)||(data.hasOwnProperty('ipv6')===true)||(data.hasOwnProperty('ipv6mask')===true)))
//											&&((data.equid===equid)&&(data.ipv4!==undefined||data.ipv4mask!==undefined||data.ipv6!==undefined||data.ipv6mask!==undefined)));
//										});
//									console.log(store1);
								}
								// for (var i = 0; i < records.length; i++) {
								// 		editor1.startEdit(i,0);
								// 	}
								//加载多个网卡后的多行连续处理，高版本浏览器可用
								// if(Object.getPrototypeof(function* (){}).constructor.name==="GeneratorFunction"){
								// 	function* startEdit(argument) {
								// 		for (var i = 0; i < records.length; i++) {
								// 			yield editor1.startEdit(i,0);
								// 		}
								// 	}
								// 	var startEdit=startEdit();
								// 	startEdit.next();
								// }else{
									editor1.startEdit(0,0);
								// }
								// startEdit.next();
//								console.log(store1);
//								var data={cardname
//								:
//									"Broadcom BCM5708C NetXtreme II GigE (NDIS VBD Client) #43",
//									gateway
//									:
//									undefined,
//									id
//									:
//									"1291",
//									ipv4
//									:
//									null,
//									ipv4mask
//									:
//									null,
//									ipv6
//									:
//									null,
//									ipv6mask
//									:
//									null,
//									mac
//									:
//									"00:1e:c9:e2:87:8e",
//									netcardid
//									:
//									"65540",
//									netcardtype
//									:
//									"1000000000",
//									notes
//									:
//									undefined,
//									purpose
//									:
//									undefined};
//								co
//								console.log(((data.hasOwnProperty('ipv4')===true)||(data.hasOwnProperty('ipv4mask')===true)||(data.hasOwnProperty('ipv6')===true)||(data.hasOwnProperty('ipv6mask')===true)))
//								console.log((data.ipv4!==undefined||data.ipv4mask!==undefined||data.ipv6!==undefined||data.ipv6mask!==undefined));
//								console.log((((data.equid===equid)&&((data.hasOwnProperty('ipv4')===true)||(data.hasOwnProperty('ipv4mask')===true)||(data.hasOwnProperty('ipv6')===true)||(data.hasOwnProperty('ipv6mask')===true)))
//										&&((data.equid===equid)&&(data.ipv4!==undefined||data.ipv4mask!==undefined||data.ipv6!==undefined||data.ipv6mask!==undefined))));
							}
						}
					} ]
				},
				margin : '0',
				border : '0',
				plugins : {
					ptype : 'rowediting',
					clicksToEdit : 2,
					listeners : {
						edit : function(editor, context, eOpts) {
//							console.log(context.record);
								var data = context.record.data;
								// context.record.commit();
								// console.log(context);
								// console.log(data);

								function hasValueExId(data){
//									console.log(data);
									for(var name in data){
										if((name!=='id')&&(name!=='equid')&&(name!=='row_num')&&(name!=='port')&&(name!=="netequid")){
											if(data[name]!==undefined&&data[name]!==null&&data[name]!==''){
												return true
											}
										}	
									}
									return false;
								}
//								var keys= Object.keys(data);
//								for(var key in keys){
//									console.log(key);
//								}
//								var map= new Map({"id":"id"});
//								var obj={};
//								console.log(obj.__proto__);
//								console.log(obj.__proto__.constructor);
//								console.log(data.hasOwnProperty("notes"));true
//								console.log(data.propertyIsEnumerable("notes"));true
//								console.log(Object.getOwnPropertyNames(data));
//								var names= Object.getOwnPropertyNames(data);
//								for(var name in data){
//									console.log(name);
//									console.log(typeof data["notes"]);
//									console.log(data);
//									console.log(data.getOwnPropertyNames());这个是Object的静态方法
//									console.log(data.propertyIsEnumberable("notes"));
//									console.log(Object.prototype.propertyIsEnumberable());拼错，没有b
//									console.log(Object.prototype.toString.call(data));
//								for(var i=0;i<names.length;i++){
//									var name=names[i];
//									console.log(name);
//									if(name!==""){
//										if(data[name]!==""){
//											return true
//										}
//									}
////									return false
//								}
//							console.log(context.field);
//							console.log(hasValueExId(context.newValues));
//							context.newValues.equid=data.equid;
//							context.newValues.id=data.id;
//							console.log(context.newValues);
//							console.log(context);
//							console.log(context.record.data);
//							console.log(hasValueExId(context.newValues));
								data=context.newValues;
								data.id=context.record.data.id;	
								data.equid=context.record.data.equid;
								context.record.data=data;			
								delete data[""];

								var datas=[];
								datas.push(data);
							if(hasValueExId(data)===true) {
								//record未变
								if(data.id.includes('ext')===false){
									Ext.Ajax.request({
										url:extPath+'equip/updateNC',
										method:'post',
										async:true,
										jsonData:datas,
										success:function(res){
											context.record.commit();
											Ext.toast({title:"提示",html:"该网卡已成功更新",alwaysOnTop:true});
											// console.log('hasValueExId');
											// console.log(context.record);
										},
										failure:function(res){
											Ext.toast({title:"提示",html:"加载网卡失败",alwaysOnTop:true});
										}
									})
								}else if(data.id.includes('ext')===true){
									// 相同id也可以保存，不过是insert操作，不知道有什么副作用
									Ext.Ajax.request({
										url:extPath+'equip/addNC',
										method:'post',
										async:true,
										params:data,
										// (function(){data.id='';return data;})(),
										success:function(response){
											var text=Ext.decode(response.responseText);
											if(text.id!==undefined){
												context.record.setId(text.id)
												context.record.commit();
												Ext.toast({title:"提示",html:"该网卡已成功保存",alwaysOnTop:true});
											}
											// context.record.id=text.id;
											else{
												Ext.toast({title:"提示",html:"保存失败，请键入更多信息",alwaysOnTop:true});
												context.record.commit();
												context.grid.getPlugin().startEdit(context.record);
											};
											// console.log(data.id);
											
											// console.log(response);
											// console.log('hasValueExId');
											// console.log(context.record);
											// console.log(store2);
										},
										failure:function(res){
											Ext.toast({title:"提示",html:"加载网卡失败",alwaysOnTop:true});
										}
									})
								}
							}
							else if(hasValueExId(data)===false){
//								下面两条语句不能颠倒顺序，否则无法弹窗
								Ext.toast({title:"提示",html:"值为空，请为该网卡重新输入，取消则永久移除该网卡",alwaysOnTop:true});
								var editor2=context.grid.getPlugin();
								editor2.startEdit(context.record);
								// context.grid.getStore().remove(context.record);
//								Ext.Msg.alert("提示","没有值，请重新输入");
							}
//							else 
		
								
//								Ext.Ajax.request({
//									url : extPath + 'equip/updateNC',
//									method : 'post',
//									async : true,
//									params : data,
//									success : function(response) {
//										console.log(response)
//									},
//									failure : function(response) {
//										console.log(response)
//									}
//								})
//								context.grid.getStore().reload();
							
//								console.log(context.record)
//								data.id = '100';
//								context.record.commit();
//								
								
//								Ext.Ajax.request({
//									url : extPath + 'equip/addNC',
//									method : 'post',
//									async : true,
//									params : data,
//									success : function(response) {
//										console.log(response)
//									},
//									failure : function(response) {
//										console.log(response)
//									}
//								})
//								context.grid.getStore().reload();
							
						},
						canceledit : function(editor, context, eOpts) {
							var data = context.record.data;
//							console.log(data);
							function isEmptyExId(data) {
								for ( var name in data) {
//									console.log(data[name])
									if (name !== 'id'&&name!=='equid'&&name!=='port'&&name!=='netequid'&&name!=='row_num') {
										if (data[name] !== undefined&&data[name]!==''&&data[name]!==null) {
											return false
										}
									}
								}
								return true
							}
							var datas=[];
							datas.push(data);
							if (isEmptyExId(data)) {
								Ext.Ajax.request({
									url:extPath+'equip/delNC',
									method:'post',
									async:true,
									jsonData:datas,
									success:function(res){
										context.record.drop();
										Ext.toast({title:"提示",html:"值为空，该网卡已被永久移除",alwaysOnTop:true});
										// console.log('hasValueExId');
										// console.log(context.record);
									},
									failure:function(res){
										context.record.drop();
										Ext.toast({title:"提示",html:"加载网卡失败",alwaysOnTop:true});
									}
								})
								

							} else if (data) {
								Ext.toast({title:"提示", html:"数据没有被改变",alwaysOnTop:true})
							}
						},
						beforeedit : function() {

						}
					},
					saveBtnText : '保存',
					cancelBtnText : '取消',
					autoCancel : true
				},
				store : store2,
				columns : [ {
					xtype : 'rownumberer',
					hidden:true,
					align : 'center',
					width : '3%'
				},{
					text : '网卡编号',
					dataIndex : 'netcardid',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡名称',
					dataIndex : 'cardname',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡物理地址',
					dataIndex : 'mac',
					width : '10%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡类型',
					dataIndex : 'netcardtype',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡ipv4',
					dataIndex : 'ipv4',
					width : '9%',
					editor : {
						xtype : 'textfield',
						emptyText : "不可输入状态",
						editable: false,
						allowBlank : true
					}
				}, {
					text : '网卡ipv4掩码',
					dataIndex : 'ipv4mask',
					width : '11%',
					editor : {
						xtype : 'textfield',
						emptyText : "不可输入状态",
						editable: false,
						allowBlank : true
					}
				}, {
					text : '网卡ipv6',
					dataIndex : 'ipv6',
					width : '9%',
					editor : {
						xtype : 'textfield',
						emptyText : "不可输入状态",
						editable: false,
						allowBlank : true
					}
				}, {
					text : '网卡ipv6掩码',
					dataIndex : 'ipv6mask',
					width : '11%',
					editor : {
						xtype : 'textfield',
						emptyText : "不可输入状态",
						editable: false,
						allowBlank : true
					}
				}, {
					text : '网卡网关',
					dataIndex : 'gateway',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '网卡用途',
					dataIndex : 'purpose',
					width : '8%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				}, {
					text : '备注',
					dataIndex : 'notes',
					width : '5%',
					editor : {
						xtype : 'textfield',
						emptyText : "请输入",
						allowBlank : true
					}
				} ],
				// store : Ext.create('Ext.data.TreeStore', {
				// root : {
				// expanded : true,
				// children : [ {
				// text : 'detention',
				// leaf : true
				// }, {
				// text : 'homework',
				// expanded : true,
				// children : [ {
				// text : 'book report',
				// leaf : true
				// }, {
				// text : 'algebra',
				// leaf : true
				// } ]
				// }, {
				// text : 'buy lottery tickets',
				// leaf : true
				// } ]
				// }
				// }),
				// viewConfig : {
				// plugins : {
				// ptype : 'treeviewdragdrop',
				// enableDrag : true,
				// enableDrop : true
				// }
				// },
				selModel : {
					selType : 'checkboxmodel',
					checkOnly : true
				}
			} ]
		});
		this.callParent(arguments);
	}
// plugins:{
// ptype:'rowediting'
// }
})