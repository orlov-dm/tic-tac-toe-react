import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import './index.css';
import VisibleApp from './containers/VisibleApp';
import registerServiceWorker from './registerServiceWorker';
import setupSocket from './sockets';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
);


render(
    <Provider store={store}>
        <VisibleApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
