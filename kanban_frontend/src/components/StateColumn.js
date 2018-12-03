import React from 'react';
import TaskList from './TaskList';
import './StateColumn.css';
import { Droppable } from 'react-beautiful-dnd';

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
                />
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      }
    </div>
  )
}

export default StateColumn;