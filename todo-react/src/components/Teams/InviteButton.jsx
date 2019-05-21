import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class InviteButton extends Component {
  handleClick = () => {
    const { sendInvite, authToken, teamId, member } = this.props;

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you shure you want to invite ${member.email} to your team ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Invite!',
      cancelButtonText: 'Cancel!'
    }).then(result => {
      if (result.value) {
        sendInvite(teamId, authToken, member.email);
        Swal.fire('Invited!', 'Member has been invited', 'success');
      }
    });
  };

  render() {
    const { member, setMouseOver, mouseOver } = this.props;
    if (member.isInvited) {
      return (
        <div
          className="badge badge-warning mt-3"
          style={{ fontSize: '1.2em' }}
          onMouseOver={() => setMouseOver(false)}
        >
          Invited
        </div>
      );
    } else if (mouseOver) {
      return (
        <div className="btn btn-success mt-3" onMouseOver={setMouseOver} onClick={this.handleClick}>
          + Invite member
        </div>
      );
    }
    return null;
  }
}

InviteButton.propTypes = {
  teamId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  member: PropTypes.object.isRequired,
  mouseOver: PropTypes.bool.isRequired,
  setMouseOver: PropTypes.func.isRequired,
  sendInvite: PropTypes.func.isRequired
};

export default InviteButton;
