import { call, put, takeEvery, select } from 'redux-saga/effects';
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
    socket.send(JSON.stringify(action));
}

function onlineGameJoin({socket}, action) {    
    socket.send(JSON.stringify(action));
}

function onlineGameEnd({socket}, action) {
    socket.send(JSON.stringify(action));
}

const getOnlineGameID = (state) => state.app.onlineGameID;
function* onlineGameTurnChange({socket}, action) {
    const gameID = yield select(getOnlineGameID);
    socket.send(JSON.stringify({
        ...action,
        gameID
    }));
}

function* onlineGameSetSquareValue({socket}, action) {
    const gameID = yield select(getOnlineGameID);
    socket.send(JSON.stringify({
        ...action,
        gameID
    }));
}

// use them in parallel
export default function* rootSaga(params) {
    yield takeEvery(types.REQUEST_GAMES_LIST, getGamesList);
    yield takeEvery(types.APP_ONLINE_GAME_START, onlineGameStart, params);
    yield takeEvery(types.APP_ONLINE_GAME_JOIN, onlineGameJoin, params);
    yield takeEvery(types.APP_ONLINE_GAME_END, onlineGameEnd, params);
    yield takeEvery(types.GAME_TURN_CHANGE, onlineGameTurnChange, params);
    yield takeEvery(types.SET_SQUARE_VALUE, onlineGameSetSquareValue, params);
}
