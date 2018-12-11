Ext.define("JDKM.view.system.hardwaremanage.HardwareManageTree", {
    extend: 'Ext.tree.Panel',
    xtype: 'hardwaremanagetree',
    rootVisible: true,
    hideHeaders: true,
    animate: true,
    autoScroll: true,
    listeners: {
        itemclick: 'hardwareItemClick'
    },
    initComponent: function () {
        var _this = this;
        var store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: extPath + 'hardwaremanage/hardwareTree'
            },
            reader: {
                type: 'json'
            },
            root: {
                tid: 'root',//默认的node值
                text: '硬件',
                expanded: true
            }
        })
        Ext.apply(this, {
            store: store,
            tbar: [{
                xtype: 'button',
                tooltip: '刷新',
                iconCls: 'x-fa fa-refresh fa-color-1',
                border: 1,
                style: {
                    borderColor: 'gray',
                    borderStyle: 'solid'
                },
                handler: function () {
                    store.load();
                    var map = {};
                    map.success = true;
                    OPTTOOLS.responseAlert(map, '刷新');
                }
            },{
                xtype: 'textfield',
                width: 140,
                emptyText: '快速搜索',
                enableKeyEvents: true,
                listeners: {
                    keyup: function (node, event) {
                        _this.findByKeyWordFiler(node, _this, store);
                    },
                    scope: this
                }
            }]
        });
        this.callParent(arguments);
    },
    /**
     * 树的查询
     * node : 输入框或值
     * treeStore ： 树结构的store
     */
    findByKeyWordFiler: function (node, treePanel, treeStore) {
        clearTimeout(this.timeOutId);// 清除timeOutId
        // 为了避免重复的访问后台，给服务器造成的压力，采用timeOutId进行控制，如果采用treeFilter也可以造成重复的keyup
        this.timeOutId = setTimeout(function () {
            // 获取输入框的值
            var text = '';
            if (node.value != undefined) {
                text = node.value;
            } else {
                text = node;
            }
            text = $.trim(text);
            // 根据输入制作一个正则表达式，'i'代表不区分大小写
            var re = new RegExp('^.*' + Ext.String.escapeRegex(text) + '.*$', 'i');
            if (text != "") {
                treeStore.clearFilter(true);
                var reserve = [];//保存显示的父节点
                treeStore.filterBy(function (record) {
                    var id = record.get('id');
                    var rtext = record.get('text');
                    if (arrayContains(reserve, record)) return true;
                    if (re.test(rtext)) {//将匹配上的节点的所有父节点保存在reserve中
                        keepNode(record, reserve);
                    }
                    //判断是否匹配
                    return re.test(rtext);
                });
            } else {
                treeStore.clearFilter(false);
                treePanel.collapseAll();
                treePanel.expandPath('root');
                return;
            }
            treePanel.expandAll();// 展开树节点
        }, 500);

        function keepNode(record, reserve) {
            var parent = record.parentNode;
            if (parent) {
                if (!arrayContains(reserve, parent)) {
                    reserve.push(parent);
                }
                keepNode(parent, reserve)
            }

        }

        //判断数值是否包含某值

        function arrayContains(array, needle) {
            for (i in array) {
                if (array[i] == needle) return true;
            }
            return false;
        }
    }
})
