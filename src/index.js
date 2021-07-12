import React from 'react';
import { Router } from 'react-router';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import history from './history';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
