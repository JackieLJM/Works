/**
 * 入库服务器页面
 * 
 * @author liujm
 */

// BUG和用户体验问题
// 1.在前端部分添加列时如果id重复会不能添加，没有进行相应的提示，会造成用户体验不友好；(BUG已可忽略)
// 2.在添加重复id报错误后，不能对ID进行更改，如果对其进行更改会造成添加错误的报错，比如会自动添加"请输入""请输入""请输入"的无效列；(BUG已可忽略)
// 3.某些操作比如进行上面第2个bug的操作会报Duplicate newKey "*" for item with
// oldKey"*"的错误；(BUG已可忽略)
// 4.增加列时输入内容不能自动被全选，这样要选中内容删除内容后才能编辑想要的内容，用户体验不友好；(问题已解决)
// 5.添加列时编辑输入时候，如果id的第一个数字相同的话会触发canceledit事件；(BUG已可忽略)
// 6.store.reload后该子页面不能显示完全，顶部会有一些被覆盖，再转向第一个页面后再返回此ui界面就显示正常了；
// 7.排正序之后再添加记录无法正常使用添加功能，会自动添加"请输入""请输入""请输入"的无效列，添加功能正常使用只能在未被排序的情况下使用；
// 8.ext默认的空值键入提示很难看；(问题已解决)
// 9.点击增加后会增加新的一列，点多少增加多少空列；(问题已解决)
Ext.define('JDKM.view.system.enterServer.EnterServerView', {
	extend : 'Ext.grid.Panel',
	xtype : 'enterserverview',
	id : 'enterserverview',
	viewModel : {
		type : 'enterserver'
	},
	controller : 'enterserver',
	// placeholder:'查询',
	// store : Ext.create({
	// xtype : 'store.enterserverstore',
	//
	// }),
	// isRowediting : false,
	bind : {
		store : '{enterserverstore}'
	// isRowediting:'{isRowediting}',
	},

	initComponent : function() {
		// console.log(this);//打印出该组件
		// this.setIsRowediting=function(isRowediting){return
		// isRowediting};
		this.getViewModel().getStore('enterserverstore').load();
		// console.log(this.getStore());//undefined,说明这个view没有store了，但是在viewcontroller层会读出store
		// 没有load就会变成读取本地数据，说明执行load，proxy才能发起请求
		// console.log(this.getViewModel().getStore('enterserverstore')
		// .getData());
		// this.bindStore('enterserverstore');
		// var me = this;
		// console.log(me.isRowediting);

		Ext.apply(this, {
			// store:this.getViewModel().getStore('enterserverstore'),
			// bind:{
			// store:'enterserverstore'
			// },
			// columms只有放在这里才能获取到dataIndex
			plugins : [ {
				ptype : 'rowediting',
				clicksToEdit : 2,
				listeners : {
					edit : 'onEdited',
					canceledit : 'onCancelEdited',
					beforeedit : 'onBeforeEdited'
				},
				saveBtnText : '保存',
				cancelBtnText : '取消',
				autoCancel : true
			// placeholder: '请输入'
			}
			// ,
			// {
			// ptype : 'cellediting',
			// clicksToEdit : 2
			// }
			],
			columns : [ {
				xtype : 'rownumberer',
				align : 'center',
				width : '3%'
			},
			// {
			// xtype:"numbercolumn",
			// dataIndex:"id"
			// },
			// {
			// text : '服务器编号',
			// dataIndex : 'id',
			// align : 'center',
			// width : '31%',
			// renderer : function(value, metaData, record, rowIndex,
			// colIndex, store, view) {
			// return value
			// },
			// listeners: {
			// dblclick:function(){
			// Ext.create('Ext.window.Window', {
			// title: 'Hello',
			// height: 200,
			// width: 400,
			// layout: 'fit',
			// modal: true,
			// items: { // Let's put an empty grid in just to
			// illustrate fit layout
			// xtype: 'grid',
			// border: false,
			// columns: [{header: 'World'}], // One header just for
			// show. There's no data,
			// store: Ext.create('Ext.data.ArrayStore', {}) // A
			// dummy empty data store
			// }
			// }).show();
			// }
			// }
			// editor : {
			// // xtype : 'textfield',
			// // name : "请输入",
			// allowBlank : false,
			// // plugins : "cellediting"
			// }
			// },
			{
				text : '服务器地址',
				dataIndex : 'serverip',
				// 硬件分配的服务器地址就是入库服务器的地址，这里要涉及到数据库表的关联操作
				align : 'center',
				width : '47%',
				sortable : false,
				editor : {
					xtype : 'textfield',
					emptyText : '请输入',
					allowBlank : false,
					blankText : '值不为空'
				}
			// editRenderer:function(value){
			// return '<span>'+value+'</span>'
			// }
			}, {
				text : '服务器名称',
				dataIndex : 'servername',
				align : 'center',
				width : '47%',
				sortable : false,
				editor : {
					xtype : 'textfield',
					emptyText : "请输入",
					allowBlank : false,
					blankText : '值不为空'
				}
			} ],
			selModel : {
				selType : 'checkboxmodel',
				checkOnly : true
			}
		});
		// console.log(me.isRowediting);
		// console.log(this.store);
		this.callParent(arguments);
	},
	// store:Ext.create('JDKM.store.system.EnterServerStore'),
	// afterRender:function(){
	// // console.log(this);
	// },
	frame : true,
	autoScroll : true,
	height : window.innerHeight - 60,
	width : '100%',
	border : 0,
	multiSelect : true,
	viewConfig : {
		stripeRows : true,
		enableTextSelection : true
	},
	tbar : [ {
		xtype : 'button',
		glyph : 'xf067@FontAwesome',
		iconCls : 'fa-color-5',
		text : '添加',
		border : 1,
		style : {
			borderColor : 'gray',
			borderStyle : 'solid'
		},
		tooltip : '添加服务器',
		listeners : {
			click : 'onAddServer'
		}
	}, {
		xtype : 'button',
		glyph : 'xf00d@FontAwesome',
		iconCls : 'fa-color-2',
		text : '删除',
		border : 1,
		style : {
			borderColor : 'gray',
			borderStyle : 'solid'
		},
		tooltip : '删除服务器',
		listeners : {
			click : 'onDeleteServer'
		}
	}, {
		xtype : 'button',
		glyph : 'xf044@FontAwesome',
		iconCls : 'fa-color-1',
		text : '编辑',
		border : 1,
		style : {
			borderColor : 'gray',
			borderStyle : 'solid'
		},
		tooltip : '编辑服务器',
		listeners : {
			click : 'onEditServer'
		}
	}, {
		xtype : 'tbfill'
	}, {
		xtype : 'textfield',
		id : "search",
		margin : '0 0 0 0'
	}, {
		xtype : 'button',
		glyph : 'xf002@FontAwesome',
		text : '匹配查询',
		border : 1,
		style : {
			borderColor : 'gray',
			borderStyle : 'solid'
		},
		tooltip : '查询服务器',
		listeners : {
			click : 'onQueryServer'
		}
	}, {
		xtype : 'button',
		glyph : 'xf01e@FontAwesome',
		text : '恢复所有结果',
		border : 1,
		style : {
			borderColor : 'gray',
			borderStyle : 'solid'
		},
		listeners : {
			click : 'onResetQuery'
		}
	}
	// , {
	// xtype : 'button',
	// text : '保存',
	// border : 1,
	// style : {
	// borderColor : 'gray',
	// borderStyle : 'solid'
	// },
	// tooltip : '上传数据到服务器',
	// bind : {
	// hidden : '{isSended}'
	// },
	// listeners : {
	// click : 'onSave'
	// }}
	],
	listeners : {
	// dblclick:function(){
	// Ext.create('Ext.window.Window', {
	// title: 'Hello',
	// height: 200,
	// width: 400,
	// layout: 'fit',
	// modal: true,
	// items: { // Let's put an empty grid in just to illustrate fit
	// layout
	// xtype: 'grid',
	// border: false,
	// columns: [{header: 'you'}], // One header just for show. There's
	// no data,
	// store : Ext.create('Ext.data.ArrayStore', {})
	// // A dummy empty data store
	// }
	// }).show();
	// }
	}
})