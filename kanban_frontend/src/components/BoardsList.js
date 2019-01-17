import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import CreateBoardModal from './CreateBoardModal';
import './BoardsList.css';

class BoardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  handleCreateNewBoard = () => this.setState({isModalOpen: true});

  closeModal = () => this.setState({isModalOpen: false});

  displayNewBoardModal = () => {
    if (this.state.isModalOpen) {
      return (
        <CreateBoardModal 
          closeModal={this.closeModal} 
          createBoard={this.props.createBoard}
        />
      );
    }
  }

  render() {
    return (
      <div className='boards-list-parent-wrapper'>
        <div className='boards-list-header'>
          <Icon name='user' />
          <h3>Boards</h3>
        </div>
        <div className='boards-list-wrapper'>
          {
            this.props.boards.map((board, i) => (
              <div className='board-item' key={i} onClick={this.props.chooseBoard(board.id)}>
                <div className='title'>{board.name}</div>
                <div className='description'>{board.description}</div>
              </div>
            ))
          }
          {
            <div className='board-item add-new-board-wrapper' onClick={this.handleCreateNewBoard}>
              <div><Icon name='plus' />Create new board...</div>
            </div>
          }
        </div>
        { this.displayNewBoardModal() }
      </div>
    );
  }
}

export default BoardsList;