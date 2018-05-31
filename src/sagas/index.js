import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import { receiveGamesList } from '../actions';

const fetchGamesList = () => {
    return fetch(`/games_list`).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )    
};

function* getGamesList(action) {
    try {
        const data = yield call(fetchGamesList);
        yield put(receiveGamesList(data));
    } catch (error) {
        //todo
        /* yield put({ type: "FETCH_FAILED", error }) */ 
    }
}


// use them in parallel
export default function* rootSaga() {
    yield takeEvery(types.REQUEST_GAMES_LIST, getGamesList);
    /* yield takeEvery('CREATE_USER', createUser) */
}
