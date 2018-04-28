import React, { Component } from 'react';
import Constants from '../constants/constants';

class Square extends Component {
    render() {
        let classNames = ["square"];
        const {isWinner, value, onClick} = this.props;
        let stringValue = Constants.getElementName(value);

        if (isWinner) {
            classNames.push("win");
        }
        if (value) {
            classNames.push(stringValue);
        }
        const content = value ? <span>{stringValue}</span> : "";
        return <span className={classNames.join(" ")} onClick={onClick}>
            {content}
        </span>
    }
}

export default Square;