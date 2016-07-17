import React from 'react';
import { Router, hashHistory } from 'react-router';
import { routes } from './routes';
import { render } from 'react-dom'


render((
  <Router history={hashHistory}>
    { routes }
  </Router>
),document.getElementById('mount'));
