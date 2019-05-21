import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class Invite extends Component {
  handleClick = desigion => {
    const { sendInviteResponse, invite, authToken } = this.props;
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you shure you want to accept an invite from ${invite.inviterEmail} to ${
        invite.teamName
      } team ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Invite!',
      cancelButtonText: 'Cancel!'
    }).then(result => {
      if (result.value) {
        sendInviteResponse(desigion, invite.id, authToken);
        Swal.fire('Accepted!', 'You accepted an invite!', 'success');
      }
    });
  };

  handleAccept = () => {
    this.handleClick(true);
  };

  handleDismiss = () => {
    this.handleClick(false);
  };

  render() {
    const { invite } = this.props;
    return (
      <tr>
        <td>
          <h5 style={{ marginTop: '5px' }}>
            From <b>{invite.inviterEmail}</b> to a team <b>{invite.teamName}</b>
          </h5>
        </td>
        <td>
          <div className="btn btn-success" onClick={this.handleAccept}>
            <b>Accept</b>
          </div>
        </td>
        <td>
          <div className="btn btn-danger" onClick={this.handleDismiss}>
            <b>Dismiss</b>
          </div>
        </td>
      </tr>
    );
  }
}

Invite.propTypes = {
  authToken: PropTypes.string.isRequired,
  invite: PropTypes.object.isRequired,
  sendInviteResponse: PropTypes.func.isRequired
};

export default Invite;
