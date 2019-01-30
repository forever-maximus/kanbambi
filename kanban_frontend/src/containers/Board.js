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
  changeTaskStateRefresh
} from '../actions/task';

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boardReducer.board,
    stateColumns: state.boardReducer.stateColumns,
    tasks: state.boardReducer.tasks,
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
    updateBoard: (id, boardUpdate) => dispatch(updateBoard(id, boardUpdate))
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
) (BoardView);

export default Board;