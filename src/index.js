import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const getInitialBoard = (fieldsCount) => {
    const values = [];
    for (let i = 0; i < fieldsCount; ++i) {
        values[i] = [];
        for (let j = 0; j < fieldsCount; ++j) {
            values[i][j] = null;
        }
    }
    return values;
};


const store = createStore(reducers, {
    boardValues: getInitialBoard(3)
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
