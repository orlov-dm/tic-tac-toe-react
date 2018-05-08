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