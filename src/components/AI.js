import Constants from '../constants/constants';

const SCORE = 10;
const DEPTH = 7;

class AI {
    constructor(game) {
        this.game = game;
        this.level = 0;

        this.allIndexes = [];
    }

    static get SCORE() {
        return SCORE;
    }

    static get DEPTH() {
        return DEPTH;
    }

    set board(board) {
        this.b = [];
        board.forEach((row) => {
            return this.b.push([...row]);
        });
    }

    get board() {
        return this.b;
    }

    set player(p) {
        this.p = p;
        this.humanPlayer = p === Constants.X_ELEMENT ? Constants.O_ELEMENT : Constants.X_ELEMENT;
    }

    get player() {
        return this.p;
    }

    makeTurn() {
        this.negamax(this.board, AI.DEPTH, -Infinity, Infinity, 1);
        if (this.resIndex) {
            this.game.handleSquareClick(this.resIndex.row, this.resIndex.column);
            this.resIndex = null;
            this.allIndexes = [];
        }
    }

    emptyIndexes() {
        let result = [];
        for (let i = 0; i < this.board.length; ++i) {
            for (let j = 0; j < this.board[i].length; ++j) {
                if (this.board[i][j]) {
                    continue;
                }
                result.push({ row: i, column: j });
            }
        }
        return result;
    }

    checkWinnerBoard(board, color) {
        let turn = color === 1 ? this.player : this.humanPlayer;
        for (let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board[i].length; ++j) {
                if (board[i][j] === turn) {
                    let winIndexes = this.game.checkWinner(i, j, board, turn);
                    if (winIndexes.length) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    negamax(node, depth, alpha, beta, color) {
        const emptyIndexes = this.emptyIndexes(node);
        let terminateStateScore = this.score(node, depth, color, emptyIndexes);
        if(terminateStateScore !== null) {
            return terminateStateScore;
        }        
        let best = -Infinity;
        for (const index of emptyIndexes) {
            // set the empty spot to the current player
            node[index.row][index.column] = color === 1 ? this.player : this.humanPlayer;
            let value = -this.negamax(node, depth - 1, -beta, -alpha, -color);
            node[index.row][index.column] = null;
            if (depth === AI.DEPTH && value > best) {
                this.resIndex = index;
            }
            if (depth === AI.DEPTH) {
                this.allIndexes.push({
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


    score(node, depth, color, emptyIndexes) {
        if (this.checkWinnerBoard(node, color)) {
            return AI.SCORE*depth;
        }
        if (this.checkWinnerBoard(node, -color)) {
            return -AI.SCORE*depth;
        }        
        if (depth === 0 || !emptyIndexes.length) {
            return 0;
        }
        return null;
    }
}
export default AI;