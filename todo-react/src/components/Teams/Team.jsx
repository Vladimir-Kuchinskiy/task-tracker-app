import React, { Component } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import BoardsDisplayer from '../../containers/BoardsDisplayer';
import SecondarySidebar from '../common/SecondarySidebar';
import Members from '../../containers/Teams/Members';

class Team extends Component {
  componentDidMount() {
    const { authToken, match, getTeam, isBoardDeleting } = this.props;
    if (!isBoardDeleting) getTeam(match.params.id, authToken);
  }

  componentDidUpdate({ match: { params } }) {
    const { authToken, match, getTeam } = this.props;
    if (params.id !== match.params.id) {
      getTeam(match.params.id, authToken);
    }
  }

  renderRouting = () => {
    const { team, boards, isCreator } = this.props;
    return (
      <Switch>
        <Route path="/dashboard/teams/:id/members" exact component={Members} />
        <Route
          path="/dashboard/teams/:id/boards"
          exact
          render={() => (
            <BoardsDisplayer
              title={team.name}
              boards={boards}
              teamId={team.id}
              isCreator={isCreator}
            />
          )}
        />
        <Redirect from="/dashboard/teams/:id" exact to="/dashboard/teams/:id/boards" />
        <Redirect to="/not-found" />
      </Switch>
    );
  };

  getLinks = () => {
    const { team, membersCount } = this.props;
    return [
      <NavLink className="nav-link" to={`/dashboard/teams/${team.id}/boards`}>
        Boards
      </NavLink>,
      <NavLink className="nav-link" to={`/dashboard/teams/${team.id}/members`}>
        Members
        <span className="badge badge-pill badge-secondary pull-right" style={{ fontSize: '1em' }}>
          {membersCount}
        </span>
      </NavLink>
    ];
  };

  render() {
    const { loading } = this.props;
    return loading ? (
      <Spinner style={{ marginLeft: '36%' }} />
    ) : (
      <div className="row">
        <div className="col-9">{this.renderRouting()}</div>
        <div className="col-3">
          <SecondarySidebar links={this.getLinks()} />
        </div>
      </div>
    );
  }
}

Team.propTypes = {
  loading: PropTypes.bool.isRequired,
  membersCount: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  team: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  boards: PropTypes.array.isRequired,
  getTeam: PropTypes.func.isRequired
};

export default Team;
