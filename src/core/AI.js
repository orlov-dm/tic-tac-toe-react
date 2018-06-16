import { cloneDeep } from '../core';

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

function _getEmptyIndexesFromBoard() {
  const result = [];
  _board.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value) {
        return;
      }
      result.push({ row: i, column: j });
    });
  });
  return result;
}

function _checkWinnerBoard(board, color) {
  const turn = color === 1 ? _player : _humanPlayer;
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
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

function _score(node, depth, color, emptyIndexes) {
  if (_checkWinnerBoard(node, color)) {
    return _SCORE * depth;
  }
  if (_checkWinnerBoard(node, -color)) {
    return -_SCORE * depth;
  }
  if (depth === 0 || !emptyIndexes.length) {
    return 0;
  }
  return null;
}


// implementation of https://en.wikipedia.org/wiki/Negamax#Negamax_with_alpha_beta_pruning
function _negamax(node, depth, alpha, beta, color) {
  const emptyIndexes = _getEmptyIndexesFromBoard(node);
  const terminateStateScore = _score(node, depth, color, emptyIndexes);
  if (terminateStateScore !== null) {
    return terminateStateScore;
  }
  let best = -Infinity;
  for (let i = 0; i < emptyIndexes.length; i += 1) {
    const index = emptyIndexes[i];
    // set the empty spot to the current player
    node[index.row][index.column] = color === 1 ? _player : _humanPlayer;
    const value = -_negamax(node, depth - 1, -beta, -alpha, -color);
    node[index.row][index.column] = null;
    if (depth === _DEPTH && value > best) {
      _resultIndex = index;
    }
    if (_DEBUG && depth === _DEPTH) {
      _allIndexes.push({
        index,
        value,
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

class AI {
  static set gameCore(gC) {
    _gameCore = gC;

    if (_DEBUG) {
      _allIndexes = [];
    }
  }

  static set board(b) {
    _board = cloneDeep(b);
  }

  static set player(p) {
    _player = p;
    _humanPlayer = -p;
  }

  static get player() {
    return _player;
  }

  static set onMadeTurn(callback) {
    _onMadeTurn = callback;
  }

  static makeTurn() {
    if (!_onMadeTurn) {
      return;
    }

    _negamax(_board, _DEPTH, -Infinity, Infinity, 1);
    if (_resultIndex) {
      _onMadeTurn(_resultIndex);
      _resultIndex = null;
      if (_DEBUG) {
        _allIndexes = [];
      }
    }
  }
}
export default AI;
