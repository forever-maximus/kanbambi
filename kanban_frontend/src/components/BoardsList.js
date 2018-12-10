import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import './BoardsList.css';

const BoardsList = (props) => {
  return (
    <div className='boards-list-parent-wrapper'>
      <div className='boards-list-header'>
        <Icon name='user' />
        <h3>Boards</h3>
      </div>
      <div className='boards-list-wrapper'>
        {
          props.boards.map((board, i) => (
            <Card className='board-item' key={i} onClick={props.chooseBoard(board.id)}>
              <Card.Content header={board.name} />
              <Card.Content description={board.description} />
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default BoardsList;