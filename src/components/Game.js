import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import Constants from '../constants';
import Status from './Status';
import SettingsButton from './SettingsButton';
import SettingsPanel from './SettingsPanel';
import { cloneDeep } from '../core';
import AI from '../core/AI';
import GameCore from '../core/Game';

class Game extends Component {    
    constructor(props) {
        super(props);
        const { settings } = props;
        this.state = {                   
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
        const { initializeBoard } = this.props;
        initializeBoard(fieldsCount);
        return {
            turn: Constants.X_ELEMENT,
            winner: null,
            winIndexes: null
        }
    }

    render() {
        const { winIndexes, winner, settingsOpened, turn } = this.state;
        const { boardValues, settings } = this.props;
        const { fieldsCount, winCount } = settings;
        return (
            <div className="game-wrapper">
                <div className="game">
                    <Board
                        fieldsCount={fieldsCount}
                        winCount={winCount}
                        turn={turn}
                        values={boardValues}
                        winIndexes={winIndexes}
                        onClick={(row, column) => this.handleSquareClick(row, column)}
                    />
                    <Status                        
                        winner={winner}
                        values={boardValues}
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
        const { saveSettings } = this.props;
        if (settings.playWithAI) {
            this.ai.player = -settings.playAs;
        }
        
        this.gameCore.winCount = settings.winCount;
        
        this.setState({
            ...this.getInitialState(settings.fieldsCount)            
        });
        saveSettings(settings);
    }

    handleRestart() {
        const { fieldsCount } = this.props.settings;
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
        const { turn } = this.state;
        const { settings } = this.props;
        const { playWithAI, playAs } = settings;
        if (playWithAI && turn !== playAs) {
            return false;
        }
        this.makeTurn(row, column);
    }

    makeTurn(row, column) {
        const { turn, winner } = this.state;
        //todo fix: make array full copy
        const { boardValues, setSquareValue } = this.props;        
        if (winner || boardValues[row][column]) {
            return;
        }
        let values = cloneDeep(boardValues);        
        /* values[row][column] = turn; */        
        const winIndexes = this.gameCore.checkWinner(row, column, values, turn);
        let state = {            
            turn: -turn
        };
        if (winIndexes.length) {
            state = {
                winner: turn,
                winIndexes
            }
        }
        this.setState(state);
        setSquareValue({row, column}, turn);
    }    

    componentDidUpdate() {
        const { winner, turn } = this.state;
        const { boardValues, settings } = this.props;
        const { playWithAI, playAs } = settings;
        if (playWithAI &&
            !winner &&
            turn !== playAs) {
            setTimeout(() => {
                this.ai.board = boardValues;
                this.ai.makeTurn();
            }, 500); //delay for smoother gameplay
        }
    }
}

Game.propTypes = {
    initializeBoard: PropTypes.func.isRequired,
    setSquareValue: PropTypes.func.isRequired,
    boardValues: PropTypes.array.isRequired
}

export default Game;