sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.humidity", {
			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();
				//var oRModel = new sap.ui.model.odata.v2.ODataModel("/iotmms/v1/api/http/app.svc");
				oModel.loadData("Canvas/mockserver/data.json");
				oModel.attachRequestCompleted(calRack);
				this.getView().setModel(oModel, "jdata");
				//this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {

				var that = this;
				that._loadData(that);

			},

			_loadData: function(that) {

				setInterval(function() {
					
					// var filter = new Array();
					// var sorter = new Array();
					// var sorting = new sap.ui.model.Sorter("C_TIMESTAMP", true);
					// var filtering = new sap.ui.model.Filter("C_DEVICEID", sap.ui.model.FilterOperator.EQ, "RUFF02");
					// sorter.push(sorting);
					// filter.push(filtering);

					// that.getView().getModel("odata").read("/T_IOT_079BCC4BE4FD6487DE4B", {
					// 	filters: filter,
					// 	sorters: sorter,
					// 	async: false,
					// 	success: function(oData, response) {
					// 		//var len = oData.results.length;
					// 		//var time = oData.results[0].C_TIMESTAMP;
					// 		var humidity = oData.results[0].C_HUMIDITY;
					// 		var hnum = that.getView().byId("humiditynum");
					// 		hnum.setValue(parseFloat(humidity));
					// 		//console.log(time);
					// 		//console.log(parseFloat(humidity));
					// 	},
					// 	failed: function(oData, response) {
					// 			alert("Failed to get InputHelpValues from service!");
					// 		}
					// 		//console.log(oMetadata);
					// }, null);

					var num = Math.floor(Math.random()*10);
					var hnum = that.getView().byId("humiditynum");
					hnum.setValue(num);

				}, 1000);

			}

		});
	});