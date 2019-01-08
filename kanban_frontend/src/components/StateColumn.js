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
      newTaskDescription: '',
      adjustScroll: false,
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

  componentDidUpdate() {
    // This is a work around to get the scroll to go to the bottom.
    // Causes a second rerender when adding new task. TODO - work out better way.
    if (this.state.adjustScroll) {
      this.setState({ adjustScroll: false });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  openAddNewTask = () => {
    document.addEventListener('keydown', this.handleKeyboard);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({addNewTask: true, adjustScroll: true});
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

  setDroppableWrapperRef = (node) => {
    this.droppableWrapperRef = node;
  }

  addNewTaskButton = () => {
    if (!this.state.addNewTask) {
      return (
        <span href='#' className='add-task-btn' onClick={this.openAddNewTask}>
          <Icon name='plus'></Icon>
          <span>Add a task</span>
        </span>
      );
    }
  }

  createNewTaskComponent = () => {
    if (this.state.addNewTask) {
      this.scrollToBottom();
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
  }

  scrollToBottom = () => {
    this.droppableWrapperRef.scrollTop = this.droppableWrapperRef.scrollHeight;
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
          <div ref={this.setDroppableWrapperRef} className="task-droppable-wrapper">
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
                    { this.createNewTaskComponent() }
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>
        }
        { this.addNewTaskButton() }
      </div>
    );
  }
}

export default StateColumn;