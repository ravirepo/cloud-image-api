// JS
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory }  from 'react-router'

// Components
import CarImage from './components/CarImage/CarImage.jsx';

// App Component
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

App.propTypes = {
}

// Routes for app
const Routes = (
  <Route path="/" component={App} >
    <IndexRoute component={CarImage} />
	<Route path="/carimage" component={CarImage} />
  </Route>
)

// Render
ReactDOM.render(
  <Router history={hashHistory} routes={Routes} />,
  document.getElementById('app')
);
