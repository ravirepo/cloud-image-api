/*global Uint8Array */

//'use strict';

var AzureUtil = (function() {
  	
  const detectPlates = (buffer, imageUrl) => {

		const request = require('request');
		
		const subscriptionKey = 'TODO_ADD_KEY_HERE';
		const uriBase = 'https://eastus.api.cognitive.microsoft.com/vision/v1.0/ocr';
		
		// Request parameters.
		const params = {
			'language': 'en',
			'detectOrientation': 'true',
		};

		// using image stream
		const optionsImage = {
			uri: uriBase,
			qs: params,
			encoding: 'binary',
			body: buffer,
			headers: {
				'Content-Type': 'application/octet-stream',
				'Ocp-Apim-Subscription-Key' : subscriptionKey
			}
		};

		// using url
		const optionsUrl = {
			uri: uriBase,
			qs: params,
			body: '{"url": ' + '"' + imageUrl + '"}',
			headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key' : subscriptionKey
			}
		};

		var options = optionsImage;
		if (buffer == undefined)
			options = optionsUrl;
		
		return new Promise(
			function (resolve, reject) {
				request.post(options, (error, response, body) => {
				  if (error) {
					console.log('Error: ', error);
					//reject(error);
					resolve('Error');
				  }
				  
				  let data = JSON.parse(body);
				  console.log('JSON Response\n');
				  console.log(JSON.stringify(data, null, 2));
				  
				  var detectedText = '';
				  data.regions.forEach(region => {
					region.lines.forEach( line => {
						line.words.forEach( word => {
							detectedText += word.text;
						});
					});
				  });
				
				  console.log(detectedText);
				  
				  if (detectedText == '')
					  detectedText = 'No text found';
				  resolve(detectedText);
				});
			});
  };
  
  return {
	detectPlates
  }
})();

module.exports = AzureUtil;
