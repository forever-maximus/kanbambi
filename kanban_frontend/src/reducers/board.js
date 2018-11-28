import {
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE
} from '../actions/board';
import {
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE
} from '../actions/task';
import { arrayToObject } from '../utils';

const initialState = {
  loading: false,
  board: {},
  stateColumns: {},
  tasks: {},
  error: null
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOARD_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_BOARD_SUCCESS:
      let stateColumns = arrayToObject(action.board.state_columns, 'id');
      const stateColumnIds = Object.keys(stateColumns).map(id => Number(id));
      const board = {...action.board, state_columns: stateColumnIds};

      let tasks = {};
      Object.entries(stateColumns).forEach(([key, value]) => {
        const columnTasks = arrayToObject(value.tasks, 'id');
        tasks = {...tasks, ...columnTasks};
        value.tasks = Object.keys(columnTasks).map(id => Number(id));
      });

      return {
        ...state,
        loading: false,
        error: null,
        board: board,
        stateColumns: stateColumns,
        tasks: tasks
      }

    case GET_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case UPDATE_TASK_SUCCESS:
      const tasksOnPrevCol = state.stateColumns[action.prevStateColumnId].tasks.filter(taskId => (
        taskId !== action.task.id
      ));

      return {
        ...state,
        stateColumns: {
          ...state.stateColumns,
          [action.prevStateColumnId]: {
            ...state.stateColumns[action.prevStateColumnId],
            tasks: tasksOnPrevCol
          },
          [action.task.stateColumnId]: {
            ...state.stateColumns[action.task.stateColumnId],
            tasks: [...state.stateColumns[action.task.stateColumnId].tasks, action.task.id]
          }
        },
        tasks: {
          ...state.tasks,
          [action.task.id]: action.task
        },
        loading: false,
        error: null
      }

    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state;
  }
}
