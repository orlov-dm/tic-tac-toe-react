import React, { Component } from 'react';

class Square extends Component {
    render() {
        let classNames = ["square"];
        const {isWinner, value, onClick} = this.props;
        if (isWinner) {
            classNames.push("win");
        }
        if (value) {
            classNames.push(value);
        }
        const content = value ? <span>{value}</span> : "";
        return <span className={classNames.join(" ")} onClick={onClick}>
            {content}
        </span>
    }
}

export default Square;