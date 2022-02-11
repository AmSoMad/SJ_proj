
//var GeoAddr = "http://192.168.0.110:8080";
//var GeoAddr = "http://c50b6e68b737.ap.ngrok.io";
var GeoAddr = "http://localhost:8080";

var insertFeature = [];
var insertFeatureColor = [];
var resultArray = new Array();
var wms_imageTest = document.getElementById('wms_image'); //범례선택이미지
var layerListName = [];


proj4.defs('EPSG:5179','+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
ol.proj.proj4.register(proj4);
let newProj = ol.proj.get('EPSG:3857'); // 사용 좌표계
let newProjExtent = newProj.getExtent(); // 지도의 범위


var cnt = 0; //선택결과 가운터
var rotateWithView = document.getElementById('rotateWithView'); //오버뷰

var projectionSelect = "EPSG:3857";
var procisionFormat = new ol.coordinate.createStringXY(5);
/* 오픈 레이어스에서 WMTS API를 이용 브이월드 배경지도를 호출  */
let wmts = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',
		format: new ol.format.GeoJSON
	}),
	name:'2D배경지도',
	
	//   minResolution: 0,	
    //   maxResolution: 1400,
	  
});

let wmts3 = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'http://xdworld.vworld.kr:8080/2d/gray/202002/{z}/{x}/{y}.png',
		format: new ol.format.GeoJSON
	}),
	name:'2D회색지도',
	minResolution: 0,	
    maxResolution: 1400,
	visible: false,
});

let wmts2 = new ol.layer.Tile({
	source: new ol.source.OSM(),
	//minResolution: 1400,
	name:'OSM배경지도',
     
});

let Satellite = new ol.layer.Tile({//2d위성영상지도
	source: new ol.source.XYZ({
		url: 'https://xdworld.vworld.kr/2d/Satellite/202002/{z}/{x}/{y}.jpeg',
		//url: 'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg',
		format: new ol.format.GeoJSON
	}),
    //  maxResolution: 5,

	name:'위성사진',
	visible: false,
});

let Hybrid = new ol.layer.Tile({//2d위성영상지도
	source: new ol.source.XYZ({url: 'https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png',
		format: new ol.format.GeoJSON
	}),
    // maxResolution: 5,

	name:'하이브리드',
	visible: false,
});
/*
let sgisapi = new ol.layer.Tile({
	source: new ol.source.XYZ({url: 'https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png',
		format: new ol.format.GeoJSON
	}), 
      minResolution: 5,	
      maxResolution: 1400,
     
});
*/
var overviewMapControl = new ol.control.OverviewMap({
  // see in overviewmap-custom.html to see the custom CSS used
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
		/*    new ol.layer.Tile({
		      source: new ol.source.XYZ({
		        'url':
		          'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg',
		
		      }),
			source:[ new ol.source.OSM({'url':
		          'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',})]
			}), 
			new ol.layer.Tile({
		      source: new ol.source.XYZ({
		        'url':
		          'https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png',
		
		      }),
			}),*/
			new ol.layer.Tile({
				source: new ol.source.XYZ({
					url: 'https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png',
					//url: 'https://sgisapi.kostat.go.kr/tiles/wbmap/L{z}/{y}/{x}.png',
					
					format: new ol.format.GeoJSON
				}),
			})
			  	
		],
  collapseLabel: '\u00BB',
  label: '\u00AB',
  collapsed: false,
});
rotateWithView.addEventListener('change', function () {
  overviewMapControl.setRotateWithView(this.checked);
});


/* 뷰 설정 초기 위치 값 및 지도의 지원 줌레벨 현재 줌레벨 지도의 좌표계설정을 설정  */
let olView = new ol.View({
  //center: ol.proj.transform([127.100616,37.402142], 'EPSG:4326', 'EPSG:3857'),
  center:  [14266500.1385945, 4242489.929359414], 
  zoom: 7,
	minZoom : 1,
	maxZoom : 19,
	projection: newProj,
  //extent: newProjExtent || undefined // 해당 지역을 지도에서 벗어나지 않도록 설정
  //extent : [13678546.51713, 3834188.8033424, 14854453.760059, 5314661.8558898],
})


//마우스좌표 소지하기
var mouseCoordinate_Hover = document.getElementById('mouseCoordinate');
var mouseControlCoordinate = new ol.control.MousePosition({
	 coordinateFormat: new ol.coordinate.createStringXY(4),
	 projection: 'EPSG:3857',
	//좌표계 설정 
	className: 'mousePointer_Coordinate', //css 클래스 이름 
	target: mouseCoordinate_Hover,//좌표를 뿌릴 element 
	undefinedHTML: '&nbsp;'
});
var mousePointer_Coordinate = document.getElementsByClassName(mousePointer_Coordinate);



