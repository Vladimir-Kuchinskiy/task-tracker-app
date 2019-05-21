import React from 'react';
import { connect } from 'react-redux';

import {
  setCreatedCard,
  setUpdatedCard,
  deleteCardSuccess,
  setMovedCard,
  setCreatedAssignment,
  deleteAssignmentSuccess
} from '../../actions/wsActions';
import List from '../../components/Board/Lists/List';

const ListContainer = props => {
  const handleReceived = response => {
    if (props.authToken !== response.auth_token) {
      switch (response.type) {
        case 'create_card':
          return props.setCreatedCard(response);
        case 'update_card':
          return props.setUpdatedCard(response);
        case 'delete_card':
          return props.deleteCardSuccess(response);
        case 'move_card':
          return props.setMovedCard(response);
        case 'create_assignment':
          return props.setCreatedAssignment(response);
        case 'delete_assignment':
          return props.deleteAssignmentSuccess(response);
        default:
          break;
      }
    }
  };

  return <List handleReceived={handleReceived} {...props} />;
};

const mapStateToProps = ({ board, auth }, { listId }) => {
  const list = board.lists[listId];
  const cards = list.cardIds.map(cardId => board.cards[cardId]);
  return {
    list,
    cards,
    authToken: auth.authToken
  };
};

export default connect(
  mapStateToProps,
  {
    setCreatedCard,
    setUpdatedCard,
    deleteCardSuccess,
    setMovedCard,
    setCreatedAssignment,
    deleteAssignmentSuccess
  }
)(ListContainer);
