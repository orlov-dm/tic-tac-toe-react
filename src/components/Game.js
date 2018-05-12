import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import Constants from '../constants';
import Status from './Status';
import SettingsButton from './SettingsButton';
import SettingsPanel from './SettingsPanel';
import AI from '../core/AI';
import GameCore from '../core/Game';

class Game extends Component {    
    constructor(props) {
        super(props);
        const { settings } = props;

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

    reinit(fieldsCount = this.props.settings.fieldsCount) {
        const { initializeBoard, gameReset } = this.props;
        initializeBoard(fieldsCount);
        gameReset();
    }

    render() {        
        const { boardValues, settings, game } = this.props;
        const { fieldsCount, winCount, settingsOpened } = settings;
        const { winIndexes, winner, turn } = game;
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
                    isOpened={settingsOpened}                   
                    onSave={this.handleSave}
                />
                <SettingsButton 
                    isOpened={settingsOpened}
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
        saveSettings({
            ...settings,
            settingsOpened: false
        });        
        this.reinit(settings.fieldsCount);        
    }

    handleRestart() {
        this.reinit();        
    }

    handleSettingsClick() {
        const { toggleSettings } = this.props;
        toggleSettings();
    }    

    handleSquareClick(row, column) {        
        const { settings, game } = this.props;
        const { playWithAI, playAs } = settings;
        const { turn } = game;
        if (playWithAI && turn !== playAs) {
            return false;
        }
        this.makeTurn(row, column);
    }


    makeTurn(row, column) {                
        const { game, boardValues,
            setSquareValue, gameTurnChange, gameSetWinner } = this.props;
        const { turn, winner } = game;
        if (winner || boardValues[row][column]) {
            return;
        }
        setSquareValue({row, column}, turn);

        const winIndexes = this.gameCore.checkWinner(row, column, boardValues, turn);        
        if (winIndexes.length) {
            gameSetWinner(turn, winIndexes);
        }        
        gameTurnChange(-turn);
    }    

    componentDidUpdate() {
        const { boardValues, settings, game } = this.props;
        const { playWithAI, playAs } = settings;
        const { winner, turn } = game;
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
    boardValues: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    saveSettings: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    gameReset: PropTypes.func.isRequired,
    gameTurnChange: PropTypes.func.isRequired,
    gameSetWinner: PropTypes.func.isRequired
}

export default Game;