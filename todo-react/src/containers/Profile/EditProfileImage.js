import { connect } from 'react-redux';

import { changeCropAndPixelCrop, changeImage, changeImageFile } from '../../actions/profileActions';

import EditProfileImage from '../../components/Profile/Info/EditProfileImage';

const mapStateToProps = ({ profile: { avatar } }) => {
  const isFromServer = avatar.url.includes('http');
  return { avatar, isFromServer };
};

export default connect(
  mapStateToProps,
  { changeCropAndPixelCrop, changeImage, changeImageFile }
)(EditProfileImage);
