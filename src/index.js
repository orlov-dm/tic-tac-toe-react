import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'
import './index.css';
import VisibleApp from './containers/VisibleApp';
import registerServiceWorker from './registerServiceWorker';
import setupSocket from './sockets';

const store = createStore(reducers);

render(
    <Provider store={store}>
        <VisibleApp />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
