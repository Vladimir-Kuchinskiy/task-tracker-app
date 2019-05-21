import { connect } from 'react-redux';

import { getProfile } from '../../actions/profileActions';

import ProfileInfo from '../../components/Profile/Info/ProfileInfo';

const mapStateToProps = ({ auth, profile: { info, avatar } }) => {
  const resultProfile = {
    ...info.attributes,
    avatarUrl: info.avatarUrl || avatar.url
  };

  return {
    authToken: auth.authToken,
    profile: resultProfile,
    loading: info.loading
  };
};

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfileInfo);
