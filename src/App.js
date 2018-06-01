import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import VisibleGame from './containers/VisibleGame';
import Menu from './components/Menu';
import GamesList from './containers/GamesList';

class App extends Component {
  constructor(props) {
    super(props);

    props.requestGamesList();
  }

  render() {
    const { isInGame, isOnline, gamesList } = this.props;
    const onGameEnd = isOnline ? () => {
      return this.props.onlineGameEnd(this.props.onlineGameID)
    } : this.props.gameEnd;

    return (
      <div className="App">
        <header><div className="title">Tic-Tac-Toe</div></header>
        <main>
          {
            isInGame ?
              <VisibleGame isOnline={isOnline} onGameEnd={onGameEnd} /> :
              [
                <Menu key={1} onGameStart={this.props.gameStart} onOnlineGameStart={this.props.onlineGameStart} />,
                <GamesList key={2} games={gamesList.isFetching ? [] : gamesList.items} onGameJoin={this.props.onlineGameJoin} />
              ]
          }
        </main>
        <footer>
          Contact information: <a href="https://github.com/orlov-dm">D.E.Orlov</a>
        </footer>
      </div>
    );
  }
};

App.propTypes = {
  isInGame: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  gamesList: PropTypes.object.isRequired,
  gameStart: PropTypes.func.isRequired,
  gameEnd: PropTypes.func.isRequired,
  onlineGameStart: PropTypes.func.isRequired,
  onlineGameJoin: PropTypes.func.isRequired,
  onlineGameEnd: PropTypes.func.isRequired,
  requestGamesList: PropTypes.func.isRequired,
  onlineGameID: PropTypes.number
}

export default App;