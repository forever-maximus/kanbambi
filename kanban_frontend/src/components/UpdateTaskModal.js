import React, { Component } from 'react';
import './UpdateTaskModal.css';
import { Form, Input, TextArea, Icon } from 'semantic-ui-react';
import Modal from './Modal';
import LabelList from './LabelList';
import LabelEditorContainer from './LabelEditorContainer';

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
        const data = {
          clientId: this.props.clientId,
          boardId: this.props.boardId,
          task: task
        }
        this.props.updateTask(data);
    }
  }

  handleChange = (ev, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Modal updateTask={this.updateTask} closeModal={this.props.closeModal}>
        <div id='update-task-modal' className='modal-wrapper'>
          <Form autoComplete='off' className='update-task-form'>
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
            <div className='label-component'>
              <h3>LABELS</h3>
              <div className='label-display'>
                <LabelList 
                  task={this.props.task}
                  labels={this.props.labels}
                />
                <LabelEditorContainer />
              </div>
            </div>
            <div className='heading-wrapper'>
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