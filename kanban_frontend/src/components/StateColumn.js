import React from 'react';
import Task from './Task';
import './StateColumn.css';

const StateColumn = (props) => {
  return (
    <div>
      <h3>{props.column.name}</h3>
      {
        props.column.tasks.map((taskId, i) => {
          const task = props.tasks[taskId];
          return (
            <div key={i} 
              draggable 
              onDragStart={(ev) => props.onDragStart(ev, task)} 
              className='task-wrapper'
            >
              <Task key={i} task={task} />
            </div>
          );
        })
      }
    </div>
  )
}

export default StateColumn;