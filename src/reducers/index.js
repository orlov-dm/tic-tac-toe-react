import { combineReducers } from 'redux';
import boardValues from './boardValues';
import settings from './settings';

export default combineReducers({
    boardValues,
    settings
});