/* 지도객체 설정 DIV 영역에 지도를 그림  맵생성*/

let map = new ol.Map({
  layers: [wmts2,wmts3,wmts,Satellite,Hybrid], // 타일레이어를 올림
  //layers: [wmts2,sgisapi,Satellite,Hybrid], // 타일레이어를 올림
  //layers: [wmts2,wmts], // 타일레이어를 올림
  target: 'map', //대상이 되는 div 
  view: olView,
  controls: ol.control.defaults().extend(
	  [
		  new ol.control.FullScreen({source:'fullscreen',}),
		  new ol.control.ScaleLine({units: 'metric'}),
		  overviewMapControl,
		  mouseControlCoordinate,
		  new ol.control.LayerPopup({reverse: false})]),
		  
});

// Overlay
var menu = new ol.control.Overlay ({ 
	closeBox : true, 
	className: "slide-left menu", 
	content: $("#menu").get(0)
});
map.addControl(menu);

// A toggle control to show/hide the menu
var t = new ol.control.Toggle(
	{	html: '<i class="fa fa-bars" ></i>',
		className: "menu btn btn-seungjang",
		title: "Menu",
		onToggle: function() { menu.toggle(); }
	});
map.addControl(t);

// Control
var notification = new ol.control.Notification({
});
map.addControl(notification);


var select_B = new ol.interaction.Select({ hitTolerance: 1 });
map.addInteraction(select_B);

//마커팝업창
var div_Popup = document.getElementById('popup');
var div_Popup2 = document.getElementById('popup2');
var distance = document.getElementById('distance');
//var popup_title = document.getElementById('popup-title');
//var div_popup_content = document.getElementById('popup-content');
//var closer = document.getElementById('popup-closer');
var popup = new ol.Overlay({
  element: div_Popup,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -50],
});

map.addOverlay(popup);	
	

/* 폴리곤의 스타일 설정 */
let vectorStyle = function(feature) {
    let style = new ol.style.Style({
	    stroke: new ol.style.Stroke({
	        color: [0, 256, 0, 1],
	        width: 5
	    }),
	    fill: new ol.style.Fill({
	        color: [256, 0, 0, .7]
	    })
    });
    return [style];
}




//대한민국 기준 좌표계는 projection 등록 후 사용 가능

function updateViewProjection(viewProjSelect) {
	  
	let newProj = ol.proj.get(viewProjSelect);
	let newProjExtent, centerc;

	/* EPSG.io 에서 proj4 프로젝션 정보를 받아서 openlayers에 설정 구현
	*/
	$.ajax({
		type: "get",
		url: "https://epsg.io/?format=json&q="+viewProjSelect,
		data : $('#wfsForm').serialize(),
		dataType: 'jsonp',
		async: false,
		jsonpCallback:"parseResponse",
		success: function(data) {	
			let epsg = "EPSG:"+viewProjSelect;
			let epsg_proj4 = data.results[0].proj4;
			if(viewProjSelect==4326){
				//console.log(epsg_proj4);
				//epsg_proj4=epsg_proj4.replace("+no_defs","+axis=neu +no_defs");
			}else if(viewProjSelect==5186||viewProjSelect==5187||viewProjSelect==5188){
				//console.log(epsg_proj4);
				epsg_proj4=epsg_proj4.replace("+no_defs","+axis=neu +no_defs");
				//console.log(epsg_proj4);
				//5186,5187,5188 좌표계의 경우 x,y 순서를 바꿔주는 옵션이 필요함 +axis=neu
			}

			proj4.defs(epsg, epsg_proj4); 
			ol.proj.proj4.register(proj4);
			newProj = ol.proj.get(epsg);
			let fromLonLat = ol.proj.getTransform('EPSG:4326', newProj); //270613.42427841784, 2486372.2503146906
			let extent = ol.extent.applyTransform([112.5, 29.53522956294847, 135, 45.089], fromLonLat);
			newProj.setExtent(extent);
			newProjExtent = newProj.getExtent();
			//centerc = [224578.25,402963.26]
			centerc = ol.proj.transform([127.100616,37.402142], 'EPSG:4326', epsg);

			let olView2 = new ol.View({
				center : centerc,
				//center: ol.proj.transform([127.100616,37.402142], 'EPSG:4326', viewProjSelect),
				//center: ol.extent.getCenter(newProjExtent || [0, 0, 0, 0]),
				projection: newProj,
				extent: newProjExtent || undefined,
				zoom: 7,
					minZoom : 7,
					maxZoom : 19
			})
			map.setView(olView2);
		},//success 종료
		
		error: function(xhr, stat, err) {}
	});
}//updateViewProjection 종료

