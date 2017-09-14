/* Create Service Order with Single line item*/
var body = $.request.body.asString(); 

var overallsoData = JSON.parse(body);

var responseBody = '';

var lv_soid;
var lv_customerid;
var lv_createtime;
var lv_vehicleid;
var lv_batteryid;
var lv_status;
var lv_scname;
var lv_mechanicname;
var rs, query, pc;
var result;

var conn = $.hdb.getConnection();

lv_soid =  overallsoData.ID;
lv_customerid =  overallsoData.CUSTOMER_ID;
lv_createtime =  overallsoData.CREATE_TIME;
lv_vehicleid =  overallsoData.VEHICLE_ID;
lv_batteryid =  overallsoData.BATTERY_ID;
lv_status =  overallsoData.STATUS;
lv_scname =  overallsoData.SERVICE_CENTER_NAME;
lv_mechanicname =  overallsoData.MECHANIC_NAME;

query = "SELECT ID from \"ECAR.ecardb::ecar.service_order\" where ID = ?";
rs = conn.executeQuery(query, lv_soid);
if (rs.length > 0) {
    lv_soid = rs[0].ID;
    responseBody += 'SOID ' + lv_soid + ' Exists\n';
}
else{
	 try {
            query = "insert into \"ECAR.ecardb::ecar.service_order\" values (?,?,?,?,?,?,?,?)";
            conn.executeUpdate(query, lv_soid, lv_customerid, lv_createtime,lv_vehicleid,lv_batteryid,lv_status,lv_scname,lv_mechanicname);
            responseBody += 'Insert Success!';
        } catch (e) {
            result += e.toString();
        }
}

conn.commit();
conn.close();

$.response.status = $.net.http.CREATED;
$.response.setBody(responseBody);