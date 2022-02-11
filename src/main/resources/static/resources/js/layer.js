
//산업단지 레이어
var DAN = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: GeoAddr+'/geoserver/seongjang/wms',
      params: {'FORMAT': 'image/png',
               'VERSION': '1.1.0',  
         	   "LAYERS": 'seongjang:DAN',
			   'TRANSPARENT':'true',
      },
	  serverType:'geoserver',

    }),
	name:'산업단지',
	visible: false,
	opacity:1.0,
});

//산단공 산업단지 레이어
var SDG_SANDAN = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: GeoAddr+'/geoserver/seongjang/wms',
      params: {'FORMAT': 'image/png',
               'VERSION': '1.1.0',  
         	   "LAYERS": 'seongjang:smartk-factory',
			   'TRANSPARENT':'true',
      },
	  serverType:'geoserver',

    }),
	name:'산단공/산업단지',
	visible: true,
	opacity:1.0,
});

var YUCH = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: GeoAddr+'/geoserver/seongjang/wms',
      params: {'FORMAT': 'image/png',
               'VERSION': '1.1.0',  
         	   "LAYERS": 'seongjang:YUCH',
			   'TRANSPARENT':'true',
      },
	  serverType:'geoserver',

    }),
	name:'유치업종',
	visible: false,
	opacity:0.3,
	
});

//레이어 뿌리기
function grid_Polygon(LayerName){
  var result_Img = new ol.layer.Image({
    source: new ol.source.ImageWMS({
      ratio: 1,
      url: GeoAddr+'/geoserver/seongjang/wms',
	  //url: 'http://4705cd8ca0b4.ap.ngrok.io/geoserver/seongjang/wms',
      params: {'FORMAT': 'image/png',
               'VERSION': '1.1.0',  
            "LAYERS": 'seongjang:'+LayerName,
      }
    })
  });
	map.addLayer(result_Img);
  //return result_Img;
}

//지역별 빌딩폴리곤 선택함수
function gis_building(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
							//var strUrl = 'http://4705cd8ca0b4.ap.ngrok.io/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+
								//'&maxFeatures=5051'+
			                    '&outputFormat=application/json'+
			                    '&srsname=EPSG:3857'+
								'&bbox=' + extentArea.join(',') + ',EPSG:3857';
							return strUrl;
						},
					    format: new ol.format.GeoJSON(),
						strategy: ol.loadingstrategy.bbox
					  }),
					  	style:new ol.style.Style({
						    stroke: new ol.style.Stroke({
					            color: 'rgba(94,192,213,1.0)',
					            width: 2
					        }),
							fill: new ol.style.Fill({
								color: 'rgba(94,192,213,0.1)',
								width: 1,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "공장",
					            fill: new ol.style.Fill({ color: 'red',width:1 }),
					            stroke: new ol.style.Stroke({  color: 'yellow', width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	console.log(vector);
	map.addLayer(vector);
}


//선택하기위한 폴리곤 선택함수
function Select_PolyGon(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
							
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
							//var strUrl = 'http://4705cd8ca0b4.ap.ngrok.io/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.3.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:custom_danji'+
								//'&maxFeatures=5051'+
			                    '&outputFormat=application/json'+
			                    '&srsname=EPSG:3857'+
								'&style=DAM_DAN'+
								'&bbox=' + extentArea.join(',') + ',EPSG:3857';
								
								
							if($('input[name=div_code]').val() != null && $('input[name=div_code]').val() != ''){
								strUrl +='&viewparams=sigungu:'+$('input[name=div_code]').val()+';';
								//strUrl +="&CQL_FILTER=''";
							}else{
								strUrl +="&viewparams=sigungu:;";
							}
							if($('input[name=ind_code]').val() != null && $('input[name=ind_code]').val() != ''){
								strUrl += 'ksic_code:c'+$('input[name=ind_code]').val().substring(0,2)+';';
							}
							return strUrl;
						},
					    format: new ol.format.GeoJSON(),
						strategy: ol.loadingstrategy.bbox
					  }),					  	
					  style:new ol.style.Style({
						stroke: new ol.style.Stroke({
							//color: 'rgba(81,49,147,1.0)',
							color: 'rgba(0,61,47,1.0)',
							width: 2
						}),
						fill: new ol.style.Fill({
							color: 'rgba(191,227,74,0.5)',
							//color: 'rgba(0,61,47,1.0)',
							width: 1,
						}),	
					  }),
					  minResolution: 11,
					  maxResolution: 1000,
					  
					});
	vector.set("name",PolygonName);
	var r3D = new ol.render3D({
		
		style: new ol.style.Style({
		  stroke: new ol.style.Stroke({
			color: 'blue',
			width: 2
		  }),
		  fill: new ol.style.Fill({ color: 'red' })
		}),
		
		ghost: true,
		height:0, 
		//maxResolution:0.6, 
		defaultHeight:3.5 
	  });
	vector.setRender3D(r3D);
	map.addLayer(vector);
}

