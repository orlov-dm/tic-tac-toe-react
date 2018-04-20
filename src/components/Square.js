import React, { Component } from 'react';

class Square extends Component {
    render() {
        let classNames = ["square"];
        const isWinner = this.props.isWinner;
        if (isWinner) {
            classNames.push("win");
        }
        if (this.props.value) {
            classNames.push(this.props.value);
        }
        const content = this.props.value ? <span>{this.props.value}</span> : "";
        return <span key={0} className={classNames.join(" ")} onClick={this.props.onClick}>            
            {content}
        </span>
    }
}

export default Square;