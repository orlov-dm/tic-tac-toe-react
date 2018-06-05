import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import VisibleGame from './containers/VisibleGame';
import Menu from './components/Menu';

class App extends Component {
  constructor(props) {
    super(props);

    props.requestGamesList();
  }

  render() {
    const { isInGame, onlineGameID, onlineOpponent, gamesList, onlineTurn } = this.props;
    const isOnline = this.isOnline();
    const onGameEnd = isOnline ? () => {
      return this.props.onlineGameEnd(onlineGameID)
    } : this.props.gameEnd;

    return (
      <div className="App">
        <header>
          <div className="title">Tic-Tac-Toe</div>
        </header>
        <main>
          {
            isInGame ?
              <VisibleGame 
                isOnline={isOnline}
                onlineOpponent={onlineOpponent}
                onGameEnd={onGameEnd}
                turn={onlineTurn}
              /> : 
              <Menu
                gamesList={gamesList}
                onGameStart={this.props.gameStart}
                onOnlineGameStart={this.props.onlineGameStart}
                onOnlineGameJoin={this.props.onlineGameJoin}
              />
          }
        </main>
        <footer>
          Contact information: <a href="https://github.com/orlov-dm">D.E.Orlov</a>
        </footer>
      </div>
    );
  }

  isOnline() {
    const { isInGame, onlineGameID } = this.props;
    return isInGame && onlineGameID != null;
  }
};

App.propTypes = {
  isInGame: PropTypes.bool.isRequired,
  gamesList: PropTypes.object.isRequired,
  gameStart: PropTypes.func.isRequired,
  gameEnd: PropTypes.func.isRequired,
  onlineGameStart: PropTypes.func.isRequired,
  onlineGameJoin: PropTypes.func.isRequired,
  onlineGameEnd: PropTypes.func.isRequired,
  requestGamesList: PropTypes.func.isRequired,
  onlineGameID: PropTypes.number,
  onlineTurn: PropTypes.number
}

export default App;