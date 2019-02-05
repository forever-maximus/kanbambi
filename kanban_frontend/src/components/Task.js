import React from 'react';
import { Card } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd';
import LabelList from './LabelList';
import './Task.css';

const Task = (props) => {
  const checkLabels = () => {
    if (props.task.labels.length > 0) {
      return (
        <LabelList 
          task={props.task} 
          labels={props.labels} 
        />
      );
    }
  }

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='task-container'
        >
          <Card fluid onClick={() => props.openModal(props.task.id)}>
            <Card.Content>
              <div className='title header'>{props.task.title}</div>
              { checkLabels() }
              <div className='description'>{props.task.description}</div>
            </Card.Content>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;