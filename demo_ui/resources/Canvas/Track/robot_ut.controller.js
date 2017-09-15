sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "../Util/svgUtil"],
	function (Controller,MessageToast){
	"use strict";
 
 	return Controller.extend("Canvas.Track.robot_ut", {
		onInit: function() {

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("Canvas/mockserver/data.json");
            oModel.attachRequestCompleted(calRack);
            this.getView().setModel(oModel);


		}
		
 	});
});