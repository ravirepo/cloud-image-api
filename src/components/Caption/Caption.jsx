// CSS/Assets
import './Caption.scss';

// JS
import React from 'react';

class Caption extends React.Component {
  render() {
    return (
      <div className='caption' >
        { this.props.text }
      </div>
    )
  }
}

Caption.propTypes = {

}

export default Caption;
