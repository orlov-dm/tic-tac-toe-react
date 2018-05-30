import * as ActionTypes from '../constants/ActionTypes';

const gamesList = (state = { isFetching: false, items: [], hoveredRow: null }, action) => {
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
        case ActionTypes.GAMES_LIST_HOVER_ROW:
            return {
                ...state,
                hoveredRow: action.row,                
            }
        default:
            return state;
    }
};

export default gamesList;