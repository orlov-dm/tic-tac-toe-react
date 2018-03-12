import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h1>Tic-Tac-Toe</h1></header>
        <main>
          <Game/>         
        </main>
        <footer>
          Contact information: <a href="mailto:dm.ed.orlov@gmail.com">D.E.Orlov</a>
        </footer>
      </div>
    );
  }
}

export default App;