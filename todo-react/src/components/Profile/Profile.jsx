import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import ProfileInfo from '../../containers/Profile/ProfileInfo';
import Membership from '../../containers/Profile/Membership';
import SecondarySidebar from '../common/SecondarySidebar';

const Profile = () => {
  const routes = (
    <Switch>
      <Route path="/dashboard/profile/info" exact component={ProfileInfo} />
      <Route path="/dashboard/profile/membership" exact component={Membership} />
      <Redirect from="/dashboard/profile" exact to="/dashboard/profile/info" />
      <Redirect to="/not-found" />
    </Switch>
  );

  const links = [
    <NavLink className="nav-link" to="/dashboard/profile/info">
      Profile info
    </NavLink>,
    <NavLink className="nav-link" to="/dashboard/profile/membership">
      Membership
    </NavLink>
  ];

  return (
    <div className="row">
      <div className="col-9">{routes}</div>
      <div className="col-3">
        <SecondarySidebar links={links} />
      </div>
    </div>
  );
};

export default Profile;
