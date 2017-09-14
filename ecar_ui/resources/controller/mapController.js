window.addEventListener('load', function() {
	var clusterScript = document.createElement('script');
	clusterScript.type = 'text/javascript';
	clusterScript.src = '../lib/markerclusterer.js';
	document.body.appendChild(clusterScript);
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAoPFpeLJlb9tBPrQIIusMBHOZ5fnKJ5sM&callback=init';
	document.body.appendChild(script);
});
var markers = {};
var markerArray = [];
var markerCluster;
//image for garage
//var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
function init() {
	//alert(JSON.parse(vehicleInformation.getJSON()).modelData); 
	var vehicleInformation = sap.ui.getCore().getModel("vehicleInformation");
	var oTable = sap.ui.getCore().byId("vehicleTable");
	addStatusIcon(oTable,vehicleInformation);
	var map = initMap();
	addRowSelection(oTable,vehicleInformation,map);
	markerCluster = new MarkerClusterer(map,markerArray,{imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	initAlertMarker(vehicleInformation,map);          

	// var directionsRenderer = new google.maps.DirectionsRenderer({
	// 	map: map
	// });

	// var directionsService = new google.maps.DirectionsService;
	// var map = new google.maps.Map(document.getElementById('map'), {
	// 	zoom: 8,
	// 	center: {
	// 		lat: 23.0225,
	// 		lng: 72.5714
	// 	} //Initial Location on Map
	// });
 //   directionsRenderer.setMap(map);
	// directionsRenderer.setPanel(document.getElementById('left-div'));
	// var control = document.getElementById('front-div');
	// control.style.display = 'inline';
	// map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
 //       document.getElementById('origin').addEventListener('change', function() {
	// 	distanceCalculator(directionsService, directionsRenderer);
	// }, false);

	// document.getElementById('destination').addEventListener('click', function() {
	// 	distanceCalculator(directionsService, directionsRenderer);
	// }, false);
}

function addStatusIcon(oTable,vehicleInformation){
	//oTable.sort(oTable.getColumns()[11],sap.ui.table.SortOrder.Descending);
	var tableRows = oTable.getRows();
	var rowCount = oTable.getVisibleRowCount();
	var rowStart = oTable.getFirstVisibleRow(); //starting row index
	var currentRowContext;
	for(var i=0;i<rowCount;i++){
		var vehicle = vehicleInformation.results[i];
		debugger;
		if(vehicle === undefined){
			break;   
		}
		if(vehicle.STATUS === "MALFUNCTION"){
			tableRows[i].getCells()[0].setSrc("sap-icon://alert").setColor("red");
		}else if(vehicle.STATUS === "WARNING"){
			tableRows[i].getCells()[0].setSrc("sap-icon://warning2").setColor("orange");
		}
		// var current = tableRows[i].getCells()[11].getText();
		// if(current > -70){
		// 	tableRows[i].getCells()[0].setSrc("sap-icon://alert").setColor("red");
		// }
	}
}

function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 31.2221356, lng: 121.4931133},
		zoom: 15
	});
	return map;
}

function addRowSelection(oTable,vehicleInformation,map){
	oTable.attachRowSelectionChange(function(){
	 	var selectedRow = vehicleInformation.results[oTable.getSelectedIndex()];
	 	drawMarker(selectedRow,map);
	 });	
}

function initAlertMarker(vehicleInformation,map){
	var vehicles = vehicleInformation.results;
	for(var i=0;i<vehicles.length;i++){
		debugger;
		if(vehicles[i].STATUS !== "GREEN"){
			drawMarker(vehicles[i],map);
		}
	} 
}

function drawMarker(vehicle,map){
	debugger;
    if(checkMarker(vehicle,map)){
    	return;
    }
    var infoWindow = addInfoWindow(vehicle);
	var marker = initMarker(vehicle,map,infoWindow);
	markers[vehicle.ID] = marker;
	markerArray.push(marker);
	markerCluster.addMarkers(markerArray);
}

function checkMarker(vehicle,map){
	var drawn = false;
	if(markers[vehicle.ID]){
    	var marker = markers[vehicle.ID];
    	var location = marker.getPosition();
		map.setCenter(location);
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null);
		},2000); 
		drawn = true;
    } 
    return drawn;
}

