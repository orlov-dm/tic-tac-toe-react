import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { receiveGamesList, failureGamesList } from '../actions';

const fetchGamesList = () => {
    const gamesListURI = `/games_list`;
    return fetch(gamesListURI).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )    
};

function* getGamesList() {
    try {
        const data = yield call(fetchGamesList);
        yield put(receiveGamesList(data));
    } catch (error) {        
        yield put(failureGamesList(error));
    }
}

function onlineGameStart({socket}, action) {
    console.log("SAGA:");
    console.log(...arguments);
    socket.send(JSON.stringify(action));
}

// use them in parallel
export default function* rootSaga(params) {
    yield takeEvery(types.REQUEST_GAMES_LIST, getGamesList);
    yield takeEvery(types.APP_ONLINE_GAME_START, onlineGameStart, params);
    yield takeEvery(types.INITIALIZE_BOARD, initializeBoard, params);
}
