import React, { Component } from 'react';
import StateColumnGrid from './StateColumnGrid';
import './BoardView.css';

class BoardView extends Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoard(boardId);
  }

  render() {
    return (
      <div className='column-grid-wrapper'>
        <StateColumnGrid 
          board={this.props.board} 
          stateColumns={this.props.stateColumns}
          tasks={this.props.tasks}
          updateTask={this.props.updateTask} 
        />
      </div>
    );
  }
}

export default BoardView;