function getStyle(feature, resolution) {
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 0, 1.0)',
            width: 4
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.4)'
        }),
        text: new ol.style.Text({
            font: '12px Verdana',
            scale: 2,
            text: getLabelText(feature),
            fill: new ol.style.Fill({ color: 'red' }),
            stroke: new ol.style.Stroke({ color: 'yellow', width: 3 })
        })
    });
	
    return style;
}

function getLabelText(feature) {
    var text = feature.values_.A9;
console.log(text);
    if (text) {
        return text;
    } else {
        return '';
    }
}


// GeoJSON layer
var Dan_Source = new ol.source.Vector({
	url: '../data/fond_guerre.geojson',
	projection: 'EPSG:3857',
	format: new ol.format.GeoJSON(),
	attributions: [ "&copy; <a href='https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire'>data.culture.gouv.fr</a>" ],
	logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg"
});
// Set the control grid reference
var ref;

function setControl() {
	if (ref) map.removeControl(ref);
	// Sort by region
	var sort, title;
	if (document.querySelector("#region").checked) {
		// Sort by region + name
		sort = function(a,b) {
		var c1 = a.get('region')+" "+this.getFeatureName(a);
		var c2 = b.get('region')+" "+this.getFeatureName(b);
		return (c1==c2) ? 0 : (c1<c2) ? -1 : 1;
		}
		// display region as title
		title = function(f) {
		return f.get('region');
		}
	}

	// New control
	ref = new ol.control.GridReference({
		extent: [ -550000, 5250000, 850000, 6650000 ],
		size: [10,12],
		target: document.querySelector(".options div"),
		source: GeoAddr+'/geoserver/seongjang/wms',
		property: "commune",
		sortFeatures: sort,
		indexTitle: title
	});
	map.addControl (ref);

	// Select feature when click on the reference index
	ref.on('select', function(e) {
		select.getFeatures().clear();
		select.getFeatures().push (e.feature);
		var p = e.feature.getGeometry().getFirstCoordinate();
		/*
		var ex = map.getView().calculateExtent(map.getSize());
		if (!ol.extent.containsCoordinate(ex, p))
		{	map.getView().setCenter(p);
		}
		*/
		map.getView().animate({
		center: p,
		duration: 500
		});
	});
};


let event_layer  = new ol.layer.Tile({	
    source: new ol.source.TileWMS({
     url: GeoAddr+'/geoserver/seongjang/wms',
     params:{
         'STYLES':'factory',
         'LAYERS':'seongjang:event_layer',
         'CRS':'EPSG:5174',
     },
     serverType:'geoserver',
     format: new ol.format.GeoJSON(),
     crossOrigin: 'anonymous',
   }),
    //  minResolution: 0,
    //  maxResolution: 11,
     visible: true,
 });
 event_layer.set("name","긴급요청레이어");

let event_layer_group = new ol.layer.Group({
    title:"긴급공장레이어",
    openInLayerSwitcher: false,
    layers:[
        new ol.layer.Tile({	
            source: new ol.source.TileWMS({
             url: GeoAddr+'/geoserver/seongjang/wms',
             params:{
                 'STYLES':'factory',
                 'LAYERS':'seongjang:event_26_01',
             
             },
             serverType:'geoserver',
             format: new ol.format.GeoJSON(),
             crossOrigin: 'anonymous',
          
           }),
            //  minResolution: 0,
            //  maxResolution: 11,
             visible: true,
             name:'부산',
             projection:'EPSG:3857',
             
        }),
        new ol.layer.Tile({	
            source: new ol.source.TileWMS({
             url: GeoAddr+'/geoserver/seongjang/wms',
             params:{
                 'STYLES':'factory',
                 'LAYERS':'seongjang:event_27_01',
             
             },
             serverType:'geoserver',
             format: new ol.format.GeoJSON(),
             crossOrigin: 'anonymous',
             
           }),
            //  minResolution: 0,
            //  maxResolution: 11,
             visible: true,
             name:'대구',
        }),
        new ol.layer.Tile({	
            source: new ol.source.TileWMS({
             url: GeoAddr+'/geoserver/seongjang/wms',
             params:{
                 'STYLES':'factory',
                 'LAYERS':'seongjang:event_29_01',
              
             },
             serverType:'geoserver',
             format: new ol.format.GeoJSON(),
             crossOrigin: 'anonymous',
           }),
            //  minResolution: 0,
            //  maxResolution: 11,
             visible: true,
             name:'광주',
        }),

    ],
});




