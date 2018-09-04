import Constants from '../constants';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState = () => ({
  turn: Constants.X_ELEMENT,
  winner: null,
  winIndexes: null,
  isOnline: false,
});

const game = (state = defaultState(), action) => {
  switch (action.type) {
    case ActionTypes.GAME_RESET:
      return defaultState();
    case ActionTypes.GAME_TURN_CHANGE:
    case ActionTypes.APP_ONLINE_SET_GAME_TURN:
      return {
        ...state,
        turn: action.turn,
      };
    case ActionTypes.GAME_SET_WINNER:
    case ActionTypes.APP_ONLINE_SET_WINNER:
      return {
        ...state,
        winner: action.winner,
        winIndexes: action.winIndexes,
      };
    default:
      return state;
  }
};

export default game;
