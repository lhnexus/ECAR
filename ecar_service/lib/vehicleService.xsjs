function getTotalVehicle() {
    function createTotalEntry(rs) {
        return {
            "ID": rs.ID,
            "MILES": rs.MILES,
            "SPEED": rs.SPEED,
            "LAT": rs.LAT,
            "LNG": rs.LNG,
            "VTIME": rs.VTIME
        };
    } 

    var body = '';
    var list = [];

        try {
           var query = "SELECT * FROM \"ECAR.ecardb.calview::ecar.vehicle_vora_view\"";
            $.trace.debug(query);
            var conn = $.hdb.getConnection();
            var rs = conn.executeQuery(query);


            for (var i = 0; i < rs.length; i++) {
                list.push(createTotalEntry(rs[i]));
             }

            conn.close();
        } catch (e) {
            $.response.contentType = 'text/plain; charset=UTF-8';
            $.response.setBody(e.message);
            $.trace.error("Exception raised:" + e.message);
            return;
        }

        body = JSON.stringify({
            "entries": list
        });

        $.response.contentType = 'application/json; charset=UTF-8';
        $.response.setBody(body);
        $.response.status = $.net.http.OK;
  
}

function getTotalBattery() {
    function createTotalEntry(rs) {
        return {
            "ID": rs.ID,
            "TEMPERATURE": rs.TEMPERATURE,
            "VOLTAGE": rs.VOLTAGE,
            "SOC": rs.SOC,
            "CURRENT": rs.CURRENT,
            "ECOMSUMPTION": rs.ECOMSUMPTION,
            "BTIME": rs.BTIME
        };
    }

    var body = '';
    var list = [];

  
        try {
           var query = "SELECT * FROM \"ECAR.ecardb.calview::ecar.battery_vora_view\"";
            $.trace.debug(query);
            var conn = $.hdb.getConnection();
            var rs = conn.executeQuery(query);


            for (var i = 0; i < rs.length; i++) {
                list.push(createTotalEntry(rs[i]));
             }

            conn.close();
        } catch (e) {
            $.response.contentType = 'text/plain; charset=UTF-8';
            $.response.setBody(e.message);
            $.trace.error("Exception raised:" + e.message);
            return;
        }

        body = JSON.stringify({
            "entries": list
        });

        $.response.contentType = 'application/json; charset=UTF-8';
        $.response.setBody(body);
        $.response.status = $.net.http.OK;
  
}



function getSingleBattery() {
    function createTotalEntry(rs) {
        return {
            "ID": rs.ID,
            "TEMPERATURE": rs.TEMPERATURE,
            "VOLTAGE": rs.VOLTAGE,
            "SOC": rs.SOC,
            "CURRENT": rs.CURRENT,
            "ECOMSUMPTION": rs.ECOMSUMPTION,
            "BTIME": rs.BTIME
        };
    }

    var body = '';
    var list = [];
	var ivID = $.request.parameters.get('id');
	
	 if (ivID === null || '') {
        $.trace.error("Error:INTERNAL SERVER ERROR" + $.net.http.INTERNAL_SERVER_ERROR);
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.contentType = 'text/plain; charset=UTF-8';
        $.response.setBody("Battery ID is not defined!");
    }else{
    	try {
           var query = "SELECT TOP 100 * FROM \"ECAR.ecardb::ecar.battery_vora\" WHERE ID = '"+ivID+"' ORDER BY BTIME ASC";
            $.trace.debug(query);
            var conn = $.hdb.getConnection();
            var rs = conn.executeQuery(query);


            for (var i = 0; i < rs.length; i++) {
                list.push(createTotalEntry(rs[i]));
             }

            conn.close();
        } catch (e) {
            $.response.contentType = 'text/plain; charset=UTF-8';
            $.response.setBody(e.message);
            $.trace.error("Exception raised:" + e.message);
            return;
        }

        body = JSON.stringify({
            "entries": list
        });

        $.response.contentType = 'application/json; charset=UTF-8';
        $.response.setBody(body);
        $.response.status = $.net.http.OK;
    }
  
        
  
}


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "vehicle":
        getTotalVehicle();
        break;
    case "battery":
        getTotalBattery();
        break;
	case "batterySingle":
        getSingleBattery();
        break;
    default:
        $.trace.error("Error:INTERNAL SERVER ERROR" + $.net.http.INTERNAL_SERVER_ERROR);
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.contentType = 'text/plain; charset=UTF-8';
        $.response.setBody("COMMAND is not defined!");
}