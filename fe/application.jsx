import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import FastClick from 'fastclick';

import App from './components/app.jsx';

FastClick.attach(document.body);
render((
  <Router>
    <Route path="/" component={App}></Route>
  </Router>
), document.getElementById("container"));
