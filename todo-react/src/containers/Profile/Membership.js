import { connect } from 'react-redux';

import { getSubscription } from '../../actions/profileActions';

import Membership from '../../components/Profile/Membership/Membership';

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default connect(
  mapStateToProps,
  { getSubscription }
)(Membership);
