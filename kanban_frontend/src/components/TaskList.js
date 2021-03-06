import React from 'react';
import Task from './Task';

const TaskList = props => (
  props.taskIds.map((taskId, i) => {
    const task = props.tasks[taskId];
    return (
      <Task 
        key={i} 
        task={task} 
        labels={props.labels}
        index={i} 
        openModal={props.openModal} 
      />
    );
  })
);

export default TaskList;