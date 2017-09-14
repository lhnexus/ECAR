sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.realchart", {
			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();
				var oRModel = new sap.ui.model.odata.ODataModel("/getSensorData.xsodata");
				oModel.loadData("Canvas/mockserver/data.json");

				this.getView().setModel(oModel, "jdata");

				this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {
				var that = this;
				this._initchart(that);
				//d3.select("#Canvas_Main--realchart--page-cont").append("svg");
			},

			_initchart: function(that) {

				var margin = {
					top: 20,
					right: 50,
					bottom: 30,
					left: 50
				};
				var width = 800 - margin.left - margin.right;
				var height = 400 - margin.top - margin.bottom;

				var limit = 60 * 1,
					duration = 200,
					now = new Date(Date.now() - duration);

				// var width = 800;
				// var height = 370;

				var groups = {
					current: {
						value: 0,
						color: 'orange',
						data: d3.range(limit).map(function() {
							return 0;
						})
					},
					target: {
						value: 0,
						color: 'green',
						data: d3.range(limit).map(function() {
							return 0;
						})
					},
					output: {
						value: 0,
						color: 'grey',
						data: d3.range(limit).map(function() {
							return 0;
						})
					}
				};

				var x = d3.time.scale()
					.domain([now - (limit - 2), now - duration])
					.range([0, width]);

				var y = d3.scale.linear()
					.domain([0, 100])
					.range([height, 0]);

				var line = d3.svg.line()
					.interpolate('basis')
					.x(function(d, i) {
						return x(now - (limit - 1 - i) * duration);
					})
					.y(function(d) {
						return y(d);
					});
				//y axis padding setting	
				var padding = 100;
				var imargin = margin.left + padding;
				var osvg = d3.select('#Canvas_Main--realchart--page-cont').append('svg')
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(" + imargin + "," + margin.top + ")");

				var svg = osvg.append('svg')
					.attr('class', 'chart')
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(" + 2 * imargin + "," + margin.top + ")");

				//x axis setting
				var axis = svg.append('g')
					.attr('class', 'x axis')
					.attr("transform", "translate(0," + height + ")")
					.call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

				//y axis setting
				var yAxis = d3.svg.axis()
					.orient("left")
					.scale(y);

				osvg.append("g")
					.attr("transform", "translate(0,0)")
					.call(yAxis);

				var paths = svg.append('g');

				for (var name in groups) {
					var group = groups[name];
					group.path = paths.append('path')
						.data([group.data])
						.attr('class', name + ' group')
						.style('stroke', group.color);
				}

				function tick() {
					now = new Date();

					// Add new values
					for (var name in groups) {
						var group = groups[name];
						//group.data.push(group.value) // Real values arrive at irregular intervals
						if (name == 'current') {
							that.getView().getModel("odata").read("/sensor", {
								async: false,
								success: function(oData, response) {
								
									var s1 = oData.results[0].S1;
									group.data.push(s1);
									console.log(s1);
								},
								failed: function(oData, response) {
										alert("Failed to get InputHelpValues from service!");
									}
									//console.log(oMetadata);
							}, null);

							
						} else if (name == 'target') {
							group.data.push(40);
						} else {
							// group.data.push(20 + Math.random() * 100);
							group.data.push(60);
						}

						group.path.attr('d', line);
					}

					// Shift domain
					x.domain([now - (limit - 2) * duration, now - duration]);

					// Slide x-axis left
					axis.transition()
						.duration(duration)
						.ease('linear')
						.call(x.axis);

					// Slide paths left
					paths.attr('transform', null)
						.transition()
						.duration(duration)
						.ease('linear')
						.attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
						.each('end', tick);

					// Remove oldest data point from each group
					for (var name in groups) {
						var group = groups[name];
						group.data.shift();
					}
				}

				tick();

			}

		});
	});