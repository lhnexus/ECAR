/**
 * Created by nexusl on 2017/7/9.
 */
// function initCounter(svg, oMovingModel) {
//     var nums = parseInt(oMovingModel.getData().Counters.Locations.length);
//     var cwidth = parseInt(oMovingModel.getData().Counters.width);
//     var cheight = parseInt(oMovingModel.getData().Counters.height);
//
//     for (var i = 0; i < nums; i++) {
//
//         var ifill = oMovingModel.getData().Counters.Locations[i].fill;
//         var fill = "none";
//         if (ifill == "true")
//             fill = oMovingModel.getData().Cargo.content;
//
//         svg.append('rect').attr('x', oMovingModel.getData().Counters.Locations[i].x)
//             .attr('y', oMovingModel.getData().Counters.Locations[i].y)
//             .attr('width', cwidth).attr('height', cheight)
//             .attr('id', oMovingModel.getData().Counters.Locations[i].id)
//             .style('fill', fill)
//             .style('stroke', oMovingModel.getData().Counters.stroke)
//             .style('stroke-width', oMovingModel.getData().Counters.stroke_width)
//             .style('stroke-dasharray', oMovingModel.getData().Counters.stroke_dasharray);
//     }
//
//
// }

function initAreas(svg, oMovingModel) {
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
}

// function initCars(svg, oMovingModel, MessageToast,carnum) {
//     var carid = oMovingModel.getData().Cars[carnum].id;
//     var rectwidth = parseInt(oMovingModel.getData().Cars[carnum].width);
//     var rectheight = parseInt(oMovingModel.getData().Cars[carnum].height);
//
//     var ifill = oMovingModel.getData().Cars[carnum].fill;
//     var fill = "none";
//     if (ifill == "true")
//         fill = oMovingModel.getData().Cargo.content;
//     svg.append('rect').attr('x', parseInt(oMovingModel.getData().Cars[carnum].Locations[0].x) - rectwidth / 2)
//         .attr('y', parseInt(oMovingModel.getData().Cars[carnum].Locations[0].y) - rectheight / 2)
//         .attr('width', rectwidth).attr('height', rectheight)
//         .attr('id', carid)
//         .style('fill', fill)
//         .style('stroke', 'rgb(209,242,235)')
//         .style('stroke-width', '5')
//         .on("click",function(){
//             MessageToast.show("click car");
//         });
//
// }

