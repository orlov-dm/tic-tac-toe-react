import * as ActionTypes from '../constants/ActionTypes';
import { cloneDeep } from '../core';
import Constants from '../constants';

const getInitialBoard = (fieldsCount) => {
  const values = [];
  for (let i = 0; i < fieldsCount; i += 1) {
    values[i] = Array(fieldsCount);
    values[i].fill(null);
  }
  return values;
};

const updateSquareValue = (state, index, value) => {
  const values = cloneDeep(state);
  values[index.row][index.column] = value;
  return values;
};

const boardValues = (state = getInitialBoard(Constants.MIN_FIELD_SIZE), action) => {
  switch (action.type) {
    case ActionTypes.INITIALIZE_BOARD:
      return getInitialBoard(action.fieldsCount);
    case ActionTypes.SET_SQUARE_VALUE: {
      return updateSquareValue(state, action.index, action.value);
    }

    // from server
    case ActionTypes.APP_ONLINE_SET_SQUARE_VALUE:
      return updateSquareValue(state, action.index, action.value);
    default:
      return state;
  }
};

export default boardValues;
