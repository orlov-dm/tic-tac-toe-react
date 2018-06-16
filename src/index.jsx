import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import './index.css';
import VisibleApp from './containers/VisibleApp';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas';
import setupSocket from './sockets';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(
  sagaMiddleware,
  // neat middleware that logs actions
  loggerMiddleware,
));

const socket = setupSocket(store.dispatch);
sagaMiddleware.run(rootSaga, { socket });

render(
  <Provider store={store}>
    <VisibleApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