function moving(oMovingModel, carnum, rect,svg) {
    var liter = 0;
    // this.oMovingModel = oMovingModel;
    // this.carnum = carnum;
    var length = oMovingModel.getData().Cars[carnum].Locations.length;
    // this.rect = rect;
    repeating();


    function repeating() {
        liter = liter + 1;
        if (liter < length) {

            //calculate moving duration based on the same speed
            var speed = parseFloat(oMovingModel.getData().Cars[carnum].Speed);
            var dura = 0;
            var duarangle = parseInt(oMovingModel.getData().Cargo.reltime)+parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].wtime);
            var distx = Math.abs(parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(oMovingModel.getData().Cars[carnum].Locations[liter - 1].x));
            var disty = Math.abs(parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(oMovingModel.getData().Cars[carnum].Locations[liter - 1].y));
            var dist = 0;
            var direct = oMovingModel.getData().Cars[carnum].Locations[liter].NS;
            var isC = oMovingModel.getData().Cars[carnum].Locations[liter].NC;
            var isCP = oMovingModel.getData().Cars[carnum].Locations[liter - 1].NC;

            if (distx == 0) {
                dura = Math.floor(disty / speed);
                dist = disty;

            }
            if (disty == 0) {
                dura = Math.floor(distx / speed);
                dist = distx;

            }

            //moving animation
            rect.transition(this.carid + "move" + liter)
                .duration(dura)
                .tween(this.carid + "precision" + liter, function () {
                    0

                    if (isCP == "true") {
                        var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x')) - dist);
                        var areay = d3.interpolateRound(parseInt(rect.attr('y')), parseInt(rect.attr('y')));
                    } else {
                        var areax = d3.interpolateRound(parseInt(rect.attr('x')), parseInt(rect.attr('x')) + dist);
                        var areay = d3.interpolateRound(parseInt(rect.attr('y')), parseInt(rect.attr('y')));
                    }



                    // var areax = d3.interpolateRound(0,distx);
                    // var areay = d3.interpolateRound(0,disty);disty
                    return function (t) {


                        var minAreax = areax(t);
                        var minAreay = areay(t);
                        render(minAreax, minAreay, rect);
                        //decide moving or rotation
                        // render(minAreax,minAreay);
                    };
                })
                .transition(this.carid + "rotate" + liter)
                .duration(duarangle)
                .tween(this.carid + "rotate" + liter, function () {
                    var x = parseInt(rect.attr('x'));
                    var y = parseInt(rect.attr('y'));
                    var nx = x;
                    var ny = y;

                    var ix = 0;
                    var iy = 0;
                    var cx = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x);
                    var cy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y);

                    if (rect.attr('transform') == null) {
                        ix = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(rect.attr('width')) / 2;
                        iy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(rect.attr('height')) / 2;

                    } else {

                        // var ia = parseInt(rect.attr('transform').substring(7,10));
                        ix = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].x) - parseInt(rect.attr('width')) / 2;
                        iy = parseInt(oMovingModel.getData().Cars[carnum].Locations[liter].y) - parseInt(rect.attr('height')) / 2;


                    }


                    var areax = d3.interpolateRound(ix, ix);
                    var areay = d3.interpolateRound(iy, iy);
                    var iangle = 0;

                    if (rect.attr('transform') == null) {


                    } else {
                        //iangle = parseInt(rect.attr('transform').substring(7, 10));
                        iangle = parseInt(rect.attr('transform').split("(")[1].split(",")[0]);
                    }
                    var angleL;
                    var angleR;
                    var angleE;
                    if (dist > 0) {
                        angleL = d3.interpolateRound(iangle, iangle - 90);
                        angleR = d3.interpolateRound(iangle, iangle + 90);
                    } else {
                        angleL = d3.interpolateRound(iangle, iangle - 90);
                        angleR = d3.interpolateRound(iangle, iangle + 90);
                    }
                    angleE = d3.interpolateRound(iangle, iangle+180);


                    var counterid = retrieveCounterID(ix, iy);
                    var cstatus;
                    var content = oMovingModel.getData().Cargo.content;
                    if (counterid != "")
                        cstatus = d3.select("#" + counterid).style('fill');

                    if (direct == "N") {
                        if (rect.style('fill') == "none")
                            releaseCargo(rect, content);
                        else
                            releaseCargo(rect, "none");
                    }

                    if (direct == "I") {
                        freshInbound("true",oModel4Bound,svg,rect);
                    }
                    if(direct == "O"){
                        freshOutbound("true",oModel4Bound,svg,rect);
                    }

                    return function (t) {
                        var minAreax = areax(t);
                        var minAreay = areay(t);
                        var minAngleL = angleL(t);
                        var minAngleR = angleR(t);
                        var minAngleE = angleE(t);
                        //check next point is counter or not
                        if (isC == "true") {
                            switch (direct) {
                                case "L":
                                    //renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                    renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                    break;
                                case "R":
                                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                                    renderRotate(minAreax, minAreay, minAngleL, cx, cy, rect);
                                    break;
                                default:
                                    break;
                            }
                        } else {

                            switch (direct) {
                                case "L":
                                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                    renderRotate(minAreax, minAreay, minAngleL, cx, cy, rect);
                                    break;
                                case "R":
                                    // renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                    renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                    break;
                                case "N":
                                    // renderRotate(minAreax,minAreay,minAngleR,Math.floor(parseInt(rect.attr('x'))+parseInt(oMovingModel.getData().Cars[0].width)/2),Math.floor(parseInt(rect.attr('y'))+parseInt(oMovingModel.getData().Cars[0].height)/2),rect);
                                    //renderRotate(minAreax, minAreay, minAngleR, cx, cy, rect);
                                    if (cstatus == "none")
                                        fillCounter(counterid, content);
                                    else
                                        fillCounter(counterid, "none");
                                    break;
                                case "E":
                                    renderRotate(minAreax, minAreay, minAngleE, cx, cy, rect);
                                    break;
                                default:
                                    break;
                            }
                        }


                    };
                })
                .transition(this.carid + "repeat" + liter)
                .duration(1)
                .each("end", repeating);

        }
    }

    function render(minAreax, minAreay, rect) {
        rect.attr('x', minAreax).attr('y', minAreay);
        //rect.style('fill','rgb(84,153,199)').attr('transform','translate('+distx+','+disty+')');

        //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
    }

    function renderRotate(minAreax, minAreay, minAngle, centerx, centery, rect) {

        rect.attr('x', minAreax).attr('y', minAreay).attr('transform', 'rotate(' + minAngle + ',' + centerx + ',' + centery + ')');

        //rect.attr('x',minAreax).attr('y',minAreay).style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+',500,325)');
        //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+','+centerx+','+centery+')');
        //rect.style('fill','rgb(84,153,199)').attr('transform','rotate('+minAngle+')');
        //text.text(formatArea(minArea) + "px² / " + formatPercent(n / m));
    }

}


