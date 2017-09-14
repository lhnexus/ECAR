sap.ui.controller("servicechart.serviceChart", {
	onInit: function(){
		var oVizFrame = this.getView().byId("servicePie");
			
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
			'ServiceStatistics' : [{
				  "ServiceCount": "0 times",
				  "Vehicles": "337"
				}, {
				  "ServiceCount": "1 times",
				  "Vehicles": "254"
				}, {
				  "ServiceCount": "2 times",
				  "Vehicles": "57"
				}, {
				  "ServiceCount": "3 times",
				  "Vehicles": "14"
				}, {
				  "ServiceCount": "More than three times",
				  "Vehicles": "8"
				}]};
		oModel.setData(data);
		
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
			        name : 'Service Count',
				value : "{ServiceCount}"}],
			               
			measures : [{
				name : 'Vehicles',
				value : '{Vehicles}'} ],
			             
			data : {
				path : "/ServiceStatistics"
			}
		});		
		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(oModel);	
		oVizFrame.setVizProperties({
			title:{
				text : ""
			},
            plotArea: {
            	colorPalette : d3.scale.category20().range(),
            	drawingEffect: "glossy"
                }});
		
		var feedSize = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "size",
		      'type': "Measure",
		      'values': ["Vehicles"]
		    }), 
		    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "color",
		      'type': "Dimension",
		      'values': ["Service Count"]
		    });
		oVizFrame.addFeed(feedSize);
		oVizFrame.addFeed(feedColor);
		
	}	
});