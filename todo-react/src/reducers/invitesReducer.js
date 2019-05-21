import omit from 'lodash/omit';
import { types } from '../constants';

const initialState = {
  invites: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INVITES_START:
      return { ...state, loading: true };
    case types.GET_INVITES_SUCCESS:
      return { ...state, invites: action.payload, loading: false };
    case types.MAKE_INVITATION_RESPONSE:
      return { ...state, invites: omit(state.invites, action.payload.inviteId) };
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
