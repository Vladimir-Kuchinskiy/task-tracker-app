import { types } from '../../constants';

const initialState = {
  crop: { width: 50, aspect: 1 / 1 },
  pixelCrop: null,
  image: null,
  imageFile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
    case types.CHANGE_AVATAR:
    case types.UPDATE_PROFILE:
      return { ...state, ...action.payload.avatar, crop: { width: 50, aspect: 1 / 1 } };
    case types.CHANGE_IMAGE_FILE:
      return { ...state, imageFile: action.payload };
    case types.CHANGE_CROP_AND_PIXEL_CROP:
      return { ...state, crop: action.payload.crop, pixelCrop: action.payload.pixelCrop };
    case types.CHANGE_IMAGE:
      return { ...state, image: action.payload };
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
