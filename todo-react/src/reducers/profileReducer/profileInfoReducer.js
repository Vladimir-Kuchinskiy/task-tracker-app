import { types } from '../../constants';

const initialState = { loading: false, id: null, attributes: { email: '' } };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_START:
      return { ...state, loading: true };
    case types.GET_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE:
      let { id, avatar, avatarUrl, isMember, boardsLimit, ...profileInfo } = action.payload;
      return { ...state, id, attributes: profileInfo, avatarUrl, loading: false };
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
