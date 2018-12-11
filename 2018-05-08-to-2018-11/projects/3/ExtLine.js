// @author: liujm
// 使用方法：使用该组件实例化后，设置完属性值就可以使用
Ext.define("Ext.ux.ExtLine", {
	extend : 'Ext.Component',
	alias : 'widget.extline',
	config : {
		width : null,
		height : null,
		xdata : [],
		ydata : [],
		legend : [],
		text : null,
		subtext : null
	},
	afterRender : function(t, eOpts) {
		// console。log(t);
		var id = this.getId();// 获取到该组件dom的id值
		var element = document.getElementById(id).style;
		element.width = this.getWidth();
		element.height = this.getHeight();
		// 这里获取外部传进来的宽高值然后赋值给此元素
		var xdata = this.getXdata();
		var text = this.getText();
		var subtext = this.getSubtext();
		var legends = this.getLegend();
		var ydata = this.getYdata();
		// var me=this;
		// (element.width);
		this.callParent(arguments);
		require.config({
					paths : {
						echarts : 'js/echarts/dist'
					}
				});
		require(['echarts', 'echarts/chart/line'], function(ec) {
			// var me=this;
			var myCharts = ec.init(document.getElementById(id));
			var option = {
				title : {
					text : text,
					subtext : subtext
				},
				tooltip : {
					trigger : 'axis'
					// ,
					// axisPointer:{
					// type:'cross',
					// label:{
					// backgroundColor:'#6a7985'
					// }
					// }
				},
				legend : {
					data : legends
				},
				// toolbox:{
				// show:true,
				// feature:{
				// mark:{show:true},
				// dataView:{show:true,readOnly:false},
				// magicType:{show:true,type:['line','bar','stack','tiled']},
				// restore:{show:true},
				// saveAsImage:{show:true}
				// }
				// },
				calculable : true,
				// grid:{
				// left:'3%',
				// right:'4%',
				// bottom:'3%',
				// containLabel:true
				// },
				xAxis : [{
							type : 'category',
							boundaryGap : false,
							data : xdata
						}],
				yAxis : [{
					type : 'value'
//					,
						// max:'2000'
					}],
				series :
					(function() {
					var series = [];
					for(var i=0;i<legends.length;i++){
//						找出所有标题
//						console.log(ydata);
						if(legends.length===ydata.length){
						for(var j=0;j<ydata.length;j++){
							
//							(typeof legends[i]);
//							
//							找出与标题匹配的数据
							var match = legends[i].match(/([\S]+)\([\S]+\)-([\S]+)-([\S]+)/);
//							(match);
							if(match!==null&&legends[i]!=="没有选中统计指标"){
							
							var softname=match[1];
							var softid=match[2];
							var partid=match[3];
//							(softname);
//							(softid);
//							(ydata);
//							for(var k=0;k<xdata.length;k++){
//								(xdata);
//								(xdata.length);

//							按照所选日期区间生成一个对应该日期区间的数组
							
//							var data=new Array(xdata.length);
							var data=[];
							for(var n=0;n<xdata.length;n++){
								
//								var obj=Object.assign({},obj);
								var obj=Object.create({});
								obj[xdata[n]]=0;
								data.push(obj);
								
//								(xdata[n]);
							}
//							(xdata);
//							(data);
//							for(var k=0;k<data.length;k++){
//								data[k]
//							}
//							遍历按soft id分组的数组,给每个softid的子数组生成一个供echart使用的数组，把ydata里的值赋值到data里
							for(var m=0;m<ydata[j].length;m++){
//								遍历日期的天数，给对应的天数添加对应的值，遍历完生成data数组
//								for(var n=0;n<xdata.length;n++){
//								var obj={};
//								--------------------------------如果数据是跟当前的标题匹配的数据，就进入条件,即数据是跟当前的legend相同的值，将其存入新数组-----------------------------------------		
								if((match[1]===ydata[j][m].softname)&&(match[2]===ydata[j][m].softid)&&(match[3]===ydata[j][m].partid)){
//										(ydata[j][m]);
										var matchDatatime=ydata[j][m].datatime.match(/([\S]+)\s/);
										data.forEach(function(item){
//											(Object.keys(item)[0]===matchDatatime[1]);
											if(Object.keys(item)[0]===matchDatatime[1]){
												item[matchDatatime[1]]=ydata[j][m].keyvalue;
											}
										});
								}
//								}
								
//								}
//								console.log(data);
							}

//							将带有对象的数组转换成不带对象的数组
							var newData=[];
							data.forEach(function(item){
								
								newData.push(Object.values(item)[0]);
								});
//							console.log(newData);
//							校验生成的数组，如果都为零不推入series
							var bool= newData.every(function(item){return item===0});
//							(bool);
							
							if(bool==false){
//								console.log(newData);
								series.push({
									name:legends[i],
									type:'line',
									data:newData
								})
							}
//							(newData);
							
//							if(){
//							(legends[i],ydata[j]);
//							}
//							(data);
							}
//							
							
						}
						}
						
					}
//					(series.length);
					if(series.length>0){
						return series;
					}
					legends.forEach(function(legend) {
						series.push({
									name : legend,
									type : 'line',
									data : ydata
//									这个ydata必须是对应softid的数组，没有日期的键，但是只有是按日期进度排列的值
								})
					})
					return series;
				})()

				// [
				// {
				// name:'设备：882',
				// type:'line',
				// // stack:'总量',
				// // itemStyle:{normal:{areaStyle:{type:'default'}}},
				// data:[1200,1320,1010,1340,900,2300,2100]
				// },
				// {
				// name:'设备：876',
				// type:'line',
				// // stack:'总量',
				// // itemStyle:{normal:{areaStyle:{type:'default'}}},
				// data:[2200,1820,2000,2340,2900,3300,3100]
				// },
				// {
				// name:'设备：877',
				// type:'line',
				// // stack:'总量',
				// // itemStyle:{normal:{areaStyle:{type:'default'}}},
				// data:[3200,3320,3010,3340,3900,3300,3200]
				// },
				// {
				// name:'设备：879',
				// type:'line',
				// // stack:'总量',
				// // label:{
				// // normal:{
				// // show:true,
				// // position:'top'
				// // }
				// // },
				// // itemStyle:{normal:{areaStyle:{type:'default'}}},
				// data:[8200,9320,9010,9340,12900,13300,13200]
				// }
				// ]
			}
			// var option={}

			myCharts.setOption(option);
		});
	}
})