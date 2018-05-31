import * as ActionTypes from "../constants/ActionTypes";

export const setSquareValue = (index, value) => ({
    type: ActionTypes.SET_SQUARE_VALUE,
    index,
    value
});

export const initializeBoard = (fieldsCount) => ({
    type: ActionTypes.INITIALIZE_BOARD,
    fieldsCount
});

export const saveSettings = (settings) => ({
    type: ActionTypes.SAVE_SETTINGS,
    settings
});

export const toggleSettings = () => ({
    type: ActionTypes.TOGGLE_SETTINGS
});

export const gameReset = () => ({
    type: ActionTypes.GAME_RESET
});

export const gameTurnChange = (turn) => ({
    type: ActionTypes.GAME_TURN_CHANGE,
    turn
});

export const gameSetWinner = (winner, winIndexes) => ({
    type: ActionTypes.GAME_SET_WINNER,
    winner,
    winIndexes
});

export const gameStart = () => ({
    type: ActionTypes.APP_GAME_START
});

export const gameEnd = () => ({
    type: ActionTypes.APP_GAME_END
});

export const onlineGameStart = () => ({
    type: ActionTypes.APP_ONLINE_GAME_START
});

export const onlineGameEnd = () => ({
    type: ActionTypes.APP_ONLINE_GAME_END
});

export const requestGamesList = () => ({ type: ActionTypes.REQUEST_GAMES_LIST });
/* export const getGamesList = () => { type: 'FETCH_POSTS_FAILURE', error: 'Oops' } */;
export const receiveGamesList = (response) => ({ type: ActionTypes.RECEIVE_GAMES_LIST, response });

/* export const fetchGamesList = () => {
    return function (dispatch) {
        dispatch(requestGamesList());        

        return fetch(`/games_list`)
            .then(
                response => response.json(),                
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                dispatch(receiveGamesList(json))
            )
    }
} */

export const gamesListHoverRow = (row) => ({
    type: ActionTypes.GAMES_LIST_HOVER_ROW,
    row
});