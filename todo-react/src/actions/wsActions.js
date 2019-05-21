import { types } from '../constants';
import { mapBoard, mapList, mapCard, mapAssignment } from '../services/mappers';

// BoardsChannel
export const setUpdatedBoard = response => {
  const { id, ...params } = mapBoard(response.data);
  return { type: types.UPDATE_BOARD, payload: { id, params } };
};

export const setCreatedList = response => {
  return { type: types.CREATE_LIST, payload: mapList(response.data) };
};

export const setUpdatedList = response => {
  const { id: listId, ...params } = mapList(response.data);
  return { type: types.UPDATE_LIST, payload: { params, listId } };
};

export const deleteListSuccess = response => {
  return { type: types.DELETE_LIST, payload: response.data.data.id };
};

export const setMovedList = response => {
  const { source_position, destination_position, draggable_id: draggableId } = response.data;
  const args = {
    source: { index: source_position },
    destination: { index: destination_position },
    draggableId
  };
  return { type: types.MOVE_LIST, payload: args };
};

// ListsChannel
export const setCreatedCard = response => {
  return { type: types.CREATE_CARD, payload: mapCard(response.data) };
};

export const setUpdatedCard = response => {
  const { id, content, description } = mapCard(response.data);
  return {
    type: types.UPDATE_CARD,
    payload: { params: { content, description }, id }
  };
};

export const deleteCardSuccess = response => {
  const {
    id,
    relationships: {
      list: {
        data: { id: listId }
      }
    }
  } = response.data.data;
  return { type: types.DELETE_CARD, payload: { id, listId } };
};

export const setMovedCard = response => {
  const {
    source_position,
    destination_position,
    source_list_id,
    destination_list_id,
    draggable_id: draggableId
  } = response.data;
  const args = {
    source: { droppableId: source_list_id, index: source_position },
    destination: { droppableId: destination_list_id, index: destination_position },
    draggableId
  };
  return { type: types.MOVE_CARD, payload: args };
};

export const setCreatedAssignment = response => {
  return { type: types.CREATE_ASSIGNMENT, payload: mapAssignment(response.data) };
};

export const deleteAssignmentSuccess = response => {
  const {
    id: userCardId,
    relationships: {
      card: {
        data: { id: cardId }
      }
    }
  } = response.data.data;
  return { type: types.DELETE_ASSIGNMENT, payload: { userCardId, cardId } };
};
