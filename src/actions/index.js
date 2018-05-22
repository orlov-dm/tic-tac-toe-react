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