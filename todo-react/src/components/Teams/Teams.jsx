import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import NewTeamForm from './NewTeamForm';
import Spinner from '../common/Spinner';

class Teams extends Component {
  state = { addTeamClicked: false };

  toggleClick = () => {
    this.setState({ addTeamClicked: !this.state.addTeamClicked });
  };

  renderHorizontalLine = id => {
    const { teams } = this.props;
    return id === teams[teams.length - 1].id && <hr />;
  };

  renderTeamsList = () => {
    const { teams, loading, isMember } = this.props;
    if (loading) return <Spinner style={{ position: 'relative' }} />;
    return teams.map(({ id, name }) => (
      <React.Fragment key={id}>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/dashboard/teams/${id}`}>
            {name}
          </NavLink>
          {isMember && this.renderHorizontalLine(id)}
        </li>
      </React.Fragment>
    ));
  };

  renderAddTeamButton = () => {
    return (
      this.props.isMember && (
        <li className="nav-item">
          {this.state.addTeamClicked ? (
            <NewTeamForm onClose={this.toggleClick} />
          ) : (
            <Button
              classes="btn add-team d-flex"
              onClick={this.toggleClick}
              title="Add a team..."
            />
          )}
        </li>
      )
    );
  };

  render() {
    const { isAnyTeams, isMember } = this.props;
    return (
      (isAnyTeams || isMember) && (
        <ul id="sidebar-editable-nav" className="nav flex-column">
          {this.renderTeamsList()}
          {this.renderAddTeamButton()}
        </ul>
      )
    );
  }
}

Teams.propTypes = {
  loading: PropTypes.bool.isRequired,
  isMember: PropTypes.bool.isRequired,
  isAnyTeams: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired
};

export default Teams;
