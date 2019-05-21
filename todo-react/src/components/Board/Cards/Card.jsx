import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import withDraggable from '../../hoc/withDraggable';

import './styles/Card.css';
import EditCardForm from './EditCardForm';
import AssignedUsers from './AssignedUsers';
import CardModal from '../../../containers/Board/CardModal';

const CardContainer = styled.li`
  background-color: ${props => (props.isDragging ? 'rgb(241, 241, 241)' : '#fff')};
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

class Card extends Component {
  state = {
    editCardClicked: false,
    showModal: false
  };

  toggleEditCard = e => {
    if (e) e.preventDefault();
    this.setState({ editCardClicked: !this.state.editCardClicked });
  };

  toggleModal = () => {
    const { editCardClicked, showModal } = this.state;
    if (editCardClicked) return;
    this.setState({ showModal: !showModal });
  };

  renderCardContent = (provided, snapshot) => {
    const { card, assignedUsers } = this.props;
    return (
      <CardContainer
        className="draggable"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        onContextMenu={this.toggleEditCard}
        onClick={this.toggleModal}
      >
        <div style={{ display: 'block' }}>{card.content}</div>
        <AssignedUsers assignedUsers={assignedUsers} />
      </CardContainer>
    );
  };

  renderEditCardForm = () => {
    const { id, content } = this.props.card;
    return (
      <li className="edit-card">
        <EditCardForm
          form={`EditCardForm-${id}`}
          cardId={id}
          initialValues={{ content }}
          onEdit={this.toggleEditCard}
        />
      </li>
    );
  };

  render() {
    const { editCardClicked, showModal } = this.state;
    const { card, provided, snapshot, assignedUsers } = this.props;
    return (
      <React.Fragment>
        {editCardClicked ? this.renderEditCardForm() : this.renderCardContent(provided, snapshot)}
        <CardModal
          assignedUsers={assignedUsers}
          showModal={showModal}
          toggleModal={this.toggleModal}
          cardId={card.id}
        />
      </React.Fragment>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  assignedUsers: PropTypes.array.isRequired
};

CardContainer.propTypes = {
  isDragging: PropTypes.bool.isRequired
};

export default withDraggable(Card);
