import {
  GET_BOARD_REQUEST,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE
} from '../actions/board';
import {
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REFRESH,
  ADD_NEW_TASK_REQUEST,
  ADD_NEW_TASK_SUCCESS,
  ADD_NEW_TASK_FAILURE,
  ADD_NEW_TASK_REFRESH,
  REORDER_TASK_REQUEST,
  REORDER_TASK_SUCCESS,
  REORDER_TASK_FAILURE,
  REORDER_TASK_REFRESH,
  CHANGE_TASK_STATE_REQUEST,
  CHANGE_TASK_STATE_SUCCESS,
  CHANGE_TASK_STATE_FAILURE,
  CHANGE_TASK_STATE_REFRESH,
  ADD_TASK_LABEL_REQUEST,
  ADD_TASK_LABEL_SUCCESS,
  ADD_TASK_LABEL_FAILURE,
  ADD_TASK_LABEL_REFRESH,
  REMOVE_TASK_LABEL_REQUEST,
  REMOVE_TASK_LABEL_SUCCESS,
  REMOVE_TASK_LABEL_FAILURE,
  REMOVE_TASK_LABEL_REFRESH
} from '../actions/task';
import {
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAILURE,
  UPDATE_LABEL_REFRESH
} from '../actions/label';
import { arrayToObject } from '../utils';

const initialState = {
  loading: false,
  board: {},
  stateColumns: {},
  tasks: {},
  labels: {},
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
      const labels = arrayToObject(action.board.labels, 'id');
      const labelIds = action.board.labels.map(label => label.id);

      const board = {
        ...action.board, 
        state_columns: stateColumnIds, 
        labels: labelIds
      };

      let tasks = {};
      Object.entries(stateColumns).forEach(([key, value]) => {
        const columnTasks = arrayToObject(value.tasks, 'id');
        tasks = {...tasks, ...columnTasks};
        value.tasks = value.tasks.map(task => task.id);
      });

      Object.entries(tasks).forEach(([key, task]) => {
        task.labels = task.labels.map(label => label.id);
      });

      return {
        ...state,
        loading: false,
        error: null,
        board: board,
        stateColumns: stateColumns,
        tasks: tasks,
        labels: labels
      }

    case GET_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case UPDATE_BOARD_REQUEST:
      return {
        ...state,
        board: {
          ...state.board,
          ...action.board
        }
      }

    case UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case UPDATE_BOARD_FAILURE:
      // TODO - rollback optimistic update changes from update request action
      return {
        ...state,
        loading: false,
        error: action.error
      } 

    case UPDATE_TASK_REQUEST:
    case UPDATE_TASK_REFRESH:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id], 
            ...action.task
          }
        }
      }

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case UPDATE_TASK_FAILURE:
    // TODO - rollback optimistic update changes from update request action
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case ADD_NEW_TASK_REQUEST:
      return {
        ...state
      }

    case ADD_NEW_TASK_SUCCESS:
    case ADD_NEW_TASK_REFRESH:
      return {
        ...state,
        stateColumns: {
          ...state.stateColumns,
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

    case ADD_NEW_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case REORDER_TASK_REQUEST:
    case REORDER_TASK_REFRESH: {
      // Get the old state column's tasks ordering.
      // Then remove the task from previous index and insert at new index.
      let newColumnTasks = state.stateColumns[action.task.stateColumnId].tasks.slice();
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
      }
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


    case CHANGE_TASK_STATE_REQUEST:
    case CHANGE_TASK_STATE_REFRESH: {
      // Remove task from previous state column
      let prevColumnTasks = state.stateColumns[action.taskPrevStateCol].tasks.slice();
      prevColumnTasks.splice(action.prevTaskIndex, 1);

      // Add task to new state column's tasks
      let newColumnTasks = state.stateColumns[action.task.stateColumnId].tasks.slice();
      newColumnTasks.splice(action.task.order - 1, 0, action.task.id);

      return {
        ...state,
        stateColumns: {
          ...state.stateColumns,
          [action.task.stateColumnId]: {
            ...state.stateColumns[action.task.stateColumnId],
            tasks: newColumnTasks
          },
          [action.taskPrevStateCol]: {
            ...state.stateColumns[action.taskPrevStateCol],
            tasks: prevColumnTasks
          }
        },
        tasks: {
          ...state.tasks,
          [action.task.id]: action.task
        }
      }
    }

    case CHANGE_TASK_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case CHANGE_TASK_STATE_FAILURE:
    // TODO - if there was an error need to roll back state to show previous state
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case ADD_TASK_LABEL_REQUEST:
    case ADD_TASK_LABEL_REFRESH:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            labels: [...state.tasks[action.taskId].labels, Number(action.labelId)]
          }
        }
      }

    case ADD_TASK_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case ADD_TASK_LABEL_FAILURE:
    // TODO - if there was an error need to roll back state to show previous state
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case REMOVE_TASK_LABEL_REQUEST:
    case REMOVE_TASK_LABEL_REFRESH:
      const updatedLabels = state.tasks[action.taskId].labels.filter(labelId => labelId !== Number(action.labelId));
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            labels: updatedLabels
          }
        }
      }

    case REMOVE_TASK_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case REMOVE_TASK_LABEL_FAILURE:
    // TODO - if there was an error need to roll back state to show previous state
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case UPDATE_LABEL_REQUEST:
    case UPDATE_LABEL_REFRESH:
      return {
        ...state,
        labels: {
          ...state.labels,
          [action.label.id]: {
            ...state.labels[action.label.id],
            name: action.label.name
          }
        }
      }

    case UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case UPDATE_LABEL_FAILURE:
    // TODO - if there was an error need to roll back state to show previous state
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state;
  }
}
