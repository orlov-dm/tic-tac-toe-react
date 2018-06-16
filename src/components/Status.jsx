import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';

import Constants from '../constants';
import Square from './Square';

const getWinnerStatus = winner =>
  [<div key={1}>Winner </div>, <Square key={2} isWinner value={winner} />];

const getDrawStatus = () => <div>{Constants.DRAW_ELEMENT_NAME}</div>;

const getNextTurnStatus = (turn, playAs) => {
  const nextTurnStatus = [
    <div key={1}>Turn of</div>,
    <Square key={2} isWinner={false} value={turn} />,
  ];
  return playAs === turn ?
    [...nextTurnStatus, <p>(You)</p>] :
    nextTurnStatus;
};

const getWaitingStatus = () => <div>Waiting for second player</div>;

const isGameFinished = (values) => {
  if (values) {
    let isFinished = true;
    values.forEach((row) => {
      row.forEach((value) => {
        if (!isFinished) {
          return;
        }
        if (!value) {
          isFinished = false;
        }
      });
    });
    return isFinished;
  }
  return false;
};

const getStatusBar = (props) => {
  const {
    winner,
    values,
    turn,
    isSecondPlayerReady,
    playAs,
  } = props;
  if (!isSecondPlayerReady) {
    return getWaitingStatus();
  }
  if (winner) {
    return getWinnerStatus(winner);
  }
  if (isGameFinished(values)) {
    return getDrawStatus();
  }
  return getNextTurnStatus(turn, playAs);
};

const Status = (props) => {
  const {
    winner,
    values,
    turn,
    isSecondPlayerReady,
    playAs,
    onExit,
    onRestart,
  } = props;
  return (
    <div className="status title">
      {getStatusBar({
        winner, values, turn, isSecondPlayerReady, playAs,
      })}
      <button id="restart" className="inverse" onClick={onRestart}>
        <FontAwesomeIcon icon={faSync} /> Restart
      </button>
      <button id="quit" className="inverse" onClick={onExit}>
        <FontAwesomeIcon icon={faSync} /> Exit
      </button>
    </div>
  );
};

Status.propTypes = {
  winner: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  isSecondPlayerReady: PropTypes.bool.isRequired,
  playAs: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
};

export default Status;
