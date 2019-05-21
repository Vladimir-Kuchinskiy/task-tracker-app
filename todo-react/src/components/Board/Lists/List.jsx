import React from 'react';
import PropTypes from 'prop-types';
import { ActionCableConsumer } from 'react-actioncable-provider';

import withDraggable from '../../hoc/withDraggable';

import ListHeader from '../../../containers/Board/ListHeader';
import ListBody from './ListBody';
import './styles/List.css';

const List = ({ list: { id, title }, cards, provided, handleReceived }) => {
  return (
    <div className="list list-header-wrapper" {...provided.draggableProps} ref={provided.innerRef}>
      <ActionCableConsumer
        channel={{ channel: 'ListsChannel', list_id: id }}
        onReceived={handleReceived}
      />
      <ListHeader dragHandleProps={provided.dragHandleProps} listId={id} title={title} />
      <ListBody cards={cards} id={id} type="card" />
    </div>
  );
};

List.propTypes = {
  list: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
};

export default withDraggable(List);
