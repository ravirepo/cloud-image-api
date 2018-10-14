/*global Uint8Array */

import 'aws-sdk/dist/aws-sdk';
import aws_config from '../../aws_config.json';

const AWS = window.AWS;
AWS.config.update(aws_config);

var AWSUtil = (function() {  
  let rekognition = new AWS.Rekognition();

  const detectPlates = (buffer) => {
	var params = {
		Image: {
			Bytes: buffer
		}
	};
	
    let detectTextPromise = rekognition.detectText(
      {
		Image: {
			Bytes: buffer
		}
      }
    ).promise();	
	
    return detectTextPromise
      .then((data) => { 
			console.log(data);
			
			var detectedText = undefined;
			data.TextDetections.forEach(el => {
				if (detectedText == undefined && el.Type == "LINE") {
					if (/\d/.test(el.DetectedText) && 
                         el.DetectedText.length > 3) {
						detectedText = el.DetectedText;
					}
				}
			});
			console.log(detectedText);
			return detectedText;
		})
	  .catch(() => {
        return 'Error';
      });
  }
  return {
	detectPlates,
  }
})();

module.exports = AWSUtil;
