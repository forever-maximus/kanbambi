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
      newTaskTitle: '',
      newTaskDescription: ''
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.addNewTask && props.isModalOpen) {
      // TODO - do I need to remove new task event listeners here maybe?
      // Someone has clicked to edit an existing task - need to close and reset new task state and handlers
      return ({
        addNewTask: false,
        newTaskTitle: '',
        newTaskDescription: ''
      });
    }
    return null;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  openAddNewTask = () => {
    document.addEventListener('keydown', this.handleKeyboard);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({addNewTask: true});
  }

  handleKeyboard = (event) => {
    if (event.key === 'Escape') {
      this.cancelNewTask();
    }
  }

  cancelNewTask = () => {
    this.setState({
      addNewTask: false,
      newTaskTitle: '',
      newTaskDescription: ''
    });
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.cancelNewTask();
    }
  }

  handleChange = (event) => this.setState({[event.target.name]: event.target.value});

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  checkAddNewTask = () => {
    if (this.state.addNewTask && !this.props.isModalOpen) {
      return (
        <div ref={this.setWrapperRef} className='new-task-container'>
          <NewTask 
            cancelNewTask={this.cancelNewTask} 
            handleAddNewTask={this.handleAddNewTask}
            handleChange={this.handleChange}
            title={this.state.newTaskTitle}
          />
        </div>
      );
    }
    return (
      <a href='#' className='add-task-btn' onClick={this.openAddNewTask}>
        <Icon name='plus'></Icon>
        <span>Add a task</span>
      </a>
    );
  }

  handleAddNewTask = () => {
    const newTask = {
      title: this.state.newTaskTitle,
      description: this.state.newTaskDescription,
      order: this.props.column.tasks.length + 1,
      stateColumnId: this.props.column.id
    }
    this.props.addNewTask(newTask);
    this.cancelNewTask();
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