import { connect } from 'react-redux';

import DeleteCardPopover from '../../components/Board/Cards/DeleteCardPopover';
import { deleteCard } from '../../actions/boardActions';

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default connect(
  mapStateToProps,
  { deleteCard }
)(DeleteCardPopover);
