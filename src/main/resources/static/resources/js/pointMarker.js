		/*마커등록부분*/
var stroke = new ol.style.Stroke({color: 'black', width: 2,height:2,opacity:1});
var fillNo = 0;
var inputFillNo = 0;

var fillColor =[
'rgba(255, 0, 128, 1)',
'rgba(0, 236, 45, 1)',
'rgba(253, 203, 186, 1)',
'rgba(58, 65, 111, 1)',
'rgba(251, 207, 51, 1)',
'rgba(74, 23, 123, 1)',
'rgba(254, 228, 218, 1)',
'rgba(33, 212, 203, 1)',
'rgba(171, 37, 76, 1)',
'rgba(31, 141, 106, 1)'
];

var currentResolution;


function pointMarker_(geometry_point){
	$('input[name=ind_code]').val(geometry_point);
	var fill = new ol.style.Fill({color: fillColor[fillNo]});
	/*
	var styles = new ol.style.Style({//마커스타일
	      image: new ol.style.RegularShape({
	      fill: fill,
	      stroke: stroke,
	      points: 5,
	      radius: 5,
		     radius1: 5,
	      radius2: 5,
	      angle: 0,
	      }),
	});	
	*/
	var styles = SetstyleSymbol();
	var param = {
		ind_code : geometry_point,
		fac_addr : $('input[name=div_code]').val()
	};
	var iconFeature_sum = [];
	var ksic_input = "";
	if($('input[name=ind_code]').val() != null && $('input[name=ind_code]').val() != "" && Number($('input[name=ind_code]').val() > 100)) {	
	 $.ajax({
          url:'/location/makerlist',
          data: param,
		  //dataType:'json',
          type:'get',
		  cache:false,					
          success:function(data){
					$.ajax({
						type: "POST", 
						url : "/location/ksic",
						data : ({ ksic_no : $('input[name=ind_code]').val() }),
						dataType : "json",
						success : function(result){
							console.log(result);
							ksic_input = result[0].ksic_no + " : "+ result[0].ksic_nm + ' 총 '+ data_size +' 개';
							console.log(ksic_input);
							$('#addFeatureName0'+(inputFillNo)).val(ksic_input);
							if(inputFillNo ==5){
								inputFillNo = 0;
							}else{
								inputFillNo++;	
							}
							
						},		
					});			
			var data_size = data.length;
			console.log(data);

			alert("검색하신 업종은 "+$('input[name=ind_code]').val()+" 입니다."+"등록공장 갯수는 ??????"+" 총 등록된 건축물대장의 수는 "+data_size+" 개 입니다.",'제목이지롱','눌러봐');

			for(const element of data){
				var iconFeature = new ol.Feature({
				    geometry:new ol.geom.Point([Number(element.loc_x),Number(element.loc_y)]),
				    name:"<br>"+element.comp_nm + ' ' + element.int_nm+"<br>"+element.ind_code,
					content:{element},
				    population:4000,
				    rainfall:500,
				});
				//iconFeature.setStyle(styles);
				iconFeature.setStyle(styles);
				iconFeature_sum.push(iconFeature);
			}
				
				var vectorSource = new ol.source.Vector({
				  features: iconFeature_sum,
				});
				var vectorLayer = new ol.layer.Vector({
				  source: vectorSource,
				});

				$('#dropList').removeClass('show');

				map.addLayer(vectorLayer);
				
				
				
				
				if(fillNo == 5){
					fillNo = 0;
				}else{
					fillNo++;					
				}
          },
 		 error: function(request,status,error){
     	 console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error.toString());
     	 }
      });
	}else if($('input[name=div_code]').val() != null && $('input[name=ind_code]').val() == ""){
		$.ajax({
			url:'/location/makerlist',
			data: param,
			//dataType:'json',
			type:'get',
			cache:false,					
			success:function(data){
				var data_size = data.length;
				console.log(data);
				//$('#alert_msg').innerhtml = '검색하신 업종은'+$('input[name=ind_code]').val()+" 입니다. 총 등록된 건축물대장의 수는 "+data_size+" 개 입니다.";
				//$('.alert alert-warning').show();
				alert($('input[name=div_code]').val()+"의 전체 등록된 공장수는 "+data_size+" 개 입니다.");
	
				for(const element of data){
					var iconFeature = new ol.Feature({
						geometry:new ol.geom.Point([Number(element.loc_x),Number(element.loc_y)]),
						name:"<br>"+element.comp_nm + ' ' + element.int_nm+"<br>"+element.ind_code,
						content:{element},
						population:4000,
						rainfall:500,
					});
					iconFeature.setStyle(styles);
					iconFeature_sum.push(iconFeature);
				}
					
					var vectorSource = new ol.source.Vector({
					  features: iconFeature_sum,
					});
					var vectorLayer = new ol.layer.Vector({
					  source: vectorSource,
					});

					$('#dropList').removeClass('show');

					map.addLayer(vectorLayer);
					$('#addFeatureName0'+(inputFillNo)).val($('input[name=div_code]').val()+" 총 " +data_size + " 개");
					if(inputFillNo ==9){
						inputFillNo = 0;
					}else{
						inputFillNo++;	
					}
					
					
					
					if(fillNo == 9){
						fillNo = 0;
					}else{
						fillNo++;					
					}
			}
		});
	}else if($('input[name=div_code]').val() != null && $('input[name=ind_code]').val() != "" && $('input[name=ind_code]').val() < 100){//100보다 작은 분류 조회
		
		$.ajax({
			url:'/location/makerlist',
			data: param,
			//dataType:'json',
			type:'get',
			cache:false,					
			success:function(data){
				var data_size = data.length;
				console.log(data);
				//alert($('input[name=div_code]').val()+"의 전체 등록된 공장수는 "+data_size+" 개 입니다.");
	
				for(const element of data){
					var iconFeature = new ol.Feature({
						geometry:new ol.geom.Point([Number(element.loc_x),Number(element.loc_y)]),
						name:"<br>"+element.comp_nm + ' ' + element.int_nm+"<br>"+element.ind_code,
						content:{element},
						population:4000,
						rainfall:500,
						uniforms:"asdasd"
					});
					iconFeature.setStyle(st);
					iconFeature_sum.push(iconFeature);
				}
					var vectorSource = new ol.source.Vector({
					  features: iconFeature_sum,
					});
					var vectorLayer = new ol.layer.Vector({
						source: vectorSource,
					  });
					//테스트 및 묶음부분
					/*
					var vectorLayer2 = new ol.layer.Vector({
						  source: new ol.source.Cluster({
							distance : 10,
							source : vectorSource
						}),
						style: styleFunction,
					});						
					vectorLayer2.set("name","addFeature"+fillNo);
					*/
					$('#dropList').removeClass('show');
					//map.addLayer(raster);
					//map.addLayer(vectorLayer2);
					map.addLayer(vectorLayer);
					$('#addFeatureName0'+(inputFillNo)).val($('input[name=div_code]').val()+" "+$('input[name=ind_code]').val()+ " 총 " +data_size + " 개");
					if(inputFillNo ==9){
						inputFillNo = 0;
					}else{
						inputFillNo++;	
					}

					if(fillNo == 9){
						fillNo = 0;
					}else{
						fillNo++;					
					}
			}
		});
		
		// $('#dropList').removeClass('show');

		alert("검색한 업종코드 "+$('input[name=ind_code]').val()+" 가 가능한 산단을 찾습니다.");
		
	}else{
		alert("세분류 이상부터 검색가능합니다. (ex 101)");
	}
	//다끝나고 
	Select_PolyGon("custom_danji");
	layerRemover('DAN');
	
}

//alert 알림창 함수
//window.alert = alert2;

function alert2(message, title, buttonText) {

    buttonText = (buttonText == undefined) ? "Ok" : buttonText;
    title = (title == undefined) ? "The page says:" : title;

    var div = $('.alert alert-warning');
    div.html(message);
    div.dialog({
        autoOpen: true,
        modal: true,
        draggable: false,
        resizable: false,
        buttons: [{
            text: buttonText,
            click: function () {
                $(this).dialog("close");
                div.remove();
            }
        }]
    });
}