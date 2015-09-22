$.getJSON('pie.json', function(piedata) {
	// 路径配置
	require.config({
		paths : {
			echarts : '../../src/echarts-2.2.4/build/dist'
		}
	});

	// 使用
	require(['echarts', 'echarts/chart/force', 'echarts/chart/chord', 'echarts/chart/pie', 'echarts/chart/funnel'], function(ec) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('container'), 'macarons');

		var option = {
			title : {
				text : '区域贡献',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					if (params.indicator2) {// is edge
						return params.value.weight;
					} else {// is node
						return params.name
					}
				}
			},
			toolbox : {
				show : true,
				feature : {
					restore : {
						show : true
					},
					magicType : {
						show : true,
						type : ['force', 'chord']
					},
					saveAsImage : {
						show : true
					}
				}
			},
			legend : {
				orient : 'vertical',
				x : 'left',
				data : ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水']
			},
			series : [{
				type : 'chord',
				sort : 'ascending',
				sortSub : 'descending',
				showScale : false,
				showScaleText : false,
				data : [{
					name : '石家庄'
				}, {
					name : '唐山'
				}, {
					name : '秦皇岛'
				}, {
					name : '邯郸'
				}, {
					name : '邢台'
				}, {
					name : '保定'
				}, {
					name : '张家口'
				}, {
					name : '承德'
				}, {
					name : '沧州'
				}, {
					name : '廊坊'
				}, {
					name : '衡水'
				}],
				itemStyle : {
					normal : {
						label : {
							show : true
						}
					}
				},
				matrix : [[58.26770988, 0.621362909, 0.127156586, 1.998104241, 2.785818415, 3.873907352, 0.200499552, 0.096774272, 1.358240921, 0.504366022, 1.554765352], [0.606095201, 66.03362841, 2.567772197, 0.285338668, 0.246598518, 0.978820435, 0.384547198, 1.760163467, 1.191515672, 1.733865108, 0.445303924], [0.881871177, 15.15192948, 32.25470748, 0.428603659, 0.358469687, 1.224434575, 0.570970124, 2.260907902, 1.391672153, 1.445450779, 0.582239267], [3.815010187, 0.640562396, 0.133239105, 41.03009102, 6.690265909, 1.459948354, 0.180168526, 0.104960357, 1.202273805, 0.447430972, 1.56290265], [9.045058307, 0.777956803, 0.161018287, 14.25956849, 31.60168807, 2.353158199, 0.213194483, 0.125800444, 1.635268299, 0.580707549, 2.507308244], [5.017844016, 1.62698905, 0.292263428, 1.240442842, 1.267893888, 47.97427219, 1.07651727, 0.232322051, 4.29615006, 3.441243148, 2.31091057], [2.851938277, 1.087106806, 0.186247679, 0.916043916, 0.730296422, 3.717910874, 44.91563288, 0.20838864, 1.041695029, 0.950088268, 0.664647454], [1.514152079, 8.099516087, 1.350801035, 0.801829323, 0.596136414, 1.877663293, 1.386482495, 38.37939669, 1.459057235, 3.16222615, 0.706636241], [1.564914087, 2.166509922, 0.427146339, 0.932850104, 0.835188838, 2.511578294, 0.481491572, 0.334880783, 38.01107095, 3.164127156, 2.545352625], [1.336467752, 6.250014665, 0.69040112, 0.55700727, 0.484859226, 3.534325842, 1.309759468, 1.039644605, 2.507478521, 30.86920227, 0.925916277], [8.260548301, 1.364047573, 0.2826883, 3.049713546, 4.873432005, 5.444944821, 0.359839917, 0.214220012, 5.420136766, 1.354845857, 27.68398051]]
			}]
		};

		// 为echarts对象加载数据
		myChart.setOption(option);

		// 基于准备好的dom，初始化echarts图表
		var myChartPie = ec.init(document.getElementById('container1'), 'macarons');

		var optionPie = {
			title : {
				text : '石家庄分部门排放源贡献',
				//subtext : '数据来源：毕鉴昭',
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				x : 'left',
				data : piedata.pie.subspecies[0].name
			},
			calculable : true,
			series : [{
				name : '物种详细信息',
				type : 'pie',
				radius : '55%',
				center : ['50%', '50%'],
				data : function() {
					var list = [];
					for (var i = 0; i < piedata.pie.subspecies[0].value.length; i++) {
						var obj = {
							value : piedata.pie.subspecies[0].value[i],
							name : piedata.pie.subspecies[0].name[i],
						};
						list.push(obj);
					}
					return list;
				}()
			}]
		};

		myChartPie.setOption(optionPie);

		var ecConfig = require('echarts/config');
		function eConsole(param) {
			//画物种
			var newOptionPie = myChartPie.getOption();
			newOptionPie.series[0].data = [];
			for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].value.length; i++) {
				var obj = {
					value : piedata.pie.subspecies[param.dataIndex].value[i],
					name : piedata.pie.subspecies[param.dataIndex].name[i],
				};
				newOptionPie.series[0].data.push(obj);
			}
			newOptionPie.legend.data = piedata.pie.subspecies[param.dataIndex].name;
			newOptionPie.title.text = param.dataIndex + 1 + '月详细信息';
			myChartPie.setOption(newOptionPie, true);

			console.log(param);
		}

		var ecConfig = require('echarts/config');
		function eConsole(param) {
			//画物种
			var newOptionPie = myChartPie.getOption();
			newOptionPie.series[0].data = [];
			for (var i = 0; i < piedata.pie.subspecies[param.dataIndex].value.length; i++) {
				var obj = {
					value : piedata.pie.subspecies[param.dataIndex].value[i],
					name : piedata.pie.subspecies[param.dataIndex].name[i],
				};
				newOptionPie.series[0].data.push(obj);
			}

			//画图例
			var list = [];
			for (var i = 0; i < piedata.pie.subspecies[0].name.length; i++) {
				list.push(piedata.pie.subspecies[0].name[i]);
			}
			newOptionPie.legend.data = list;

			//画title
			newOptionPie.title.text = piedata.pie.subspecies[param.dataIndex].title;
			myChartPie.setOption(newOptionPie, true);

			console.log(param);
		}


		myChart.on(ecConfig.EVENT.HOVER, eConsole);

	});
});

