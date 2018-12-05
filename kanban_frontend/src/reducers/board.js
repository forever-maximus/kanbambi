import {
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE
} from '../actions/board';
import {
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  REORDER_TASK_REQUEST,
  REORDER_TASK_SUCCESS,
  REORDER_TASK_FAILURE
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
      const stateColumnIds = action.board.state_columns.map(column => column.id);
      const board = {...action.board, state_columns: stateColumnIds};

      let tasks = {};
      Object.entries(stateColumns).forEach(([key, value]) => {
        const columnTasks = arrayToObject(value.tasks, 'id');
        tasks = {...tasks, ...columnTasks};
        value.tasks = value.tasks.map(task => task.id);
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

    case REORDER_TASK_REQUEST:
      // Get the old state column's tasks ordering.
      // Then remove the task from previous index and insert at new index.
      let newColumnTasks = state.stateColumns[action.task.stateColumnId].tasks;
      newColumnTasks.splice(action.prevTaskIndex, 1);
      newColumnTasks.splice(action.task.order - 1, 0, action.task.id);

      return {
        ...state,
        stateColumns: {
          ...state.stateColumns,
          [action.task.stateColumnId]: {
            ...state.stateColumns[action.task.stateColumnId],
            tasks: newColumnTasks
          }
        },
        tasks: {
          ...state.tasks,
          [action.task.id]: action.task
        },
        loading: true
      }

    case REORDER_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case REORDER_TASK_FAILURE:
    // TODO - if there was an error need to roll back state to show previous order
    return {
      ...state,
      loading: false,
      error: action.error
    }

    default:
      return state;
  }
}
