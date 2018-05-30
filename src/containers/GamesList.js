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
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        );
    }

    renderHeader() {
        const { header } = this;
        return (
            <div className="header">
                {Object.keys(header).map(field => this.renderGameHeaderField(header, field))}
            </div>
        );
    }

    renderBody() {
        const { games, hoveredRow } = this.props;
        let index = 0;
        return (
            <div className="body">
            {
                games.map((game) => {
                    const isHovered = hoveredRow !== null ? index === hoveredRow : false;
                    const row = Object.keys(game).map(field => {
                        return this.renderGameField(game, field, isHovered);
                    });
                    ++index;
                    return row;
                })
            }
            </div>
        );
    }

    renderGameHeaderField(header, field) {
        return (
            <div
                key={`header-field-${field}`}
                className={`field-${field} cell`}>
                {header[field]}
            </div>
        );
    }

    onCellMouseOver(event) {
        const { hoverRow } = this.props;

        //get row index
        const { parentNode } = event.target;
        const index = Array.prototype.indexOf.call(parentNode.children, event.target);
        const indexesInRow = Object.keys(this.header).length;
        const row = Math.floor(index / indexesInRow); 
        hoverRow(row);
    }

    renderGameField(game, field, isHovered) {
        const className = `field-${field} cell` + (isHovered ? " hovered" : "");
        return (
            <div
                key={`field-${field}-${game.id}`}
                className={className}
                onMouseOver={(event) => this.onCellMouseOver(event)}>
                {game[field]}
            </div>
        );
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