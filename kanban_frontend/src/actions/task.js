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

function updateTaskSuccess(task) {
  return {
    type: UPDATE_TASK_SUCCESS,
    task
  }
}

function updateTaskFailure(error) {
  return {
    type: UPDATE_TASK_FAILURE,
    error
  }
}

export function updateTask(task) {
  return (dispatch) => {
    dispatch(updateTaskRequest(task));

    axios.patch('http://localhost:8080/tasks/' + task.id, task)
      .then(response => {
        dispatch(updateTaskSuccess(response.data.task));
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


export const CHANGE_TASK_STATE_REQUEST = 'CHANGE_TASK_STATE_REQUEST';
export const CHANGE_TASK_STATE_SUCCESS = 'CHANGE_TASK_STATE_SUCCESS';
export const CHANGE_TASK_STATE_FAILURE = 'CHANGE_TASK_STATE_FAILURE';

function changeTaskStateRequest(task, prevTaskIndex, taskPrevStateCol) {
  return {
    type: CHANGE_TASK_STATE_REQUEST,
    task,
    prevTaskIndex,
    taskPrevStateCol
  }
}

function changeTaskStateSuccess(task) {
  return {
    type: CHANGE_TASK_STATE_SUCCESS,
    task
  }
}

function changeTaskStateFailure(error) {
  return {
    type: CHANGE_TASK_STATE_FAILURE,
    error
  }
}

export function changeTaskState(task, prevTaskIndex, taskPrevStateCol) {
  return (dispatch) => {
    dispatch(changeTaskStateRequest(task, prevTaskIndex, taskPrevStateCol));

    const endpoint = '/tasks/' + task.id + '?prevOrder=' + (prevTaskIndex + 1) + '&prevStateCol=' 
      + taskPrevStateCol;
    axios.patch('http://localhost:8080' + endpoint, task)
      .then(response => {
        dispatch(changeTaskStateSuccess(response.data.task));
      })
      .catch(error => {
        dispatch(changeTaskStateFailure(error));
      })
  }
}