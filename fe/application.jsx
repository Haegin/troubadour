import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/app.jsx';

render((
  <Router>
    <Route path="/" component={App}></Route>
  </Router>
), document.getElementById("container"));
