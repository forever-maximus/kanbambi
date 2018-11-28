import React, { Component } from 'react';
import BoardsList from './BoardsList';

class HomeView extends Component {
  componentDidMount() {
    this.props.getBoardList();
  }

  handleSelectBoard = (boardId) => {
    return () => {
      this.props.history.push({
        pathname: '/boards/' + boardId
      });
    }
  }

  render() {
    return (
      <div>
        <BoardsList 
          boards={this.props.boards}
          chooseBoard={this.handleSelectBoard}
        />
      </div>
    );
  }
}

export default HomeView;