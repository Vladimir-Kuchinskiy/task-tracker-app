import { connect } from 'react-redux';

import { getInvites } from '../../actions/invitesActions';
import Invites from '../../components/Invites/Invites';

const mapStateToProps = ({ invites, auth }) => {
  return {
    invites: Object.values(invites.invites),
    authToken: auth.authToken,
    loading: invites.loading
  };
};

export default connect(
  mapStateToProps,
  { getInvites }
)(Invites);
