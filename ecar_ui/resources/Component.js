sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";
	var Component = UIComponent.extend("sap.m.sample.SplitApp.Component", {
		metadata : {
			rootView : "sap.m.sample.SplitApp.vehicleMang",
			dependencies : {
				libs : [
					"sap.m"
				]
			},
			config : {
				sample : {
					files : [
						"vehicleMang.view.xml",
						"vehicleMang.controller.js"
					]
				}
			}
		}
	});

	return Component;

});
