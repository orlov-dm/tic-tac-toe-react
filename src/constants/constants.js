const X_ELEMENT = 1;
const O_ELEMENT = -1;

const X_ELEMENT_NAME = 'X';
const O_ELEMENT_NAME = 'O';

class Constants {
    static get X_ELEMENT() {
        return X_ELEMENT;
    }
    static get O_ELEMENT() {
        return O_ELEMENT;
    }

    static get X_ELEMENT_NAME() {
        return X_ELEMENT_NAME;
    }
    static get O_ELEMENT_NAME() {
        return O_ELEMENT_NAME;
    }

    static getElementName(value) {
        let stringValue = "";
        if(value === Constants.X_ELEMENT) {
            stringValue = Constants.X_ELEMENT_NAME;
        } else if(value === Constants.O_ELEMENT) {
            stringValue = Constants.O_ELEMENT_NAME;
        }
        return stringValue;
    }
}

export default Constants;