import { connect } from 'react-redux';

import Routes from '../components/Routes';

const mapStateToProps = ({ auth }) => {
  return { isSignedIn: auth.authToken !== null };
};

export default connect(mapStateToProps)(Routes);
