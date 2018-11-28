import { 
  GET_BOARD_LIST_REQUEST, 
  GET_BOARD_LIST_SUCCESS, 
  GET_BOARD_LIST_FAILURE 
} from '../actions/boardList';

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
    default:
      return state;
  }
}
