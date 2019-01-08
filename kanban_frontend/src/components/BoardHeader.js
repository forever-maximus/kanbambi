import React, { Component } from 'react';
import { Button, Popup, Divider, Input, Icon } from 'semantic-ui-react';
import './BoardHeader.css';

class BoardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      renameInput: ''
    }
  }

  openPopup = () => this.setState({isOpen: true});

  closePopup = () => this.setState({isOpen: false});

  handleChange = (ev, { name, value }) => this.setState({ [name]: value });

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') this.renameBoard();
  }

  renameBoard = () => {
    if (this.state.renameInput !== this.props.board.name) {
      this.props.updateBoard(this.props.board.id, {name: this.state.renameInput});
    }
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div className='board-header-wrapper'>
        <Popup
          trigger={<button className='board-title'>{this.props.board.name}</button>}
          on='click'
          className='rename-board-popup'
          open={this.state.isOpen}
          onOpen={this.openPopup}
          onClose={this.closePopup}
          position='bottom left'
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
            <Input 
              placeholder='Name' 
              className='input'
              value={this.state.renameInput}
              name='renameInput'
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            <Button 
              color='green' 
              content='Rename' 
              onClick={this.renameBoard} 
            />
          </div>
        </Popup>
      </div>
    );
  }
}

export default BoardHeader;