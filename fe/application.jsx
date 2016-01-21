import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import attachFastClick from 'fastclick';

import App from './components/app.jsx';

attachFastClick(document.body);
render((
  <Router>
    <Route path="/" component={App}></Route>
  </Router>
), document.getElementById("container"));
