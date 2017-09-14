sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/odata/v2/ODataModel", "../Util/svgUtil","sap/m/MessageToast"],
    function (Controller, ODataModel, MessageToast) {
        "use strict";

        return Controller.extend("Canvas.Track.tracking", {
            onInit: function () {
                // this._initMockServer();
                var oModel = new sap.ui.model.json.JSONModel();

                // oModel.setData(data);
                oModel.loadData("Canvas/mockserver/data.json", null, false);
                //this.getView().setModel(oModel);
                this.getView().setModel(oModel);
                window.oModel4Bound = this.getView().getModel();

                //init room map


            },

            _rectclick: function(carnum){
                var dview = sap.ui.getCore().byId("Canvas_Main--robotdetail");

                var localModel = new sap.ui.model.json.JSONModel();

                localModel.setData( oModel4Bound.getData().Cars[carnum]);
                localModel.attachRequestCompleted(convertData);
                dview.setModel(localModel);
            },

            _initCars: function(svg, oMovingModel, carnum) {
                var that = this;
            var carid = oMovingModel.getData().Cars[carnum].id;
            var rectwidth = parseInt(oMovingModel.getData().Cars[carnum].width);
            var rectheight = parseInt(oMovingModel.getData().Cars[carnum].height);

            var ifill = oMovingModel.getData().Cars[carnum].fill;
            var fill = "none";
            if (ifill == "true")
                fill = oMovingModel.getData().Cargo.content;
            svg.append('rect').attr('x', parseInt(oMovingModel.getData().Cars[carnum].Locations[0].x) - rectwidth / 2)
                .attr('y', parseInt(oMovingModel.getData().Cars[carnum].Locations[0].y) - rectheight / 2)
                .attr('width', rectwidth).attr('height', rectheight)
                .attr('id', carid)
                .style('fill', fill)
                .style('stroke', 'rgb(209,242,235)')
                .style("pointer-events","visible")
                .style('stroke-width', '5')
                .on('click', function() {
                    that._rectclick(carnum);
                });
        },

            _initCounter: function(svg, oMovingModel) {
            var nums = parseInt(oMovingModel.getData().Counters.Locations.length);
            var cwidth = parseInt(oMovingModel.getData().Counters.width);
            var cheight = parseInt(oMovingModel.getData().Counters.height);

            for (var i = 0; i < nums; i++) {

                var ifill = oMovingModel.getData().Counters.Locations[i].fill;
                var fill = "none";
                if (ifill == "true")
                    fill = oMovingModel.getData().Cargo.content;

                svg.append('rect').attr('x', oMovingModel.getData().Counters.Locations[i].x)
                    .attr('y', oMovingModel.getData().Counters.Locations[i].y)
                    .attr('width', cwidth).attr('height', cheight)
                    .attr('id', oMovingModel.getData().Counters.Locations[i].id)
                    .style('fill', fill)
                    .style('stroke', oMovingModel.getData().Counters.stroke)
                    .style('stroke-width', oMovingModel.getData().Counters.stroke_width)
                    .style('stroke-dasharray', oMovingModel.getData().Counters.stroke_dasharray);
            }


        },

            _initAreas: function(svg, oMovingModel) {
            var gcharging = svg.append('g');
            gcharging.append('text').attr('x', parseInt(oMovingModel.getData().Areas.Charging.x) + 5).attr('y', parseInt(oMovingModel.getData().Areas.Charging.y) + 15).attr('font-size', '13').text('Charging Area');
            gcharging.append('rect').attr('id', oMovingModel.getData().Areas.Charging.id)
                .attr('x', oMovingModel.getData().Areas.Charging.x)
                .attr('y', oMovingModel.getData().Areas.Charging.y)
                .attr('width', oMovingModel.getData().Areas.Charging.width)
                .attr('height', oMovingModel.getData().Areas.Charging.height)
                .style('fill', 'none')
                .style('stroke', oMovingModel.getData().Areas.Charging.stroke)
                .style('stroke-width', oMovingModel.getData().Areas.Charging.stroke_width);

            var ginbound = svg.append('rect').attr('id', oMovingModel.getData().Areas.Inbound.id)
                .attr('x', oMovingModel.getData().Areas.Inbound.x)
                .attr('y', oMovingModel.getData().Areas.Inbound.y)
                .attr('width', oMovingModel.getData().Areas.Inbound.width)
                .attr('height', oMovingModel.getData().Areas.Inbound.height)
                .style('fill', 'none')
                .style('stroke', oMovingModel.getData().Areas.Inbound.stroke)
                .style('stroke-width', oMovingModel.getData().Areas.Inbound.stroke_width);
            var gtextin = svg.append('g');
            gtextin.append('rect').attr('x', parseInt(oMovingModel.getData().Areas.Inbound.x) + parseInt(oMovingModel.getData().Areas.Inbound.width))
                .attr('y', oMovingModel.getData().Areas.Inbound.y)
                .attr('width', parseInt(oMovingModel.getData().Areas.Inbound.width) / 2)
                .attr('height', oMovingModel.getData().Areas.Inbound.height)
                .style('fill', 'none')
                .style('stroke', oMovingModel.getData().Areas.Inbound.stroke)
                .style('stroke-width', oMovingModel.getData().Areas.Inbound.stroke_width);
            gtextin.append('text').attr('x', parseInt(oMovingModel.getData().Areas.Inbound.x) + parseInt(oMovingModel.getData().Areas.Inbound.width) + 15)
                .attr('y', parseInt(oMovingModel.getData().Areas.Inbound.y) + 40)
                .attr('font-size', '18').text('Inbound');
            gtextin.append('text').attr('x', parseInt(oMovingModel.getData().Areas.Inbound.x) + parseInt(oMovingModel.getData().Areas.Inbound.width) + 30)
                .attr('y', parseInt(oMovingModel.getData().Areas.Inbound.y) + 60)
                .attr('font-size', '18').text('Area');

            var goutbound = svg.append('rect').attr('id', oMovingModel.getData().Areas.Outbound.id)
                .attr('x', oMovingModel.getData().Areas.Outbound.x)
                .attr('y', oMovingModel.getData().Areas.Outbound.y)
                .attr('width', oMovingModel.getData().Areas.Outbound.width)
                .attr('height', oMovingModel.getData().Areas.Outbound.height)
                .style('fill', 'none')
                .style('stroke', oMovingModel.getData().Areas.Outbound.stroke)
                .style('stroke-width', oMovingModel.getData().Areas.Outbound.stroke_width);
            var gtextout = svg.append('g');
            gtextout.append('rect').attr('x', parseInt(oMovingModel.getData().Areas.Outbound.x) + parseInt(oMovingModel.getData().Areas.Outbound.width))
                .attr('y', oMovingModel.getData().Areas.Outbound.y)
                .attr('width', parseInt(oMovingModel.getData().Areas.Outbound.width) / 2)
                .attr('height', oMovingModel.getData().Areas.Outbound.height)
                .style('fill', 'none')
                .style('stroke', oMovingModel.getData().Areas.Outbound.stroke)
                .style('stroke-width', oMovingModel.getData().Areas.Outbound.stroke_width);
            gtextout.append('text').attr('x', parseInt(oMovingModel.getData().Areas.Outbound.x) + parseInt(oMovingModel.getData().Areas.Outbound.width) + 6)
                .attr('y', parseInt(oMovingModel.getData().Areas.Outbound.y) + 40)
                .attr('font-size', '18').text('Outbound');
            gtextout.append('text').attr('x', parseInt(oMovingModel.getData().Areas.Outbound.x) + parseInt(oMovingModel.getData().Areas.Outbound.width) + 28)
                .attr('y', parseInt(oMovingModel.getData().Areas.Outbound.y) + 60)
                .attr('font-size', '18').text('Area');

            freshInbound("false", oMovingModel, svg);
            freshOutbound("false", oMovingModel, svg);
        },

        onAfterRendering: function () {
                var minArea, curColor;


                // var oMovingModel = this.getView().getModel();
                var canvas_width = parseInt(oModel4Bound.getData().Canvas.width);
                var canvas_height = parseInt(oModel4Bound.getData().Canvas.height);

                var svg = d3.select("#Canvas_Main--tracking--tpage-cont").append("svg")
                    .attr("width", canvas_width)
                    .attr("height", canvas_height)
                    .attr("id", oModel4Bound.getData().Canvas.id);

                //factory counter initial
                this._initCounter(svg, oModel4Bound);
                this._initAreas(svg, oModel4Bound);

                //Car moving initial
                var carnums = oModel4Bound.getData().Cars.length;
                var carnum = 0;

                while(carnum<carnums) {

                    this._initCars(svg, oModel4Bound,carnum);
                    carnum++;
                }

            }


        });
    });