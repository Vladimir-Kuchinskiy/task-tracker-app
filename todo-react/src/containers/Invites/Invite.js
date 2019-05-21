import { connect } from 'react-redux';

import { sendInviteResponse } from '../../actions/invitesActions';
import Invite from '../../components/Invites/Invite';

const mapStateToProps = ({ auth }) => {
  return {
    authToken: auth.authToken
  };
};

export default connect(
  mapStateToProps,
  { sendInviteResponse }
)(Invite);
