sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.predict", {
			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();
				var oRModel = new sap.ui.model.odata.v2.ODataModel("/getSensorData.xsodata", true);

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
					stop: 0,
					top: 20,
					right: 50,
					bottom: 30,
					left: 50
				};
				var width = 800 - margin.left - margin.right;
				var height = 400 - margin.top - margin.bottom;

				var limit = 60 * 1,
					duration = 1000,
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
						color: 'blue',
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
				var imargin = margin.left + margin.bottom;
				var osvg = d3.select('#Canvas_Main--predict--page-cont').append('svg')
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("overflow", "visible")
					.attr("transform", "translate(" + imargin + "," + margin.stop + ")");

				var svg = osvg.append('svg')
					.attr('class', 'chart')
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(0," + margin.stop + ")");
					
				//add line for now
				svg.append("line")
				.attr("x1",width + margin.bottom)
				.attr("y1", height)
				.attr("x2", width + margin.bottom)
				.attr("y2", 0)
				.style("stroke", "black");
				
				//add now text
				svg.append("text")
				.attr("x",width + margin.bottom/2)
				.attr("y",height+ margin.bottom/2)
				.attr("overflow","visible")
				.text("Now");

				//add legend
				var lengendx = 5;
				var lengendy = 400;
				var txtpadding = 40;
				var lengendw = 30;
				var lengendh = 2;
				var padding = 200;

				var legendValues = [{
					color: "orange",
					text: "temperature(°C)"
				}, {
					color: "green",
					text: "humidity(%)"
				}, {
					color: "blue",
					text: "noise(dB)"
				}];

				var legend1 = osvg.append("g")
					.attr("class", "legend");

				legend1.append("rect")
					.attr("x", lengendx)
					.attr("y", lengendy - 5)
					.attr("width", lengendw)
					.attr("height", lengendh)
					//.attr("fill","blue");
					.style("fill", function(d) {
						return legendValues[0].color;
					});

				legend1.append("text")
					.attr("x", lengendx + txtpadding)
					.attr("y", lengendy)
					.text(function(d) {
						return legendValues[0].text;
					});

				var legend2 = osvg.append("g")
					.attr("class", "legend");

				legend2.append("rect")
					.attr("x", lengendx + padding)
					.attr("y", lengendy - 5)
					.attr("width", lengendw)
					.attr("height", lengendh)
					//.attr("fill","blue");
					.style("fill", function(d) {
						return legendValues[1].color;
					});

				legend2.append("text")
					.attr("x", lengendx + padding + txtpadding)
					.attr("y", lengendy)
					.text(function(d) {
						return legendValues[1].text;
					});

				var legend3 = osvg.append("g")
					.attr("class", "legend");

				legend3.append("rect")
					.attr("x", lengendx + padding * 2)
					.attr("y", lengendy - 5)
					.attr("width", lengendw)
					.attr("height", lengendh)
					//.attr("fill","blue");
					.style("fill", function(d) {
						return legendValues[2].color;
					});

				legend3.append("text")
					.attr("x", lengendx + padding * 2 + txtpadding)
					.attr("y", lengendy)
					.text(function(d) {
						return legendValues[2].text;
					});

				//x axis setting
				var axis = svg.append('g')
					.attr('class', 'x axis')
					.attr("transform", "translate(0," + height + ")")
					.call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

				//y axis setting
				var yAxis = d3.svg.axis()
					.orient("left")
					.innerTickSize(-width - margin.right)
					.outerTickSize(0)
					.scale(y);

				osvg.append("g")
					.attr('class', 'y axis')
					.attr("transform", "translate(0,0)")
					.call(yAxis);

				osvg.append("g")
					.attr('class', 'grid');

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
					var s1;
					var s2;
					var s3;
					that.getView().getModel("odata").read("/sensor?$filter=(ID eq 'LSGGH59L9DS157185' and BID eq 'SEGMG20160101')&$top=1", {
						async: false,
						success: function(oData, response) {

							s1 = oData.results[0].S1;
							s2 = oData.results[0].S2;
							s3 = oData.results[0].S3;

							// Add new values
							for (var name in groups) {
								var group = groups[name];
								//group.data.push(group.value) // Real values arrive at irregular intervals
								if (name == 'current') {
									//console.log(s1);
									group.data.push(s1);
								} else if (name == 'target') {
									group.data.push(s2);
								} else {
									// group.data.push(20 + Math.random() * 100);
									group.data.push(s3);
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

						},
						failed: function(oData, response) {
								alert("Failed to get InputHelpValues from service!");
							}
							//console.log(oMetadata);
					}, null);

				}

				tick();

			}

		});
	});