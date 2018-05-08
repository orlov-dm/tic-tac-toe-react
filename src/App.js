import React, { Component } from 'react';
import './App.css';
import VisibleGame from './containers/VisibleGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header><div className="title">Tic-Tac-Toe</div></header>
        <main>
          <VisibleGame/>
        </main>
        <footer>
          Contact information: <a href="https://github.com/orlov-dm">D.E.Orlov</a>
        </footer>
      </div>
    );
  }
}

export default App;