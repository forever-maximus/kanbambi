import React from 'react';
import TaskList from './TaskList';
import './StateColumn.css';
import { Droppable } from 'react-beautiful-dnd';
import { Icon } from 'semantic-ui-react';

const StateColumn = (props) => {
  return (
    <div className="state-column">
      <h3>{props.column.name}</h3>
      {
        <Droppable droppableId={props.column.id.toString()}>
          {
            (provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#cceeff' : '#eeeeee' }}
                {...provided.droppableProps}
                className="droppable-area"
              >
                <TaskList 
                  key={props.column.id} 
                  taskIds={props.column.tasks} 
                  tasks={props.tasks} 
                  openModal={props.openModal}
                />
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      }
      <a href='#' className='add-task-btn'>
        <Icon name='plus'></Icon>
        <span>Add another task</span>
      </a>
    </div>
  )
}

export default StateColumn;