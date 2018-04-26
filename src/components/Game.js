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
        const settings = {
            fieldsCount: this.MIN_FIELD_SIZE,
            winCount: this.MIN_FIELD_SIZE,
            playWithAI: true,
            playAs: Constants.X_ELEMENT,
        }
        this.state = {
            ...settings,
            settings,
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

        return {
            turn: Constants.X_ELEMENT,
            values: values,
            winner: null,
            winIndexes: null
        }
    }

    renderStatus() {
        let status = null;
        const { winner, values, turn } = this.state;
        if (winner) {
            status = [<div key={1}>Winner </div>, <Square key={2} isWinner={true} value={winner} />];
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
                status = [
                    <div key={1}>Turn of</div>,
                    <Square key={2} isWinner={false} value={turn} />
                ];
            }
        }
        return status;
    }

    render() {
        const { fieldsCount, winCount, turn, values, winIndexes, settings, settingsOpened } = this.state;
        const settingsOpenedClass = settingsOpened ? " opened" : "";
        const playAsX = settings.playAs === Constants.X_ELEMENT ? " on" : "";
        const playAsO = settings.playAs === Constants.O_ELEMENT ? " on" : "";
        return (
            <div className="game-wrapper">
                <div className="game">
                    <Board
                        fieldsCount={fieldsCount}
                        winCount={winCount}
                        turn={turn}
                        values={values}
                        winIndexes={winIndexes}
                        onClick={(row, column) => this.handleSquareClick(row, column)}
                    />
                    <div className="status title">{this.renderStatus()} <button id="restart" className="inverse" onClick={() => this.handleRestart()}>Restart</button></div>
                </div>
                <div className={`panel-settings${settingsOpenedClass}`}>
                    <div>
                        <label htmlFor="fields_count">Field size:</label>
                        <div>
                            <input id="fields_count" min="1" max={this.MAX_FIELD_SIZE} type="number" value={settings.fieldsCount} onChange={(event) => this.handleFieldsCountChange(event.target.value)} />
                        </div>

                        <label htmlFor="win_count">Fields to win:</label>
                        <div>
                            <input id="win_count" type="number" value={settings.winCount} onChange={(event) => this.handleWinCountChange(event.target.value)} />
                        </div>

                        <label htmlFor="ai_play">Play with AI:</label>
                        <div>
                            <input type="checkbox" id="ai_play" checked={settings.playWithAI} onChange={(event) => this.handlePlayWithAIChange(event.target.checked)} />
                        </div>

                        <button className={"button-square" + playAsX} onClick={() => this.handlePlayAs(Constants.X_ELEMENT)}>
                            <Square value={Constants.X_ELEMENT} />
                        </button>
                        <button className={"button-square" + playAsO} onClick={() => this.handlePlayAs(Constants.O_ELEMENT)}>
                            <Square value={Constants.O_ELEMENT} />
                        </button>


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
        let { winCount, fieldsCount, playWithAI } = this.state.settings;
        const { playAs } = this.state.settings;
        if (isNaN(fieldsCount) || fieldsCount < this.MIN_FIELD_SIZE) {
            alert(`Field size less than ${this.MIN_FIELD_SIZE}`);
            fieldsCount = this.MIN_FIELD_SIZE;
        } else if (fieldsCount > this.MAX_FIELD_SIZE) {
            alert(`Field size more than ${this.MAX_FIELD_SIZE}`);
            fieldsCount = this.MAX_FIELD_SIZE;
        }

        if (isNaN(winCount) || winCount <= 0) {
            alert("Fields to win less than 0");
            winCount = 1;
        } else if (winCount > this.MAX_FIELD_SIZE || winCount > fieldsCount) {
            alert("Fields to win more than Field size");
            winCount = fieldsCount;
        }

        if (playWithAI && !this.canAllowAI()) {
            playWithAI = false;
        }
        const settings = {
            winCount,
            fieldsCount,
            playWithAI,
            playAs
        };
        this.setState({
            ...this.getInitialState(fieldsCount),
            ...settings,
            settings
        });
    }

    handleRestart() {
        const fieldsCount = this.state.fieldsCount;
        this.setState({
            ...this.getInitialState(fieldsCount)
        });
    }

    handleSettingsClick() {
        const settingsOpened = this.state.settingsOpened;
        this.setState({
            settingsOpened: !settingsOpened
        });
    }

    handleFieldsCountChange(count) {
        const fieldsCount = parseInt(count, 10);
        const settings = {
            ...this.state.settings,
            fieldsCount
        };
        this.setState({
            settings
        });
    }

    handleWinCountChange(count) {
        const winCount = parseInt(count, 10);
        const settings = {
            ...this.state.settings,
            winCount
        };
        this.setState({
            settings
        });
    }

    handlePlayWithAIChange(playWithAI) {
        const settings = {
            ...this.state.settings,
            playWithAI
        };
        this.setState({
            settings
        });
    }

    handlePlayAs(playAs) {
        if (this.state.playWithAI) {
            this.ai.player = playAs === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT;
        }
        const settings = {
            ...this.state.settings,
            playAs
        };
        this.setState({
            settings
        });
    }

    handleSquareClick(row, column) {
        const { turn, playWithAI, playAs } = this.state;
        if (playWithAI && turn !== playAs) {
            return false;
        }
        this.makeTurn(row, column);
    }

    makeTurn(row, column) {
        const { turn, winner } = this.state;
        let values = this.state.values.slice();
        if (winner || values[row][column]) {
            return;
        }

        values[row][column] = turn === Constants.X_ELEMENT ? Constants.X_ELEMENT : Constants.O_ELEMENT;

        const winIndexes = this.checkWinner(row, column);
        let state = {
            values,
            turn: turn === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT
        };
        if (winIndexes.length) {
            state = {
                winner: turn,
                winIndexes
            }
        }
        this.setState(state);
    }

    canAllowAI() {
        if (this.state.settings.fieldsCount > 5) {
            alert("AI is too slow with much fields");
            return false;
        }
        return true;
    }

    checkWinner(row, column, values = this.state.values, turn = this.state.turn) {
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
        const leftToRight = this.checkWinnerImpl(i, j, 1, 1, values, turn);
        if (!leftToRight.length) {
            const rightToLeft = this.checkWinnerImpl(i, j, -1, 1, values, turn);
            if (rightToLeft.length) {
                return rightToLeft;
            }
        }
        return leftToRight;
    }

    componentDidUpdate() {
        const { playWithAI, winner, turn, values, playAs } = this.state;
        if (playWithAI &&
            !winner &&
            turn !== playAs) {
            setTimeout(() => {
                this.ai.board = values;
                this.ai.makeTurn();
            }, 500); //500 msec delay for smoother gameplay
        }
    }
}

export default Game;