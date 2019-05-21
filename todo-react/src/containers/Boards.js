import { connect } from 'react-redux';

import { getBoards } from '../actions/boardsActions';
import Boards from '../components/Boards/Boards';

const mapStateToProps = ({ boards, auth }) => {
  return {
    boards: Object.values(boards.boards),
    authToken: auth.authToken,
    loading: boards.loading,
    isBoardDeleting: boards.isBoardDeleting
  };
};

export default connect(
  mapStateToProps,
  { getBoards }
)(Boards);
