sap.ui.controller("regionchart.regionChart",{
	onInit: function(){
		var oVizFrame = this.getView().byId("regionColumn");
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
				'Vehicles' : [
		            {"City": "Shanghai","Value": "1586"},
		            {"City": "Beijing","Value": "2311"},
		            {"City": "Chengdu","Value": "1915"},
		            {"City": "Guangzhou","Value": "1093"},
		            {"City": "Shenzhen","Value": "1274"}
		           ]};
		oModel.setData(data);
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
				name: 'City',
				value:"{City}"}],
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
		      'values': ["City"]
		    });
		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
	}
}); 