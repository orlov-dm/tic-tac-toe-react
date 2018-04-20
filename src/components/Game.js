import React, { Component } from 'react';
import Board from './Board';
import Constants from '../constants/constants';
import Square from './Square';
import AI from './AI';

//TODO values as object

class Game extends Component {
    DRAW_ELEMENT = 'Draw';
    MIN_FIELD_SIZE = 3;
    MAX_FIELD_SIZE = 10;
    constructor(props) {
        super(props);
        this.state = {
            fieldsCount: this.MIN_FIELD_SIZE,
            winCount: this.MIN_FIELD_SIZE,
            tempFieldsCount: this.MIN_FIELD_SIZE,
            tempWinCount: this.MIN_FIELD_SIZE,
            settingsOpened: false,
            playWithAI: true,
            playAs: Constants.X_ELEMENT,
            ...this.getInitialState(this.MIN_FIELD_SIZE)
        };
        this.ai = new AI(this);
        this.ai.player = Constants.O_ELEMENT;
    }

    getInitialState(fieldsCount) {
        const values = [];
        for (let i = 0; i < fieldsCount; ++i) {
            values[i] = [];
            for (let j = 0; j < fieldsCount; ++j) {
                values[i][j] = null;
            }
        }

        let initialState = {
            turn: Constants.X_ELEMENT,
            values: values,
            winner: null,
            winIndexes: null
        }
        return initialState;
    }

    renderStatus() {
        let status = null;
        let square = null;
        const winner = this.state.winner;
        const values = this.state.values;
        const turn = this.state.turn;
        if (winner) {
            square = <Square
                isWinner={true}
                value={winner}
            />;
            status = [<div key="1">Winner </div>, <div key="2">{square}</div>];
        } else {
            let isFinished = true;
            for (let i = 0; i < values.length; ++i) {
                for (let j = 0; j < values[i].length; ++j) {
                    if (!values[i][j]) {
                        isFinished = false;
                        break;
                    }
                }
            }

            if (isFinished) {
                status = <div>{this.DRAW_ELEMENT}!</div>;
            } else {
                square = <Square
                    isWinner={false}
                    value={turn}
                />;
                status = [<div key="1">Turn of</div>, <div key="2">{square}</div>];
            }
        }
        return status;
    }

    render() {
        let settingsOpenedClass = this.state.settingsOpened ? " opened" : "";
        let playAsX = this.state.playAs === Constants.X_ELEMENT ? " on" : "";
        let playAsO = this.state.playAs === Constants.O_ELEMENT ? " on" : "";
        return (
            <div className="game-wrapper">
                <div className="game">
                    <Board
                        fieldsCount={this.state.fieldsCount}
                        winCount={this.state.winCount}
                        turn={this.state.turn}
                        values={this.state.values}
                        winIndexes={this.state.winIndexes}
                        onClick={(row, column) => this.handleSquareClick(row, column)}
                    />
                    <div className="status title">{this.renderStatus()} <button id="restart" className="inverse" onClick={() => this.handleRestart()}>Restart</button></div>
                </div>
                <div className={`panel-settings${settingsOpenedClass}`}>
                    <div>
                        <label htmlFor="fields_count">Field size:</label>
                        <div>
                            <input id="fields_count" min="1" max={this.MAX_FIELD_SIZE} type="number" value={this.state.tempFieldsCount} onChange={(event) => this.handleFieldsCountChange(event.target.value)} />
                        </div>

                        <label htmlFor="win_count">Fields to win:</label>
                        <div>
                            <input id="win_count" type="number" value={this.state.tempWinCount} onChange={(event) => this.handleWinCountChange(event.target.value)} />
                        </div>

                        <label htmlFor="ai_play">Play with AI:</label>
                        <div>
                            <input type="checkbox" id="ai_play" checked={this.state.playWithAI} onChange={(event) => this.handlePlayWithAIChange(event.target.checked)} />
                        </div>

                        <button className={"button-square" + playAsX}><Square value={Constants.X_ELEMENT}
                            onClick={() => this.handlePlayAs(Constants.X_ELEMENT)} /></button>
                        <button className={"button-square" + playAsO}><Square value={Constants.O_ELEMENT}
                            onClick={() => this.handlePlayAs(Constants.O_ELEMENT)} /></button>


                        <div></div>
                        <div><button id="save" onClick={() => this.handleSave()}>Save</button></div>
                    </div>
                </div>
                <button className={`icon-button button-settings${settingsOpenedClass}`} onClick={() => this.handleSettingsClick()}>
                    {settingsOpenedClass ? '<-' : '->'}
                </button>
            </div>
        );
    }


    handleSave() {
        this.handleRestart();
    }

