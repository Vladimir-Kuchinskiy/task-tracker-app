import { connect } from 'react-redux';

import BoardsDisplayer from '../components/common/BoardsDisplayer';

const mapStateToProps = ({ profile: { membership } }) => {
  return { isMember: membership.isMember, boardsLimit: membership.boardsLimit };
};

export default connect(mapStateToProps)(BoardsDisplayer);
