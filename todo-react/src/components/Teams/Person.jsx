import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InviteButton from '../../containers/Teams/InviteButton';
import './styles/Person.css';

class Person extends Component {
  state = { mouseOver: false };

  handleMouseOut = ({ relatedTarget }) => {
    if (
      relatedTarget &&
      (relatedTarget.className.includes('btn') || relatedTarget.className.includes('badge'))
    )
      return;

    this.setState({ mouseOver: false });
  };

  renderInviteButton = () => {
    const { invitable, member } = this.props;
    return invitable ? (
      <InviteButton
        member={member}
        setMouseOver={() => this.setState({ mouseOver: false })}
        mouseOver={this.state.mouseOver}
      />
    ) : (
      <h4 className="mt-3">
        <span className="badge badge-info">{member.roles.includes('creator') && 'Admin'}</span>
      </h4>
    );
  };

  render() {
    const { member, invitable } = this.props;
    const header = invitable ? (
      <h6 className="mt-4">{member.email}</h6>
    ) : (
      <h5 className="mt-3">{member.email}</h5>
    );
    const avatar = require(`../../images/avatar-placeholder.png`);
    return (
      <tr onMouseOver={() => this.setState({ mouseOver: true })} onMouseOut={this.handleMouseOut}>
        <td>
          <div className="media">
            <img src={avatar} alt="" />
            <div className="media-body member-body">{header}</div>
            {this.renderInviteButton()}
          </div>
        </td>
      </tr>
    );
  }
}

Person.propTypes = {
  invitable: PropTypes.bool,
  member: PropTypes.object.isRequired
};

export default Person;
