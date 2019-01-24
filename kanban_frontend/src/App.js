import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './containers/Home';
import Board from './containers/Board';
import NavBar from './components/NavBar';
import { websocketAddress } from './config';

class App extends Component {
  constructor() {
    super();
    this.clientId = this.uuidv4()
    this.websocket = new WebSocket(websocketAddress + '?token=' + this.clientId);
  }

  uuidv4() {
    // This is from stackoverflow post https://stackoverflow.com/a/2117523
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> c / 4).toString(16)
    )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='app-navbar'>
            <NavBar />
          </div>
          <div className='app-main'>
            <Route path="/" exact component={Home} />
            <Route path="/boards/:id"
              render={ props => <Board websocket={this.websocket} clientId={this.clientId} {...props} /> }
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
