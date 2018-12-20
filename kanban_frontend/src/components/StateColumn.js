import React, { Component } from 'react';
import TaskList from './TaskList';
import NewTask from './NewTask';
import './StateColumn.css';
import { Droppable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

class StateColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewTask: false,
      title: '',
      description: ''
    }
  }

  addNewTask = () => this.setState({addNewTask: true});

  cancelNewTask = () => {
    this.setState({
      addNewTask: false,
      title: '',
      description: ''
    });
  }

  checkAddNewTask = () => {
    if (this.state.addNewTask) {
      return (
        <NewTask cancelNewTask={this.cancelNewTask} />
      );
    }
    return (
      <a href='#' className='add-task-btn' onClick={this.addNewTask}>
        <Icon name='plus'></Icon>
        <span>Add a task</span>
      </a>
    );
  }

  render() {
    return (
      <div className="state-column">
        <h3>{this.props.column.name}</h3>
        {
          <Droppable droppableId={this.props.column.id.toString()}>
            {
              (provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{ backgroundColor: snapshot.isDraggingOver ? '#cceeff' : '#eeeeee' }}
                  {...provided.droppableProps}
                  className="droppable-area"
                >
                  <TaskList 
                    key={this.props.column.id} 
                    taskIds={this.props.column.tasks} 
                    tasks={this.props.tasks} 
                    openModal={this.props.openModal}
                  />
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        }
        { this.checkAddNewTask() }
      </div>
    );
  }
}

export default StateColumn;