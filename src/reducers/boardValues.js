import * as ActionTypes from '../constants/ActionTypes';
import { cloneDeep } from '../core';
import Constants from '../constants';

const getInitialBoard = (fieldsCount) => {
    const values = [];
    for (let i = 0; i < fieldsCount; ++i) {
        values[i] = [];
        for (let j = 0; j < fieldsCount; ++j) {
            values[i][j] = null;
        }
    }
    return values;
}

const boardValues = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.INITIALIZE_BOARD: {
            return getInitialBoard(action.fieldsCount);
        }
        case ActionTypes.SET_SQUARE_VALUE: {
            let values = cloneDeep(state);
            values[action.index.row][action.index.column] = action.value;
            return values;
        }
        default:
            return getInitialBoard(Constants.MIN_FIELD_SIZE);
    }
}

export default boardValues;