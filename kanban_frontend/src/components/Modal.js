import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  handleClickOutside = (event) => {
    if (this.props.wrapperRef && !this.props.wrapperRef.contains(event.target)) {
      if ('updateTask' in this.props) {
        this.props.updateTask();
      }
      this.props.closeModal();
    }
  }

  handleKeyboard = (event) => {
    if (event.key === 'Escape') {
      if ('updateTask' in this.props) {
        this.props.updateTask();
      }
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className='modal-overlay'>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;