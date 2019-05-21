import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import './EditProfileImage.css';
import { getCroppedImg } from '../../../services/imageCropper';
import PropTypes from 'prop-types';

class EditProfileImage extends Component {
  componentDidUpdate({ avatar: { image, crop } }) {
    const { changeImageFile, isFromServer } = this.props;
    const { image: currentImage, crop: currentCrop, pixelCrop } = this.props.avatar;
    if (image !== currentImage || crop !== currentCrop) {
      if (currentImage && pixelCrop && !isFromServer) {
        getCroppedImg(currentImage, pixelCrop, 'avatar.jpeg').then(croppedImage => {
          changeImageFile(croppedImage);
        });
      }
    }
  }

  renderProfileImage = () => {
    const { avatar, changeImage, changeCropAndPixelCrop, isFromServer } = this.props;
    return isFromServer ? (
      <img src={avatar.url} width="100%" height="100%" alt="Avatar Placeholder" />
    ) : (
      <ReactCrop
        src={avatar.url}
        crop={avatar.crop}
        onImageLoaded={image => changeImage(image)}
        onChange={(crop, pixelCrop) => changeCropAndPixelCrop(crop, pixelCrop)}
        style={{ maxHeight: '100%' }}
      />
    );
  };

  render() {
    const { isDefaultAvatar, url } = this.props.avatar;

    return (
      <div className="d-flex justify-content-center">
        {isDefaultAvatar ? (
          <img src={url} height="80" alt="Avatar Placeholder" />
        ) : (
          <div className="d-flex justify-content-center">{this.renderProfileImage()}</div>
        )}
      </div>
    );
  }
}

EditProfileImage.propTypes = {
  avatar: PropTypes.object.isRequired,
  changeImage: PropTypes.func.isRequired,
  changeCropAndPixelCrop: PropTypes.func.isRequired,
  changeImageFile: PropTypes.func.isRequired,
  isFromServer: PropTypes.bool.isRequired
};

export default EditProfileImage;
