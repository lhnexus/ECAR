sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast", "./Util/svgUtil", "./Util/IotUtil"],
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("Canvas.Main", {
            onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel();

                // oModel.setData(data);
                oModel.loadData("Canvas/mockserver/data.json", null, false);
                // var tracking = this.getView().byId("tracking");
                //this.getView().setModel(oModel);
                this.getView().setModel(oModel);
                // tracking.setHeight(oModel.getData().Canvas.height+"px");
            },

            onAfterRendering: function () {


            },

            onClickTrigger: function(){
                // var oMovingModel = this.getView().getModel();

                var carnums = oModel4Bound.getData().Cars.length;
                var carnum = 0;
                var svg = d3.select("#"+oModel4Bound.getData().Canvas.id);
                while(carnum<carnums) {

                    var carid = oModel4Bound.getData().Cars[carnum].id;
                    var rect = d3.select("#"+carid);
                    moving(oModel4Bound,carnum,rect,svg);
                    carnum++;
                }

            },

            //onClickIOT: function(){
            //    sendData();
            //},

            onClickRefreshInbound: function(){
                // var oMovingModel = this.getView().getModel();
                var svg = d3.select("#"+oModel4Bound.getData().Canvas.id);
                freshOutbound("true",oModel4Bound,svg);
            },


            press: function (oEvent) {
                MessageToast.show("The column micro chart is pressed.");
            }


        });
    });