var vlayerFlag = false;
/* 지도의 클릭이벤트 설정 */
map.on('singleclick', function(evt) {
	let pixel = evt.pixel;
	//v월드레이어 선택시
	map.getLayers().forEach(function(layer){
		if(layer.get("name")=="시군구"){
			vlayerFlag = true;
			let selectlayer = layer.get("id")
			if(selectlayer.indexOf(",") >-1){
				selectlayer = selectlayer.split(",")[0]; //data API는 레이어 1개씩 조회가 가능해서 2개이상이 입력될경우 변경되도록 설정(지적도)
			}
			let min = map.getCoordinateFromPixel([evt.pixel[0] -4,evt.pixel[1]+4])
		    let max = map.getCoordinateFromPixel([evt.pixel[0] +4,evt.pixel[1]-4])
		    let box = min[0]+","+min[1]+","+max[0]+","+max[1]
        	console.log('여기탓음');
			let code = map.getView().getProjection().getCode();
		    
		    /*WFS jsonp 테스트*/
		    
		    $('#wfsForm > [name=BBOX]').val(box);		
		    $('#wfsForm > [name=SRSNAME]').val(code);
		    $.ajax({
		    	type: "get",
		    	url: "https://api.vworld.kr/req/wfs",
		    	data : $('#wfsForm').serialize(),
		    	dataType: 'jsonp',
		    	async: false,
		    	jsonpCallback:"parseResponse",
		    	success: function(data) {
					turl = 'https://api.vworld.kr/req/wfs?'+$('#wfsForm').serialize();
		    	    //$('#wfs_url').html(`<a href="${turl}">${turl}</a>`)
		    	    
		    	    let vectorSource = new ol.source.Vector({features: (new ol.format.GeoJSON()).readFeatures(data)})
		    	    
		    		map.getLayers().forEach(function(ollayer){
		    			if(ollayer.get("name")=="wfs_result"){
		    				map.removeLayer(ollayer);//기존결과 삭제
		    			}
		    		})
				
		    	    let vector_layer = new ol.layer.Vector({
						source: vectorSource,
						style: vectorStyle
		    	  	})
		    	    
		    	    vector_layer.set("name","wfs_result");
		    	 	map.addLayer(vector_layer);
		    	 	
		    	 	let resultFeature = vectorSource.getFeatures()[0]
		    	 	if(typeof resultFeature == "object"){
			        	let wfs_html="";
			        	for(let i in resultFeature.getKeys()){ 
		                  if(resultFeature.getKeys()[i] == "bbox"){
		                    continue;
		                  }
			        		wfs_html += resultFeature.getKeys()[i] + " = "+resultFeature.get(resultFeature.getKeys()[i])+"\n<br>";
			        	}
			                wfs_html += "--------------------------------------<br>";
						        	$('#wfs_result').html(wfs_html);
			                resultArray.push(wfs_html);
						if(cnt >= 0){
							$('#resultP').html(wfs_html);
							cnt = 0;
						}else{
							$('#resultP').append(wfs_html);
							cnt++;
						}
		    	 	}
		    	},
		    	error: function(xhr, stat, err) {}
		    });
		}else{
			vlayerFlag = false;
			
		}





    });

		//자체레이어선택
		if(vlayerFlag = false){
			// v월드레이어가 아니면
			console.log('내부레이어 클릭');
			// 마커선택부분
			var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
				return feature;
			});
			if (feature) {
				var coordinates = feature.getGeometry().getCoordinates();
				popup.setPosition(coordinates);
				$(div_Popup).popover({
				placement: 'top',
				html: true,
				content: feature.get('name'),  //name으로 먹인 값들 가져옴
				});
				$(div_Popup).popover('show');
			} else {
				$(div_Popup).popover('dispose');
			}
			/*
			[
				text/plain, 
				application/vnd.ogc.gml, 
				text/xml, 
				application/vnd.ogc.gml/3.1.1, 
				text/xml; 
				subtype=gml/3.1.1, 
				text/html, 
				application/json
			] 이렇게 INFO_FORMAT 지원한다.
			*/
					//etc 레이어클릭시 
			var viewResolution = olView.getResolution();
			var clickFeatures = test_cccc.getSource().getFeatureInfoUrl(
				evt['coordinate'], viewResolution, 'EPSG:3857',
				{ 'INFO_FORMAT': 'application/json' }
			);
			if (clickFeatures) {
				console.log(clickFeatures);
				$.ajax({
					type: "GET", 
					url : clickFeatures,
					//data : '',
					cache:false,
					//dataType:'json',
					success : function(result){
						var resultInner = `<table><tbody><td>${result}</td></tbody></table>`;
						
						console.log(result.features.properties);
						
						$('#resultP').html(resultInner);
					},		
				});
			}		
		}else{
			//레이어 갯수만큼 돈다. 
			//console.log('뭐지왜안타');
		}





 }); // 지도 클릭이벤트 설정 종료

