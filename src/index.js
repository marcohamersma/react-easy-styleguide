import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import { RouterLayout as StyleGuide } from 'react-easy-styleguide';
import './index.css';

import './design.info';
const styleguideContext = require.context('./components/', true, /.info.js$/)

ReactDOM.render(
  <Router history={browserHistory}>
    <Route
      path="/react-easy-styleguide(/:component(/:variation))"
      component={StyleGuide(styleguideContext, {
        name: 'My StyleGuide',
        propTypes: React.PropTypes,
        path: 'react-easy-styleguide/'
      })}
    />
    <Redirect from="/" to="/react-easy-styleguide/" />
  </Router>,
  document.getElementById('root')
);
