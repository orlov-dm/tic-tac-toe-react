import { combineReducers } from 'redux';
import app from './app';
import boardValues from './boardValues';
import settings from './settings';
import game from './game';
import gamesList from './gamesList';

export default combineReducers({
    app,    
    boardValues,
    settings,
    game,
    gamesList
});