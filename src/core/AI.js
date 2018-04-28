import Constants from '../constants/constants';

const _SCORE = 10;
const _DEPTH = 7;
const _DEBUG = false;

let _board = null;
let _player = null;
let _humanPlayer = null;
let _allIndexes = null;
let _resultIndex = null;
let _gameCore = null;
let _onMadeTurn = null;

function _emptyIndexes() {
    let result = [];
    for (let i = 0; i < _board.length; ++i) {
        for (let j = 0; j < _board[i].length; ++j) {
            if (_board[i][j]) {
                continue;
            }
            result.push({ row: i, column: j });
        }
    }
    return result;
}

function _checkWinnerBoard(board, color) {
    const turn = color === 1 ? _player : _humanPlayer;
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            if (board[i][j] === turn) {
                const winIndexes = _gameCore.checkWinner(i, j, board, turn);
                if (winIndexes.length) {
                    return true;
                }
            }
        }
    }
    return false;
}

function _negamax(node, depth, alpha, beta, color) {
    const emptyIndexes = _emptyIndexes(node);
    const terminateStateScore = _score(node, depth, color, emptyIndexes);
    if(terminateStateScore !== null) {
        return terminateStateScore;
    }        
    let best = -Infinity;
    for (const index of emptyIndexes) {
        // set the empty spot to the current player
        node[index.row][index.column] = color === 1 ? _player : _humanPlayer;
        let value = -_negamax(node, depth - 1, -beta, -alpha, -color);
        node[index.row][index.column] = null;
        if (depth === _DEPTH && value > best) {
            _resultIndex = index;
        }
        if (_DEBUG && depth === _DEPTH) {
            _allIndexes.push({
                index,
                value
            });
        }
        best = Math.max(best, value);
        alpha = Math.max(alpha, value);
        if (alpha >= beta) {
            break;
        }
    }

    return best;
}

function _score(node, depth, color, emptyIndexes) {
    if (_checkWinnerBoard(node, color)) {
        return _SCORE*depth;
    }
    if (_checkWinnerBoard(node, -color)) {
        return -_SCORE*depth;
    }        
    if (depth === 0 || !emptyIndexes.length) {
        return 0;
    }
    return null;
}

class AI {
    constructor(gameCore) {
        _gameCore = gameCore;

        if(_DEBUG) {
            _allIndexes = [];
        }
    }
    
    set board(b) {
        _board = [];
        b.forEach((row) => {
            return _board.push([...row]);
        });
    }

    set player(p) {
        _player = p;
        _humanPlayer = p === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT;
    }

    get player() {
        return _player;
    }

    set onMadeTurn(callback) {
        _onMadeTurn = callback;
    }

    makeTurn() {
        if(!_onMadeTurn) {
            return;
        }

        _negamax(_board, _DEPTH, -Infinity, Infinity, 1);
        if (_resultIndex) {
            _onMadeTurn(_resultIndex);
            _resultIndex = null;
            if(_DEBUG) {
                _allIndexes = [];
            }
        }
    }
}
export default AI;