sap.ui.controller("auditchart.auditChart",{
	onInit: function(){
		var oVizFrame = this.getView().byId("auditColumn");
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
				'Audit' : [
		            {"Employee": "Peter","Value": "158"},
		            {"Employee": "John","Value": "131"},
		            {"Employee": "Tony","Value": "115"},
		            {"Employee": "Alex","Value": "109"},
		            {"Employee": "Tim","Value": "212"}
		           ]};
		oModel.setData(data);
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
				name: 'Employee',
				value:"{Employee}"}],
			measures : [{
				name: 'Vehicles',
				value: '{Value}'}],
			data : {
				path: "/Audit"
			}
		});
		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(oModel);
		oVizFrame.setVizType('bar');
		
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
		      'values': ["Employee"]
		    });
		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
	}
}); 