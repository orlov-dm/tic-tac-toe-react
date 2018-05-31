import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class GamesList extends Component {
    constructor(props) {
        super(props);
        this.header = {
            id: "ID",
            name: "Name",
            player: "Player"
        };
    }

    render() {                        
        return (
            <div className="games-list">
                {
                    [
                        ...this.renderHeader(),
                        ...this.renderBody()
                    ]
                }
            </div>
        );
    }

    renderHeader() {
        const { header } = this;
        return Object.keys(header).map(field => this.renderGameHeaderField(header, field));
    }

    renderBody() {
        const { games, hoveredRow } = this.props;
        let index = 0;
        return games.map((game) => {
            const isHovered = hoveredRow !== null ? index === hoveredRow : false;
            const row = Object.keys(this.header).map(field => {
                return this.renderGameField(game, field, isHovered);
            });
            ++index;
            return row;
        });        
    }

    renderGameHeaderField(header, field) {
        return (
            <div
                key={`header-field-${field}`}
                className={`field-${field} cell header-cell`}>
                {header[field]}
            </div>
        );
    }

    renderGameField(game, field, isHovered) {
        const className = `field-${field} cell body-cell` + (isHovered ? " hovered" : "");
        return (
            <div
                key={`field-${field}-${game.id}`}
                className={className}
                onMouseOver={(event) => this.onCellMouseOver(event)}>
                {game[field]}
            </div>
        );
    }

    onCellMouseOver(event) {
        const { hoverRow } = this.props;

        //get row index
        const { parentNode } = event.target;
        const index = Array.prototype.indexOf.call(parentNode.children, event.target);
        const indexesInRow = Object.keys(this.header).length;
        const row = Math.floor(index / indexesInRow) - 1;  //-1 for header
        hoverRow(row);
    }
};

const mapStateToProps = state => ({
    hoveredRow: state.gamesList.hoveredRow
});

const mapDispatchToProps = dispatch => ({
    hoverRow: (row) => dispatch(Actions.gamesListHoverRow(row))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesList);