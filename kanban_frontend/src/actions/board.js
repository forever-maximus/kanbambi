import axios from 'axios';

export const GET_BOARD_REQUEST = 'GET_BOARD_REQUEST';
export const GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS';
export const GET_BOARD_FAILURE = 'GET_BOARD_FAILURE';

function getBoardRequest() {
  return {
    type: GET_BOARD_REQUEST
  }
}

function getBoardSuccess(board) {
  return {
    type: GET_BOARD_SUCCESS,
    board
  }
}

function getBoardFailure(error) {
  return {
    type: GET_BOARD_FAILURE,
    error
  }
}

export function getBoard(id) {
  return (dispatch) => {
    dispatch(getBoardRequest());

    axios.get('http://localhost:8080/boards/' + id)
      .then(response => {
        dispatch(getBoardSuccess(response.data.board));
      })
      .catch(error => {
        dispatch(getBoardFailure(error.message));
      });
  }
}