let winCount = null;
class Game {
  constructor(props) {
    const { winCount: value } = props;
    winCount = value;
  }

  static set winCount(value) {
    winCount = value;
  }

  static checkWinner(row, column, values, turn) {
    let result = Game.checkWinnerHorizontal(row, column, values, turn);
    if (!result.length) {
      result = Game.checkWinnerVertical(row, column, values, turn);
    }
    if (!result.length) {
      result = Game.checkWinnerDiagonal(row, column, values, turn);
    }
    return result;
  }

  static checkWinnerHorizontal(i, j, values, turn) {
    return Game.checkWinnerImpl(i, j, 0, 1, values, turn);
  }

  static checkWinnerVertical(i, j, values, turn) {
    return Game.checkWinnerImpl(i, j, 1, 0, values, turn);
  }

  static checkWinnerDiagonal(i, j, values, turn) {
    const leftToRight = this.checkWinnerImpl(i, j, 1, 1, values, turn);
    if (!leftToRight.length) {
      const rightToLeft = this.checkWinnerImpl(i, j, -1, 1, values, turn);
      if (rightToLeft.length) {
        return rightToLeft;
      }
    }
    return leftToRight;
  }

  static checkWinnerImpl(row, column, deltaRow, deltaColumn, values, turn) {
    const winIndexes = [{ row, column }];
    Game.DIRECTIONS.forEach((direction) => {
      if (winIndexes.length >= winCount) {
        return;
      }
      const current = { row, column };
      let currentDeltaRow = deltaRow;
      let currentDeltaColumn = deltaColumn;
      if (direction === Game.DIR_BACKWARD) {
        currentDeltaRow *= -1;
        currentDeltaColumn *= -1;
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
    });
    return winIndexes;
  }
}
Game.DIR_FORWARD = 'forward';
Game.DIR_BACKWARD = 'backward';
Game.DIRECTIONS = [Game.DIR_FORWARD, Game.DIR_BACKWARD];

export default Game;
