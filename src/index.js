import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'; // eslint-disable-line

import reducers from './reducers';
import App from './components/App';
import sagas from './sagas/index';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Main from './components/Main';
import NotFound from './components/NotFound';

// - - - store & middleware - - -
const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });

  middlewares = [...middlewares, logger];
}

const store = createStore(
  reducers,
  {
    auth: {
      name: localStorage.getItem('name') || '',
      email: localStorage.getItem('email') || '',
      token: localStorage.getItem('token') || '',
      errorMsg: '',
    },
  },
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(sagas);

// - - - React - - -
const MainEntryPoint = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <MainEntryPoint />,
  document.getElementById('root'),
);
