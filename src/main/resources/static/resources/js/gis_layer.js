

var gis_layer_color =[
	'rgba(1, 60, 61, 1.0)',
	'rgba(1, 60, 61, 0.5)',
	'rgba(214, 239, 200, 1.0)',
	'rgba(214, 239, 200, 0.5)',
	'rgba(110, 105, 75, 1.0)',
	'rgba(110, 105, 75, 0.5)',
	'rgba(116, 60, 60, 1.0)',
	'rgba(116, 60, 60, 0.5)',
	'rgba(94,192,213,1.0)',
	'rgba(94,192,213,0.5)',
	'rgba(245,223,77,0.3)',//펜톤 2021옐로우
	'rgba(245,223,77,0.2)',
	'rgba(147,149,151,0.3)',//펜톤2021 그레이
	'rgba(147,149,151,0.2)',

];

//var fillColor 
//지역별 빌딩폴리곤 선택함수 - 공장만
function gis_building_Factory(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+'_17000'+
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
					            //color: gis_layer_color[8],
								color : 'rgba(0,0,255,1)',
					            width: 3
					        }),
							fill: new ol.style.Fill({
								//color: gis_layer_color[9],
								color : 'rgba(0,0,255,0.1)',
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
						//maxResolution: 21
					});
	vector.set("name",PolygonName);
	map.addLayer(vector);
}

