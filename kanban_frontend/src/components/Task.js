import React from 'react';
import { Card } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import './Task.css';

const Task = (props) => (
  <Draggable draggableId={props.task.id} index={props.index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className='task-container'
      >
        <Card fluid>
          <Card.Content header={props.task.title} />
          <Card.Content description={props.task.description} />
        </Card>
      </div>
    )}
  </Draggable>
)

export default Task;