/**
 * 부산 지적도 및 산업단지
 * URL : 
 * 참고사항 : 산업단지 지역 몇 업종코드검색시 앞 2개 가능유무 검색
 *  Web은 DB접근 불가로 geoserver를 통하여 접근
 * 
 */
function Select_26_bld_cadastral(PolygonName){
	layerRemover(PolygonName);
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
							
			                var strUrl = GeoAddr+'/geoserver/seongjang/wfs?service=' +
			                    'WFS' +
			                    '&version=1.3.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:26_cadastral'+
			                    '&outputFormat=application/json'+
			                    '&srsname=EPSG:3857';
								//'&style=DAM_DAN';

								
							return strUrl;
						},
					    format: new ol.format.GeoJSON(),
						//strategy: ol.loadingstrategy.bbox 해당 
					  }),					  	
					//   style:new ol.style.Style({
					// 	stroke: new ol.style.Stroke({
					// 		//color: 'rgba(81,49,147,1.0)',
					// 		color: 'rgba(222,0,0,1.0)',
					// 		width: 3
					// 	}),
					// 	fill: new ol.style.Fill({
					// 		//color: 'rgba(191,227,74,0.5)',
					// 		color: 'rgba(200,0,0,0.5)',
					// 		width: 1,
					// 	}),	
					//   }),
                      style:new ol.style.Style({
						stroke: new ol.style.Stroke({
							//color: 'rgba(81,49,147,1.0)',
							color: 'rgba(2, 62, 115, 1.0)',
							width: 2
						}),
						fill: new ol.style.Fill({
							//color: 'rgba(191,227,74,0.5)',
							color: 'rgba(2, 62, 115, 0.5)',
							width: 1,
						}),	
					  }),
					  minResolution: 0,
					  maxResolution: 1000,
					  
	});        
	var vector2 = new ol.layer.Vector({	
		source: new ol.source.Vector({
		  url: function(extentArea) {
			  
			  var strUrl = GeoAddr+'/geoserver/seongjang/wfs?service=' +
				  'WFS' +
				  '&version=1.3.0' +
				  '&request=GetFeature' +
				  '&typename=seongjang:26_gis_bld_info'+
				  '&outputFormat=application/json'+
				  '&srsname=EPSG:3857';
				  //'&style=DAM_DAN';
				  
			  return strUrl;
		  },
		  format: new ol.format.GeoJSON(),
		  //strategy: ol.loadingstrategy.bbox 해당 
		}),					  	
	  //   style:new ol.style.Style({
	  // 	stroke: new ol.style.Stroke({
	  // 		//color: 'rgba(81,49,147,1.0)',
	  // 		color: 'rgba(222,0,0,1.0)',
	  // 		width: 3
	  // 	}),
	  // 	fill: new ol.style.Fill({
	  // 		//color: 'rgba(191,227,74,0.5)',
	  // 		color: 'rgba(200,0,0,0.5)',
	  // 		width: 1,
	  // 	}),	
	  //   }),
		style:new ol.style.Style({
		  stroke: new ol.style.Stroke({
			  //color: 'rgba(81,49,147,1.0)',
			  color: 'rgba(2, 48, 89 , 1.0)',
			  width: 2
		  }),
		  fill: new ol.style.Fill({
			  //color: 'rgba(191,227,74,0.5)',
			  color: 'rgba(2, 48, 89 , 0.5)',
			  width: 1,
		  }),	

		}),
		minResolution: 0,
		maxResolution: 1000,
		
});                     
   
	vector.set("name",PolygonName);
	vector2.set("name",PolygonName);

	map.addLayer(vector);
	map.addLayer(vector2);
}