//v월드 레이어 선택부분
$(function(){
	$(document).on('change','#select_wms',function(){
		let this_val = $(this).val();
		//console.log($(this).find("option[value='" + $(this).val() + "']").text()); 선택된 옵션의 text
		let this_layer = $(this).find("option[value='" + $(this).val() + "']").text();
		let this_title = $(this).prev().text();
		$('[name=TYPENAME]').val(this_val.toLowerCase());
		//선택시 레이어 삭제
		map.getLayers().forEach(function(layer){
			 if(layer.get("name")==this_layer){
			 	map.removeLayer(layer);//기존결과 삭제
			 }
		})
		let code = map.getView().getProjection().getCode();
		
		let layer_tile = new ol.layer.Tile({
	        //title:  'v월드',//this_title,
	        id: this_val,
	        //name: 'wms_theme', //vmap 올린 레이어를 삭제하거나 수정,변경할때 접근할 name 속성
	        projection: code,
	        extent: map.getView().getProjection().getExtent(), //[-20037508.34, -20037508.34, 20037508.34, 20037508.34]
	        //maxZoom: 21,
	        //minZoom: 10,
	        tilePixelRatio: 1,
	        tileSize: [512, 512],

	        source: new ol.source.TileWMS({
	            //url: "https://api.vworld.kr/req/wms?",
				url: "https://api.vworld.kr/req/wms?",
	            params: {
	                LAYERS: this_val.toLowerCase(),
	                STYLES: this_val.toLowerCase(),
	                CRS: code,
	                apikey: "C4C4FE9D-271A-3D7D-9DBE-BF7030912E04",
	                //DOMAIN:"http://seongjang.com",
	                //title: this_title,
					//title: 'v월드',
	                FORMAT: "image/png",
	                WIDTH:512,
	                HEIGHT:512
	            },
				//name:this_val,
		
		    })
		});
    
		layer_tile.setZIndex(5);
		layer_tile.set("name",this_layer);
		map.addLayer(layer_tile);
		let imgSrc = "https://api.vworld.kr/req/image?key=52AED5A5-5D49-35C0-97A4-AC567AA055F7&service=image&request=GetLegendGraphic&format=png&type=ALL&layer="+this_val+"&style="+this_val
		$('#wms_image').html("<img src='"+imgSrc+"' alt ='"+this_title+"의 범례이미지' >");
		//wms_imageTest.innerHTML +=  "<img src='"+imgSrc+"' alt ='"+this_title+"의 범례이미지' >";
		
	});//'change'
})

// 마우스 이동완료시
map.on('moveend', function (evt) {
  var zoomInfo = Math.round(map.getView().getZoom())/1;
 	$('#info').html('<i class="fas fa-search-location"></i><span>줌상태 : '+ zoomInfo +'<span>');
	//팝업창 가리기
	//$(div_Popup).popover('dispose');
	//$(div_Popup2).popover('dispose');
});


