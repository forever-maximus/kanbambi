import React from 'react';
import { Card } from 'semantic-ui-react';

const BoardsList = (props) => {
  return (
    props.boards.map((board, i) => (
      <Card key={i} onClick={props.chooseBoard(board.id)}>
        <Card.Content header={board.name} />
        <Card.Content description={board.description} />
      </Card>
    ))
  )
}

export default BoardsList;