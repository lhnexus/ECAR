sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.wh_capacity", {
			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData("Canvas/mockserver/data.json");

				// var oRModel = new sap.ui.model.odata.v2.ODataModel("/iotmms/v1/api/http/app.svc");
				this.getView().setModel(oModel, "jdata");
				// this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {

				// var that = this;
				// that._loadData(that);

			},

			_loadData: function(that) {

				setInterval(function() {

					// oRModel.attachMetadataLoaded(null, function() {
					// 	var oMetadata = oRModel.getServiceMetadata();
					// 	console.log(oMetadata);
					// }, null);

					var filter = new Array();
					var sorter = new Array();
					var sorting = new sap.ui.model.Sorter("C_TIMESTAMP", true);
					var filtering = new sap.ui.model.Filter("C_DEVICEID", sap.ui.model.FilterOperator.EQ, "RUFF_CAM02");
					sorter.push(sorting);
					filter.push(filtering);

					that.getView().getModel("odata").read("/T_IOT_BDE9E84EE14A23B2B34F", {
						filters: filter,
						sorters: sorter,
						async: false,
						success: function(oData, response) {
							//var len = oData.results.length;
							//var time = oData.results[0].C_TIMESTAMP;
							var image = oData.results[0].C_IMAGE;
							var himg = that.getView().byId("cimg");
							himg.setSrc("data:image/jpeg;base64," + image);
							//console.log(time);
							// console.log(parseFloat(temperature));
						},
						failed: function(oData, response) {
								alert("Failed to get InputHelpValues from service!");
							}
							//console.log(oMetadata);
					}, null);

					//var num = Math.floor(Math.random() * 10);
					//var hnum = that.getView().byId("temperaturenum");
					//hnum.setValue(num);

				}, 5000);

			}
		});
	});