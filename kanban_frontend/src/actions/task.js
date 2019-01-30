import axios from 'axios';
import API_ROOT from '../config';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const UPDATE_TASK_REFRESH = 'UPDATE_TASK_REFRESH';

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

export function updateTaskRefresh(task) {
  return {
    type: UPDATE_TASK_REFRESH,
    task
  }
}

export function updateTask(data) {
  return (dispatch) => {
    dispatch(updateTaskRequest(data.task));

    axios.patch(API_ROOT + '/tasks/' + data.task.id, data)
      .then(response => {
        dispatch(updateTaskSuccess(response.data.task));
      })
      .catch(error => {
        dispatch(updateTaskFailure(error.message));
      });
  }
}


export const ADD_NEW_TASK_REQUEST = 'ADD_NEW_TASK_REQUEST';
export const ADD_NEW_TASK_SUCCESS = 'ADD_NEW_TASK_SUCCESS';
export const ADD_NEW_TASK_FAILURE = 'ADD_NEW_TASK_FAILURE';
export const ADD_NEW_TASK_REFRESH = 'ADD_NEW_TASK_REFRESH';

function addNewTaskRequest(task) {
  return {
    type: ADD_NEW_TASK_REQUEST,
    task
  }
}

function addNewTaskSuccess(task) {
  return {
    type: ADD_NEW_TASK_SUCCESS,
    task
  }
}

function addNewTaskFailure(error) {
  return {
    type: ADD_NEW_TASK_FAILURE,
    error
  }
}

export function addNewTaskRefresh(task) {
  return {
    type: ADD_NEW_TASK_REFRESH,
    task
  }
}

export function addNewTask(taskData) {
  return (dispatch) => {
    dispatch(addNewTaskRequest(taskData.task));

    axios.post(API_ROOT + '/tasks', taskData)
      .then(response => {
        dispatch(addNewTaskSuccess(response.data.task));
      })
      .catch(error => {
        dispatch(addNewTaskFailure(error.message));
      });
  }
}


export const REORDER_TASK_REQUEST = 'REORDER_TASK_REQUEST';
export const REORDER_TASK_SUCCESS = 'REORDER_TASK_SUCCESS';
export const REORDER_TASK_FAILURE = 'REORDER_TASK_FAILURE';
export const REORDER_TASK_REFRESH = 'REORDER_TASK_REFRESH';

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

export function reorderTaskRefresh(task, prevTaskIndex) {
  return {
    type: REORDER_TASK_REFRESH,
    task,
    prevTaskIndex
  }
}

export function reorderTask(taskData, prevTaskIndex) {
  return (dispatch) => {
    dispatch(reorderTaskRequest(taskData.task, prevTaskIndex));

    axios.patch(API_ROOT + '/tasks/' + taskData.task.id + '?prevOrder=' + (prevTaskIndex + 1), taskData)
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
export const CHANGE_TASK_STATE_REFRESH = 'CHANGE_TASK_STATE_REFRESH';

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

export function changeTaskStateRefresh(task, prevTaskIndex, taskPrevStateCol) {
  return {
    type: CHANGE_TASK_STATE_REFRESH,
    task,
    prevTaskIndex,
    taskPrevStateCol
  }
}

export function changeTaskState(taskData, prevTaskIndex, taskPrevStateCol) {
  return (dispatch) => {
    dispatch(changeTaskStateRequest(taskData.task, prevTaskIndex, taskPrevStateCol));

    const endpoint = '/tasks/' + taskData.task.id + '?prevOrder=' + (prevTaskIndex + 1) 
      + '&prevStateCol=' + taskPrevStateCol;
    axios.patch(API_ROOT + endpoint, taskData)
      .then(response => {
        dispatch(changeTaskStateSuccess(response.data.task));
      })
      .catch(error => {
        dispatch(changeTaskStateFailure(error));
      })
  }
}