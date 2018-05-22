import React from 'react';
import Constants from '../constants';

const Square = (props) => {
    let classNames = ["square"];
    const {isWinner, value, onClick} = props;
    const stringValue = Constants.getElementName(value);

    if (isWinner) {
        classNames.push("win");
    }
    if (value) {
        classNames.push(stringValue);
    }
    const content = value ? <span>{stringValue}</span> : "";
    return (
        <span className={classNames.join(" ")} onClick={onClick}>
            {content}
        </span>
    );
};

export default Square;