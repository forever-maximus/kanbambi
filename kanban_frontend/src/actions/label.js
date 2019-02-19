import axios from 'axios';
import API_ROOT from '../config';

export const UPDATE_LABEL_REQUEST = 'UPDATE_LABEL_REQUEST';
export const UPDATE_LABEL_SUCCESS = 'UPDATE_LABEL_SUCCESS';
export const UPDATE_LABEL_FAILURE = 'UPDATE_LABEL_FAILURE';
export const UPDATE_LABEL_REFRESH = 'UPDATE_LABEL_REFRESH';

function updateLabelRequest(label) {
  return {
    type: UPDATE_LABEL_REQUEST,
    label
  }
}

function updateLabelSuccess() {
  return {
    type: UPDATE_LABEL_SUCCESS
  }
}

function updateLabelFailure(error) {
  return {
    type: UPDATE_LABEL_FAILURE,
    error
  }
}

export function updateLabelRefresh(label) {
  return {
    type: UPDATE_LABEL_REFRESH,
    label
  }
}

export function updateLabel(labelData) {
  return (dispatch) => {
    dispatch(updateLabelRequest(labelData.label));

    axios.patch(API_ROOT + '/labels/' + labelData.label.id, labelData)
      .then(response => {
        dispatch(updateLabelSuccess());
      })
      .catch(error => {
        dispatch(updateLabelFailure(error))
      });
  }
}