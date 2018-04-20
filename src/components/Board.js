import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {  
    constructor(props) {
        super(props);
        
        this.state = {
            fieldsCount: 0
        };             
    }

    render() {
        let squares = [];
        for(let i = 0; i < this.props.fieldsCount; ++i) {
            for(let j = 0; j < this.props.fieldsCount; ++j) {
                squares.push(this.renderSquare(i, j));
            }
        }

        return (
            <div className="board-wrapper">
                <div className="board">
                    {squares}
                </div>
            </div>
        )
    }

    renderSquare(row, column) {
        let isWinner = false;
        if(this.props.winIndexes){
            for(let point of this.props.winIndexes) {
                if(point.row === row && point.column === column) {
                    isWinner = true;
                    break;
                }
            }            
        }

        const value = this.props.values[row][column] ? this.props.values[row][column] : ""/* row + "_" + column */;
        return <Square key = {row + "_" + column + "_square"}
            isWinner = {isWinner}
            value = {value}
                onClick={() => this.props.onClick(row, column)}            
                />            
    }

    componentDidUpdate() {
        let appNode = document.querySelector(".App");
        appNode.style.setProperty("--count", this.props.fieldsCount);        
    }
}

export default Board;