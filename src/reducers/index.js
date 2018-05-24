import { combineReducers } from 'redux';
import app from './app';
import boardValues from './boardValues';
import settings from './settings';
import game from './game';

export default combineReducers({
    app,    
    boardValues,
    settings,
    game,
});