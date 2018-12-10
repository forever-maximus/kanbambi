import React, { Component } from 'react';
import { Button, Popup, Divider, Input, Icon } from 'semantic-ui-react';
import './BoardHeader.css';

class BoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  openPopup = () => this.setState({isOpen: true});

  closePopup = () => this.setState({isOpen: false});

  render() {
    return (
      <div className='board-header-wrapper'>
        <Popup
          trigger={<a href='#'><span className='board-title'>{this.props.board.name}</span></a>}
          on='click'
          className='rename-board-popup'
          open={this.state.isOpen}
          onOpen={this.openPopup}
          onClose={this.closePopup}
        >
          <div className='popup-header'>
            <span>Rename Board</span>
            <span className='close-button' onClick={this.closePopup}>
              <Icon name='close' />
            </span>
          </div>
          <Divider />
          <div>
            <label>Name</label>
            <Input placeholder='Name' className='input' defaultValue={this.props.board.name} />
            <Button color='green' content='Rename' />
          </div>
        </Popup>
      </div>
    );
  }
}

export default BoardHeader;