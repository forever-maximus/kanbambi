import axios from 'axios';

export const GET_BOARD_LIST_REQUEST = 'GET_BOARD_LIST_REQUEST';
export const GET_BOARD_LIST_SUCCESS = 'GET_BOARD_LIST_SUCCESS';
export const GET_BOARD_LIST_FAILURE = 'GET_BOARD_LIST_FAILURE';

function getBoardListRequest() {
  return {
    type: GET_BOARD_LIST_REQUEST
  }
}

function getBoardListSuccess(boards) {
  return {
    type: GET_BOARD_LIST_SUCCESS,
    boards
  }
}

function getBoardListFailure(error) {
  return {
    type: GET_BOARD_LIST_FAILURE,
    error
  }
}

export function getBoardList() {
  return (dispatch) => {
    dispatch(getBoardListRequest());

    axios.get('http://localhost:8080/boards')
      .then(response => {
        dispatch(getBoardListSuccess(response.data.boards));
      })
      .catch(error => {
        dispatch(getBoardListFailure(error.message));
      });
  }
}