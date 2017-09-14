sap.ui.controller("statuschart.statusChart",{
	onInit: function(){
		var oVizFrame = this.getView().byId("statusColumn");
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
				'Vehicles' : [
		            {"Status": "Pending","Value": "1580"},
		            {"Status": "Checking","Value": "531"},
		            {"Status": "?????","Value": "915"},
		            {"Status": "Servicing","Value": "109"},
		            {"Status": "Normal","Value": "12740"}
		           ]};
		oModel.setData(data);
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
				name: 'Status',
				value:"{Status}"}],
			measures : [{
				name: 'Vehicles',
				value: '{Value}'}],
			data : {
				path: "/Vehicles"
			}
		});
		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(oModel);
		oVizFrame.setVizType('column');
		
		oVizFrame.setVizProperties({
			title:{
				text : ""
			},
            plotArea: {
            	colorPalette : d3.scale.category20().range()
                }});
		
		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "valueAxis",
		      'type': "Measure",
		      'values': ["Vehicles"]
		    }), 
		    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "categoryAxis",
		      'type': "Dimension",
		      'values': ["Status"]
		    });
		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
	}
}); 