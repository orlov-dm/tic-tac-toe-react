import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import './index.css';
import VisibleApp from './containers/VisibleApp';
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(
        // lets us dispatch() functions
        /* thunkMiddleware, */ 
        // neat middleware that logs actions
        loggerMiddleware,
        sagaMiddleware        
    )
);

sagaMiddleware.run(rootSaga);

render(
    <Provider store={store}>
        <VisibleApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
