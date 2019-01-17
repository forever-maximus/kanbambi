import React, { Component } from 'react';
import Modal from './Modal';
import { Form, Input, TextArea, Icon, Button } from 'semantic-ui-react';
import './CreateBoardModal.css';

class CreateBoardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      submitDisabled: true
    }
  }

  componentDidMount() {
    // TODO - this hack is just to cause the wrapperRef for the modal window to be passed to the
    // modal parent component - on initial render wrapperRef isn't set in time to be passed to modal
    // REPLACE THIS WITH SOMETHING BETTER!
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.state.submitDisabled && this.state.name !== '' && this.state.description !== '') {
      this.setState({submitDisabled: false});
    } else if (this.state.submitDisabled === false && (
        this.state.name === ''
        || this.state.description === '')
      ) {
      this.setState({submitDisabled: true});
    }
  }

  handleChange = (ev, { name, value }) => this.setState({ [name]: value });

  setWrapperRef = (node) => this.wrapperRef = node;

  handleCreateBoard = () => {
    const board = {
      name: this.state.name,
      description: this.state.description
    }
    this.props.createBoard(board);
    this.props.closeModal();
  }

  render() {
    return (
      <Modal closeModal={this.props.closeModal} wrapperRef={this.wrapperRef}>
        <div ref={this.setWrapperRef} className='create-board-modal-wrapper'>
          <Form autoComplete='off'>
            <Icon 
              name='close' 
              className='close-modal' 
              onClick={this.props.closeModal}
            />
            <div className='input-wrapper name'>
              <Input 
                value={this.state.name} 
                placeholder='Add board name...' 
                name='name'
                onChange={this.handleChange}
              />
            </div>
            <div className='input-wrapper description'>
              <TextArea 
                placeholder='Add board description...' 
                value={this.state.description} 
                name='description'
                onChange={this.handleChange}
                autoHeight
              />
            </div>
            <div>
              <Button 
                disabled={this.state.submitDisabled}
                color='green' 
                content='Create Board'
                onClick={this.handleCreateBoard}
              />
            </div>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default CreateBoardModal;