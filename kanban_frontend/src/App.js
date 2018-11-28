import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './containers/Home';
import Board from './containers/Board';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/boards/:id" component={Board} />
        </div>
      </Router>
    );
  }
}

export default App;
