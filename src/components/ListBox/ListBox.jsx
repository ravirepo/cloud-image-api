// CSS/Assets
import './ListBox.scss';

// JS
import React from 'react';

class ListBox extends React.Component {
  constructor(props) {
    super(props);
	this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className='div'>
		<label>
          { this.props.caption }
			<select value={this.props.value} onChange={this.handleChange}>
				<option value="https://upload.wikimedia.org/wikipedia/commons/f/f7/1974_New_York_Number_Plate.jpg">282 YYY</option>
				<option value="http://www.15q.net/us3/nj70.jpg">RYV 615</option>
				<option value="http://www.15q.net/us3/nj69.jpg">PDN 433</option>
				<option value="https://cloud.githubusercontent.com/assets/508260/7515059/78f64494-f491-11e4-9795-aef6b9100cd2.jpg">ADL 4681</option>
				<option value="https://cloud.githubusercontent.com/assets/508260/7515062/7c0fb5ac-f491-11e4-9bff-42e082995c45.jpg">6NM 162</option>
				<option value="http://www.plateshack.com/y2k/Pennsylvania5/pa2013invertcar.jpg">HSD 4671</option>
				<option value="https://cathexisvideo.com/wp-content/uploads/2016/01/ANPR-Brochure-3.jpg">X378 BNU</option>	
				<option value="https://tiananmenstremendousachievements.files.wordpress.com/2013/05/luxury-car-with-military-license-plate.png">HY-20069</option>
				<option value="https://cdn.bmwblog.com/wp-content/uploads/2015/12/2015-MINI-Clubman-test-drive-104.jpg">B396 JOY</option>
				<option value="https://cdn-images-1.medium.com/max/2000/1*iLhSCNFIuBn-TvDgoRQjdg.jpeg">Two cars</option>
			</select>
		  </label>
      </div>
    )
  }
  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }
}

export default ListBox;