//검색창 산업분류검색
$('input[name=ind_code]').on('keypress keyup keydown',function(){
	$('#dropList').addClass('show');
	var ksic_no = $('input[name=ind_code]').val();
	var people = [];
	if(ksic_no == ""){
		$('#dropList').removeClass('show');
	}else{
		if(isNaN(ksic_no)){
			//문자일경우
			if(ksic_no != null && ksic_no !== ""){
					$.ajax({
						type: "POST", 
						url : "/location/ksic_keyword",
						data : ({ ksic_kw : ksic_no }),
						dataType : "json",
						success : function(result){
							var htmlInner = "";
							for(var i = 0; i < result.length; i++){
								htmlInner += "<a class='dropdown-item' value = '"+result[i].ksic_no+"'href = 'javascript:pointMarker_("+result[i].ksic_no+")'>"+result[i].ksic_no+" : "+result[i].ksic_nm+"</a>";
							}
							$('#dropList').html(htmlInner);
						},		
					});						
			}
		}else{
			//숫자일경우
					$.ajax({
						type: "POST", 
						url : "/location/ksic",
						data : ({ ksic_no : ksic_no }),
						dataType : "json",
						success : function(result){
							var htmlInner = "";
							for(var i = 0; i < result.length; i++){
								htmlInner += "<a class='dropdown-item' value = '"+result[i].ksic_no+"'href = 'javascript:pointMarker_("+result[i].ksic_no+")'>"+result[i].ksic_no+" : "+result[i].ksic_nm+"</a>";
							}
							$('#dropList').html(htmlInner);
						},		
					});
	
		}
	}
	
});		
		
$('.dropdown-item').on('click',function(){
	$('input[name=ind_code]').val(this.value);
});
		

//var Feature_info = document.getElementById('building_info');
var Feature_cnt = document.getElementById('Feature_cnt');
var general_factory_info_flag = '';
var features_flag_gis ="";
var features_flag_danji ="";
var innercontent = 'NaN상태';
var test22;
//마커 표제부정보
function showInfo(event, evt) {
	  var features = map.getFeaturesAtPixel(event.pixel);//Features 값은들어있다.
	  
	  var contentInnerHtml = ''; //content 축척
	  if (features.length == 0) {
		//표제부 hover 끝나면 없어질껀가 놔둘껀가
	    //Feature_info.innerText = '';
	    //Feature_info.style.opacity = 0;
		//$(div_Popup).popover('dispose');
	    return;
	  }
			// 마커선택부분
			var feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
			  return feature;
			});
			//console.log(feature);		
			var coordinates = feature.getGeometry().getCoordinates();
			
		
			if (feature.get('name') && features[0].values_ != null) {//마커
			OverlayMaker_(feature.get('name'));
				for(var i = 0; i < features.length ; i++){
					if(features[i].values_.DAN_ID != "" && features[i].values_.DAN_ID != undefined){
						contentInnerHtml ='단지코드 : ' + features[i].values_.DAN_ID + "<br> 단지이름 : " + features[i].values_.DAN_NAME + "<br> 단지타입 : " +features[i].values_.DANJI_TYPE + ' '+ "<br>"+feature.get('name'); 
						OverlayMaker_(contentInnerHtml);
						console.log("브레이크됌");
						break;
					}
				}
			}
			if (features[0].values_) {//geoserver 레이어 마우스Hover시 //산업단지레이어
					if(features[0].values_.dan_id){
						features[0].values_.DAN_ID = features[0].values_.dan_id;
						features[0].values_.DAN_NAME = features[0].values_.dan_name;
						features[0].values_.DANJI_TYPE = features[0].values_.danji_type;
					}//postGIS에서는 소문자로 날라온다.
					if((features[0].values_.DAN_ID) && features[0].values_.DAN_ID != features_flag_danji){
						if((features[0].values_.DAN_ID) != features_flag_danji){						
							features_flag_danji = features[0].values_.DAN_ID;
							innercontent = '단지코드 : ' + features[0].values_.DAN_ID + "<br> 단지이름 : " + features[0].values_.DAN_NAME + "<br> 단지타입 : " +features[0].values_.DANJI_TYPE + ' ';
								 $.ajax({
							          url:'/location/danji_Limit',
							          data:  {danji_code : features[0].values_.DAN_ID},
									  //dataType:'json',
							          type:'post',
									  cache:false,					
							          success:function(data){
											$('#danji_info').html(data);
											//console.log("3");
							      	  },
									error: function(xhr, stat, err) {},
									complete:function(){},
								  });
							 var option = {
								height: "100%",
								//pdfOpenParams: {view: 'FitV', page: '2'}
							}



							try {
								PDFObject.embed("/resources/sandan/"+features[0].values_.DAN_ID+"/"+features[0].values_.DAN_ID+"_1.pdf", "#myPdf",option);
							} catch (error) {
								console.log(error);
								PDFObject.embed("/resources/sandan/"+features[0].values_.DAN_ID+"/"+features[0].values_.DAN_ID+"_1.hwp", "#myPdf",option);
							}
								  
						}
					}

					//화성 건축물대장 안쓴다.
					/*  */
					if(features[0].values_.A19){
						if(features[0].values_.A19 != features_flag_gis){
							features_flag_gis = features[0].values_.A19;
							innercontent = '건축물ID : '+features[0].values_.A19+'<br>주소 : '+ features[0].values_.A4 + ' ' + features[0].values_.A5 + ' <br> ' + features[0].values_.A9;
							$.ajax({
								url:'/location/building_info',
								data:  {
									mgmBldrgstPk : features[0].values_.A19,
									sigunguCd : '41590'
								},
								//dataType:'json',
								type:'post',
								cache:false,					
								success:function(data){
									  $('#building_info').html(data);
									  
								  },
							  error: function(xhr, stat, err) {},
							  complete:function(){},
							});
							/*
							$.ajax({
								url:'/location/building_info',
								data:  {
									mgmBldrgstPk : features[0].values_.A19,
									sigunguCd : '28200'
								},
								//dataType:'json',
								type:'post',
								cache:false,					
								success:function(data){
									  $('#building_info_incheon').html(data);
									  
								  },
							  error: function(xhr, stat, err) {},
							  complete:function(){},
							});				
							*/			
						}			

					}else if(features[0].values_.A19 = ''){ //etc 
						features_flag_gis = features[0].values_.A19;
						innercontent = '건축물ID : '+features[0].values_.A19+' Null <br>주소 : '+ features[0].values_.A4 + ' ' + features[0].values_.A5 + ' <br> ' + features[0].values_.A9;
					}

					//console.log(innercontent);
					OverlayMaker_(innercontent);
			  		//$(div_Popup).popover('show');
			}else {
			  $(div_Popup).popover('dispose');
			}		
		
		//표제부로딩 안쓴다.

		/* 
		var properties = features[0].getProperties();
		
		if(properties != undefined && properties != null && properties.content != undefined){
				Feature_info.style.opacity = 1;
				Feature_cnt.innerText =  features.length; 
				Feature_cnt.style.opacity = 1;
				var general_factory_info = properties.content.element;
				if(general_factory_info != general_factory_info_flag){
					if(features.length > 1){
						//겹친게 1보다크면 총괄표제부로 
						//console.log('1개이상');
						 $.ajax({
					          url:'/location/general_title_info',
					          data:  general_factory_info,
							  //dataType:'json',
					          type:'post',
							  cache:false,					
					          success:function(data){
								$('#Feature_info').html(data);
		
								general_factory_info_flag = general_factory_info;
					      	  },
							error: function(xhr, stat, err) {}
						  });
					}else{
						 $.ajax({
					          url:'/location/general_info',
					          data:  general_factory_info,
							  //dataType:'json',
					          type:'post',
							  cache:false,					
					          success:function(data){
								$('#Feature_info').html(data);
		
								general_factory_info_flag = general_factory_info;
					      	  },
							error: function(xhr, stat, err) {}
						  });
					}
			}
		}
		*/

		
