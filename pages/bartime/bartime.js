$.getJSON('bartime.json', function(data) {

	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'], function(ec) {

		/*---------- 准备第一个Series ----------*/
		var oriSeries = [];
		for (var i = 0; i < data.bartime.body.data[0].name.length; i++) {
			var obj = {
				'name' : data.bartime.body.data[0].name[i],
				'type' : 'bar',
				'data' : data.bartime.body.data[0].value[i],
				'barCategoryGap' : '50%' //柱间间隔
			};

			oriSeries.push(obj);
		}

		/*---------- 基于准备好的dom，初始化echarts图表 ----------*/
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			timeline : {
				data : function() {
					var list = [];
					for (var i = 0; i < data.bartime.body.data.length; i++) {
						list.push(data.bartime.body.data[i].time);
					}
					return list;
				}(),
				label : {
					formatter : function(s) {
						return s.slice(0, 4);
					}
				},
				//autoPlay : true,
				playInterval : 1000,
				notMerge : true
			},
			options : [{
				title : {
					'text' : data.bartime.body.data[0].text,
					'subtext' : '数据来源：毕鉴昭'
				},
				tooltip : {
					'trigger' : 'axis'
				},
				legend : {
					x : 'right',
					'data' : data.bartime.body.data[0].name,
				},
				toolbox : {
					'show' : true,
					orient : 'vertical',
					x : 'right',
					y : 'center',
					'feature' : {
						'mark' : {
							'show' : true
						},
						'dataView' : {
							'show' : true,
							'readOnly' : false
						},
						'magicType' : {
							'show' : true,
							'type' : ['line', 'bar', 'stack', 'tiled']
						},
						'restore' : {
							'show' : true
						},
						'saveAsImage' : {
							'show' : true
						}
					}
				},
				calculable : true,
				grid : {
					'y' : 80,
					'y2' : 100
				},
				xAxis : [{
					'type' : 'category',
					'axisLabel' : {
						'interval' : 0
					},
					'data' : data.bartime.xname
				}],
				yAxis : {
					'type' : 'value',
					'name' : 'ug/m3'
				},
				//第一个数据
				series : oriSeries
			}]
		};

		/*---------- 推送后续数据 ----------*/
		for (var i = 1; i < data.bartime.body.data.length; i++) {
			var newSeries = [];
			for (var j = 0; j < data.bartime.body.data[i].name.length; j++) {
				var obj = {
					'name' : data.bartime.body.data[i].name[j],
					'type' : 'bar',
					'data' : data.bartime.body.data[i].value[j],
					'barCategoryGap' : '50%' //柱间间隔
				};
				newSeries.push(obj);
			}
			var obj = {
				title : {
					'text' : data.bartime.body.data[i].text,
					'subtext' : '数据来源：毕鉴昭'
				},
				tooltip : {
					'trigger' : 'axis'
				},
				legend : {
					x : 'right',
					'data' : data.bartime.body.data[i].name,
				},
				toolbox : {
					'show' : true,
					orient : 'vertical',
					x : 'right',
					y : 'center',
					'feature' : {
						'mark' : {
							'show' : true
						},
						'dataView' : {
							'show' : true,
							'readOnly' : false
						},
						'magicType' : {
							'show' : true,
							'type' : ['line', 'bar', 'stack', 'tiled']
						},
						'restore' : {
							'show' : true
						},
						'saveAsImage' : {
							'show' : true
						}
					}
				},
				calculable : true,
				grid : {
					'y' : 80,
					'y2' : 100
				},
				xAxis : [{
					'type' : 'category',
					'axisLabel' : {
						'interval' : 0
					},
					'data' : data.bartime.xname
				}],
				yAxis : {
					'type' : 'value',
					'name' : 'ug/m3'
				},
				series : newSeries
			}
			option.options.push(obj);
		}

		/*---------- 为echarts对象加载数据 ----------*/
		myChart.setOption(option);
	});
});

