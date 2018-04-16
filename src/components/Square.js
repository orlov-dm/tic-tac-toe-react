import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Constants from '../constants/constants';

class Square extends Component {    
    render() {
        let classNames = ["square"];
        const isWinner = this.props.isWinner;
        if(isWinner) {
            classNames.push("win");
        }
        if(this.props.value) {
            classNames.push(this.props.value);
        }
        return <span key={0} className={classNames.join(" ")} onClick={this.props.onClick}>
            <CSSTransition
                in={this.props.value === Constants.X_ELEMENT || this.props.value === Constants.O_ELEMENT}
                timeout={500}
                classNames={"square-value"}
                unmountOnExit            
            >
                <p>{this.props.value}</p>
            </CSSTransition>            
        </span>            
    }
}

export default Square;