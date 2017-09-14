sap.ui.jsview("reportList",{
	getControllerName: function(){
		return "reportList";	
	},
	createContent : function(oController){
		var controller = this.oController;
		var page = new sap.m.Page({
			title:"Reports",
			enableScrollingtrue:true
		}); 
		var oList = new sap.m.List({
			mode: sap.m.ListMode.SingleSelectMaster,
			showSeparator:sap.m.ListSeparators.All,
			swipeDirection: sap.m.SwipeDirection.Both,
			rememberSelections:false
		});
		var oTemplate = new sap.m.StandardListItem({
			title : "{Report}",
			info : "{Count}",
			icon : "sap-icon://product",
			type : sap.m.ListType.Navigation});
		var oSorter = new sap.ui.model.Sorter("Report",false,false);
		oList.bindIitems("",oTemplate,oSorter);
		page.addContent(oList);
		//return page;
	}
});