import axios from 'axios';

export const GET_BOARDS_REQUEST = 'GET_BOARDS_REQUEST';
function getBoardsRequest() {
  return {
    type: GET_BOARDS_REQUEST
  }
}

export const GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS';
function getBoardsSuccess(boards) {
  return {
    type: GET_BOARDS_SUCCESS,
    boards
  }
}

export const GET_BOARDS_FAILURE = 'GET_BOARDS_FAILURE';
function getBoardsFailure(error) {
  return {
    type: GET_BOARDS_FAILURE,
    error
  }
}

export function getBoards() {
  return (dispatch) => {
    dispatch(getBoardsRequest());

    axios.get('http://localhost:8080/boards')
      .then(response => {
        dispatch(getBoardsSuccess(response.data.boards));
      })
      .catch(error => {
        dispatch(getBoardsFailure(error.message));
      });
  }
}