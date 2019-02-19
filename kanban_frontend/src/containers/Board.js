import { connect } from 'react-redux'
import BoardView from '../components/BoardView';
import { getBoard, updateBoard } from '../actions/board';
import { 
  updateTask, 
  updateTaskRefresh, 
  addNewTask, 
  addNewTaskRefresh, 
  reorderTask, 
  reorderTaskRefresh,
  changeTaskState,
  changeTaskStateRefresh,
  addTaskLabel,
  addTaskLabelRefresh,
  removeTaskLabel,
  removeTaskLabelRefresh
} from '../actions/task';
import { updateLabel, updateLabelRefresh } from '../actions/label';

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boardReducer.board,
    stateColumns: state.boardReducer.stateColumns,
    tasks: state.boardReducer.tasks,
    labels: state.boardReducer.labels,
    error: state.boardReducer.error,
    loading: state.boardReducer.loading,
    websocket: ownProps.websocket,
    clientId: ownProps.clientId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(getBoard(id)),
    updateTask: (task) => dispatch(updateTask(task)),
    updateTaskRefresh: (task) => dispatch(updateTaskRefresh(task)),
    addNewTask: (task) => dispatch(addNewTask(task)),
    addNewTaskRefresh: (task) => dispatch(addNewTaskRefresh(task)),
    reorderTask: (task, prevTaskIndex) => dispatch(reorderTask(task, prevTaskIndex)),
    reorderTaskRefresh: (task, prevTaskIndex) => dispatch(reorderTaskRefresh(task, prevTaskIndex)),
    changeTaskState: (task, prevTaskIndex, taskPrevStateCol) => 
      dispatch(changeTaskState(task, prevTaskIndex, taskPrevStateCol)),
    changeTaskStateRefresh: (task, prevTaskIndex, taskPrevStateCol) => 
      dispatch(changeTaskStateRefresh(task, prevTaskIndex, taskPrevStateCol)),
    addTaskLabel: (taskLabel) => dispatch(addTaskLabel(taskLabel)),
    addTaskLabelRefresh: (taskLabel) => dispatch(addTaskLabelRefresh(taskLabel)),
    removeTaskLabel: (taskLabel) => dispatch(removeTaskLabel(taskLabel)),
    removeTaskLabelRefresh: (taskLabel) => dispatch(removeTaskLabelRefresh(taskLabel)),
    updateBoard: (id, boardUpdate) => dispatch(updateBoard(id, boardUpdate)),
    updateLabel: (labelData) => dispatch(updateLabel(labelData)),
    updateLabelRefresh: (labelData) => dispatch(updateLabelRefresh(labelData))
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
) (BoardView);

export default Board;