import React, { Component } from 'react';

class BoardList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBoards();
  }

  boardsList = (boards) => (
    boards.map((board, i) => <li key={i}>{board.name}</li>)
  )

  render() {
    return (
      <div><ul>{this.boardsList(this.props.boards)}</ul></div>
    );
  }
}

export default BoardList;