let _winCount = null;

function _checkWinnerImpl(row, column, deltaRow, deltaColumn, values, turn) {
    const DIR_FORWARD = "forward";
    const DIR_BACKWARD = "backward";
    let winIndexes = [{ row, column }];
    for (const direction of [DIR_FORWARD, DIR_BACKWARD]) {
        let current = { row, column };
        let currentDeltaRow = deltaRow;
        let currentDeltaColumn = deltaColumn;
        if (direction === DIR_BACKWARD) {
            currentDeltaRow *= -1;
            currentDeltaColumn *= -1
        }

        current.row += currentDeltaRow;
        current.column += currentDeltaColumn;

        while (
            current.row >= 0 &&
            current.column >= 0 &&
            current.row < values.length &&
            current.column < values.length &&
            values[current.row][current.column] === turn
        ) {
            winIndexes.push({ ...current });
            current.row += currentDeltaRow;
            current.column += currentDeltaColumn;
        }
        if (winIndexes.length >= _winCount) {
            return winIndexes;
        }
    }
    return [];
}

function _checkWinnerHorizontal(i, j, values, turn) {
    return _checkWinnerImpl(i, j, 0, 1, values, turn);
}

function _checkWinnerVertical(i, j, values, turn) {
    return _checkWinnerImpl(i, j, 1, 0, values, turn);
}

function _checkWinnerDiagonal(i, j, values, turn) {
    const leftToRight = _checkWinnerImpl(i, j, 1, 1, values, turn);
    if (!leftToRight.length) {
        const rightToLeft = _checkWinnerImpl(i, j, -1, 1, values, turn);
        if (rightToLeft.length) {
            return rightToLeft;
        }
    }
    return leftToRight;
}

class Game {                
    constructor(props) {
        const { winCount: value } = props;
        _winCount = value;
    }

    set winCount(value) {
        _winCount = value;
    }

    checkWinner(row, column, values, turn) {
        let result = _checkWinnerHorizontal(row, column, values, turn);
        if (!result.length) {
            result = _checkWinnerVertical(row, column, values, turn);
        }
        if (!result.length) {
            result = _checkWinnerDiagonal(row, column, values, turn);
        }
        return result;
    }   
}

export default Game;