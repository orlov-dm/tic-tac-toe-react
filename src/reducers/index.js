import { combineReducers } from 'redux';
import boardValues from './boardValues';
import settings from './settings';
import game from './game';

export default combineReducers({
    boardValues,
    settings,
    game
});