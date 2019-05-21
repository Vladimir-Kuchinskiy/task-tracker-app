import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Profile from './Profile/Profile';
import Sidebar from '../containers/Sidebar';
import Boards from '../containers/Boards';
import Team from '../containers/Teams/Team';
import Invites from '../containers/Invites/Invites';

const Dashboard = () => {
  return (
    <div className="container-fluid boards">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-9 offset-1 mt-4">
          <Switch>
            <Route path="/dashboard/teams/:id" component={Team} />
            <Route path="/dashboard/profile" component={Profile} />
            <Route path="/dashboard/boards" component={Boards} />
            <Route path="/dashboard/invites" component={Invites} />
            <Redirect from="/dashboard" exact to="/dashboard/boards" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
