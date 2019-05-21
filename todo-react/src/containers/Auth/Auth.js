import { connect } from 'react-redux';

import { signOut } from '../../actions/authActions';
import { Auth } from '../../components/Auth';

const mapStateToProps = ({ auth }) => {
  return { isSignedIn: auth.authToken !== null };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Auth);