function releaseCargo(rect, fill) {
    rect.style('fill', fill);
}

function retrieveCounterID(x, y) {

    //call xs service to get counter id
    var cid = "";
    if ((parseInt(x) == 300) && (parseInt(y) == 50))
        cid = "A-1";
    if ((parseInt(x) == 920) && (parseInt(y) == 215))
        cid = "D-4";
    if ((parseInt(x) == 570) && (parseInt(y) == 160))
        cid = "B-3";
    if ((parseInt(x) == 920) && (parseInt(y) == 380))
        cid = "D-7";
    return cid;
}

function fillCounter(cid, fill) {
    d3.select("#" + cid).style('fill', fill);
}

function getInboundByOrder(oMovingModel) {

    //retrieve the first cargo id
    return oMovingModel.getData().InboundQueue;
}

function getOutboundByOrder(oMovingModel) {

    //retrieve the first cargo id
    return oMovingModel.getData().OutboundQueue;
}

function retrieveCargoId(carid){
    var cargoid = "new_outbound"+Math.floor(Math.random()*100);
    return cargoid;
}


function freshInbound(pull, oMovingModel, svg,rect) {

    var inbounds = getInboundByOrder(oMovingModel);
    var qsize = inbounds.length;
    //draw two box
    var liter = 0;
    var iarea = d3.select("#IArea");
    var xoffset = 15;
    var yoffset = 10;
    var iareax = parseInt(iarea.attr('x'));
    var iareay = parseInt(iarea.attr('y'));
    var dura = parseInt(oMovingModel.getData().Cargo.reltime);
    var content = oMovingModel.getData().Cargo.content;
    //fresh Inbound Area
    if (pull == "true") {
        while (liter < qsize) {
            var cargo = d3.select("#" + inbounds[liter].id);
            var distx = 15 + parseInt(iarea.attr('width')) / 3;
            var disty = 10 + parseInt(iarea.attr('height')) / 3;
            switch (liter) {
                case 0:
                    cargo.transition(inbounds[liter].id + "move")
                        .duration(dura)
                        .tween(inbounds[liter].id + "precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox);
                            var areay = d3.interpolateRound(cargoy, cargoy - disty-35);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                                if(t== 1){
                                    releaseCargo(rect, content);
                                    inbounds.splice(0,1);
                                }

                            };
                        }).remove();
                    break;
                case 1:
                    cargo.transition(inbounds[liter].id+"move")
                        .duration(dura)
                        .tween(inbounds[liter].id+"precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox);
                            var areay = d3.interpolateRound(cargoy, cargoy - disty);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                            };
                        });
                    break;
                case 2:
                    cargo.transition(inbounds[liter].id+"move")
                    .duration(dura)
                    .tween(inbounds[liter].id+"precision", function () {
                        var cCargo = this;
                        var cargox = parseInt(cCargo.getAttribute('x'));
                        var cargoy = parseInt(cCargo.getAttribute('y'));
                        var areax = d3.interpolateRound(cargox, cargox-distx);
                        var areay = d3.interpolateRound(cargoy, cargoy);

                        return function (t) {

                            var minAreax = areax(t);
                            var minAreay = areay(t);
                            cCargo.setAttribute('x', minAreax);
                            cCargo.setAttribute('y', minAreay);
                        };
                    });
                    break;
                case 3:
                    cargo.transition(inbounds[liter].id+"move")
                        .duration(dura)
                        .tween(inbounds[liter].id+"precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox);
                            var areay = d3.interpolateRound(cargoy, cargoy+disty);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                            };
                        });
                    break;
                case 4:
                    svg.append('rect').attr('x', iareax + 2 * xoffset + parseInt(iarea.attr('width')) / 3)
                        .attr('y', iareay + yoffset)
                        .attr('width', parseInt(iarea.attr('width')) / 3)
                        .attr('height', parseInt(iarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().InboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                default:
                    break;
            }

            liter++;

        }

    } else {
        if (qsize > 4) {
            qsize = 4;
        }
        while (liter < qsize) {
            switch (liter) {
                case 0:
                    svg.append('rect').attr('x', iareax + xoffset)
                        .attr('y', iareay + yoffset)
                        .attr('width', parseInt(iarea.attr('width')) / 3)
                        .attr('height', parseInt(iarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().InboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 1:
                    svg.append('rect').attr('x', iareax + xoffset)
                        .attr('y', iareay + 2 * yoffset + parseInt(iarea.attr('height')) / 3)
                        .attr('width', parseInt(iarea.attr('width')) / 3)
                        .attr('height', parseInt(iarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().InboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 2:
                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                    svg.append('rect').attr('x', iareax + 2 * xoffset + parseInt(iarea.attr('width')) / 3)
                        .attr('y', iareay + 2 * yoffset + parseInt(iarea.attr('height')) / 3)
                        .attr('width', parseInt(iarea.attr('width')) / 3)
                        .attr('height', parseInt(iarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().InboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 3:
                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                    svg.append('rect').attr('x', iareax + 2 * xoffset + parseInt(iarea.attr('width')) / 3)
                        .attr('y', iareay + yoffset)
                        .attr('width', parseInt(iarea.attr('width')) / 3)
                        .attr('height', parseInt(iarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().InboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);

                    break;
                default:
                    break;
            }
            liter++;

        }


    }


}


function freshOutbound(push, oMovingModel, svg,rect) {

    var outbounds = getOutboundByOrder(oMovingModel);
    var qsize = outbounds.length;
    //draw two box
    var liter = 0;
    var oarea = d3.select("#OArea");
    var xoffset = 15;
    var yoffset = 10;
    var oareax = parseInt(oarea.attr('x'));
    var oareay = parseInt(oarea.attr('y'));
    var dura = parseInt(oMovingModel.getData().Cargo.reltime);
    var content = oMovingModel.getData().Cargo.content;
    var distx = 15 + parseInt(oarea.attr('width')) / 3;
    var disty = 10 + parseInt(oarea.attr('height')) / 3;
    //fresh Inbound Area
    if (push == "true") {

        while (liter < qsize) {
            var cargo = d3.select("#" + outbounds[liter].id);

            switch (liter) {
                case 0:
                    cargo.transition(outbounds[liter].id + "move")
                        .duration(dura)
                        .tween(outbounds[liter].id + "precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox);
                            var areay = d3.interpolateRound(cargoy, cargoy+disty);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);

                            };
                        });
                    break;
                case 1:
                    cargo.transition(outbounds[liter].id+"move")
                        .duration(dura)
                        .tween(outbounds[liter].id+"precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox + distx);
                            var areay = d3.interpolateRound(cargoy, cargoy);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                            };
                        });
                    break;
                case 2:
                    cargo.transition(outbounds[liter].id+"move")
                        .duration(dura)
                        .tween(outbounds[liter].id+"precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox);
                            var areay = d3.interpolateRound(cargoy, cargoy - disty);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                            };
                        });
                    break;
                case 3:
                    cargo.transition(outbounds[liter].id+"move")
                        .duration(dura)
                        .tween(outbounds[liter].id+"precision", function () {
                            var cCargo = this;
                            var cargox = parseInt(cCargo.getAttribute('x'));
                            var cargoy = parseInt(cCargo.getAttribute('y'));
                            var areax = d3.interpolateRound(cargox, cargox+distx);
                            var areay = d3.interpolateRound(cargoy, cargoy);

                            return function (t) {

                                var minAreax = areax(t);
                                var minAreay = areay(t);
                                cCargo.setAttribute('x', minAreax);
                                cCargo.setAttribute('y', minAreay);
                            };
                        }).remove();
                    break;
                case 4:
                    break;
                default:
                    break;
            }

            liter++;

        }
        var nid = retrieveCargoId("carid");
        var newcargo = {
            id: nid,
            desc: "new outbound Cargo"
        }
        var ncargo =svg.append('rect').attr('x', parseInt(oarea.attr('x'))+15)
            .attr('y', parseInt(oarea.attr('y'))-35-parseInt(oarea.attr('height')) / 3)
            .attr('width', parseInt(oarea.attr('width')) / 3)
            .attr('height', parseInt(oarea.attr('height')) / 3)
            .attr('id', nid)
            .style('fill', oMovingModel.getData().Cargo.content);
        releaseCargo(rect, "none");
        outbounds.unshift(newcargo);
        ncargo.transition("new_outbound move")
            .duration(dura)
            .tween("new_outbound precision", function () {
                var cCargo = this;
                var cargox = parseInt(cCargo.getAttribute('x'));
                var cargoy = parseInt(cCargo.getAttribute('y'));
                var areax = d3.interpolateRound(cargox, cargox);
                var areay = d3.interpolateRound(cargoy, cargoy+disty+35);


                return function (t) {

                    var minAreax = areax(t);
                    var minAreay = areay(t);
                    cCargo.setAttribute('x', minAreax);
                    cCargo.setAttribute('y', minAreay);

                };
            });
    } else {
        if (qsize > 4) {
            qsize = 4;
        }
        while (liter < qsize) {
            switch (liter) {
                case 0:
                    svg.append('rect').attr('x', oareax + xoffset)
                        .attr('y', oareay + yoffset)
                        .attr('width', parseInt(oarea.attr('width')) / 3)
                        .attr('height', parseInt(oarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().OutboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 1:
                    svg.append('rect').attr('x', oareax + xoffset)
                        .attr('y', oareay + 2 * yoffset + parseInt(oarea.attr('height')) / 3)
                        .attr('width', parseInt(oarea.attr('width')) / 3)
                        .attr('height', parseInt(oarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().OutboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 2:
                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                    svg.append('rect').attr('x', oareax + 2 * xoffset + parseInt(oarea.attr('width')) / 3)
                        .attr('y', iareay + 2 * yoffset + parseInt(oarea.attr('height')) / 3)
                        .attr('width', parseInt(oarea.attr('width')) / 3)
                        .attr('height', parseInt(oarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().OutboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);
                    break;
                case 3:
                    // renderRotate(minAreax,minAreay,minAngleL,Math.floor(parseInt(rect.attr('x'))+rect.attr('width')/2),Math.floor(parseInt(rect.attr('y'))+rect.attr('height')/2),rect);
                    svg.append('rect').attr('x', oareax + 2 * xoffset + parseInt(oarea.attr('width')) / 3)
                        .attr('y', oareay + yoffset)
                        .attr('width', parseInt(oarea.attr('width')) / 3)
                        .attr('height', parseInt(oarea.attr('height')) / 3)
                        .attr('id', oMovingModel.getData().OutboundQueue[liter].id)
                        .style('fill', oMovingModel.getData().Cargo.content);

                    break;
                default:
                    break;
            }
            liter++;

        }


    }


}

function convertData(oEvent) {
    var oData,
        oModel = oEvent.getSource();
    // sContextPath = getContextPath();

    if (!oEvent.getParameters().success) {
        return;
    }

    oData = oModel.getData();
    oData.GoodTimeLine.forEach(function (oGTimeLine) {
        oGTimeLine.time = DateUtils.parseDate(oGTimeLine.time);

    });
    oModel.updateBindings(true);
}

function calRack(oEvent) {
    var oData,
        oModel = oEvent.getSource();
    // sContextPath = getContextPath();

    if (!oEvent.getParameters().success) {
        return;
    }

    oData = oModel.getData();
    var rnum = oData.Counters.Locations.length;
    oData.Counters.rnum = rnum;
    // oData.Counters.forEach(function (oRack) {
    //     var rnum = oRack.Locations.length;
    //     oRack.rnum = rnum;
    //
    // });
    oModel.updateBindings(true);
}

function freshDetail(){
//     oDetailView = sap.ui.view({
//         preprocessors : {
//             xml : {
//                 bindingContexts : {
//                     meta : oMetaModel.createBindingContext(sMetadataPath)
//                 },
//                 models : {
//                     meta : oMetaModel
//                 },
//                 bindTexts : that.getView().getModel("ui").getProperty("/bindTexts")
//             }
//         },
//         type : ViewType.XML,
//         viewName : "sap.ui.core.sample.ViewTemplate.scenario.Detail"
//     });
//     oDetailView.bindElement(sPath);
// });
//
// oDetailBox.destroyContent();
// iStart = Date.now();
// oDetailBox.addContent(oDetailView);
}