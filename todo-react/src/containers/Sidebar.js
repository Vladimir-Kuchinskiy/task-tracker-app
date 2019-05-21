import { connect } from 'react-redux';

import { getTeams } from '../actions/teamsActions';
import Sidebar from '../components/Sidebar';

const mapStateToProps = ({ auth, profile: { info, avatar } }) => {
  return {
    avatarUrl: info.avatarUrl || avatar.url,
    authToken: auth.authToken
  };
};

export default connect(
  mapStateToProps,
  { getTeams }
)(Sidebar);
