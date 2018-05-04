import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faRightArrow from '@fortawesome/fontawesome-free-solid/faArrowRight';
import faLeftArrow from '@fortawesome/fontawesome-free-solid/faArrowLeft';

const SettingsButton = (props) => {
    const { settingsOpened, onClick } = props;
    const settingsOpenedClass = settingsOpened ? " opened" : "";    
    const className = `icon-button button-settings${settingsOpenedClass}`;    
    return (
        <button className={className}
            onClick={onClick}>
            <FontAwesomeIcon icon={settingsOpenedClass ? faLeftArrow : faRightArrow}/>
        </button>
    );
};

export default SettingsButton;