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
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // Dropped in the same place it started - do nothing
      return;
    }

    const task = this.props.tasks[draggableId];
    const newTask = {
      ...task, 
      stateColumnId: Number(destination.droppableId),
      order: destination.index + 1
    };

    if (destination.droppableId === source.droppableId) {
      // Dropped in same state column - therefore just a reorder
      this.props.reorderTask(newTask, source.index);
    } else {
      // Dropped in different state column - update task state and order
      console.log('Task change state detected!');
    }

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