//PDF파일 로딩


}




$(document).on('keydown',function(){
	if(event.keyCode == 13){
		pointMarker_($('input[name=ind_code]').val());	
		$('#dropList').removeClass('show');
	}
	if(event.keyCode == 27){
		 
	}
});

 $(document).ready(function(){
	//map.getView().setCenter([14138885.7929,4508222.2418])
	//map.getView().setZoom(19);
	sgis_authkey();

		//v월드 레이어 호출
		$.ajax({
			type: "POST", 
			url : "/location/layerList",
			data : '',
			success : function(result){
				$('#vLayerList').append(result);//v월드 레이어 테이블 추가
			},		
		});	
	//Select_PolyGon('DAN');
	map.addLayer(DAN);
	map.addLayer(YUCH);
	factory_layers('factory','공장');
	rest_layers('rest','주거시설');
	openapiTest('test','용도별건물정보서비스');
	
	
		$('#navbar-brand').click(function(){
			var tab_id = $(this).attr('data-tab');
	
			$('#navSelect .navbar-brand li').removeClass('current');
			$('.tab-content').removeClass('current');
	
			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		});
 });
let coord = [];

map.on('pointermove', showInfo);

var hasFeature = false;
map.on('pointermove', function (evt) {
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        var coordinate = evt.coordinate;
        popup.setPosition(coordinate);
        hasFeature = true;
		//console.log(feature);
    });
    if (!hasFeature) {
        popup.setPosition(undefined);
    }
});

