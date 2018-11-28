import { combineReducers } from 'redux'
import { boardListReducer } from './boardList';
import { boardReducer } from './board';

const rootReducer = combineReducers({
  boardListReducer,
  boardReducer
});

export default rootReducer;