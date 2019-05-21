import { toast } from 'react-toastify';
import { types, messages } from '../constants';
import { todoApi } from '../apis';

export const auth = (params, isSignUp) => dispatch => {
  dispatch(authStart());
  const uri = isSignUp ? '/signup' : '/auth/login';
  todoApi
    .post(uri, params)
    .then(({ data }) => {
      dispatch(authSuccess(data));
    })
    .catch(({ response: { data } }) => {
      const errors = isSignUp ? data.errors : { message: data.message };
      dispatch(authFail(errors));
    });
};

export const signOut = () => {
  return { type: types.AUTH_SIGN_OUT };
};

export const authStart = () => {
  return { type: types.AUTH_START };
};

export const authSuccess = ({ auth_token }) => {
  toast.success(messages.signedInSuccessfully);
  return { type: types.AUTH_SUCCESS, payload: auth_token };
};

export const authFail = errors => {
  if (errors['message']) toast.error(errors['message']);
  return { type: types.AUTH_FAIL, payload: errors };
};
