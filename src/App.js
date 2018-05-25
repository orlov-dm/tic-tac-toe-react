import React, { Component } from 'react';
import './App.css';
import VisibleGame from './containers/VisibleGame';
import Menu from './components/Menu';

class App extends Component {
  constructor(props) {
    super(props);

    props.getGamesList();
  }

  render() {
    const { isInGame, isOnline, gamesList } = this.props;
    const onGameEnd = isOnline ? this.props.onlineGameEnd : this.props.gameEnd;
    
    let i = 0;
    
    const games = gamesList.items.map((item) => {
          return <div key= {i++}>{item.test}</div>
    });
    

    return (
      <div className="App">
        <header><div className="title">Tic-Tac-Toe</div></header>
        <main>
          {
            isInGame ?
              <VisibleGame isOnline={isOnline} onGameEnd={onGameEnd} /> :
              <Menu onGameStart={this.props.gameStart} onOnlineGameStart={this.props.onlineGameStart} />
          }    
          {
            games
          }      
        </main>       
        <footer>
          Contact information: <a href="https://github.com/orlov-dm">D.E.Orlov</a>
        </footer>
      </div>
    );
  }

/*   componentDidMount() {
    fetch('/test')
      .then(response => {                
        return response.json();
      }).then(response => {
        alert(response.test);
      });
  } */
};

export default App;