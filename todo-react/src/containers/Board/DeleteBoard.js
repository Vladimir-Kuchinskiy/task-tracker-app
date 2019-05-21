import { connect } from 'react-redux';

import { deleteBoard } from '../../actions/boardsActions';
import DeleteBoard from '../../components/Board/DeleteBoard';

const mapStateToProps = ({ auth, board }) => {
  return { authToken: auth.authToken, isCreator: board.isCreator };
};

export default connect(
  mapStateToProps,
  { deleteBoard }
)(DeleteBoard);
