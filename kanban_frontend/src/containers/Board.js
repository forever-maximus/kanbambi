import { connect } from 'react-redux'
import BoardView from '../components/BoardView';
import { getBoard, updateBoard } from '../actions/board';
import { updateTask, addNewTask, reorderTask, changeTaskState } from '../actions/task';

const mapStateToProps = (state) => {
  return {
    board: state.boardReducer.board,
    stateColumns: state.boardReducer.stateColumns,
    tasks: state.boardReducer.tasks,
    error: state.boardReducer.error,
    loading: state.boardReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoard: (id) => dispatch(getBoard(id)),
    updateTask: (task) => dispatch(updateTask(task)),
    addNewTask: (task) => dispatch(addNewTask(task)),
    reorderTask: (task, prevTaskIndex) => dispatch(reorderTask(task, prevTaskIndex)),
    changeTaskState: (task, prevTaskIndex, taskPrevStateCol) => 
      dispatch(changeTaskState(task, prevTaskIndex, taskPrevStateCol)),
    updateBoard: (id, boardUpdate) => dispatch(updateBoard(id, boardUpdate))
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
) (BoardView);

export default Board;