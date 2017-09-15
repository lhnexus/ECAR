sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function(Controller, MessageToast) {
		"use strict";

		return Controller.extend("Canvas.Track.work_orders", {
			onInit: function() {

				var oModel = new sap.ui.model.json.JSONModel();
				//var oRModel = new sap.ui.model.odata.v2.ODataModel("/iotmms/v1/api/http/app.svc");
				oModel.loadData("Canvas/mockserver/data.json");
			
				this.getView().setModel(oModel, "jdata");
				//this.getView().setModel(oRModel, "odata");

			},

			onAfterRendering: function() {

			}

		});
	});