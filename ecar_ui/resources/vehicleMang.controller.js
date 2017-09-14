sap.ui.define([
		'jquery.sap.global',
		'sap/m/MessageToast',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel',
		'./Formatter'
	], function(jQuery, MessageToast, Fragment, Controller, Filter, JSONModel,Formatter) {
	"use strict";
	var CController = Controller.extend("sap.m.sample.SplitApp.vehicleMang", {
		formatter : Formatter,
		onInit: function(){
			this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			this.oModel = new sap.ui.model.odata.ODataModel("/vehicle.xsodata", true);
			this.getView().setModel(this.oModel);

			//can be removed
			this.oModel.read('/vehicleInfo',{
				success:function(oData){
					if(oData.results.length > 0){
					sap.ui.getCore().setModel(oData,"vehicleInfo");
					}
				},
				error:function(oerror){
					console.log(oerror); 
				}
			});
			//initialization of battery page
			var batteryTable = this.byId("batteryTable");
			var batteryVizFrame = this.byId("batteryLine");
			batteryVizFrame.setVisible(false);
			var currentBatteryIndex = -1;
			var that = this;
			batteryTable.attachRowSelectionChange(function(){
				var selectedBatteryIndex = batteryTable.getSelectedIndex();
				if(selectedBatteryIndex !== -1){
					currentBatteryIndex = selectedBatteryIndex;
				}
				var selectedRow = batteryTable.getRows()[currentBatteryIndex];
				var selectedCells = selectedRow.getCells();
				selectedCells[0].setEditable(true);
				var selectedBatteryId = selectedCells[1].getText();
				that.showBatteryIot(selectedBatteryId);
			});
		},
		
		onPressGoToMaster : function(oEvent) {           
			var splitApp = this.byId("SplitAppDemo");
			var context =  oEvent.oSource.getBindingContext();
			var infoPage = splitApp.getMasterPages()[1];
			var detailPages = splitApp.getDetailPages();
			infoPage.setBindingContext(context);
			detailPages[0].setBindingContext(context); 
			//set service model for service order tab
			this.serviceModel = new sap.ui.model.odata.ODataModel("/vehicleService.xsodata",true);
			this.serviceModel.read("/service_order?$filter=VEHICLE_ID eq 'LSGGH59L9DS157185' and STATUS eq 'TOBEREPLACED'",{
				success:function(oData){
					if(oData.results.length > 0){
					sap.ui.getCore().setModel(oData,"serviceOrders");
					}
			}});
			this.serviceTable = this.byId("serviceOrderTable");
			this.serviceTable.setModel(this.serviceModel);
			splitApp.toMaster(infoPage);  
			
		},
		

		showBatteryIot:function(selectedBatteryId){
			console.log(selectedBatteryId);
			var batteryVizFrame = this.getView().byId("batteryLine");
			batteryVizFrame.setVizProperties({
			title:{
				text : ""
			},
            plotArea: {
            	colorPalette : d3.scale.category20().range()
            }});
			//var bindedModel = batteryVizFrame.getModel();
			
			var aUrl = '/vehicleService.xsjs?cmd=batterySingle&id='+selectedBatteryId;
			var oModel = new sap.ui.model.json.JSONModel();
			jQuery.ajax({
            url: aUrl,
            method: 'GET',
            dataType: 'json',
            success: function(myJSON){
            		console.log("Start access json result");
            		console.log(myJSON);
            		var data = [];
            		for (var i = 0; i < myJSON.entries.length; i++) {
            			data[i] = {
            				ID: myJSON.entries[i].ID,
            				TEMPERATURE: myJSON.entries[i].TEMPERATURE,
            				VOLTAGE: myJSON.entries[i].VOLTAGE,
            				SOC: myJSON.entries[i].SOC,
            				CURRENT: myJSON.entries[i].CURRENT,
            				ECOMSUMPTION: myJSON.entries[i].ECOMSUMPTION,
            				BTIME: myJSON.entries[i].BTIME
            			};
            		}
            			//oModel.setData(data);
            			
            			oModel.setData({modelData: data});
            			
						batteryVizFrame.setModel(oModel);
						batteryVizFrame.setVisible(true);
						console.log(oModel);
						console.log("END access json result");
            },
            error: function(jqXHR, textStatus, errorThrown) {
			sap.ui.core.BusyIndicator.hide();
			if (jqXHR.status == '500') {
				sap.ui.commons.MessageBox.show(jqXHR.responseText,
				"ERROR");
				return;
				
			} else {
				sap.ui.commons.MessageBox.show(jqXHR.statusText,
				"ERROR");
				return;
				
			}
			
			}
			});
			
			// var batteryIotModel = new sap.ui.model.odata.ODataModel("http://pvgl50935119.dhcp.pvgl.sap.corp:51029/vehicleService.xsodata", true);	
			// var oModel = new sap.ui.model.json.JSONModel();
			// batteryIotModel.read('/battery_vora_local',{
			// 	success:function(oData){
			// 		if(oData.results.length > 0){
			// 			oModel.setData(oData);
			// 			batteryVizFrame.setModel(oModel);
			// 			batteryVizFrame.setVisible(true);
			// 			console.log(oModel);
			// 		}
			// }});
		setTimeout( function(){
				console.log("hello there");
			
			},2000);
		},

		onSaveBattery: function() {
			var batteryTable = this.byId("batteryTable");
			var selectedBatteryIndex = batteryTable.getSelectedIndex();
			var selectedCells = batteryTable.getRows()[selectedBatteryIndex].getCells();
			var batteryId = selectedCells[1].getText();
			var replacedBattery = {
				//"ID" : selectedCells[1].getText(),
				"TEMPERATURE" : "45.60",
				"VOLTAGE" : selectedCells[4].getText(),
				"SOC" : selectedCells[5].getText(),
				"CURRENT" : selectedCells[2].getText(),
				"ECOMSUMPTION" : "2004.10",
				"partof.ID" : "LSGGH59L9DS157185",
				"SERIAL_NUMBER" : selectedCells[0].getValue()
			};
			var vehicleInfo = sap.ui.getCore().getModel("vehicleInfo").results[0];
			var updateVehicle = {
				"ID" : "LSGGH59L9DS157185",
				"MAKE" : vehicleInfo.MAKE,
				"MODEL" : vehicleInfo.MODEL,
				"AGE": vehicleInfo.AGE,
				"MILES": vehicleInfo.MILES,
				"COLOR": vehicleInfo.COLOR,
				"SPEED": vehicleInfo.SPEED,
				"LAT": vehicleInfo.LAT,
				"LNG": vehicleInfo.LNG,
				"STATUS":"WARNING",
				"CUSTOMER_ID":vehicleInfo.CUSTOMER_ID	
			};
			debugger;
			var serviceOrders = sap.ui.getCore().getModel("serviceOrders");
			var updateServiceOrder = {
				"ID":serviceOrders.results[0].ID,
				"CREATE_TIME" : serviceOrders.results[0].CREATE_TIME,
				"VEHICLE_ID" : serviceOrders.results[0].VEHICLE_ID,
				"BATTERY_ID":serviceOrders.results[0].BATTERY_ID,
				"SERVICE_CENTER_NAME":serviceOrders.results[0].SERVICE_CENTER_NAME,
				"MECHANIC_NAME":serviceOrders.results[0].MECHANIC_NAME,
				"STATUS":"REPLACED",
				"CUSTOMER_ID":serviceOrders.results[0].CUSTOMER_ID	
			};
			var oParams = {merge:true};
            oParams.success = function(){alert("update success");};
            oParams.error = function(oError){console.log(oError);};
            //oParams.groupId = "1234";
            //var oUpdateModel = new sap.ui.model.odata.v2.ODataModel("http://pvgl50935119.dhcp.pvgl.sap.corp:51029/vehicleService.xsodata",{useBatch:false});
            //oUpdateModel.update("/battery('"+batteryId+"')",replacedBattery,oParams);
            
            // oUpdateModel.remove("/battery('"+batteryId+"')",oParams);
            // oUpdateModel.create("/battery",replacedBattery,oParams);
            // //oUpdateModel.submitChanges(oParams);
            // oUpdateModel.remove("/vehicle('LSGGH59L9DS157185')",oParams);
            // oUpdateModel.create("/vehicle",updateVehicle,oParams);
            // oUpdateModel.submitChanges(oParams);
            
            var odataUrl = "/vehicleService.xsodata";
            var batteryUpdateUrl = odataUrl + "/battery('"+batteryId+"')";
            var vehicleUpdateUrl = odataUrl + "/vehicle('LSGGH59L9DS157185')";
            var serviceUpdateUrl = odataUrl + "/service_order('"+serviceOrders.results[0].ID+"')"; 
            var updateStatus = false;
            jQuery.ajax({
            	url:batteryUpdateUrl,
            	method : 'PUT',
            	async : false,
            	data : JSON.stringify(replacedBattery),
            	contentType : "application/json",
            	headers:{
            		"content-type" : "application/json",
            		"cache-control" : "no-cache"
            	},
        		success: function(){
        			updateStatus = true;
        		},
        		error: function(oError){
        			alert("Operation Failed");
        			console.log(oError);
        		}
            });
            
            if(updateStatus === true){
            	jQuery.ajax({
	            	url:vehicleUpdateUrl,
	            	method : 'PUT',
	            	async : false,
	            	data : JSON.stringify(updateVehicle),
	            	contentType : "application/json",
	            	headers:{
	            		"content-type" : "application/json",
	            		"cache-control" : "no-cache"
	            	},
	        		success: function(){
	        			updateStatus = true;
	        		},
	        		error: function(oError){
	        			updateStatus = false;
	        			alert("Operation Failed");
	        			console.log(oError);
	        		}
            	});
            }
            
            if(updateStatus === true){
            	jQuery.ajax({
	            	url:serviceUpdateUrl,
	            	method : 'PUT',
	            	async : false,
	            	data : JSON.stringify(updateServiceOrder),
	            	contentType : "application/json",
	            	headers:{
	            		"content-type" : "application/json",
	            		"cache-control" : "no-cache"
	            	},
	        		success: function(){
	        			alert("Battery Information Updated");
	        		},
	        		error: function(oError){
	        			alert("Operation Failed");
	        			console.log(oError);
	        		}
            	});
            }
            
			//this.serviceModel.update("http://pvgl50935119.dhcp.pvgl.sap.corp:51029/serviceorder.xsodata/serviceorder('12345-11')",selectedOrder,oParams);
		},

		onCancelBattery: function() {
			this.getView().byId("batteryCancelButton").setVisible(false);
			this.getView().byId("batterySaveButton").setVisible(false);
			this.getView().byId("batteryEditButton").setVisible(true);
			//this.serviceModel.setProperty("/service_order?$filter=(VEHICLE_ID%20eq%20%27LSGGH59L9DS157185%27)", this.aServiceOrders);
			//this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.rebindBatteryTable(this.oBatteryReadTemplate, "Navigation");
		},
		
		handleRefresh : function(evt){
			var that = this;
			setTimeout(function(){
				that.byId("serviceOrderRefresh").hide();
				var serviceTable = that.byId("serviceOrderTable");
				var splitApp = that.byId("SplitAppDemo");
				var infoPage = splitApp.getMasterPages()[1];
				var detailPages = splitApp.getDetailPages();
				var serviceModel = new sap.ui.model.odata.ODataModel("/vehicleService.xsodata",true);
				serviceTable.setModel(serviceModel);
				splitApp.toMaster(infoPage);  
			},1000);
		},
		
		batteryHandleRefresh : function(evt){
			var that = this;
			setTimeout(function(){
				that.byId("batteryRefresh").hide();
				var batteryTable = that.byId("batteryTable");
				var splitApp = that.byId("SplitAppDemo");
				var infoPage = splitApp.getMasterPages()[1];
				var detailPages = splitApp.getDetailPages();
				var batteryModel = new sap.ui.model.odata.ODataModel("https://linux-kx32.dhcp.pvgl.sap.corp:51025/vehicle.xsodata",true);
				batteryTable.setModel(batteryModel);
				splitApp.toMaster(infoPage);  
			},1000);
		},
		
		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},


		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		handleSearch : function(evt){
			var filters = [];
			var query = evt.getParameter("query");
			if(query && query.length > 0){
				var filter = new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.Contains,query);
				filters.push(filter); 
			}
			var list = this.getView().byId("vehicleList");
			var binding = list.getBinding("items");
			binding.filter(filters); 
		}
	});


	return CController;

});
