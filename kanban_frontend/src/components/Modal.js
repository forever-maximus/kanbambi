import React, { Component } from 'react';
import FocusTrap from 'focus-trap-react';
import './Modal.css';

class Modal extends Component {
  unmountTrap = () => {
    if ('updateTask' in this.props) {
      this.props.updateTask();
    }
    this.props.closeModal();
  }

  render() {
    return (
      <div id='modal-overlay'>
        <FocusTrap
          focusTrapOptions={{
            onDeactivate: this.unmountTrap,
            clickOutsideDeactivates: true
          }}
        >
          {this.props.children}
        </FocusTrap>
      </div>
    );
  }
}

export default Modal;