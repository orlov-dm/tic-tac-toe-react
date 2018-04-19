import Constants from '../constants/constants';

class AI {
    constructor(game) {
        this.game = game;
        this.level = 0;
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
        this.negamax(this.board, 10, -Infinity, Infinity, 1);
        if(this.resIndex) {
            this.game.handleSquareClick(this.resIndex.row, this.resIndex.column);        
            this.resIndex = null;
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
                if(board[i][j] === turn) {
                    let winIndexes = this.game.checkWinner(i, j, board, turn);
                    if(winIndexes.length) {
                        return true;
                    }
                }
            }
        }        
        return false;
    }    

    negamax(node, depth, alpha, beta, color) {
        if (depth === 0 || this.checkWinnerBoard(node, color)) {
            return color * this.score(color);
        }
        const availSpots = this.emptyIndexes(node);
        if(!availSpots.length) {
            return 0;
        }

        let best = -Infinity;
        for (let i = 0; i < availSpots.length; i++) {
            const index = availSpots[i]; 
            // set the empty spot to the current player            
            node[index.row][index.column] = color === 1 ? this.player : this.humanPlayer;            
            let value = -this.negamax(node, depth-1, beta*-1, alpha*-1, color*-1);
            node[index.row][index.column] = null;
            if(depth === 10 && value > best) {
                this.resIndex = index;
            }
            best = Math.max( best, value );            
            alpha = Math.max( alpha, value );
            if(alpha >= beta) {                
                break;
            }            
        }        
                
        return best;
    }

    score(color) {        
        return color*10;        
    }
}
export default AI;