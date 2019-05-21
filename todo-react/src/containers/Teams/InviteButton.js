import { connect } from 'react-redux';

import { sendInvite } from '../../actions/teamActions';
import InviteButton from '../../components/Teams/InviteButton';

const mapStateToProps = ({ team, auth }) => {
  return {
    teamId: team.team.id,
    authToken: auth.authToken
  };
};

export default connect(
  mapStateToProps,
  { sendInvite }
)(InviteButton);
