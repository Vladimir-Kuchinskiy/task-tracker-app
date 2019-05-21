import React from 'react';
import { connect } from 'react-redux';

import { getBoard, moveList, moveCard } from '../../actions/boardActions';
import {
  setUpdatedBoard,
  setCreatedList,
  setUpdatedList,
  deleteListSuccess,
  setMovedList
} from '../../actions/wsActions';
import Board from '../../components/Board/Board';

const BoardContainer = props => {
  const handleReceived = response => {
    if (props.authToken !== response.auth_token) {
      switch (response.type) {
        case 'update_board':
          return props.setUpdatedBoard(response);
        case 'create_list':
          return props.setCreatedList(response);
        case 'update_list':
          return props.setUpdatedList(response);
        case 'delete_list':
          return props.deleteListSuccess(response);
        case 'move_list':
          return props.setMovedList(response);
        default:
          return;
      }
    }
  };

  return <Board handleReceived={handleReceived} {...props} />;
};

const mapStateToProps = ({ board, auth }) => {
  return {
    board: board.board,
    authToken: auth.authToken,
    loading: board.loading
  };
};

export default connect(
  mapStateToProps,
  {
    getBoard,
    moveList,
    moveCard,
    setUpdatedBoard,
    setCreatedList,
    setUpdatedList,
    deleteListSuccess,
    setMovedList
  }
)(BoardContainer);
