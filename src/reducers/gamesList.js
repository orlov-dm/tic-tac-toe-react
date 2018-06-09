import * as ActionTypes from '../constants/ActionTypes';

const gamesList = (state = {
  isFetching: false,
  items: {},
  fetchingError: null,
  hoveredRow: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_GAMES_LIST:
      return {
        ...state,
        isFetching: true,
        fetchingError: null,
      };
    case ActionTypes.RECEIVE_GAMES_LIST:
      return {
        items: action.response,
        isFetching: false,
      };
    case ActionTypes.FAILURE_GAMES_LIST:
      return {
        items: {},
        isFetching: false,
        fetchingError: action.error,
      };
    case ActionTypes.GAMES_LIST_HOVER_ROW:
      return {
        ...state,
        hoveredRow: action.row,
      };
    case ActionTypes.GAMES_LIST_ADD:
      return {
        ...state,
        items: {
          ...state.items,
          [action.game.id]: action.game,
        },
      };
    case ActionTypes.GAMES_LIST_REMOVE:
      let items = { ...state.items };
      delete items[action.gameID];
      return {
        ...state,
        items,
      };
    default:
      return state;
  }
};

export default gamesList;
