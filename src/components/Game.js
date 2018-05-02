import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faRightArrow from '@fortawesome/fontawesome-free-solid/faArrowRight';
import faLeftArrow from '@fortawesome/fontawesome-free-solid/faArrowLeft';

import Board from './Board';
import Constants from '../constants/constants';
import Square from './Square';
import Status from './Status';
import AI from '../core/AI';
import GameCore from '../core/Game';

//TODO values as object

class Game extends Component {    
    static MIN_FIELD_SIZE = 3;
    static MAX_FIELD_SIZE = 10;
    constructor(props) {
        super(props);
        const settings = {
            fieldsCount: Game.MIN_FIELD_SIZE,
            winCount: Game.MIN_FIELD_SIZE,
            playWithAI: true,
            playAs: Constants.X_ELEMENT,
        }
        this.state = {
            ...settings,
            settings,
            ...this.getInitialState(Game.MIN_FIELD_SIZE)
        };

        this.handleRestart = this.handleRestart.bind(this);
        
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
        const { fieldsCount, winCount, turn, values, winIndexes, winner, settings, settingsOpened } = this.state;
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
                    <Status                        
                        winner={winner}
                        values={values}
                        turn={turn}
                        onRestart={this.handleRestart}
                    />
                </div>
                <div className={`panel-settings${settingsOpenedClass}`}>
                    <div>
                        <label htmlFor="fields_count">Field size:</label>
                        <div>
                            <input id="fields_count" min="1" max={Game.MAX_FIELD_SIZE} type="number" value={settings.fieldsCount} onChange={(event) => this.handleFieldsCountChange(event.target.value)} />
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
                    <FontAwesomeIcon icon={settingsOpenedClass ? faLeftArrow : faRightArrow}/>
                </button>
            </div>
        );
    }


    handleSave() {
        let { winCount, fieldsCount, playWithAI } = this.state.settings;
        const { playAs } = this.state.settings;
        if (isNaN(fieldsCount) || fieldsCount < Game.MIN_FIELD_SIZE) {
            alert(`Field size less than ${Game.MIN_FIELD_SIZE}`);
            fieldsCount = Game.MIN_FIELD_SIZE;
        } else if (fieldsCount > Game.MAX_FIELD_SIZE) {
            alert(`Field size more than ${Game.MAX_FIELD_SIZE}`);
            fieldsCount = Game.MAX_FIELD_SIZE;
        }

        if (isNaN(winCount) || winCount <= 0) {
            alert("Fields to win less than 0");
            winCount = 1;
        } else if (winCount > Game.MAX_FIELD_SIZE || winCount > fieldsCount) {
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

        if (playWithAI) {
            this.ai.player = -playAs;
        }
        
        this.gameCore.winCount = winCount;
        
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

    canAllowAI() {
        if (this.state.settings.fieldsCount > 5) {
            alert("AI is too slow with much fields");
            return false;
        }
        return true;
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