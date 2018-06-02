import * as ActionTypes from '../constants/ActionTypes';

const defaultState = () => {
    return {
        isInGame: false,
        isSecondPlayerReady: false,
        player: null,        
        onlineGameID: null,
        onlineOpponent: null
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
                isInGame: false,
                isSecondPlayerReady: false,
                onlineGameID: null //waiting for set_game_id event
            };        
        case ActionTypes.APP_ONLINE_GAME_END:
            return {
                ...state,
                isInGame: false,
                isSecondPlayerReady: false,
                onlineGameID: null
            };
        case ActionTypes.APP_ONLINE_SET_GAME_INFO: {
            const { game } = action;            
            return {
                ...state,
                onlineGameID: game !== null ? game.id : null,
                isInGame: game !== null,
                onlineOpponent: game !== null ? game.player2 : null,
                isSecondPlayerReady: game !== null && game.player2 !== null
            };            
        }
        default:
            return state;
    }
};

export default app;