//지역별 빌딩폴리곤 선택함수 - 창고만
function gis_building_Warehouse(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+'_18000'+
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
					            color: gis_layer_color[2],
					            width: 3
					        }),
							fill: new ol.style.Fill({
								color: gis_layer_color[3],
								width: 1,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "창고",
					            fill: new ol.style.Fill({ color: 'white',width:1 }),
					            stroke: new ol.style.Stroke({  color: 'red', width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	vector.set("name",PolygonName);					
	map.addLayer(vector);
}

//지역별 빌딩폴리곤 선택함수 - 1종근린
function gis_building_type1_Neighborhood(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
							//var strUrl = 'http://4705cd8ca0b4.ap.ngrok.io/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+'_3000'+
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
					            //color: gis_layer_color[4],
								color: gis_layer_color[8],
					            width: 3
					        }),
							fill: new ol.style.Fill({
								//color: gis_layer_color[5],
								color: gis_layer_color[9],
								width: 1,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "1종근린",
					            fill: new ol.style.Fill({ color: 'white',width:1 }),
					            stroke: new ol.style.Stroke({  color: gis_layer_color[4], width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	vector.set("name",PolygonName);
	map.addLayer(vector);
}

//지역별 빌딩폴리곤 선택함수 - 2종근린
function gis_building_type2_Neighborhood(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+'_4000'+
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
					            //color: gis_layer_color[6],
								color: gis_layer_color[8],
					            width: 3
					        }),
							fill: new ol.style.Fill({
								//color: gis_layer_color[7],
								color: gis_layer_color[9],
								width: 1,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "2종근린",
					            fill: new ol.style.Fill({ color: 'white',width:1 }),
					            stroke: new ol.style.Stroke({  color: 'blue', width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	vector.set("name",PolygonName);
	map.addLayer(vector);
}

//지역별 빌딩폴리곤 선택함수 - 나머지타입
function gis_building_type_rest(PolygonName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({
					    url: function(extentArea) {
			                var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
			                    'WFS' +
			                    '&version=1.0.0' +
			                    '&request=GetFeature' +
			                    '&typename=seongjang:'+PolygonName+'_0'+
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
					            color: gis_layer_color[10],
					            width: 2
					        }),
							fill: new ol.style.Fill({
								color: gis_layer_color[11],
								width: 1,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "ETC",
					            fill: new ol.style.Fill({ color: 'white',width:1 }),
					            stroke: new ol.style.Stroke({  color: 'white', width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	vector.set("name",PolygonName);
	map.addLayer(vector);
}

var test_cccc;
function WMS_gis_building_type_rest(PolygonName){
	var vector = new ol.layer.Tile({	
					  source: new ol.source.TileWMS({
					    url: GeoAddr+'/geoserver/seongjang/wms',
						params:{
							'LAYERS':'seongjang:'+PolygonName+'_0',
						},
						serverType:'geoserver',
						
					  }),
					  	style:new ol.style.Style({
						    stroke: new ol.style.Stroke({
					            color: gis_layer_color[10],
					            width: 0.5
					        }),
							fill: new ol.style.Fill({
								color: gis_layer_color[11],
								width: 0.5,
							}),
							text:new ol.style.Text({
					            font: '13px sans-serif',
					            scale: 1,
					            text: "ETC",
					            fill: new ol.style.Fill({ color: 'white',width:1 }),
					            stroke: new ol.style.Stroke({  color: 'white', width: 1 })
					        }),
						  }),
				    	minResolution: 0,
    					maxResolution: 11
					});
	vector.set("name",PolygonName);
	test_cccc = vector;
	map.addLayer(vector);
}

function factory_layers(PolygonName,setName){
	
	 var vector = new ol.layer.Tile({	
	 				  source: new ol.source.TileWMS({
					    url: GeoAddr+'/geoserver/seongjang/wms',
						params:{
							'STYLES':'factory',
							'LAYERS':'seongjang:'+PolygonName,
						},
						serverType:'geoserver',
						format: new ol.format.GeoJSON(),
						crossOrigin: 'anonymous',
					  }),
				    	minResolution: 0,
    					maxResolution: 11,
						visible: false,
					});
	/*
	var vector = new ol.layer.Vector({	
		source: new ol.source.Vector({
		  url: function(extentArea) {
			  var strUrl = GeoAddr+'/geoserver/seongjang/ows?service=' +
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
		  minResolution: 0,
		  maxResolution: 11,
		  visible: false,		  
	  });	

	*/
	vector.set("name",setName);
	test_cccc = vector;
	map.addLayer(vector);
}

function rest_layers(PolygonName,setName){
	var vector = new ol.layer.Vector({	
					  source: new ol.source.Vector({	
	// var vector = new ol.layer.Tile({	
	// 				  source: new ol.source.TileWMS({
					    url: GeoAddr+'/geoserver/seongjang/wms',
						params:{
							'STYLES':'41_etc',
							'LAYERS':'seongjang:'+PolygonName,
						},
						serverType:'geoserver',
						format: new ol.format.GeoJSON(),	
						crossOrigin: 'anonymous',	
					  }),
				    	minResolution: 0,
    					maxResolution: 11,
						visible: false,
					});
	vector.set("name",setName);
	test_cccc = vector;
	map.addLayer(vector);
}

function gis_Layer_City(capital){
	gis_building_Factory(capital);
	gis_building_Warehouse(capital);
	gis_building_type1_Neighborhood(capital);
	gis_building_type2_Neighborhood(capital);
	//gis_building_type_rest(capital);
	WMS_gis_building_type_rest(capital);
}

function openapiTest(PolygonName,setName){ //용도별건물정보서비스
	var params = { //이건 국가공간정보포털
		'backcolor':'0xRRGGBB',
		'SERVICE':'WMS',
		'REQUEST':'GetMap',
		'FORMAT':'image/png',
		'TRANSPARENT':'true',
		'STYLES':'',
		'VERSION':'1.3.0',
		'LAYERS':'F253',
		'WIDTH':'915',//512,256
		'HEIGHT':'700',//512,256
		'CRS':'EPSG:3857',
		'authkey':'e81986658904d15b1ac83f',
		//'ServiceKey':'C1wdeeOwmZvH+X0rpTyH7R9MhQWiSyw4hfGlGkY35pHKMrBY8rgKRvTyJlq48/U8Gz9+7AoqL/1yMbiEembLMg==',
		'exceptions':'blank'
	}
	var vector = new ol.layer.Tile({	
					  source: new ol.source.TileWMS({
					    url: 'http://openapi.nsdi.go.kr/nsdi/BuildingUseService/wms/getBuildingUseWMS',    //이건 국가공간정보포털
						//url: 'http://apis.data.go.kr/1611000/nsdi/BuildingUseService/wms/getBuildingUseWMS', //공공데이터포털
						params:params,
						/*
						params:	{
							'ServiceKey':'C1wdeeOwmZvH+X0rpTyH7R9MhQWiSyw4hfGlGkY35pHKMrBY8rgKRvTyJlq48/U8Gz9+7AoqL/1yMbiEembLMg==',
							 'LAYERS':'F253',
							 'CRS':'EPSG:5174',
							 'WIDTH':'256',//512,256
							 'HEIGHT':'256',//512,256
							 'FORMAT':'image/png',
							 'TRANSPARENT':'true',
							 'bgcolor':'0xFFFFFF',
							 'exceptions':'blank'
						},
						*/   
						serverType:'geoserver',
					  }),
				    	minResolution: 0,
    					maxResolution: 11,
						visible: false,
					});
	vector.set("name",setName);
	test_cccc = vector;
	map.addLayer(vector);
}
