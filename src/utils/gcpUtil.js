/*global Uint8Array */

var GCPUtil = (function() {
  
  const detectPlates = (buffer, imageUrl) => {
	  const apiKey = 'TODO';
	  const url = 'https://vision.googleapis.com/v1/images:annotate?key=' + apiKey;
		
  	return new Promise(
		function (resolve, reject) {
	        // TEXT_DETECTION or DOCUMENT_TEXT_DETECTION
			var bodyImageUrl = JSON.stringify({"requests":[{  "image":{    "source":{"imageUri":imageUrl}}  ,  "features": [{"type":"TEXT_DETECTION","maxResults":5}]    } ]});
	        var bodyBuffer = JSON.stringify({"requests":[{  "image":{    "content":"BUFFER"},  "features": [{"type":"TEXT_DETECTION","maxResults":5}]    } ]})
								.replace("BUFFER", buffer);
			
			var body = bodyBuffer;
			if (buffer == undefined)
				body = bodyImageUrl;
			
	        var xhttp = new XMLHttpRequest();
	        xhttp.onload = 
				function() {
					//console.log(xhttp.responseText);
					var detectedText = undefined;
					var data = JSON.parse(xhttp.responseText);
					console.log(data);
					data.responses.forEach(response => {
						response.textAnnotations.forEach(textAnnotation => {
							var text = textAnnotation.description;
							console.log(text);
							text = text.replace(new RegExp('[' + '\\n' + ']', 'g'), '');
							//console.log(text);
							if (detectedText == undefined) {
								if (text.length > 3) {
									detectedText = text;
								}
							}
						});
					});
					resolve(detectedText);
				};
			xhttp.onerror = function () {
				resolve('Error');
			};
	        xhttp.open("POST",url,true);
	        xhttp.send(body);
		});
  };
  
  return {
	detectPlates,
  }
})();

module.exports = GCPUtil;
