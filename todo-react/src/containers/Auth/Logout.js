import { connect } from 'react-redux';

import { signOut } from '../../actions/authActions';
import Logout from '../../components/Auth/Logout';

export default connect(
  null,
  { signOut }
)(Logout);
