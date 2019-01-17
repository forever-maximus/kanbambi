import { 
  GET_BOARD_LIST_REQUEST, 
  GET_BOARD_LIST_SUCCESS, 
  GET_BOARD_LIST_FAILURE,
} from '../actions/boardList';
import {
  CREATE_BOARD_REQUEST,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_FAILURE
} from '../actions/board';

const initialState = {
  loading: false,
  boards: [],
  error: null
};

export function boardListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_BOARD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: action.boards
      }
    case GET_BOARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case CREATE_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: [...state.boards, action.board]
      }
    case CREATE_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state;
  }
}
