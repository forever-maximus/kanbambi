import axios from 'axios';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

function updateTaskRequest(task) {
  return {
    type: UPDATE_TASK_REQUEST,
    task
  }
}

function updateTaskSuccess(task, prevStateColumnId) {
  return {
    type: UPDATE_TASK_SUCCESS,
    task,
    prevStateColumnId
  }
}

function updateTaskFailure(error) {
  return {
    type: UPDATE_TASK_FAILURE,
    error
  }
}

export function updateTask(task, prevStateColumnId) {
  return (dispatch) => {
    dispatch(updateTaskRequest(task));

    axios.patch('http://localhost:8080/tasks/' + task.id, task)
      .then(response => {
        dispatch(updateTaskSuccess(response.data.task, prevStateColumnId));
      })
      .catch(error => {
        dispatch(updateTaskFailure(error.message));
      });
  }
}


export const REORDER_TASK_REQUEST = 'REORDER_TASK_REQUEST';
export const REORDER_TASK_SUCCESS = 'REORDER_TASK_SUCCESS';
export const REORDER_TASK_FAILURE = 'REORDER_TASK_FAILURE';

function reorderTaskRequest(task, prevTaskIndex) {
  return {
    type: REORDER_TASK_REQUEST,
    task,
    prevTaskIndex
  }
}

function reorderTaskSuccess(task) {
  return {
    type: REORDER_TASK_SUCCESS,
    task
  }
}

function reorderTaskFailure(error) {
  return {
    type: REORDER_TASK_FAILURE,
    error
  }
}

export function reorderTask(task, prevTaskIndex) {
  return (dispatch) => {
    dispatch(reorderTaskRequest(task, prevTaskIndex));

    axios.patch('http://localhost:8080/tasks/' + task.id + '?prevOrder=' + (prevTaskIndex + 1), task)
      .then(response => {
        dispatch(reorderTaskSuccess(response.data.task));
      })
      .catch(error => {
        dispatch(reorderTaskFailure(error.message));
      });
  }
}