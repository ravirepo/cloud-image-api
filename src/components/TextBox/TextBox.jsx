// CSS/Assets
import './TextBox.scss';

// JS
import React from 'react';

class TextBox extends React.Component {
  constructor(props) {
    super(props);
	this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div className='div'>
		<label>
          { this.props.caption }
          <input className='textbox' type="text" value={this.props.value} onChange={this.handleChange} />
        </label>
      </div>
    )
  }
  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }
}

TextBox.propTypes = {

}

export default TextBox;
