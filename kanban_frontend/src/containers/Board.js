import { connect } from 'react-redux'
import BoardView from '../components/BoardView';
import { getBoard } from '../actions/board';
import { updateTask, reorderTask } from '../actions/task';

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
    updateTask: (task, prevStateColumnId) => dispatch(updateTask(task, prevStateColumnId)),
    reorderTask: (task, prevTaskIndex) => dispatch(reorderTask(task, prevTaskIndex))
  };
};

const Board = connect(
  mapStateToProps,
  mapDispatchToProps
) (BoardView);

export default Board;