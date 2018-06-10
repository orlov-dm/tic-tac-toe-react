import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class GamesList extends Component {
  static renderGameHeaderField(header, field) {
    return (
      <div
        key={`header-field-${field}`}
        className={`field-${field} cell header-cell`}
      >
        {header[field]}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.header = {
      id: 'ID',
      /* name: 'Name', */
      author: 'Author',
    };

    this.rowToID = {};
  }

  onCellDoubleClick(event) {
    const { games } = this.props;
    const row = this.getRowByCell(event.target);
    if (row === null || row >= Object.keys(games).length) {
      return false;
    }
    const { onGameJoin } = this.props;
    onGameJoin(this.rowToID[row]);
    return true;
  }

  onCellMouseOver(event) {
    const { onRowHover } = this.props;

    // get row index
    const row = this.getRowByCell(event.target);
    onRowHover(row);
  }

  getRowByCell(cellNode) {
    const { parentNode } = cellNode;
    const index = Array.prototype.indexOf.call(parentNode.children, cellNode);
    const indexesInRow = Object.keys(this.header).length;
    return Math.floor(index / indexesInRow) - 1; // -1 for header
  }

  renderBody() {
    const { games, hoveredRow } = this.props;
    let index = 0;
    return Object.values(games).map((game) => {
      const isHovered = hoveredRow !== null ? index === hoveredRow : false;
      const row = Object.keys(this.header).map(field =>
        this.renderGameField(game, field, isHovered));
      this.rowToID[index] = game.id;
      index += 1;
      return row;
    });
  }

  renderGameField(game, field, isHovered) {
    const hovered = isHovered ? ' hovered' : '';
    const className = `field-${field} cell body-cell}${hovered}`;
    return (
      <div
        key={`field-${field}-${game.id}`}
        className={className}
        onMouseOver={event => this.onCellMouseOver(event)}
        onFocus={event => this.onCellMouseOver(event)} // todo check
        onDoubleClick={event => this.onCellDoubleClick(event)}
      >
        {game[field]}
      </div>
    );
  }

  renderHeader() {
    const { header } = this;
    return Object.keys(header).map(field => this.renderGameHeaderField(header, field));
  }

  render() {
    return (
      <div className="games-list">
        {
          [
            ...this.renderHeader(),
            ...this.renderBody(),
          ]
        }
      </div>
    );
  }
}

GamesList.propTypes = {
  hoveredRow: PropTypes.number.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGameJoin: PropTypes.func.isRequired,
  onRowHover: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  hoveredRow: state.gamesList.hoveredRow,
});

const mapDispatchToProps = dispatch => ({
  onRowHover: row => dispatch(Actions.gamesListHoverRow(row)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesList);
