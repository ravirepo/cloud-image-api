/*global Promise */

// CSS/Assets
import './CarImage.scss';

// JS
import React from 'react';
import { hashHistory } from 'react-router'
import Webcam from 'webcamjs';
import AWSUtil from '../../utils/awsUtil.js'
import AzureUtil from '../../utils/azureUtil.js'
import GCPUtil from '../../utils/gcpUtil.js'
import AlprUtil from '../../utils/alprUtil.js'

import Button from '../Button/Button.jsx'
import Caption from '../Caption/Caption.jsx'
import ListBox from '../ListBox/ListBox.jsx'
import Image from '../Image/Image.jsx'

// Component
class CarImage extends React.Component {

  constructor() {
    super();
    this.state = {
		display: null,
		imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/1974_New_York_Number_Plate.jpg'
    };

    this.rp = require('request-promise');

    this.upload_aws_camera = this.upload_aws_camera.bind(this);
    this.upload_azure_camera = this.upload_azure_camera.bind(this);
    this.upload_gcp_camera = this.upload_gcp_camera.bind(this);
    this.upload_alpr_camera = this.upload_alpr_camera.bind(this);

    this.upload_aws_image = this.upload_aws_image.bind(this);
    this.upload_azure_image = this.upload_azure_image.bind(this);
    this.upload_gcp_image = this.upload_gcp_image.bind(this);
    this.upload_alpr_image = this.upload_alpr_image.bind(this);

    this.upload = this.upload.bind(this);
	
	this.handleUrlChange = this.handleUrlChange.bind(this);	
  }
  componentDidMount() {
    Webcam.set({
      width: 400,
      height: 300
    });
    Webcam.attach('#webcam');
  }
  render() {
    let component = <div>
						<p></p>
						<div>
						  <ListBox caption='Image Url:' value={this.state.imageUrl} onValueChange={this.handleUrlChange}/>
						  <Caption text='License Plate No.:'/><Caption text={this.state.display}/>
						</div>
						<p></p>
						<Button clickHandler={this.upload_aws_camera} text='AWS Camera' />
						<Button clickHandler={this.upload_azure_camera} text='Azure Camera' />
						<Button clickHandler={this.upload_gcp_camera} text='GCP Camera' />
						<Button clickHandler={this.upload_alpr_camera} text='ALPR Camera' />
						
						<Button clickHandler={this.upload_aws_image} text='AWS Image' />
						<Button clickHandler={this.upload_azure_image} text='Azure Image' />
						<Button clickHandler={this.upload_gcp_image} text='GCP Image' />
						<Button clickHandler={this.upload_alpr_image} text='ALPR Image' />
				  </div>;
    return (
      <div>
	    <div className='imagemain'>
			<div className='imagemainrow'>
				<div className='image'><Image source={this.state.imageUrl}/></div>
				<div id='webcam' className='webcam'></div>
			</div>
		</div>
        { component }
      </div>
	  );
  }
  
  handleUrlChange(url) {
    this.setState({imageUrl: url});
  }
  
  upload_aws_camera() {
	Webcam.snap((data_uri) => {
      let buf = new Buffer(
        data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64'
      );
	  this.upload(AWSUtil.detectPlates(buf));
    });
  }
  upload_aws_image() {
	  Promise.resolve(
          this.rp(this.state.imageUrl, { encoding : null })
	  ).then((buf) => {
          this.upload(AWSUtil.detectPlates(buf));
      }).catch((err) => {
		  console.log('error', err);
		  this.setState({ display: 'Error!' });
	  });
  }

  upload_alpr_camera() {
	Webcam.snap((data_uri) => {
		let buf = data_uri.replace(/^data:image\/\w+;base64,/, '');
		this.upload(AlprUtil.detectPlates(buf));
    });
  }
  upload_alpr_image() {
	  Promise.resolve(
          this.rp(this.state.imageUrl, { encoding : null })
	  ).then((buf) => {
		let buf2 = new Buffer(buf).toString('base64');
		this.upload(AlprUtil.detectPlates(buf2));
      }).catch((err) => {
		  console.log('error', err);
		  this.setState({ display: 'Error!' });
	  });
  }

  upload_gcp_camera() {
	Webcam.snap((data_uri) => {
	  let buf = data_uri.replace(/^data:image\/\w+;base64,/, '');
	  this.upload(GCPUtil.detectPlates(buf, undefined));
	});
  }
  upload_gcp_image() {
	this.upload(GCPUtil.detectPlates(undefined, this.state.imageUrl));
  }
  
  upload_azure_camera() {
	Webcam.snap((data_uri) => {
      let buf = new Buffer(
        data_uri.replace(/^data:image\/\w+;base64,/, ''), 'base64'
      );
	  this.upload(AzureUtil.detectPlates(buf, undefined));
	});
  }
  upload_azure_image() {
	this.upload(AzureUtil.detectPlates(undefined, this.state.imageUrl));
  }
  
  upload(func) {
      this.setState({ display: null });
      Promise.resolve(
        func
      ).then((data) => {
		console.log(data);
        if(data != undefined){
			this.setState({ display: this.clean(data) });
		  }
		});
  }

  clean(data) {
	data = data.replace(/GARDEN/gi, '');
	data = data.replace(/NEW YORK/gi, '');
	data = data.replace(/STATE/gi, '');
	data = data.replace(/PENNSYLVANIA/gi, '');
	data = data.replace(/VISITPA/gi, '');
	data = data.replace(/COM/gi, '');
	data = data.replace(/\./gi, '');
	return data;
  }
}

export default CarImage;
