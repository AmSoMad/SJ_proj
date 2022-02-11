
  var glyph = ol.style.FontSymbol.prototype.defs.glyphs;
// Get font glyph
var theGlyph = "maki-industrial";
function SetstyleSymbol(feature){
    var st= [];
        // Shadow style
        st.push ( new ol.style.Style({
            image: new ol.style.Shadow({
            radius: 15,
            blur: 5,
            offsetX: 0,
            offsetY: 0,
            fill: new ol.style.Fill({
                color: "rgba(0,0,0,0.5)"
            })
            })
        }))

        st.push ( new ol.style.Style({
        image: new ol.style.FontSymbol({
                form: 'bubble', //"hexagone", 
                /*
                fontSymbol 가능한것들
                <select id="form" onchange="vector.changed();" >
                    <option value="none" selected="selected">none</option>
                    <option value="circle">circle</option>
                    <option value="poi">poi</option>
                    <option value="bubble">bubble</option>
                    <option value="marker">marker</option>
                    <option value="coma">coma</option>
                    <option value="shield">shield</option>
                    <option value="blazon">blazon</option>
                    <option value="bookmark">bookmark</option>
                    <option value="hexagon">hexagon</option>
                    <option value="diamond">diamond</option>
                    <option value="triangle">triangle</option>
                    <option value="sign">sign</option>
                    <option value="ban">ban</option>
                    <option value="lozenge">lozenge</option>
                    <option value="square">square</option>
                </select>
                */
                gradient: true,/* 그라데이션 줄래말래?  */ 
                glyph:'maki-industrial',//car[Math.floor(Math.random()*car.length)], 
                fontSize: 1,
                fontStyle: '',
                /*
                <select id="style" onchange="vector.changed();" >
                    <option value="">unset</option>
                    <option value="bold" >bold</option>
                    <option value="italic" >italic</option>
                    <option value="bold italic" >bold italic</option>
                </select>
                */
                radius: 15, 
                //offsetX: -15,
                //rotation: Number($("#rotation").val())*Math.PI/180,  // 회전각
                rotation: 0,  // 회전각
                rotateWithView: false,
                //offsetY: $("#offset").prop('checked') ? -Number($("#radius").val()):0 ,
                offsetY:-15 ,
                color: fillColor[fillNo],  //심볼컬러
                //fill: new ol.style.Fill({ color: 'green' }),
                //stroke: new ol.style.Stroke({ color: 'white', width: 1 }) 
                fill : new ol.style.Fill({color: fillColor[fillNo]}),
                stroke : new ol.style.Stroke({color: 'black', width: 2,height:2,opacity:1}),
            }),
            stroke: new ol.style.Stroke({color: 'black', width: 2,height:2,opacity:1}),
            fill: new ol.style.Fill({color: fillColor[fillNo]}),
        }));
        
    return st;
}

