import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faRightArrow from '@fortawesome/fontawesome-free-solid/faArrowRight';
import faLeftArrow from '@fortawesome/fontawesome-free-solid/faArrowLeft';

const SettingsButton = (props) => {
  const { isOpened, onClick } = props;
  const isOpenedClass = isOpened ? ' opened' : '';
  const className = `icon-button button-settings${isOpenedClass}`;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={isOpenedClass ? faLeftArrow : faRightArrow} />
    </button>
  );
};

SettingsButton.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SettingsButton;
