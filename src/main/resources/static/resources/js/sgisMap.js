var sgisProj = ol.proj.get('EPSG:5179');  // sgis 지도좌표계
let sgisProjExtent = sgisProj.getExtent(); // sigs 지도의 범위
var sgisResolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.025];
var sgisExtent      = [-200000, -28024123.62, 31824123.62, 4000000];
var sgisProjection = new ol.proj.Projection({
    code: 'EPSG:5179',
    extent: sgisExtent,
    //units: 'm'
});

var SgisTileLayer = new ol.layer.Tile({
    title : 'Sgis Street Map',
    visible : true,
    type : 'base',
    source : new ol.source.XYZ({
        projection: sgisProjection,
        tileSize: 256,
        minZoom: 0,
        maxZoom: sgisResolutions.length - 1,
        tileGrid: new ol.tilegrid.TileGrid({
            extent: sgisExtent,
            origin: [sgisExtent[0], sgisExtent[1]],
            resolutions: sgisResolutions
        }),
        tileUrlFunction: function (tileCoord, pixelRatio, projection) {
            if (tileCoord == null) return undefined;
            console.log(tileCoord);
            
            //var s = Math.floor(Math.random() * 3) + 1;  // 1 ~ 4
            // var z = tileCoord[0] + 1;
            // var x = tileCoord[1];
            // var y = tileCoord[2];

            var z = fillZero(tileCoord[0].toString(10),2);
            var x ='C'+fillZero(tileCoord[1].toString(16),8);
            var y = 'R'+fillZero((tileCoord[2]+109).toString(16),8);
            
            return 'https://sgisapi.kostat.go.kr/tiles/bmap4/L' + z + '/' + y + '/' + x + '.png';
        },
        // attributions: [
        //     new ol.Attribution({ 
        //         html: ['<a href="http://map.naver.com"><img src="http://static.naver.net/maps2/logo_naver_s.png"></a>']
        //     })
        // ]
    })
});

let sgisapi = new ol.layer.Tile({
	source: new ol.source.XYZ({
        //url: 'https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png',
		format: sgisProj,
        //projection: "EPSG:5179",
        //extends:[],
        tileUrlFunction: function (coordinate) {
            console.log(coordinate);
            
            // if (coordinate == null) {
            //     return "";
            // }
            
            var z = fillZero(coordinate[0].toString(10)-6,2);

            var x ='C'+fillZero(coordinate[1].toString(16)-69,8);
            var y = 'R'+fillZero(coordinate[2].toString(16)-30,8);
            return 'https://sgisapi.kostat.go.kr/tiles/bmap4/L' + z + '/' + y + '/' + x + '.png';
        },
	}),
      minResolution: 5,	
      maxResolution: 1400,
     
});

function fillZero(strB, strLen){
    return '00000000'.substr(0, strLen - (strB + '').length) + strB;
}

function createNomalTileLayer() {
				
    var url = "https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png";
    var options = {
            errorTileUrl: 'https://sgisapi.kostat.go.kr/tiles/missing.png',
            maxZoom: 13,
            minZoom: 0,
            zoomReverse: true,
            continuousWorld: false,
            tms: true
    };
    var layer = new sop.TileLayer(url, options);
    
    layer.fillZero = function (strB, strLen) {
        return '00000000'.substr(0, strLen - (strB + '').length) + strB;
    }
    
    layer.getTileUrl =  function (coords) {
        var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;
        return sop.Util.template(this._url, sop.extend({
            x: 'C' + this.fillZero(coords.x.toString(16), 8),
            y: 'R' + this.fillZero(y.toString(16), 8),
            z: this.fillZero(this._getZoomForUrl().toString(10), 2)
        }, this.options));
    }
    return layer;
}
var ttttt = createNomalTileLayer();

var testLayer = new ol.layer.Tile({
    source : new ol.source.TileWMS({
        url:"https:sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png"
    })
})

/**
 * 통계타일레이어 정의.
 *
 * @class
 * @augments sop.TileLayer
 * @param {String} url 타일 URL
 * @param {Object} options TileLayer Options
 */
