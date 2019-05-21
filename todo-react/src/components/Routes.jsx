import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Auth/Logout';
import Board from '../containers/Board/Board';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const Routes = ({ isSignedIn }) => {
  const routes = isSignedIn ? (
    <Switch>
      <Route path="/logout" component={Logout} />
      <Route path="/boards/:id" component={Board} />
      <Route path="/teams/:teamId/boards/:id" component={Board} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="/" exact to="/dashboard" />
      <Route path="/not-found" component={NotFound} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/not-found" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );
  return <div className="content-container">{routes}</div>;
};

Routes.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Routes;
