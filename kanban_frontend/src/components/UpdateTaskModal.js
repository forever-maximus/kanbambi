import React, { Component } from 'react';
import './UpdateTaskModal.css';
import { Form, Input, TextArea, Icon } from 'semantic-ui-react';
import Modal from './Modal';

class UpdateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.task.title,
      description: this.props.task.description
    });
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

  setWrapperRef = (node) => this.wrapperRef = node;

  render() {
    return (
      <Modal updateTask={this.updateTask} closeModal={this.props.closeModal} wrapperRef={this.wrapperRef}>
        <div ref={this.setWrapperRef} className='modal-wrapper'>
          <Form autoComplete='off'>
            <div className='modal-header'>
              <div className='icon-wrapper'>
                <Icon name='folder open'/>
              </div>
              <Input 
                className={`title editable modal-field`} 
                value={this.state.title} 
                placeholder='title...' 
                name='title'
                onChange={this.handleChange}
              />
              <Icon name='close' circular className='close-btn' onClick={this.handleCloseBtn} />
            </div>
            <div className='label-wrapper'>
              <div className='icon-wrapper'>
                <Icon name='list ul' />
              </div>
              <label>Description</label>
            </div>
            <div className='description-wrapper'>
              <TextArea 
                className={`description editable modal-field`}
                placeholder='description...' 
                value={this.state.description} 
                name='description'
                onChange={this.handleChange}
                autoHeight
              />
            </div>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default UpdateTaskModal;