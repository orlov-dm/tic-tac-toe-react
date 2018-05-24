import Constants from '../constants';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState = () => {
    return {
        isInGame: false,
        isOnline: false,
        isSecondPlayerReady: false
    };
}

const game = (state = defaultState(), action) => {
    switch (action.type) {
        case ActionTypes.APP_GAME_START:
            return {
                ...state,
                isInGame: true,
                isSecondPlayerReady: true
            };
        case ActionTypes.APP_GAME_END:
            return {
                ...state,
                isInGame: false,
                isSecondPlayerReady: false
            };       
        case ActionTypes.APP_ONLINE_GAME_START:
            return {
                ...state,
                isInGame: true,
                isOnline: true,
                isSecondPlayerReady: false
            };
        case ActionTypes.APP_ONLINE_GAME_END:
            return {
                ...state,
                isInGame: false,
                isOnline: false,
                isSecondPlayerReady: false
            };        
        default:
            return state;
    }
};

export default game;