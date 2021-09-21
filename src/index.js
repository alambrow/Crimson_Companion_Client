import React from 'react';
import ReactDOM from 'react-dom';
import CrimsonCompanionApp from './CrimsonCompanionApp';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CrimsonCompanionApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
