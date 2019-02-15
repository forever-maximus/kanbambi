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


export const ADD_TASK_LABEL_REQUEST = 'ADD_TASK_LABEL_REQUEST';
export const ADD_TASK_LABEL_SUCCESS = 'ADD_TASK_LABEL_SUCCESS';
export const ADD_TASK_LABEL_FAILURE = 'ADD_TASK_LABEL_FAILURE';
export const ADD_TASK_LABEL_REFRESH = 'ADD_TASK_LABEL_REFRESH';

function addTaskLabelRequest(taskId, labelId) {
  return {
    type: ADD_TASK_LABEL_REQUEST,
    taskId,
    labelId
  }
}

function addTaskLabelSuccess() {
  return {
    type: ADD_TASK_LABEL_SUCCESS
  }
}

function addTaskLabelFailure(error) {
  return {
    type: ADD_TASK_LABEL_FAILURE,
    error
  }
}

export function addTaskLabelRefresh(taskLabelData) {
  return {
    type: ADD_TASK_LABEL_REFRESH,
    taskId: taskLabelData.taskId,
    labelId: taskLabelData.labelId
  }
}

export function addTaskLabel(taskLabelData) {
  return (dispatch) => {
    dispatch(addTaskLabelRequest(taskLabelData.taskId, taskLabelData.labelId));

    const endpoint = '/tasks/' + taskLabelData.taskId + '/labels/' + taskLabelData.labelId;
    axios.patch(API_ROOT + endpoint, taskLabelData)
      .then(() => {
        dispatch(addTaskLabelSuccess());
      })
      .catch(error => {
        dispatch(addTaskLabelFailure(error));
      });
  }
}


export const REMOVE_TASK_LABEL_REQUEST = 'REMOVE_TASK_LABEL_REQUEST';
export const REMOVE_TASK_LABEL_SUCCESS = 'REMOVE_TASK_LABEL_SUCCESS';
export const REMOVE_TASK_LABEL_FAILURE = 'REMOVE_TASK_LABEL_FAILURE';
export const REMOVE_TASK_LABEL_REFRESH = 'REMOVE_TASK_LABEL_REFRESH';

function removeTaskLabelRequest(taskId, labelId) {
  return {
    type: REMOVE_TASK_LABEL_REQUEST,
    taskId,
    labelId
  }
}

function removeTaskLabelSuccess() {
  return {
    type: REMOVE_TASK_LABEL_SUCCESS
  }
}

function removeTaskLabelFailure(error) {
  return {
    type: REMOVE_TASK_LABEL_FAILURE,
    error
  }
}

export function removeTaskLabelRefresh(taskLabelData) {
  return {
    type: REMOVE_TASK_LABEL_REFRESH,
    taskId: taskLabelData.taskId,
    labelId: taskLabelData.labelId
  }
}

export function removeTaskLabel(taskLabelData) {
  return (dispatch) => {
    dispatch(removeTaskLabelRequest(taskLabelData.taskId, taskLabelData.labelId));

    const endpoint = '/tasks/' + taskLabelData.taskId + '/labels/' + taskLabelData.labelId
      + '?clientId=' + taskLabelData.clientId + '&boardId=' + taskLabelData.boardId;
    axios.delete(API_ROOT + endpoint)
      .then(() => {
        dispatch(removeTaskLabelSuccess());
      })
      .catch(error => {
        dispatch(removeTaskLabelFailure(error));
      });
  }
}