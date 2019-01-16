import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import PropTypes from 'prop-types';
// import { logger } from 'redux-logger';
import reducers from './reducers/index';
import sagas from './sagas/index';
import Frame from './frame';


// - - - store & middleware - - -
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]; // logger

const store = compose(
  applyMiddleware(...middlewares),
)(createStore)(reducers);

sagaMiddleware.run(sagas);


// - - - React - - -
const ChemSpectraClient = () => (
  <Provider store={store}>
    <Frame />
  </Provider>
);


// - - - DOM - - -
ReactDOM.render(
  <ChemSpectraClient />,
  document.getElementById('root'),
);

export default ChemSpectraClient;
