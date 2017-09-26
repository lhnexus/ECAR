sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "./Util/svgUtil", "./Util/IotUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Main", {
			onInit: function() {
				var oRModel = new sap.ui.model.odata.v2.ODataModel("/getSensorData.xsodata", true);
				this.getView().setModel(oRModel, "odata");
				var oSensorData = {
					Sensor: {
						S1: 0,
						S2: 0,
						S3: 0,
						S4: 0,
						S5: 0
					}
				};
				var sensorModel = new sap.ui.model.json.JSONModel(oSensorData);
				sap.ui.getCore().setModel(sensorModel, "SensorModel");
				// oModel.setData(data);
				//oModel.loadData("Canvas/mockserver/data.json", null, false);
				// var tracking = this.getView().byId("tracking");
				//this.getView().setModel(oModel);
				//this.getView().setModel(oModel);
				// tracking.setHeight(oModel.getData().Canvas.height+"px");
			},

			onAfterRendering: function() {
				var that = this;
				that._loadData(that);
			},

			// onClickTrigger: function() {
			// 	// var oMovingModel = this.getView().getModel();

			// 	var carnums = oModel4Bound.getData().Cars.length;
			// 	var carnum = 0;
			// 	var svg = d3.select("#" + oModel4Bound.getData().Canvas.id);
			// 	while (carnum < carnums) {

			// 		var carid = oModel4Bound.getData().Cars[carnum].id;
			// 		var rect = d3.select("#" + carid);
			// 		moving(oModel4Bound, carnum, rect, svg);
			// 		carnum++;
			// 	}

			// },

			//onClickIOT: function(){
			//    sendData();
			//},

			// onClickRefreshInbound: function() {
			// 	// var oMovingModel = this.getView().getModel();
			// 	var svg = d3.select("#" + oModel4Bound.getData().Canvas.id);
			// 	freshOutbound("true", oModel4Bound, svg);
			// },

			// press: function(oEvent) {
			// 	MessageToast.show("The column micro chart is pressed.");
			// },

			_loadData: function(that) {

				setInterval(function() {

					that.getView().getModel("odata").read("/sensor?$filter=(ID eq 'LSGGH59L9DS157185' and BID eq 'SEGMG20160101')&$top=1", {
						// filters: filter,
						// sorters: sorter,
						async: false,
						success: function(oData, response) {
							//var len = oData.results.length;
							//var time = oData.results[0].C_TIMESTAMP;
							var temperature = oData.results[0].S1;
							var humidity = oData.results[0].S2;
							var sound = oData.results[0].S3;
							var speed = oData.results[0].S4;
							var voltage = oData.results[0].S5;
							var tmpmodel = sap.ui.getCore().getModel("SensorModel");
							tmpmodel.setProperty("/Sensor/S1",temperature);
							tmpmodel.setProperty("/Sensor/S2",humidity);
							tmpmodel.setProperty("/Sensor/S3",sound);
							tmpmodel.setProperty("/Sensor/S4",speed);
							tmpmodel.setProperty("/Sensor/S5",voltage);
							sap.ui.getCore().setModel(tmpmodel, "SensorModel");
							// var s1 = sap.ui.getCore().getModel("SensorModel").getProperty("/Sensor/S1");
							// s1 = temperature;
							// var s2 = sap.ui.getCore().getModel("SensorModel").getProperty("/Sensor/S2");
							// s2 = humidity;
							// var s3 = sap.ui.getCore().getModel("SensorModel").getProperty("/Sensor/S3");
							// s3 = sound;
							// var s4 = sap.ui.getCore().getModel("SensorModel").getProperty("/Sensor/S4");
							// s4 = speed;
							// var s5 = sap.ui.getCore().getModel("SensorModel").getProperty("/Sensor/S5");
							// s5 = voltage;
						},
						failed: function(oData, response) {
								alert("Failed to get InputHelpValues from service!");
							}
							//console.log(oMetadata);
					}, null);

					// var num = Math.floor(Math.random() * 10);
					// var hnum = that.getView().byId("temperaturenum");
					// hnum.setValue(num);

				}, 2000);

			}

		});
	});