function initMarker(vehicle,map,infoWindow){
	var location = {lat : parseFloat(vehicle.LAT), lng : parseFloat(vehicle.LNG)};
	map.setCenter(location);
	var marker = new google.maps.Marker({
		position : location,
		map : map,
		animation: google.maps.Animation.DROP
	});
	if(vehicle.STATUS === "GREEN"){
		marker.setIcon('../images/Car-icon_green.png');
	}else if(vehicle.STATUS === "WARNING"){
		marker.setIcon('../images/Car-icon_yellow.png');
	}else if(vehicle.STATUS === "MALFUNCTION"){
		marker.setIcon('../images/Car-icon_red.png');
	}
	marker.addListener('click',function(){
				 	infoWindow.open(map,marker);
				 });
	return marker;
}

function addInfoWindow(vehicle){
	var content = '<div id="iw-container">' +
                    '<div class="iw-title">' + vehicle.ID+'</div>' +
                    '<div class="iw-content">' +
                      '<div class="iw-subTitle">Details</div>' +
                      '<div class="iw-media">' +
                      '<img src="../images/'+vehicle.MODEL+'.jpg" height="100" width="135">' +
                      '<button onclick=showVR('+"'file:///C:/VR/VRCOCKPIT.exe'"+')>Show VR</button>'+
                      '</div>'+
                      '<table>' +
                      //'<tr> <td>Card Id</td> <td>' + vehicle.CARD_ID +'</td></tr>' +
                      '<tr> <td>Model</td> <td>' + vehicle.MODEL +'</td></tr>' +
                      '<tr> <td>Make</td> <td>' + vehicle.MAKE +'</td></tr>' +
                      '<tr> <td>Color</td> <td>' + vehicle.COLOR +'</td></tr>' +
                      '<tr> <td>Age</td> <td>' + vehicle.AGE +'</td></tr>' +
                      '<tr> <td>Miles</td> <td>' + vehicle.MILES +'</td></tr>' +
                      '<tr> <td>Customer</td> <td>' + vehicle.CUSTOMER_ID +'</td></tr>' +
                      '<tr> <td>Status</td> <td>' + vehicle.STATUS +'</td></tr>' +
                      '</table> </br>'+
                      '<div class="iw-subTitle">Service History</div>' +
                      '<p>The vehicle battery service history goes here</p>'+
                      '<div class="iw-subTitle">Contacts</div>' +
                      '<p>Address. <br>1001,Chenhui Road,Pudong district,Shanghai<br>'+
                      '<br>Phone. <br>e-mail: sha.liu01@sap.com<br></p>'+
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>';
	var infoWindow = new google.maps.InfoWindow({
		content : content,
		mawWidth: 350
	});
	
	infoWindow.addListener('domready',function() {
	    var iwOuter = $('.gm-style-iw');
	    iwOuter.children(':nth-child(1)').css({'display':'block'});
	    var iwBackground = iwOuter.prev();
	    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
	    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
	    var iwCloseBtn = iwOuter.next();
	    iwCloseBtn.css({opacity: '1', right: '25px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
	    iwCloseBtn.mouseout(function(){
	      $(this).css({opacity: '1'});
	    });
  });
	return infoWindow;
}

function showVR(vrPath){
	debugger;
	try     
	   {     
	    var objShell = new ActiveXObject("wscript.shell");     
	    objShell.Run("file:///C:/VR/VRCOCKPIT.exe");     
	    objShell = null;     
	   }     
   catch(e)  
	   {  
	        //alert('Can not find"'+vrPath+'"Please check the path')     
	        alert(e);
	   }     
}

/***************To Calculate and Display the Route*************/
function distanceCalculator(directionsService, directionsRenderer) {
	var origin = document.getElementById('origin').value;
	var destination = document.getElementById('destination').value;
	var req = {
		origin: origin,
		destination: destination,
		travelMode: 'DRIVING'
	};
	directionsService.route(req, function(response, status) {
		if (status === 'OK') {
			directionsRenderer.setDirections(response);
	}
	});
}