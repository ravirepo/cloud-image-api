## License plate detection using cloud apis

#### What does this app do?
Check the slide here: Search slideshare for "license-plate-detection-using-cloud-apis"

#### What is the stack?

- [ElectronJS](http://electron.atom.io/) 
- [React](https://facebook.github.io/react/)

#### How can I try it out?

1. Create Cloud Accounts as below.

Create an AWS account and make sure your user has Rekognition access. See [this](https://aws.amazon.com/account/) and [this]- (http://docs.aws.amazon.com/IAM/latest/UserGuide/access_permissions.html) if you are unsure how to get this set up. Update the keys in aws_config.json

Replace these in aws_config.json:
{
  "accessKeyId":"",
  "secretAccessKey":"",
  "region":"us-east-1"
}

Create a Azure Account: https://azure.microsoft.com/en-us/try/cognitive-services/
Update the secret key src/utils/azureUtil.js

Create a GCP Account and enable Vision: https://cloud.google.com/vision/
Update the secret key in src/utils/gcpUtil.js

Create a ALPR Account: https://www.openalpr.com/benchmarks.html
Update the secret key in src/utils/alprUtil.js

2. Run the app.
```
npm install && npm run-script build && npm run app
```

3. Use the camera with a printed image or an image from your mobile screen. Or use the Image buttons after selecting an image in the dropdown.


### Credits: 
Original app with AWS from https://medium.com/mint-digital/i-wrote-a-facial-rekognition-app-in-under-two-hours-b20d589e763d
