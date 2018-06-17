import React from 'react';
import PropTypes from 'prop-types';

import Constants from '../constants';

const Square = (props) => {
  const classNames = ['square'];
  const { isWinner, value, onClick } = props;
  const stringValue = Constants.getElementName(value);

  if (isWinner) {
    classNames.push('win');
  }
  if (value) {
    classNames.push(stringValue);
  }
  const content = value ? <span>{stringValue}</span> : '';

  return (
    <span
      className={classNames.join(' ')}
      onClick={onClick}
      onKeyPress={onClick} // TODO check if it works
      role="button"
      tabIndex="0"
    >
      {content}
    </span>
  );
};

Square.propTypes = {
  isWinner: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Square;
