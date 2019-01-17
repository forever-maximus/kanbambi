import axios from 'axios';
import API_ROOT from '../config';

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

    axios.get(API_ROOT + '/boards/' + id)
      .then(response => {
        dispatch(getBoardSuccess(response.data.board));
      })
      .catch(error => {
        dispatch(getBoardFailure(error.message));
      });
  }
}

export const UPDATE_BOARD_REQUEST = 'UPDATE_BOARD_REQUEST';
export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS';
export const UPDATE_BOARD_FAILURE = 'UPDATE_BOARD_FAILURE';

function updateBoardRequest(board) {
  return {
    type: UPDATE_BOARD_REQUEST,
    board
  }
}

function updateBoardSuccess() {
  return {
    type: UPDATE_BOARD_SUCCESS
  }
}

function updateBoardFailure(error) {
  return {
    type: UPDATE_BOARD_FAILURE,
    error
  }
}

export function updateBoard(id, boardUpdate) {
  return (dispatch) => {
    dispatch(updateBoardRequest(boardUpdate));

    axios.patch(API_ROOT + '/boards/' + id, boardUpdate)
      .then(response => {
        dispatch(updateBoardSuccess());
      })
      .catch(error => {
        dispatch(updateBoardFailure(error));
      })
  }
}


export const CREATE_BOARD_REQUEST = 'CREATE_BOARD_REQUEST';
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS';
export const CREATE_BOARD_FAILURE = 'CREATE_BOARD_FAILURE';

function createBoardRequest() {
  return {
    type: CREATE_BOARD_REQUEST,
  }
}

function createBoardSuccess(board) {
  return {
    type: CREATE_BOARD_SUCCESS,
    board
  }
}

function createBoardError(error) {
  return {
    type: CREATE_BOARD_FAILURE,
    error
  }
}

export function createBoard(board) {
  return (dispatch) => {
    dispatch(createBoardRequest());

    axios.post(API_ROOT + '/boards', board)
      .then(response => {
        dispatch(createBoardSuccess(response.data.board));
      })
      .catch(error => {
        dispatch(createBoardError(error));
      });
  }
}