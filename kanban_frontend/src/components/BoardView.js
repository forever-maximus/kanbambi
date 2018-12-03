import React, { Component } from 'react';
import StateColumnGrid from './StateColumnGrid';
import { DragDropContext } from 'react-beautiful-dnd';
import './BoardView.css';

class BoardView extends Component {
  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoard(boardId);
  }

  onDragEnd = result => {
    // TODO: reorder our column
    console.log(result);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className='column-grid-wrapper'>
          <StateColumnGrid 
            board={this.props.board} 
            stateColumns={this.props.stateColumns}
            tasks={this.props.tasks}
            updateTask={this.props.updateTask} 
          />
        </div>
      </DragDropContext>
    );
  }
}

export default BoardView;