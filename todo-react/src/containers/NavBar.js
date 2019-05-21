import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { getProfile } from '../actions/profileActions';
import NavBar from '../components/NavBar';

const history = createBrowserHistory();

const mapStateToProps = ({ auth, profile: { info } }) => {
  const isSignedIn = auth.authToken !== null;
  return {
    isSignedIn,
    isNotProfilePath: !history.location.pathname.includes('/profile/info'),
    email: info.attributes.email,
    authToken: auth.authToken
  };
};

export default connect(
  mapStateToProps,
  { getProfile }
)(NavBar);
