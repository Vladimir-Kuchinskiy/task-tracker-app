import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles/BoardItem.css';
import EditBoardForm from './EditBoardForm';

class BoardItem extends Component {
  state = {
    editClicked: false
  };

  toggleEdit = e => {
    if (e) e.preventDefault();
    this.setState({ editClicked: !this.state.editClicked });
  };

  renderEditBoard = () => {
    const { id, title } = this.props.board;
    return (
      <div className="col-3 edit-board-item">
        <EditBoardForm
          boardId={id}
          form={`EditBoardForm-${id}`}
          initialValues={{ title }}
          onEdit={this.toggleEdit}
        />
      </div>
    );
  };

  renderLinkToBoard = () => {
    const { id, title } = this.props.board;
    const { teamId } = this.props;
    const path = teamId ? `/teams/${teamId}/boards/${id}` : `/boards/${id}`;
    return (
      <Link to={path} className="col-3 board-item" onContextMenu={this.toggleEdit}>
        <h3>{title}</h3>
      </Link>
    );
  };

  render() {
    return this.state.editClicked ? this.renderEditBoard() : this.renderLinkToBoard();
  }
}

BoardItem.propTypes = {
  board: PropTypes.object.isRequired,
  teamId: PropTypes.string
};

export default BoardItem;
