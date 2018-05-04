import React, { Component } from 'react';

import Board from './Board';
import Constants from '../constants/Constants';
import Status from './Status';
import SettingsButton from './SettingsButton';
import SettingsPanel from './SettingsPanel';
import AI from '../core/AI';
import GameCore from '../core/Game';

class Game extends Component {    
    constructor(props) {
        super(props);
        const settings = {
            fieldsCount: Constants.MIN_FIELD_SIZE,
            winCount: Constants.MIN_FIELD_SIZE,
            playWithAI: true,
            playAs: Constants.X_ELEMENT,
        }
        this.state = {
            ...settings,            
            ...this.getInitialState(Constants.MIN_FIELD_SIZE)
        };

        this.handleRestart = this.handleRestart.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.gameCore = new GameCore({
            winCount: settings.winCount
        });
        this.ai = new AI(this.gameCore);
        this.ai.player = Constants.O_ELEMENT;
        this.ai.onMadeTurn = (index) => {
            this.makeTurn(index.row, index.column);
        };
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

    render() {
        const { fieldsCount, winCount, turn, values, winIndexes, winner, settingsOpened } = this.state;        
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
                    <Status                        
                        winner={winner}
                        values={values}
                        turn={turn}
                        onRestart={this.handleRestart}
                    />
                </div>
                <SettingsPanel
                    settingsOpened={settingsOpened}                   
                    onSave={this.handleSave}
                />
                <SettingsButton 
                    settingsOpened={settingsOpened}
                    onClick={this.handleSettingsClick}
                />
            </div>
        );
    }


    handleSave(settings) {
        const { fieldsCount, winCount, playWithAI, playAs } = settings;
        if (playWithAI) {
            this.ai.player = -playAs;
        }
        
        this.gameCore.winCount = winCount;
        
        this.setState({
            ...this.getInitialState(fieldsCount),
            fieldsCount,
            winCount,
            playWithAI,
            playAs
        });
    }

    handleRestart() {
        const { fieldsCount } = this.state;
        this.setState({
            ...this.getInitialState(fieldsCount)
        });
    }

    handleSettingsClick() {
        const { settingsOpened } = this.state;
        this.setState({
            settingsOpened: !settingsOpened
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

        values[row][column] = turn;

        const winIndexes = this.gameCore.checkWinner(row, column, values, turn);
        let state = {
            values,
            turn: -turn
        };
        if (winIndexes.length) {
            state = {
                winner: turn,
                winIndexes
            }
        }
        this.setState(state);
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