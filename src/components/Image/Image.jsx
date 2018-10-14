// CSS/Assets
import './Image.scss';

// JS
import React from 'react';

class Image extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='div'>
         <img className='image' src={this.props.source} />
      </div>
    )
  }
}

export default Image;
