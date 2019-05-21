import reducer from './authReducer';
import { types } from '../constants';

describe('auth reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      authToken: localStorage.getItem('authToken'),
      errors: null
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store loading true when AUTH_START', () => {
    expect(reducer(initialState, { type: types.AUTH_START })).toEqual({
      ...initialState
    });
  });

  it('should store the token when AUTH_SUCCESS', () => {
    const authToken = 'some-token';
    expect(reducer(initialState, { type: types.AUTH_SUCCESS, payload: authToken })).toEqual({
      ...initialState,
      authToken: authToken
    });
  });

  it('should store errors when AUTH_FAIL', () => {
    const errorMessage = 'There is some error!';
    expect(reducer(initialState, { type: types.AUTH_FAIL, payload: errorMessage })).toEqual({
      ...initialState,
      errors: errorMessage
    });
  });

  it('should store authToken as null when AUTH_SIGN_OUT', () => {
    expect(reducer(initialState, { type: types.AUTH_SIGN_OUT })).toEqual(initialState);
  });
});
