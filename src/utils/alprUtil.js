/*global Uint8Array */

var AlprUtil = (function() {
  
  const detectPlates = (buffer) => {
	  const apiKey = 'TODO';
	  const url = 'https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=us&secret_key=' + apiKey;
		
  	return new Promise(
		function (resolve, reject) {
	        var xhttp = new XMLHttpRequest();
	        xhttp.onload = 
				function() {
					console.log(xhttp.responseText);
					var detectedText = undefined;
					var data = JSON.parse(xhttp.responseText);
					console.log(data);
					data.results.forEach(result => {
						detectedText = result.plate;
					});
					resolve(detectedText);
				};
			xhttp.onerror = function () {
				resolve('Error');
			};

	        xhttp.open("POST",url,true);
			xhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
			
	        xhttp.send(buffer);
		});
  };
  
  return {
	detectPlates,
  }
})();

module.exports = AlprUtil;
