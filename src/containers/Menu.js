import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GamesList from '../containers/GamesList';

const Menu = ({
  onGameStart, onOnlineGameStart, onOnlineGameJoin, gamesList,
}) => (
  <div className="menu">
    <button onClick={onGameStart}>Start local game</button>
    <button onClick={onOnlineGameStart}>Create online game</button>
    <GamesList
      games={gamesList.isFetching ? [] : gamesList.items}
      onGameJoin={onOnlineGameJoin}
    />
  </div>
);


Menu.propTypes = {
  onGameStart: PropTypes.func.isRequired,
  onOnlineGameStart: PropTypes.func.isRequired,
  onOnlineGameJoin: PropTypes.func.isRequired,
  gamesList: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    fetchingError: PropTypes.object,
    hoveredRow: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  gamesList: state.gamesList,
});

export default connect(mapStateToProps)(Menu);
