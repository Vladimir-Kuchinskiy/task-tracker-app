import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default Wrapped => props => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided, snapshot) => <Wrapped provided={provided} snapshot={snapshot} {...props} />}
    </Draggable>
  );
};
