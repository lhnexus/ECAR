sap.ui.define(function(){
	"use strict";
	var Formatter = {
		
		status :  function (sStatus) {
				var status = parseInt(sStatus);
				debugger;
				if (status <= 70) {
					return "Success";
				} else if (status > 70) {
					return "Warning";
				} else if (status > 99){
					return "Error";
				} else {
					return "None";
				}
		}
	};
 
	return Formatter;
 
}, true);