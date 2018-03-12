import React, { Component } from 'react';

class Square extends Component {    
    render() {
        let className = "square";
        if(this.props.isWinner) {
            className += " win";
        }
        return <span className={className} onClick={this.props.onClick}><p>{this.props.value}</p></span>
    }
}

export default Square;