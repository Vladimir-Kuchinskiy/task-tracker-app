import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default Wrapped => props => {
  return (
    <Droppable droppableId={props.id} type={props.type} direction={props.direction}>
      {(provided, snapshot) => <Wrapped provided={provided} snapshot={snapshot} {...props} />}
    </Droppable>
  );
};
