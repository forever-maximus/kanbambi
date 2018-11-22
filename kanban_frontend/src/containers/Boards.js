import { connect } from 'react-redux'
import BoardList from '../components/BoardList';
import { getBoards } from '../actions/boardList';

const mapStateToProps = (state) => {
  return {
    boards: state.boardListReducer.boards,
    error: state.boardListReducer.error,
    loading: state.boardListReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards: () => dispatch(getBoards())
  };
};

const Boards = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardList);

export default Boards;