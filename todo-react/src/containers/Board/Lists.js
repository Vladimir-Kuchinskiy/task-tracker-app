import { connect } from 'react-redux';

import Lists from '../../components/Board/Lists/Lists';

const mapStateToProps = ({ board }) => {
  const lists = board.listIds.map(id => board.lists[id]);
  return { lists };
};

export default connect(mapStateToProps)(Lists);
