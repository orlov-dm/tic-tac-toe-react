import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';

import Constants from '../constants';
import Square from './Square';

const getWinnerStatus = (winner) => {
    return [<div key={1}>Winner </div>, <Square key={2} isWinner={true} value={winner} />];
};

const getDrawStatus = () => {
    return <div>{Constants.DRAW_ELEMENT_NAME}</div>;
}

const getNextTurnStatus = (turn, playAs) => {
    const nextTurnStatus = [
        <div key={1}>Turn of</div>,
        <Square key={2} isWinner={false} value={turn} />
    ];
    return playAs === turn ? 
        [...nextTurnStatus, <p>(You)</p>] :
        nextTurnStatus;
}

const getWaitingStatus = () => {
    return <div>Waiting for second player</div>;
}

const getStatusBar = (props) => {
    const { winner, values, turn, isSecondPlayerReady, playAs } = props;    
    if(!isSecondPlayerReady) {
        return getWaitingStatus();
    }
    if (winner) {
        return getWinnerStatus(winner);
    } 
    if (isGameFinished(values)) {
        return getDrawStatus();
    } 
    return getNextTurnStatus(turn, playAs);
}


const isGameFinished = (values) => {
    if(values) {
        let isFinished = true;        
        values.forEach((row) => {
            row.forEach((value) => {
                if(!isFinished) {
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
}

const Status = (props) => {    
    const { onRestart, onExit } = props;    
    return (
        <div className="status title">
            { getStatusBar(props) }
            <button id="restart" className="inverse" onClick={onRestart}>
                <FontAwesomeIcon icon={faSync}></FontAwesomeIcon> Restart
            </button>
            <button id="quit" className="inverse" onClick={onExit}>
                <FontAwesomeIcon icon={faSync}></FontAwesomeIcon> Exit
            </button>
        </div>
    );
};

Status.propTypes = {
    winner: PropTypes.number,
    values: PropTypes.array,
    turn: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired
};

export default Status;