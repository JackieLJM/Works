/**
 * 入库服务器页面所有事件注册
 * 
 * @author liujm
 */
Ext.define('JDKM.view.system.enterServer.EnterServerViewController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.enterserver',
	onBeforeEdited : function(editor, context, eOpts) {
		// if (context.record.data.id === "请输入") {
		// 监听Edit事件实现发送不同的请求，发送更新或者发送插入请求
		// console.log(this.view.getStore().getData().items.length);
		// }
		// console.log(this.store);
	},
	onEdited : function(editor, context, eOpts) {
		// console.log(context);
		// console.log(context.value);
		// this.view.getStore().reload();进入编辑状态后并不会马上触发此方法，所以在这里不用此方法
		// var datas= this.view.getStore().getData();
		// console.log(this.view.getData());
		// console.log(datas.items.length);
		// console.log(context.record);
		// console.log(this.view.getStore());

		var data = context.record.data;
		// console.log(data);
		// console.log(context.record.dirty)//在输入前已有"请输入"的字段，所以这里一添加列时这个列就会被认为是脏数据
		// if(context.record.dirty==true){
		// data=data+'!'
		// };
		// var allData = this.view.getStore().getData();
		// console.log(allData);
		// console.log(editor);//这里的editor是插件
		// console.log(context.grid);//这里的context.grid相当于this.view
		// console.log(context.field);//被编辑的cell的键
		// console.log(allData.items[0].id);//第一行的id值
		// console.log(context.value);//获取被编辑的cell，这里的value为初始化数据时cell里的值
		// context.field === "id" ? console.log(true) : console.log(false);
		// if (context.field === "id") {
		// allData.items.forEach(function(item) {
		// if (context.value === item.id){
		// Ext.Msg.alert("提示","服务器编号重复")
		// }
		// });
		// }
		// console.log(data);
		if (data.serverip === null || data.servername === null) {
			this.view.getStore().remove(context.record);
			// console.log(data);
			Ext.Msg.alert("提示", "输入不完整，请重新添加输入");
		}
		// 输入重复id的ui报错提示，未实现
		// else if(context.field=="id"){
		// context.value
		// this.view.getStore().remove(contex.record);
		// Ext.Msg.alert("提示","输入的服务器编号已存在，请重新输入");
		// }

		else if (context.value !== undefined) {
//			console.log(context);
//			context.record.commit();
			Ext.Ajax.request({
				url : extPath + 'system/updateSer',
				method : 'post',
				async : true,
				params : data,
				success : function(response) {
					// var text=Ext.JSON.decode(response.responseText)
					this.view.getStore().reload();
					console.log(response)
				},
				failure : function(response) {
					// var text=Ext.JSON.decode(response.responseText)
					Ext.Msg.alert("提示","添加数据失败");
					console.log(response)
				}
			})
			this.view.getStore().reload();
		} else if (context.value === undefined) {
			data.id = '100';
//			console.log(context);
			// 随便指定一个id为数字让请求得以通过后端验证
//			console.log(data);
			// console.log(this.view.getStore().getData().items.length);
			context.record.commit();
			// console.log(this.view.getStore().getData().items.length);
			Ext.Ajax.request({
				url : extPath + 'system/addSer',
				method : 'post',
				async : true,
				params : data,
				success : function(response) {
					// var text=Ext.JSON.decode(response.responseText)
					
//					console.log(context.grid);
					context.grid.getStore().reload();
					console.log(response)
				},
				failure : function(response) {
					// var text=Ext.JSON.decode(response.responseText)
					Ext.Msg.alert("提示","添加数据失败")
					console.log(response)
				}
			})
			this.view.getStore().reload();
		}// if(){}else if(){}
	},
	onCancelEdited : function(editor, context, eOpts) {
		// console.log(context.record);
		var data = context.record.data;
		if (data.serverip === null || data.servername === null) {
			context.record.drop();
		} else if (data) {
			Ext.Msg.alert("提示", "数据没有被改变")
		}
	},
	onAddServer : function() {
		// var editor = this.view.editingPlugin;
		var editor = this.view.getPlugin();
		editor.cancelEdit();
		// console.log(editor);
		// console.log(this.view.editingPlugin);
		// console.log(this.view.isRowediting);
		// this.view.isRowediting=true;
		// console.log(this.view.isRowediting);

		// var componentExt=Ext.getCmp('enterserverview');
		// var me=this.view;

		// console.log(this.plugins);
		// this.plugins = [ new Ext.grid.plugin.RowEditing({
		// clicksToEdit : 2
		// }) ];
		// console.log(this.plugins);

		// var me = this.getView();
		// console.log(componentExt);
		// console.log(me);
		// console.log(rowEditing);
		var store = this.view.getStore();
		store.insert(0, {
			id : null,
			serverip : null,
			servername : null
		});
		// 这里不键入默认值，第一个值会是一个system.id的默认参数，即使在这里设置null还是会显示system.id的默认参数，
		// 由于这样的特点，在把列作为json数据提交的时候应该把id再次置为空再进行提交
		// console.log(store);
		editor.startEdit(0, 0);

		// var vm = this.getViewModel();
		// vm.set('isSended', false);
		// var isDeliver=vm.get('isDeliver');
		// isDeliver=false;
		// console.log(this.getViewModel());
		// console.log(store);
	},
	onDeleteServer : function() {
		// console.log(rowIndex);
		// console.log(colIndex);
		// console.log(this.getView());
		// this.view.getStore().remove();
		var me = this.view;
		var store = me.getStore();
		// 在controller里可以直接对this使用getStore方法
		var sm = me.getSelectionModel();
		var record = sm.getSelection();
		var Ids = [];
		for (var i = 0; i < record.length; i++) {
			Ids.push(record[i].data.id);
		}
		// console.log(Ids);

		var Idstring = '';
		Idstring = Ids.join(',');
		// console.log(Idstring);
		if (Idstring == '') {
			Ext.Msg.alert('提示', '请选择记录!');
			return;
		}
		Ext.Msg.confirm('系统提示', '确定要删除？', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					method : 'post',
					cors : true,
					async : true,
					url : extPath + 'system/delSer',
					jsonData : {
						id : Idstring
					},
					success : function(response) {
						// console.log(Ext.JSON.decode(response.responseText));
						// console.log(response);
						// console.log(OPTTOOLS);
						// OPTTOOLS.responseAlert(response, '删除');
						store.remove(record);
					},
					failure : function(response) {
						Ext.Msg.alert('删除提示', '删除失败!');
					}
				})
				// store.remove(record);
			}
		});

		// var vm = this.getViewModel();
		// vm.set('isSended', false);
	},
	onEditServer : function() {
		// console.log(this);//打印出该controller
		// this.getView();
		// console.log(this.getView());
		Ext.Msg.alert('系统提示', '双击单元格可以进行编辑,编辑完按保存键');
		// console.log(this.view.columns);
		// console.log(this.view.columns[0]);
		// // this.view.columns[0].setEditor('textfield');
		// console.log(this.view.columns[0]);
		// console.log(this.view.getPlugin());
		// console.log(this.view);
		// var vm = this.getViewModel();
		// vm.set('isSended', false);
	},
	onQueryServer : function() {
		var store = this.view.getStore();
		// console.log(Ext.getCmp('search').getValue());
		var value = Ext.getCmp('search').getValue();
		store.clearFilter();
		// store.setFilters({filters:[function(item){return
		// item.id===value&&item.serverip===value&&item.servername===value}]});
		store.filterBy(function(item) {
			// console.log(item.data);
			return item.data.id === value || item.data.serverip === value
					|| item.data.servername === value
		});
//		console.log(store.getData());
		if(store.getData().length===0){
			Ext.Msg.alert('系统提示','未找到与此值相匹配的服务器，请键入完全相同的值再执行查询');
			store.clearFilter();
		}
		// store.reload();
		// Ext.create('Ext.window.Window', {
		// title : '键入查询字段',
		// height : 100,
		// width : 400,
		// layout : {type:"fit",align:"center"},
		// modal : true,
		// items : [ {
		// xtype : "textfield",
		// name : "查询",
		// fieldLabel : '查询',
		// allowBlank : false
		// } ]
		// }).show();
		// store.load
	},
	onResetQuery : function() {
		var store = this.view.getStore();
		store.clearFilter();
		store.reload();
	}
// ,
// onSave : function() {
// Ext.Ajax.request({
// method : 'post',
// async : false
// })
// }

})