import React, { Component } from 'react';
import Board from './Board';
import * as Constants from '../constants/constants';
import Square from './Square';

//TODO values as object

class Game extends Component { 
    X_ELEMENT = 'X';
    O_ELEMENT = 'O';
    DRAW_ELEMENT = 'Draw';
    MIN_FIELD_SIZE = 3;
    MAX_FIELD_SIZE = 10;
    constructor(props) {
        super(props);                
        this.state = {                        
            fieldsCount: this.MIN_FIELD_SIZE,
            winCount: this.MIN_FIELD_SIZE,
            ...this.getInitialState(this.MIN_FIELD_SIZE)
        };        
    }

    getInitialState(fieldsCount) {        
        const values = []; 
        for(let i = 0; i < fieldsCount; ++i) {
            values[i] = [];
            for(let j = 0; j < fieldsCount; ++j) {
                values[i][j] = null;
            }
        }
        let initialState = {                
            turn: this.X_ELEMENT,
            values: values,            
            winner: null,
            winIndexes: null,            
        }        
        return initialState;
    }

    renderStatus() {
        let status = null;
        let square = null;
        const winner = this.state.winner;
        const values = this.state.values;
        const turn = this.state.turn;
        if(winner) {
            if(winner === this.DRAW_ELEMENT) {
                status = `${winner}!`;
            } else {                
                square = <Square
                        isWinner = {true}
                        value = {winner}
                />;            
                status = [<h2 key="1">{square}</h2>, <h2 key="2">is a winner!</h2>];
            }
        } else {
            let isFinished = true;
            for(let i = 0; i < values.length; ++i) {
                for(let j = 0; j < values[i].length; ++j) {
                    if(!values[i][j]) {
                        isFinished = false;
                        break;
                    }
                }
            }

            if(isFinished)  {
                status = `${this.DRAW_ELEMENT}!`;
            } else {
                square = <Square                            
                            isWinner = {false}
                            value = {turn}
                />;            
                status = [<h2 key="1">Turn of</h2>, <h2 key="2">{square}</h2>];
            }
        }
        return status;
    }

    render() {
        return (
            <div className="game">
                <Board 
                    fieldsCount={this.state.fieldsCount}
                    winCount={this.state.winCount}
                    turn={this.state.turn}
                    values={this.state.values}
                    winIndexes={this.state.winIndexes}
                    onClick={(row, column) => this.handleSquareClick(row, column)}
                />                
                <div className="panel-settings">
                    <label htmlFor="fields_count">Field size:</label>
                    <div><input id="fields_count" min="1" max={this.MAX_FIELD_SIZE} type="number" value={this.state.fieldsCount} onChange={(event) => this.handleFieldsCountChange(event.target.value)}/></div>
                    <label htmlFor="win_count">Number of fields to win:</label>
                    <div>
                        <input id="win_count" type="number" value={this.state.winCount} onChange={(event) => this.handleWinCountChange(event.target.value)}/>                    
                    </div>
                    <div><button id="restart" onClick={() => this.handleRestart()}>Restart</button></div>
                </div>                
                <div className="status">{this.renderStatus()}</div>
            </div>
        );
    }    

    handleRestart() {
        this.setState({            
            ...this.getInitialState(this.state.fieldsCount)
        });           
    }

    handleFieldsCountChange(count) {
        let fieldsCount = parseInt(count, 10);
        if(fieldsCount < this.MIN_FIELD_SIZE || fieldsCount > this.MAX_FIELD_SIZE) {
            return false;
        }
        this.setState({
            fieldsCount,
            ...this.getInitialState(fieldsCount)
        });           
    }

    handleWinCountChange(count) {
        let winCount = parseInt(count, 10);
        if(winCount <= 0 || winCount > this.MAX_FIELD_SIZE || winCount > this.state.fieldsCount) {
            return false;
        }
        this.setState({
            winCount,
            ...this.getInitialState(this.state.fieldsCount)
        });
        this.handleRestart();         
    }

    handleSquareClick(row, column) {
        const values = this.state.values.slice(0, this.state.values.length);
        const turn = this.state.turn;        

        if(this.state.winner || values[row][column]) {
            return;
        }

        values[row][column] = turn === this.X_ELEMENT ? this.X_ELEMENT : this.O_ELEMENT; 

        let winIndexes = this.checkWinner(row, column);
        let state = {};
        if(winIndexes.length) {
            state = {
                winner: turn,
                winIndexes
            }
        }
        state.values = values;
        state.turn = turn === this.X_ELEMENT ? this.O_ELEMENT : this.X_ELEMENT;
        this.setState(state);
    }

    checkWinner(row, column) {
        let result = this.checkWinnerHorizontal(row, column);
         if(!result.length) {
            result = this.checkWinnerVertical(row, column);
        } 
        if(!result.length) {
            result = this.checkWinnerDiagonal(row, column);
        }
        return result;
    }

    checkWinnerImpl(row, column, deltaRow, deltaColumn) {
        const DIR_FORWARD = "forward";
        const DIR_BACKWARD = "backward";
        const values = this.state.values;
        let winIndexes = [{row, column}];        
        const turn = this.state.turn;
        for(let direction of [DIR_FORWARD, DIR_BACKWARD]) {
            let current = {row, column};
            let currentDeltaRow = deltaRow;
            let currentDeltaColumn = deltaColumn;
            if(direction === DIR_BACKWARD) {
                currentDeltaRow *= -1;
                currentDeltaColumn *= -1
            }

            current.row += currentDeltaRow;
            current.column += currentDeltaColumn;

            while(
                current.row >= 0 && 
                current.column >= 0 && 
                current.row < values.length && 
                current.column < values.length && 
                values[current.row][current.column] === turn
            ) {                
                winIndexes.push({...current});
                current.row += currentDeltaRow;
                current.column += currentDeltaColumn;
            }
            if(winIndexes.length >= this.state.winCount) {
                return winIndexes;
            }
        }
        return [];
    }

    checkWinnerHorizontal(i, j) {
        return this.checkWinnerImpl(i, j, 0, 1);
    }
    
    checkWinnerVertical(i, j) {
        return this.checkWinnerImpl(i, j, 1, 0);
    }
    
    checkWinnerDiagonal(i, j) {
        let leftToRight = this.checkWinnerImpl(i, j, 1, 1);
        if(!leftToRight.length) {
            let rightToLeft = this.checkWinnerImpl(i, j, -1, 1);                        
            if(rightToLeft.length) {
                return rightToLeft;
            }
        }
        return leftToRight;
    }
}

export default Game;