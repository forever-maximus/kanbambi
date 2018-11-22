import React, { Component } from 'react';
import './App.css';
import Boards from './containers/Boards';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Boards />
      </div>
    );
  }
}

export default App;
