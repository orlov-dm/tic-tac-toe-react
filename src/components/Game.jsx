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
      winCount: settings.winCount,
    });

    if (!props.isOnline) {
      this.ai = new AI(this.gameCore);
      this.ai.player = Constants.O_ELEMENT;
      this.ai.onMadeTurn = (index) => {
        this.makeTurn(index.row, index.column);
      };
    }
    this.reinit();
  }

  componentDidUpdate(prevProps/* , prevState, snapshot */) {
    if (this.props.isOnline) {
      return;
    }
    const { settings, game } = this.props;
    const { playWithAI, playAs } = settings;
    const { winner, turn } = game;

    const turnChanged = turn !== prevProps.game.turn;
    if (playWithAI &&
      !winner &&
      turnChanged &&
      playAs !== turn
    ) {
      const { boardValues } = this.props;
      setTimeout(() => {
        this.ai.board = boardValues;
        this.ai.makeTurn();
      }, 500); // ms delay for smoother gameplay
    }
  }

  handleSave(settings) {
    const { saveSettings } = this.props;
    if (settings.playWithAI) {
      this.ai.player = -settings.playAs;
    }

    this.gameCore.winCount = settings.winCount;
    saveSettings({
      ...settings,
      settingsOpened: false,
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
    if (!this.isSecondPlayerReady()) {
      return false;
    }
    this.makeTurn(row, column);
    return true;
  }

  isSecondPlayerReady() {
    const { isOnline, onlineOpponent } = this.props;
    return isOnline ? onlineOpponent !== null : true;
  }

  makeTurn(row, column) {
    const { game, boardValues,
      setSquareValue, gameTurnChange, gameSetWinner } = this.props;
    const { turn, winner } = game;
    if (winner || boardValues[row][column]) {
      return;
    }
    setSquareValue({ row, column }, turn);

    const winIndexes = this.gameCore.checkWinner(row, column, boardValues, turn);
    if (winIndexes.length) {
      gameSetWinner(turn, winIndexes);
    }
    gameTurnChange(-turn);
  }

  reinit(fieldsCount = this.props.settings.fieldsCount) {
    const { initializeBoard, gameReset } = this.props;
    initializeBoard(fieldsCount);
    gameReset();
  }

  render() {
    const {
      boardValues, settings, game, onGameEnd, isOnline, onlineOpponent,
    } = this.props;
    const {
      fieldsCount, winCount, settingsOpened, playAs,
    } = settings;
    const { winIndexes, winner, turn } = game;

    const onlineOpponentInfo = isOnline && onlineOpponent ? (<div>Opponent: {onlineOpponent.name}</div>) : "";
    const playAsInfo = isOnline ? (<div>PlayAs: {playAs}</div>) : "";
    return (
      <div className="game-wrapper">
        <div className="game">
          {onlineOpponentInfo}
          {playAsInfo}
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
            onExit={onGameEnd}
            isSecondPlayerReady={this.isSecondPlayerReady()}
            playAs={playAs}
          />
        </div>
        <SettingsPanel
          isOpened={settingsOpened}
          onSave={this.handleSave}
          {...settings}
        />
        <SettingsButton
          isOpened={settingsOpened}
          onClick={this.handleSettingsClick}
        />
      </div>
    );
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
  gameSetWinner: PropTypes.func.isRequired,
}

export default Game;