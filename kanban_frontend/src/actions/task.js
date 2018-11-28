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