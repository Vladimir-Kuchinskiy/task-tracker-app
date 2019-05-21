import { toast } from 'react-toastify';

import { types, messages } from '../constants';
import { todoApi } from '../apis';
import { mapProfile, mapSubscription } from '../services/mappers';

// ProfileInfo

const getProfileStart = () => {
  return { type: types.GET_PROFILE_START };
};

const getProfileSuccess = response => {
  return { type: types.GET_PROFILE_SUCCESS, payload: mapProfile(response.data) };
};

export const getProfile = authToken => async dispatch => {
  dispatch(getProfileStart());
  todoApi.setJwt(authToken);
  const response = await todoApi.get('/profile');
  dispatch(getProfileSuccess(response));
};

export const updateProfile = (params, authToken) => async dispatch => {
  const formData = new FormData();
  if (params.avatar) formData.append('avatar', params.avatar);
  Object.keys(params).map(key => formData.append(key, params[key]));
  todoApi.setJwt(authToken);
  const response = await todoApi.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  toast.success(messages.profileUpdated);
  dispatch({
    type: types.UPDATE_PROFILE,
    payload: mapProfile(response.data)
  });
};

// Avatar

export const changeAvatar = avatar => {
  return { type: types.CHANGE_AVATAR, payload: { avatar } };
};

export const changeImageFile = imageFile => {
  return { type: types.CHANGE_IMAGE_FILE, payload: imageFile };
};

export const changeCropAndPixelCrop = (crop, pixelCrop) => {
  return { type: types.CHANGE_CROP_AND_PIXEL_CROP, payload: { crop, pixelCrop } };
};

export const changeImage = image => {
  return { type: types.CHANGE_IMAGE, payload: image };
};

// Membership

const getSubscriptionStart = () => {
  return { type: types.GET_SUBSCRIPTION_START };
};

const getSubscriptionSuccess = response => {
  return { type: types.GET_SUBSCRIPTION_SUCCESS, payload: mapSubscription(response.data) };
};

export const getSubscription = authToken => async dispatch => {
  dispatch(getSubscriptionStart());
  todoApi.setJwt(authToken);
  const response = await todoApi.get(`/subscriptions`);
  dispatch(getSubscriptionSuccess(response));
};

export const getClientToken = authToken => async dispatch => {
  todoApi.setJwt(authToken);
  const response = await todoApi.get('/subscriptions/new');
  dispatch({ type: types.GET_CLIENT_TOKEN, payload: response.data.client_token });
};

export const setInstance = instance => {
  return { type: types.SET_INSTANCE, payload: instance };
};

const buyMembershipStart = () => {
  return { type: types.BUY_MEMBERSHIP_START };
};

export const buyMembership = (instance, authToken) => async dispatch => {
  dispatch(buyMembershipStart());
  const { nonce } = await instance.requestPaymentMethod();
  const params = { nonce };
  todoApi.setJwt(authToken);
  const response = await todoApi.post('/subscriptions', params);
  toast.success(messages.subscriptionWasBought);
  dispatch(getSubscriptionSuccess(response));
};

export const buyMembershipLoadingFinish = () => {
  return { type: types.BUY_MEMBERSHIP_LOADING_FINISH };
};

const cancelSubcriptionStart = () => {
  return { type: types.CANCEL_SUBSCRIPTION_START };
};

const cancelSubcriptionSuccess = response => {
  return { type: types.CANCEL_SUBSCRIPTION_SUCCESS, payload: mapSubscription(response.data) };
};

export const cancelSubscription = (id, authToken) => async dispatch => {
  dispatch(cancelSubcriptionStart());
  todoApi.setJwt(authToken);
  const response = await todoApi.put(`/subscriptions/${id}`);
  toast.success(messages.subscriptionWasCanceled);
  dispatch(cancelSubcriptionSuccess(response));
};
