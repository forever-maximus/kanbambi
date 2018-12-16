import React, { Component } from 'react';
import './UpdateTaskModal.css';

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
      this.props.closeModal();
    }
  }

  handleKeyboard = (event) => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className='modal-overlay'>
        <div ref={this.setWrapperRef} className='modal-wrapper'>

        </div>
      </div>
    );
  }
};

export default UpdateTaskModal;