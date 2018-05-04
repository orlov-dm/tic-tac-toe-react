import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';

import Constants from '../constants/constants';
import Square from './Square';

const Status = (props) => {
    let status = null;
    const { winner, values, turn, onRestart } = props;
    if (winner) {
        status = [<div key={1}>Winner </div>, <Square key={2} isWinner={true} value={winner} />];
    } else {
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

        if (isFinished) {
            status = <div>{Constants.DRAW_ELEMENT_NAME}</div>;
        } else {
            status = [
                <div key={1}>Turn of</div>,
                <Square key={2} isWinner={false} value={turn} />
            ];
        }
    }
    
    return (
        <div className="status title">
            {status}
            <button id="restart" className="inverse" onClick={onRestart}>
                <FontAwesomeIcon icon={faSync}></FontAwesomeIcon> Restart
            </button>
        </div>
    );
};

Status.propTypes = {
    winner: PropTypes.number,
    values: PropTypes.array.isRequired,
    turn: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired
};

export default Status;