    handleRestart() {
        let { tempWinCount, tempFieldsCount, playWithAI } = this.state;
        if (isNaN(tempFieldsCount) || tempFieldsCount < this.MIN_FIELD_SIZE) {
            alert(`Field size less than ${this.MIN_FIELD_SIZE}`);
            tempFieldsCount = this.MIN_FIELD_SIZE;
        } else if (tempFieldsCount > this.MAX_FIELD_SIZE) {
            alert(`Field size more than ${this.MAX_FIELD_SIZE}`);
            tempFieldsCount = this.MAX_FIELD_SIZE;
        }

        if (isNaN(tempWinCount) || tempWinCount <= 0) {
            alert("Fields to win less than 0");
            tempWinCount = 1;
        } else if (tempWinCount > this.MAX_FIELD_SIZE || tempWinCount > tempFieldsCount) {
            alert("Fields to win more than Field size");
            tempWinCount = tempFieldsCount;
        }

        if(playWithAI && !this.canAllowAI()) {            
            playWithAI = false;
        }        
            
        this.setState({
            ...this.getInitialState(tempFieldsCount),
            winCount: tempWinCount,
            fieldsCount: tempFieldsCount,
            tempFieldsCount,
            tempWinCount,
            playWithAI
        });
    }

    handleSettingsClick() {
        const settingsOpened = this.state.settingsOpened;
        this.setState({
            settingsOpened: !settingsOpened
        });
    }

    handleFieldsCountChange(count) {
        let tempFieldsCount = parseInt(count, 10);

        this.setState({
            tempFieldsCount
        });
    }

    handleWinCountChange(count) {
        let tempWinCount = parseInt(count, 10);
        this.setState({
            tempWinCount
        });
    }

    handlePlayWithAIChange(value) {
        if(!this.canAllowAI()) {            
            return false;
        }
        this.setState({
            playWithAI: value
        });
    }

    handlePlayAs(value) {
        if (this.state.playWithAI) {
            this.ai.player = value === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT;
        }
        this.setState({
            playAs: value
        });
    }

    handleSquareClick(row, column) {
        const { turn, playWithAI } = this.state.turn;
        if (playWithAI && turn !== this.state.playAs) {
            return;
        }
        this.makeTurn(row, column);
    }

    makeTurn(row, column) {
        const turn = this.state.turn;
        let values = this.state.values.slice(0, this.state.values.length);
        if (this.state.winner || values[row][column]) {
            return;
        }

        values[row][column] = turn === Constants.X_ELEMENT ? Constants.X_ELEMENT : Constants.O_ELEMENT;

        let winIndexes = this.checkWinner(row, column);
        let state = {};
        if (winIndexes.length) {
            state = {
                winner: turn,
                winIndexes
            }
        }
        state.values = values;
        state.turn = turn === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT;
        this.setState(state);
    }

    checkWinner(row, column, values, turn) {
        values = values === undefined ? this.state.values : values;
        turn = turn === undefined ? this.state.turn : turn;
        let result = this.checkWinnerHorizontal(row, column, values, turn);
        if (!result.length) {
            result = this.checkWinnerVertical(row, column, values, turn);
        }
        if (!result.length) {
            result = this.checkWinnerDiagonal(row, column, values, turn);
        }
        return result;
    }

    checkWinnerImpl(row, column, deltaRow, deltaColumn, values, turn) {
        const DIR_FORWARD = "forward";
        const DIR_BACKWARD = "backward";
        let winIndexes = [{ row, column }];
        for (let direction of [DIR_FORWARD, DIR_BACKWARD]) {
            let current = { row, column };
            let currentDeltaRow = deltaRow;
            let currentDeltaColumn = deltaColumn;
            if (direction === DIR_BACKWARD) {
                currentDeltaRow *= -1;
                currentDeltaColumn *= -1
            }

            current.row += currentDeltaRow;
            current.column += currentDeltaColumn;

            while (
                current.row >= 0 &&
                current.column >= 0 &&
                current.row < values.length &&
                current.column < values.length &&
                values[current.row][current.column] === turn
            ) {
                winIndexes.push({ ...current });
                current.row += currentDeltaRow;
                current.column += currentDeltaColumn;
            }
            if (winIndexes.length >= this.state.winCount) {
                return winIndexes;
            }
        }
        return [];
    }

    checkWinnerHorizontal(i, j, values, turn) {
        return this.checkWinnerImpl(i, j, 0, 1, values, turn);
    }

    checkWinnerVertical(i, j, values, turn) {
        return this.checkWinnerImpl(i, j, 1, 0, values, turn);
    }

    checkWinnerDiagonal(i, j, values, turn) {
        let leftToRight = this.checkWinnerImpl(i, j, 1, 1, values, turn);
        if (!leftToRight.length) {
            let rightToLeft = this.checkWinnerImpl(i, j, -1, 1, values, turn);
            if (rightToLeft.length) {
                return rightToLeft;
            }
        }
        return leftToRight;
    }

    canAllowAI() {
        if(this.state.tempFieldsCount > 5) {
            alert("AI is too slow with much fields");
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        if (this.state.playWithAI &&
            !this.state.winner &&
            this.state.turn === this.ai.player) {
            setTimeout(() => {
                this.ai.board = this.state.values;
                this.ai.makeTurn();
            }, 500); //500 msec delay for smoother gameplay
        }
    }
}

export default Game;