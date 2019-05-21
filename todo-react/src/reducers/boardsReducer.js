import omit from 'lodash/omit';
import { types } from '../constants';
const initialState = { boards: {}, loading: false, isBoardDeleting: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOARDS_START:
      return { ...state, loading: true };
    case types.GET_BOARDS_SUCCESS:
      return { ...state, boards: action.payload, loading: false };
    case types.CREATE_BOARD:
      return {
        ...state,
        boards: { ...state.boards, [action.payload.id]: action.payload }
      };
    case types.UPDATE_BOARD:
      const { id, params } = action.payload;
      return {
        ...state,
        boards: { ...state.boards, [id]: { ...state.boards[id], ...params } }
      };
    case types.DELETE_BOARD_START:
      return { ...state, isBoardDeleting: true };
    case types.DELETE_BOARD_SUCCESS:
      return { ...state, boards: omit(state.boards, action.payload), isBoardDeleting: false };
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
