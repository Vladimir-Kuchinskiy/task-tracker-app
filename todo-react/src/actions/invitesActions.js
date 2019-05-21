import { mapInvites } from '../services/mappers';
import { mapInvite } from '../services/mappers';
import { types } from '../constants';
import { todoApi } from '../apis';

const getInviteStart = () => {
  return { type: types.GET_INVITES_START };
};

const getInviteSuccess = response => {
  return { type: types.GET_INVITES_SUCCESS, payload: mapInvites(response.data) };
};

export const getInvites = authToken => async dispatch => {
  dispatch(getInviteStart());
  todoApi.setJwt(authToken);
  const response = await todoApi.get('/invitations');
  dispatch(getInviteSuccess(response));
};

export const sendInviteResponse = (desigion, inviteId, authToken) => async dispatch => {
  todoApi.setJwt(authToken);
  const response = await todoApi.delete(`/invitations/${inviteId}?desigion=${desigion}`);
  dispatch({
    type: types.MAKE_INVITATION_RESPONSE,
    payload: { ...mapInvite(response.data), desigion }
  });
};
