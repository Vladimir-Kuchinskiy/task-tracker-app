import { types } from '../constants';
import { todoApi } from '../apis';
import { mapTeams, mapTeam } from '../services/mappers';

const getTeamsStart = () => {
  return { type: types.GET_TEAMS_START };
};

const getTeamsSuccess = response => {
  return { type: types.GET_TEAMS_SUCCESS, payload: mapTeams(response.data) };
};

export const getTeams = authToken => async dispatch => {
  dispatch(getTeamsStart());
  todoApi.setJwt(authToken);
  const response = await todoApi.get('/teams');
  dispatch(getTeamsSuccess(response));
};

export const createTeam = (params, authToken) => async dispatch => {
  todoApi.setJwt(authToken);
  const response = await todoApi.post('/teams', params);
  dispatch({ type: types.CREATE_TEAM, payload: mapTeam(response.data) });
};

export const updateTeam = (params, id, authToken) => async dispatch => {
  todoApi.setJwt(authToken);
  await todoApi.put(`/teams/${id}`, params);
  dispatch({ type: types.UPDATE_TEAM, payload: { params, id } });
};
