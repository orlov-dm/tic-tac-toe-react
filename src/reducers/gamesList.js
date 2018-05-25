import * as ActionTypes from '../constants/ActionTypes';

const gamesList = (state = { isFetching: false, items: [] }, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_GAMES_LIST:
            return {
                ...state,
                isFetching: true
            };
        case ActionTypes.RECEIVE_GAMES_LIST:
            return {
                items: action.response,
                isFetching: false
            };
        default:
            return state;
    }
};

export default gamesList;