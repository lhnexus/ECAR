function initial() {
    var query = "{CALL \"ECAR_HDI_CONTAINER_2\".\"ECAR.ecardb::initialScript\"()}";
    var conn = $.db.getConnection();
    var pcall = conn.prepareCall(query);
    pcall.execute();
    conn.commit();
    conn.close(); 
  
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "initial":
        initial();
        break;
    default:
        $.trace.error("Error:INTERNAL SERVER ERROR" + $.net.http.INTERNAL_SERVER_ERROR);
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.contentType = 'text/plain; charset=UTF-8';
        $.response.setBody("COMMAND is not defined!");
}