//그냥클릭
map.on('click', function (evt) {

    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
            return feature;
        });
        
    if (feature) {
        //alert(feature.get('name'));
		console.log(feature.values_);
	}
	
	var p_5179 = proj4('EPSG:3857','EPSG:5179',[evt.coordinate[0],evt.coordinate[1]]);
	var p_5174 = proj4('EPSG:3857','EPSG:5174',[evt.coordinate[0],evt.coordinate[1]]);
	var p_5181 = proj4('EPSG:3857','EPSG:5181',[evt.coordinate[0],evt.coordinate[1]]);
	Dist_Info(p_5174[0],p_5174[1],p_5179);
	console.log('5179 : ' + p_5179);
	console.log('5174 : ' + p_5174);
	console.log('5181 : ' + p_5181);
	


});
//팝업창
function OverlayMaker_(InnerHtml){
		  $(div_Popup).popover({
		    placement: 'top',
		    html: true,
		    content: InnerHtml,  //name으로 먹인 값들 가져옴
		  });
		  $(div_Popup).popover('show');
}
// 레이어 제거
function layerRemover(getName){
	map.getLayers().forEach(function(ollayer){
		if(ollayer.get("name")==getName){
			map.removeLayer(ollayer);//기존결과 삭제
		}
	})
}


/*  swipe 조절 */
function modeSW(dom){
    $(dom).toggleClass("on");
    return $(dom).hasClass("on")? swipeOn() : swipeOff();
}

var ctrl;

function swipeOn(){
    // Control
    ctrl = new ol.control.Swipe();
    map.addControl(ctrl);
    // Set stamen on left
    ctrl.addLayer(Satellite);
    // OSM on right
    ctrl.addLayer(wmts,true);
}

function swipeOff(){
    var i;
    var l;
    if (ctrl.getMap()) {
        for (i=0; i<ctrl.layers.length; i++) {
            l = ctrl.layers[i];
            if (l.right) l.layer.un(['precompose','prerender'], ctrl.precomposeRight_);
    else l.layer.un(['precompose','prerender'], ctrl.precomposeLeft_);
            l.layer.un(['postcompose','postrender'], ctrl.postcompose_);
        }
        ctrl.getMap().renderSync();
    }
    ol.control.Control.prototype.setMap.call(ctrl, map);

    //map에 쌓여있는 swipe-control 삭제
    for(var j = 0 ; j < map.controls.array_.length ; j++){
        var check = $(map.controls.array_[j].element);
        if(check.hasClass("ol-swipe")){
            map.removeControl(map.controls.array_[j]);
        }
    }

    //레이어 및 제어 버튼 제거
    $('div').remove(".ol-swipe");
}


function Dist_Info(loc_x, loc_y,p_5179){
	//newsInput();
	var param = {
		'loc_x' : loc_x, 
		'loc_y' : loc_y,
	}

	Reverse_GeoCodding(p_5179[0],p_5179[1],"10");
	//building_info();

	$.ajax({
		type: "POST", 
		url : "/location/dist_Info",
		data : param,
		success : function(result){
			console.log(result);
			if(result[0].a2 != '' || result[0].a2 != null || result[0].a2 != undefined){
				var InnerResult = '';
				for(var i = 0; i < result.length; i ++){
					InnerResult += result[i].a2 + '<br>';
				}
				//notification.show('[ ' + InnerResult + ' ]에 해당 됩니다.');
				$('#dist_info').html(InnerResult);
				
				console.log('여기탐');
			}else {
				//notification.show('미확인 지역입니다.');
			}
			
		
		},		
	});	


}

var test11 = '';
function newsInput(){

	$.ajax({
		type: "GET", 
		url : "/common/nhn/news",
		//data : param,
		//dataType:'json',
		success : function(result){
			test11 = result;
			console.log("찍혀라!!");
			console.log(result);
			$('#NHN_News').html(result);
		
		},		
	});	
}

function sgis_authkey(){
	var cunsumer_key = "c8fa0b47181b4c48897f";
	var consumer_secret = "5172bd52d4d7465ba144";
	var param = {
		"consumer_key" : cunsumer_key,
		"consumer_secret" : consumer_secret,
	}
	
	
	$.ajax({
		type: "GET", 
		//url : "/location/Reverse_GeoCodding",
		url : "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
		data : param,
		dataType:'json',
		success : function(getResult){
			console.log(getResult);
			$("input[name=SGIS_AccessToken]").val(getResult.result.accessToken);
			

		},		
	});	
	
}

