import React from 'react';
import ReactDOM from 'react-dom';

import { ChemSpectraClient } from './lib/index';

import './style/svg.css';

const editorOnly = false;

// - - - DOM - - -
ReactDOM.render(
  <ChemSpectraClient editorOnly={editorOnly} />,
  document.getElementById('root'),
);
