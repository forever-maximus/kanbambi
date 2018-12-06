import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './containers/Home';
import Board from './containers/Board';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className='app-navbar'>
            <NavBar />
          </div>
          <div className='app-main'>
            <Route path="/" exact component={Home} />
            <Route path="/boards/:id" component={Board} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
