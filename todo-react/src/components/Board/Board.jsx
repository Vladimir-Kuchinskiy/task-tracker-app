import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';

import Lists from '../../containers/Board/Lists';
import BoardNavbar from '../Board/BoardNavbar';
import Spinner from '../common/Spinner';
import './Board.css';

class Board extends Component {
  state = { editClicked: false };

  componentDidMount() {
    const { authToken, match, getBoard } = this.props;
    getBoard(match.params.id, match.params.teamId, authToken);
  }

  handleDragEnd = args => {
    const { authToken, moveList, moveCard } = this.props;
    const { destination, source, type } = args;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    type === 'list' ? moveList(args, authToken) : moveCard(args, authToken);
  };

  toggleEdit = () => {
    this.setState({ editClicked: !this.state.editClicked });
  };

  render() {
    const { loading, ...rest } = this.props;
    const content = loading ? (
      <Spinner style={{ marginLeft: '50%' }} />
    ) : (
      <ActionCableProvider url={process.env.REACT_APP_API_WS_URL}>
        <ActionCableConsumer
          channel={{ channel: 'BoardsChannel', board_id: rest.board.id }}
          onReceived={this.props.handleReceived}
        />
        <BoardNavbar editClicked={this.state.editClicked} onEdit={this.toggleEdit} {...rest} />
        <div className="content board">
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Lists id="all-lists" type="list" direction="horizontal" />
          </DragDropContext>
        </div>
      </ActionCableProvider>
    );
    return content;
  }
}

Board.propTypes = {
  loading: PropTypes.bool.isRequired,
  authToken: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  getBoard: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired
};

export default Board;
