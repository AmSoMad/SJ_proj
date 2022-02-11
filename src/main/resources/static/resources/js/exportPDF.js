		/*  PDF 저장부분 */
		var dims = {
		  a0: [1189, 841],
		  a1: [841, 594],
		  a2: [594, 420],
		  a3: [420, 297],
		  a4: [297, 210],
		  a5: [210, 148],
		};
		
		var exportButton = document.getElementById('export-pdf');
		
		exportButton.addEventListener(
		  'click',
		  function () {
		    exportButton.disabled = true;
		    document.body.style.cursor = 'progress';
		
		    var format = "a4";
		    var resolution = "300";
		    var dim = dims[format];
		    var width = Math.round((dim[0] * resolution) / 25.4);
		    var height = Math.round((dim[1] * resolution) / 25.4);
		    var size = map.getSize();
		    var viewResolution = map.getView().getResolution();
		
		    map.once('rendercomplete', function () {
		      var mapCanvas = document.createElement('canvas');
			  mapCanvas.crossOrigin = 'Anonymous';
		      mapCanvas.width = width;
		      mapCanvas.height = height;
		      var mapContext = mapCanvas.getContext('2d');
		      Array.prototype.forEach.call(
		        document.querySelectorAll('.ol-layer canvas'),
		        function (canvas) {
		          if (canvas.width > 0) {
		            var opacity = canvas.parentNode.style.opacity;
		            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
		            var transform = canvas.style.transform;
		            // Get the transform parameters from the style's transform matrix
		            var matrix = transform
		              .match(/^matrix\(([^\(]*)\)$/)[1]
		              .split(',')
		              .map(Number);
		            // Apply the transform to the export map context
		            CanvasRenderingContext2D.prototype.setTransform.apply(
		              mapContext,
		              matrix
		            );
		            mapContext.drawImage(canvas, 0, 0);
		          }
		        }
		      );
		      var pdf = new jspdf.jsPDF('landscape', undefined, format);
				console.log(mapCanvas);
		      pdf.addImage(
		        mapCanvas.toDataURL('image/jpeg'),
		        'JPEG',
		        0,
		        0,
		        dim[0],
		        dim[1]
		      );
		      pdf.save('map.pdf');
		      // Reset original map size
		      map.setSize(size);
		      map.getView().setResolution(viewResolution);
		      exportButton.disabled = false;
		      document.body.style.cursor = 'auto';
		    });
		
		    // Set print size
		    var printSize = [width, height];
		    map.setSize(printSize);
		    var scaling = Math.min(width / size[0], height / size[1]);
		    map.getView().setResolution(viewResolution / scaling);
		  },
		  false
		);
