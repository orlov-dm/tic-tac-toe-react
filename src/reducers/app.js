import * as ActionTypes from '../constants/ActionTypes';

const defaultState = () => {
    return {
        isInGame: false,
        isOnline: false,
        isSecondPlayerReady: false,
        player: null,
        onlineGameID: null
    };
}

const app = (state = defaultState(), action) => {
    switch (action.type) {
        case ActionTypes.APP_ONLINE_SET_PLAYER_INFO: {
            const { player } = action;
            return {
                ...state,
                player
            };
        }
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
                isSecondPlayerReady: false,
                onlineGameID: null
            };
        case ActionTypes.APP_ONLINE_SET_GAME_ID: {
                const { gameID } = action;
                return {
                    ...state,
                    onlineGameID: gameID
                };
            }
        default:
            return state;
    }
};

export default app;