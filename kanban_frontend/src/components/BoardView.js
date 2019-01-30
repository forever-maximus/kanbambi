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

    this.subscribeWebsocket();
  }

  subscribeWebsocket = () => {
    // send message to subscribe to updates for this board.
    if (this.props.websocket.readyState === 1) {
      // Check that websocket is connected.
      this.props.websocket.send(JSON.stringify({
        currentBoard: this.props.match.params.id
      })); 
    }

    this.props.websocket.onopen = () => {
      // This is required if a user loads straight to a board without going via homepage,
      // as websocket connection will not be established yet.
      this.props.websocket.send(JSON.stringify({
        currentBoard: this.props.match.params.id
      })); 
    }
  }

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.props.getBoard(boardId);

    this.props.websocket.onmessage = message => {
      console.log(message.data);
      const ws_message = JSON.parse(message.data);
      const update_from_backend = ws_message.payload;
      const eventType = ws_message.eventType;
      const extraInfo = ws_message.details;

      if (eventType === 'createTask') {
        this.props.addNewTaskRefresh(update_from_backend);
      } else if (eventType === 'updateTask') {
        this.props.updateTaskRefresh(update_from_backend);
      } else if (eventType === 'reorderTask') {
        this.props.reorderTaskRefresh(update_from_backend, extraInfo.prevOrder);
      } else if (eventType === 'changeTaskState') {
        this.props.changeTaskStateRefresh(update_from_backend, extraInfo.prevOrder, extraInfo.prevStateCol);
      }
    }
  }

  componentWillUnmount() {
    this.props.websocket.onmessage = null;
  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // Dropped in the same place it started - do nothing
      return;
    }

    const task = this.props.tasks[draggableId];
    const taskData = {
      clientId: this.props.clientId,
      boardId: this.props.match.params.id,
      task: {
        ...task, 
        stateColumnId: Number(destination.droppableId),
        order: destination.index + 1
      }
    };

    if (destination.droppableId === source.droppableId) {
      // Dropped in same state column - therefore just a reorder
      this.props.reorderTask(taskData, source.index);
    } else {
      // Dropped in different state column - update task state and order
      this.props.changeTaskState(taskData, source.index, source.droppableId);
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
          clientId={this.props.clientId}
          boardId={this.props.match.params.id}
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
              addNewTask={this.props.addNewTask}
              openModal={this.openModal}
              isModalOpen={this.state.isModalOpen}
              clientId={this.props.clientId}
              boardId={this.props.match.params.id}
            />
          </div>
        </DragDropContext>
        { this.checkDisplayModal() }
      </div>
    );
  }
}

export default BoardView;