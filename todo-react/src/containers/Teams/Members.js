import { connect } from 'react-redux';

import Members from '../../components/Teams/Members';

const mapStateToProps = ({ team }) => {
  return {
    members: Object.values(team.members)
  };
};

export default connect(mapStateToProps)(Members);