function Reverse_GeoCodding(loc_x, loc_y, addr_type){
	console.log(loc_x);
	console.log(loc_y);
	
	var address = [];
	//도로명주소
	var param = {
		"x_coor":loc_x,
		"y_coor":loc_y,
		"addr_type":addr_type,
		"accessToken" :	$("input[name=SGIS_AccessToken]").val()
	}
	var param2 = {
		"x_coor":loc_x,
		"y_coor":loc_y,
		"addr_type":"21",
		"accessToken" :	$("input[name=SGIS_AccessToken]").val()
	}


	geocode_promise_function(param)
	.then(geocode_promise_function(param2))
	//.then(building_info);


	notification.show([$("input[name=road_address]").val() +"  "+ $("input[name=bunji_address]").val()]);



	/*
	$.ajax({
		type: "GET", 
		//url : "/location/Reverse_GeoCodding",
		url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json",
		data : param,
		dataType:'json',
		success : function(result){
			$("input[name=road_address]").val(result.result[0].full_addr);
			console.log(result);
			address.push(result.result[0].full_addr);
		},		
	}).then();	

	//지번주소
	$.ajax({
		type: "GET", 
		//url : "/location/Reverse_GeoCodding",
		url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json",
		data : param2,
		dataType:'json',
		success : function(result){
			$("input[name=bunji_address]").val(result.result[0].full_addr);
			console.log(result);
			//alert(result.result[0].full_addr + "찍혀네잉?");
			
			address.push(result.result[0].full_addr);
			console.log(address);
			notification.show(address);
		}
		
	});	
	*/
	
}



function GeoCodding(){

}



function building_info(param){
	if(param){
		console.log(param);
		$.ajax({
			url:'/location/building_info',
			data: param.properties,
			//dataType:'json',
			type:'POST',
			cache:false,					
			success:function(data){
				console.log("건축물대장 조회 성공");
				  $('#building_info').html(data);
				  
			  },
		  error: function(xhr, stat, err) {},
		  complete:function(){},
		});
	}else{
		$.ajax({
			url:'/location/building_info',
			data:  {
				platPlc : $("input[name=bunji_address]").val(),
				newPlatPlc : $("input[name=road_address]").val(),
			},
			//dataType:'json',
			type:'POST',
			cache:false,					
			success:function(data){
				console.log("건축물대장 조회 성공");
				  $('#building_info').html(data);
				  
			  },
		  error: function(xhr, stat, err) {},
		  complete:function(){},
		});
	}
	
}

function geocode_promise_function(param){
    return new Promise(function(resolve, reject){
      $.ajax({
		type: "GET", 
		//url : "/location/Reverse_GeoCodding",
		url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/rgeocode.json",
		data : param,
		dataType:'json',
		success : function(result){
			if(result.result[0].emdong_nm){
				$("input[name=bunji_address]").val(result.result[0].full_addr);	
				
			}else{
				$("input[name=road_address]").val(result.result[0].full_addr);
				
			}
		}
      }); 
    });
  }



 

 
 map.on('singleclick', function(evt) {
	document.getElementById('resultP').innerHTML = "Loading... please wait...";
	var view = map.getView();
	var viewResolution = view.getResolution();
	var source = untiled.get('visible') ? untiled.getSource() : tiled.getSource();
	var url = source.getFeatureInfoUrl(
	  evt.coordinate, viewResolution, view.getProjection(),
	  {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
	if (url) {
		building_info(url);
	  document.getElementById('resultP').innerHTML = '<a href="' + url + '"  target="_blank">선택된레이어 링크</a>';
	}
  });

  var untiled = new ol.layer.Tile({	
	source: new ol.source.TileWMS({
	 url: GeoAddr+'/geoserver/seongjang/wms',
	 params:{
		 'STYLES':'factory',
		 'LAYERS':'seongjang:factory',
	 },
	 serverType:'geoserver',
	 format: new ol.format.GeoJSON(),
	 crossOrigin: 'anonymous',
   }),
	 minResolution: 0,
	 maxResolution: 11,
	 visible: false,
 });

 var tiled = new ol.layer.Tile({
	visible: false,
	source: new ol.source.TileWMS({
	  url: GeoAddr+'/geoserver/seongjang/wms',
	  params: {'FORMAT': 'image/png', 
			   'VERSION': '1.1.1',
			   tiled: true,
			"STYLES": '',
			"LAYERS": 'seongjang:factory',
			"exceptions": 'application/vnd.ogc.se_inimage',
		 tilesOrigin: 144867.10400000028 + "," + 177240.19730000012
	  }
	})
  });