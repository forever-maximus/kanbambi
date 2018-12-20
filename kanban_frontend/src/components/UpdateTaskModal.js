import React, { Component } from 'react';
import './UpdateTaskModal.css';
import { Form, Input, TextArea, Icon } from 'semantic-ui-react';

class UpdateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyboard);
    this.setState({
      title: this.props.task.title,
      description: this.props.task.description
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.updateTask();
      this.props.closeModal();
    }
  }

  handleKeyboard = (event) => {
    if (event.key === 'Escape') {
      this.updateTask();
      this.props.closeModal();
    }
  }

  handleCloseBtn = () => {
    this.updateTask();
    this.props.closeModal();
  }

  updateTask = () => {
    // Check if the task has been updated
    if (this.state.title !== this.props.task.title
      || this.state.description !== this.props.task.description) {
        // Call redux action to update
        const task = {
          id: this.props.task.id,
          title: this.state.title,
          description: this.state.description
        }
        this.props.updateTask(task);
    }
  }

  handleChange = (ev, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div className='modal-overlay'>
        <div ref={this.setWrapperRef} className='modal-wrapper'>
          <Form autoComplete='off'>
            <div className='modal-header'>
              <div>
                <Icon name='folder open'/>
              </div>
              <Input 
                className={`title editable modal-field`} 
                value={this.state.title} 
                placeholder='title...' 
                name='title'
                onChange={this.handleChange}
              />
              <Icon name='close' className='close-btn' onClick={this.handleCloseBtn} />
            </div>
            <div className='label-wrapper'>
              <div>
                <Icon name='list ul' />
              </div>
              <label>Description</label>
            </div>
            <TextArea 
              className={`description editable modal-field`}
              placeholder='description...' 
              value={this.state.description} 
              name='description'
              onChange={this.handleChange}
              autoHeight
            />
          </Form>
        </div>
      </div>
    );
  }
};

export default UpdateTaskModal;