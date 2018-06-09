import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  componentDidUpdate() {
    const { fieldsCount } = this.props;
    const appNode = document.querySelector('.App');
    appNode.style.setProperty('--count', fieldsCount);
  }

  renderSquare(row, column) {
    const { winIndexes, values, onClick } = this.props;
    let isWinner = false;
    if (winIndexes) {
      for (const point of winIndexes) {
        if (point.row === row && point.column === column) {
          isWinner = true;
          break;
        }
      }
    }

    const value = values[row][column] ? values[row][column] : ''/* row + "_" + column */;
    const key = `${row}_${column}_square`;

    return (
      <Square
        key={key}
        isWinner={isWinner}
        value={value}
        onClick={() => onClick(row, column)}
      />);
  }

  render() {
    const { fieldsCount } = this.props;
    const squares = [];
    for (let i = 0; i < fieldsCount; i += 1) {
      for (let j = 0; j < fieldsCount; j += 1) {
        squares.push(this.renderSquare(i, j));
      }
    }

    return (
      <div className="board-wrapper">
        <div className="board">
          {squares}
        </div>
      </div>
    );
  }

}

export default Board;