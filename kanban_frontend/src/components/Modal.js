import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  componentDidMount() {
    this.wrapperRef = document.getElementById(this.props.children.props.id);
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyboard);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
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