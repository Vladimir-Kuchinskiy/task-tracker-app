import omit from 'lodash/omit';
import { types } from '../constants';
import { searchUsers } from '../services/searches';

const initialState = {
  team: {},
  boards: {},
  members: {},
  userEmails: [],
  findedUserEmails: [],
  loading: false
};

const processInvitableUser = (state, email) => {
  const newFindedUserEmails = state.findedUserEmails.map(item => {
    if (item.email === email) item.isInvited = true;
    return item;
  });
  const newUserEmails = state.userEmails.map(item => {
    if (item.email === email) item.isInvited = true;
    return item;
  });
  return {
    ...state,
    findedUserEmails: newFindedUserEmails,
    userEmails: newUserEmails
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TEAM_START:
      return { ...state, loading: true };
    case types.GET_TEAM_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case types.CREATE_BOARD_FOR_TEAM:
      return {
        ...state,
        boards: { ...state.boards, [action.payload.id]: action.payload }
      };
    case types.DELETE_BOARD_SUCCESS:
      return { ...state, boards: omit(state.boards, action.payload) };
    case types.UPDATE_BOARD:
      const { id, params } = action.payload;
      return {
        ...state,
        boards: { ...state.boards, [id]: { ...state.boards[id], ...params } }
      };
    case types.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        boards: { ...state.boards, [action.payload.id]: action.payload }
      };
    case types.SEARCH_USERS:
      return {
        ...state,
        findedUserEmails: searchUsers(state.userEmails, action.payload)
      };
    case types.INVITE_USER:
      return processInvitableUser(state, action.payload);
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
