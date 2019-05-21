import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import Invite from '../../containers/Invites/Invite';

class Invites extends Component {
  componentDidMount() {
    const { getInvites, authToken } = this.props;
    getInvites(authToken);
  }

  renderInvites = () => {
    const { invites } = this.props;
    return (
      <div className="row" style={{ marginRight: '20%' }}>
        {invites.length > 0 ? (
          <React.Fragment>
            <h2>
              Invites &nbsp;
              <span className="badge badge-pill badge-dark">{invites.length}</span>
            </h2>
            <table className="table d-flex">
              <tbody>
                {invites.map(invite => (
                  <Invite invite={invite} key={invite.id} />
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ) : (
          <h2>Right now you don't have any invite.</h2>
        )}
      </div>
    );
  };

  render() {
    const { loading } = this.props;
    return loading ? <Spinner style={{ marginLeft: '36%' }} /> : this.renderInvites();
  }
}

Invites.propTypes = {
  invites: PropTypes.array.isRequired,
  getInvites: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired
};

export default Invites;
