import { types } from '../constants';
const initialState = { authToken: null, errors: null };

const authStart = state => {
  return { ...state, errors: null };
};

const authSuccess = (state, auth_token) => {
  return { ...state, authToken: auth_token, errors: null };
};

const authFail = (state, errors) => {
  return { ...state, errors: errors };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action.payload);
    case types.AUTH_FAIL:
      return authFail(state, action.payload);
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
