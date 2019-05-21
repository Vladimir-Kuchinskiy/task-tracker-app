import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import { types } from '../constants';
import { moveList, moveCardInList, moveCardBetweenLists } from '../services/movesService';

const initialState = {
  board: {},
  lists: {},
  cards: {},
  listIds: [],
  loading: false,
  isCreator: false
};

export default (state = initialState, action) => {
  let { lists, listIds, cards } = state;
  switch (action.type) {
    case types.GET_BOARD_START:
      return { ...state, loading: true };
    case types.GET_BOARD_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case types.UPDATE_BOARD:
      return action.payload.id === state.board.id
        ? { ...state, board: { id: action.payload.id, ...action.payload.params } }
        : state;
    case types.CREATE_LIST:
      const newList = action.payload;
      lists = { ...lists, [newList.id]: newList };
      if (!listIds.includes(newList.id)) listIds = [...listIds, newList.id];
      return {
        ...state,
        lists,
        listIds
      };
    case types.UPDATE_LIST:
      const {
        listId,
        params: { title }
      } = action.payload;
      const editedList = lists[listId];
      editedList.title = title;
      return {
        ...state,
        lists: { ...lists, [editedList.id]: editedList }
      };
    case types.DELETE_LIST:
      cards = pickBy(cards, (value, _key) => {
        return value.listId !== action.payload;
      });
      return {
        ...state,
        lists: omit(lists, action.payload),
        cards,
        listIds: listIds.filter(id => id !== action.payload)
      };
    case types.CREATE_CARD:
      const newCard = action.payload;
      let list = lists[newCard.listId];
      if (!list.cardIds.includes(newCard.id))
        list = { ...list, cardIds: [...list.cardIds, newCard.id] };
      return {
        ...state,
        lists: { ...lists, [list.id]: list },
        cards: { ...cards, [newCard.id]: newCard }
      };
    case types.UPDATE_CARD:
      const { id, params } = action.payload;
      return {
        ...state,
        cards: {
          ...cards,
          [id]: { ...cards[id], ...params }
        }
      };
    case types.DELETE_CARD:
      const cardsList = lists[action.payload.listId];
      cardsList.cardIds = cardsList.cardIds.filter(ci => ci !== action.payload.id);
      return {
        ...state,
        list: { ...lists, [cardsList.id]: cardsList },
        cards: omit(cards, action.payload.id)
      };
    case types.MOVE_LIST:
      return moveList(state, action.payload);
    case types.MOVE_CARD:
      const { destination, source } = action.payload;
      const start = lists[source.droppableId];
      const finish = lists[destination.droppableId];
      return start.id === finish.id
        ? moveCardInList(state, start, action.payload)
        : moveCardBetweenLists(state, start, finish, action.payload);
    case types.CREATE_ASSIGNMENT:
      let newCardWithAssignments = {
        ...cards[action.payload.cardId],
        assignments: {
          ...cards[action.payload.cardId].assignments,
          [action.payload.id]: action.payload
        }
      };
      return {
        ...state,
        cards: {
          ...cards,
          [newCardWithAssignments.id]: newCardWithAssignments
        }
      };
    case types.DELETE_ASSIGNMENT:
      let newCardWithDeletedAssignment = {
        ...cards[action.payload.cardId],
        assignments: omit(cards[action.payload.cardId].assignments, action.payload.userCardId)
      };
      return {
        ...state,
        cards: {
          ...cards,
          [newCardWithDeletedAssignment.id]: newCardWithDeletedAssignment
        }
      };
    case types.AUTH_SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};