/**
 * 선택한 지적도 및 건축물
 * 지역 : 부산만
 * 
 */
 function Select_bld_cad(loc_x,loc_y,sido_nm){
	layerRemover("선택한지적도");
	layerRemover("선택한건축물");
	switch(sido_nm){
		case '서울특별시' : sido_nm = '11';break;
		case '인천광역시' : sido_nm = '28';break;
		case '강원도' : sido_nm = '42';break;
		case '경기도' : sido_nm = '41';break;
		case '충청북도' : sido_nm = '43';break;
		case '충청남도' : sido_nm = '44';break;
		case '세종특별자치시' : sido_nm = '36';break;
		case '대전광역시' : sido_nm = '30';break;
		case '경상북도' : sido_nm = '47';break;
		case '경상남도' : sido_nm = '48';break;
		case '전라북도' : sido_nm = '45';break;
		case '전라남도' : sido_nm = '46';break;
		case '광주광역시' : sido_nm = '29';break;
		case '대구광역시' : sido_nm = '27';break;
		case '울산광역시' : sido_nm = '31';break;
		case '부산광역시' : sido_nm = '26';break;
		case '제주특별자치도' : sido_nm = '50';break;
	}
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
							
			                var strUrl = GeoAddr+'/geoserver/seongjang/wfs?service=' +
			                    'WFS' +
			                    '&version=1.3.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:26_cadastral'+
			                    '&outputFormat=application/json'+
			                    '&srsname=EPSG:3857';
								if(loc_x != null && loc_x != ''){
									strUrl +='&viewparams=loc_x:'+loc_x+';';
									//strUrl +="&CQL_FILTER=''";
								}
								if(loc_y != null && loc_y != ''){
									strUrl += 'loc_y:'+loc_y+';';
								}
								if(sido_nm != null && sido_nm != ''){
									strUrl += 'sido_nm:'+sido_nm+';';
								}
								
							return strUrl;
						},
					    format: new ol.format.GeoJSON(),
						//strategy: ol.loadingstrategy.bbox 해당 
					  }),					  	
                      style:new ol.style.Style({
						stroke: new ol.style.Stroke({
							color: 'rgba(2, 62, 115, 1.0)',
							width: 2
						}),
						fill: new ol.style.Fill({
							color: 'rgba(2, 62, 115, 0.5)',
							width: 1,
						}),	
					  }),
					  minResolution: 0,
					  maxResolution: 1000,
					  opacity:1
					  
	}); 

	vector.set("name","선택한지적도");
	map.addLayer(vector);

}
function Select_bld_info(loc_x,loc_y){
	layerRemover("선택한건축물");
	var vector = new ol.layer.Vector({	
		source: new ol.source.Vector({
		  url: function(extentArea) {
			  
			  var strUrl = GeoAddr+'/geoserver/seongjang/wfs?service=' +
				  'WFS' +
				  '&version=1.3.0' +
				  '&request=GetFeature' +
				  '&typename=seongjang:26_gis_bld_info'+
				  '&outputFormat=application/json'+
				  '&srsname=EPSG:3857';
				  //'&style=DAM_DAN';
				  if(loc_x != null && loc_x != ''){
					  strUrl +='&viewparams=loc_x:'+loc_x+';';
				  }
				  if(loc_y != null && loc_y != ''){
					  strUrl += 'loc_y:'+loc_y+';';
				  }
				  
			  return strUrl;
		  },
		  format: new ol.format.GeoJSON(),
		  //strategy: ol.loadingstrategy.bbox 해당 
		}),					  	
		style:new ol.style.Style({
		  stroke: new ol.style.Stroke({
			  //color: 'rgba(81,49,147,1.0)',
			  color: 'rgba(RGB 2, 48, 89, 1.0)',
			  width: 2
		  }),
		  fill: new ol.style.Fill({
			  //color: 'rgba(191,227,74,0.5)',
			  color: 'rgba(RGB 2, 48, 89, 0.5)',
			  width: 1,
		  }),	
		}),
		minResolution: 0,
		maxResolution: 1000,
		opacity:1
	}); 
	vector.set("name","선택한건축물");
	map.addLayer(vector);

}

function fuc_OSMBuildings(){
	//0yerRemover("선택한건축물");
	var vector = new ol.layer.Tile({//테스트레이어
		source: new ol.source.XYZ({
			url: 'https://{s}.data.osmbuildings.org/0.2/{k}/tile/{z}/{x}/{y}.json',
			format: new ol.format.GeoJSON,
			crossOrigin: 'anonymous',
		}),
		// maxResolution: 5,
	 
		visible: true,
		minResolution: 0,
		maxResolution: 14.5,
	});
	vector.set("name","OSMBuildings");
	map.addLayer(vector);

}