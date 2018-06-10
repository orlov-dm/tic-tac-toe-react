const X_ELEMENT = 1;
const O_ELEMENT = -1;

const X_ELEMENT_NAME = 'X';
const O_ELEMENT_NAME = 'O';
const DRAW_ELEMENT_NAME = 'Draw';
const MIN_FIELD_SIZE = 3;
const MAX_FIELD_SIZE = 10;

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
  static get DRAW_ELEMENT_NAME() {
    return DRAW_ELEMENT_NAME;
  }
  static get MIN_FIELD_SIZE() {
    return MIN_FIELD_SIZE;
  }
  static get MAX_FIELD_SIZE() {
    return MAX_FIELD_SIZE;
  }


  static getElementName(value) {
    let stringValue = '';
    if (value === Constants.X_ELEMENT) {
      stringValue = Constants.X_ELEMENT_NAME;
    } else if (value === Constants.O_ELEMENT) {
      stringValue = Constants.O_ELEMENT_NAME;
    }
    return stringValue;
  }
}

export default Constants;
