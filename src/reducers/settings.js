import Constants from '../constants';
import * as ActionTypes from '../constants/ActionTypes';

const defaultSettings = () => {    
    return {
        fieldsCount: Constants.MIN_FIELD_SIZE,
        winCount: Constants.MIN_FIELD_SIZE,
        playWithAI: true,
        playAs: Constants.X_ELEMENT,
        settingsOpened: false
    };
}

const settings = (state = defaultSettings(), action) => {
    switch (action.type) {
        case ActionTypes.SAVE_SETTINGS:
            return {
                ...state,
                ...action.settings
            };
        case ActionTypes.TOGGLE_SETTINGS:
            return {
                ...state,
                settingsOpened: !state.settingsOpened
            };
        default:
            return state;
    }
};

export default settings;