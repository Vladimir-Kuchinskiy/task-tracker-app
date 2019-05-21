import { connect } from 'react-redux';

import { deleteList } from '../../actions/boardActions';
import ListHeader from '../../components/Board/Lists/ListHeader';

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default connect(
  mapStateToProps,
  { deleteList }
)(ListHeader);
