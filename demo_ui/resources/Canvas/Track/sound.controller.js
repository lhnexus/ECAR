sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.sound", {
			onInit: function() {

				// var oRModel = new sap.ui.model.odata.v2.ODataModel("/getSensorData.xsodata", true);
				// this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {

				// var that = this;
				// that._loadData(that);

			},

			_loadData: function(that) {

				setInterval(function() {

					// that.oRModel.attachMetadataLoaded(null, function() {
					// 	var oMetadata = that.oRModel.getServiceMetadata();
					// 	console.log(oMetadata);
					// }, null);

					// var filter = new Array();
					// var sorter = new Array();
					// var sorting = new sap.ui.model.Sorter("C_TIMESTAMP", true);
					// var filtering = new sap.ui.model.Filter("C_DEVICEID", sap.ui.model.FilterOperator.EQ, "RUFF02");
					// sorter.push(sorting);
					// filter.push(filtering);

					that.getView().getModel("odata").read("/sensor?$filter=(ID eq 'LSGGH59L9DS157185' and BID eq 'SEGMG20160101')&$top=1", {
						// filters: filter,
						// sorters: sorter,
						async: false,
						success: function(oData, response) {
							//var len = oData.results.length;
							//var time = oData.results[0].C_TIMESTAMP;
							var sound = oData.results[0].S3;
							var snum = that.getView().byId("soundnum");
							snum.setValue(parseFloat(sound));
							//console.log(time);
							//console.log(parseFloat(temperature));
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