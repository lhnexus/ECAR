sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.work_orders", {
			onInit: function() {
				// var oRModel = new sap.ui.model.odata.v2.ODataModel("/serviceorder.xsodata/serviceorderVehicleInfo?$format=json");
			
				var jmodel = new sap.ui.model.json.JSONModel("/serviceorder.xsodata/serviceorderVehicleInfo?$format=json");
				
				this.getView().setModel(jmodel, "orderData");
				//this.getView().byId("wo_table").setModel(oRModel,"orderData");
				// var oModel = new sap.ui.model.json.JSONModel();
				// //var oRModel = new sap.ui.model.odata.v2.ODataModel("/iotmms/v1/api/http/app.svc");
				// oModel.loadData("Canvas/mockserver/data.json");
			
				// this.getView().setModel(oModel, "jdata");
				// //this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {
				
				var oRModel = new sap.ui.model.odata.v2.ODataModel("/serviceorder.xsodata", true);
				// var wotable = this.getView().byId("wo_table");
				var lmodel = this.getView().getModel("orderData");
				setInterval(function() {
					// lmodel.refresh(true);
					// wotable.getBinding("rows").refresh(true);
					oRModel.read("/serviceorderVehicleInfo", {
						// filters: filter,
						// sorters: sorter,
						async: false,
						success: function(oData, response) {
						var ljmodel = new sap.ui.model.json.JSONModel(oData);
							lmodel.setData(oData);
						},
						failed: function(oData, response) {
								alert("Failed to get InputHelpValues from service!");
							}
							//console.log(oMetadata);
					}, null);
					
				}, 2000);
			}

		});
	});