import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

import DeleteCardPopover from '../../../containers/Board/DeleteCardPopover';
import CardDescription from './CardDescription';
import CardAssignments from './CardAssignments';
import Button from '../../common/Button';
import CardModalSidebar from './CardModalSidebar';

class CardModal extends Component {
  state = { showPopover: false };

  togglePopover = () => {
    this.setState({ showPopover: !this.state.showPopover });
  };

  toggleEdit = () => {
    this.setState({});
  };

  renderModalBody = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-9">
            <CardAssignments assignedUsers={this.props.assignedUsers} />
            <CardDescription card={this.props.card} />
          </div>
          <div className="col-3">
            <CardModalSidebar card={this.props.card} />
          </div>
        </div>
        <Button
          classes="btn btn-danger pull-right"
          title="Delete"
          id="Popover1"
          onClick={this.togglePopover}
        />
      </React.Fragment>
    );
  };

  render() {
    const { showModal, toggleModal, card } = this.props;
    return (
      <Modal isOpen={showModal} toggle={toggleModal} size="lg" fade={false}>
        <ModalHeader toggle={toggleModal}>{card.content}</ModalHeader>
        <ModalBody>
          {this.renderModalBody()}
          <DeleteCardPopover
            card={this.props.card}
            isOpen={this.state.showPopover}
            toggle={this.togglePopover}
          />
        </ModalBody>
      </Modal>
    );
  }
}

CardModal.propTypes = {
  card: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default CardModal;
