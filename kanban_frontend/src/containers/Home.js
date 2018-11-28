import { connect } from 'react-redux'
import HomeView from '../components/HomeView';
import { getBoardList } from '../actions/boardList';

const mapStateToProps = (state) => {
  return {
    boards: state.boardListReducer.boards,
    error: state.boardListReducer.error,
    loading: state.boardListReducer.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoardList: () => dispatch(getBoardList())
  };
};

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);

export default Home;