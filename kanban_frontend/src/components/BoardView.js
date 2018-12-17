import React, { Component } from 'react';
import StateColumnGrid from './StateColumnGrid';
import BoardHeader from './BoardHeader';
import UpdateTaskModal from './UpdateTaskModal';
import { DragDropContext } from 'react-beautiful-dnd';
import './BoardView.css';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalTaskId: ''
    }
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoard(boardId);
  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination) return;

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
      this.props.changeTaskState(newTask, source.index, source.droppableId);
    }
  };

  closeModal = () => this.setState({isModalOpen: false, modalTaskId: ''});

  openModal = (id) => this.setState({isModalOpen: true, modalTaskId: id});

  checkDisplayModal = () => {
    if (this.state.isModalOpen) {
      return (
        <UpdateTaskModal 
          closeModal={this.closeModal} 
          task={this.props.tasks[this.state.modalTaskId]} 
          updateTask={this.props.updateTask}
        />
      );
    }
  }

  render() {
    return (
      <div className='board-wrapper'>
        <BoardHeader 
          board={this.props.board} 
          updateBoard={this.props.updateBoard} 
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='column-grid-wrapper'>
            <StateColumnGrid 
              board={this.props.board} 
              stateColumns={this.props.stateColumns}
              tasks={this.props.tasks}
              updateTask={this.props.updateTask} 
              openModal={this.openModal}
            />
          </div>
        </DragDropContext>
        { this.checkDisplayModal() }
      </div>
    );
  }
}

export default BoardView;