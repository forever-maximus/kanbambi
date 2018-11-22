import { combineReducers } from 'redux'
import { 
  GET_BOARDS_REQUEST, 
  GET_BOARDS_SUCCESS, 
  GET_BOARDS_FAILURE 
} from '../actions/boardList';

const initialState = {
  loading: false,
  boards: [],
  error: null
};

function boardListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARDS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        boards: action.boards
      }
    case GET_BOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  boardListReducer
});

export default rootReducer;