export const parseNumber = string => {
  const numberPattern = /\d+/g;
  return string.match(numberPattern)[0];
};

export const moveList = (state, args) => {
  const { listIds } = state;
  const { destination, source } = args;
  const draggableId = parseNumber(args.draggableId);
  const newListIds = Array.from(listIds);
  newListIds.splice(source.index, 1);
  newListIds.splice(destination.index, 0, draggableId);
  return {
    ...state,
    listIds: newListIds
  };
};

export const moveCardInList = (state, start, args) => {
  const { lists } = state;
  const { destination, source } = args;
  const draggableId = parseNumber(args.draggableId);
  const newCardIds = Array.from(start.cardIds);
  newCardIds.splice(source.index, 1);
  newCardIds.splice(destination.index, 0, draggableId);
  const draggableList = { ...start, cardIds: newCardIds };
  return {
    ...state,
    lists: {
      ...lists,
      [draggableList.id]: draggableList
    }
  };
};

export const moveCardBetweenLists = (state, start, finish, args) => {
  const { lists, cards } = state;
  const { destination, source } = args;
  const draggableId = parseNumber(args.draggableId);
  const draggableCard = cards[draggableId];
  draggableCard.listId = finish.id;
  const startCardIds = Array.from(start.cardIds);
  startCardIds.splice(source.index, 1);
  const draggableList = { ...start, cardIds: startCardIds };
  const finishCardIds = Array.from(finish.cardIds);
  finishCardIds.splice(destination.index, 0, draggableId);
  const droppableList = { ...finish, cardIds: finishCardIds };
  return {
    ...state,
    lists: {
      ...lists,
      [draggableList.id]: draggableList,
      [droppableList.id]: droppableList
    },
    cards: { ...cards, [draggableCard.id]: draggableCard }
  };
};
