import Constants from '../constants';
import * as ActionTypes from '../constants/ActionTypes';
// const settings = {
//     fieldsCount: Constants.MIN_FIELD_SIZE,
//     winCount: Constants.MIN_FIELD_SIZE,
//     playWithAI: true,
//     playAs: Constants.X_ELEMENT,
// }
// const currentSettings = "current";
// const panelSettings = "panel";

const defaultSettings = () => {    
    return {
        fieldsCount: Constants.MIN_FIELD_SIZE,
        winCount: Constants.MIN_FIELD_SIZE,
        playWithAI: true,
        playAs: Constants.X_ELEMENT
    };
}

const settings = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_SETTINGS: {            
            return {...action.settings};
        }
        default:
            return defaultSettings();
    }
};

export default settings;