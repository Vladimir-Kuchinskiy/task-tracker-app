import React from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

const MembershipNavbar = ({ activeTab, toggle }) => {
  return (
    <Nav tabs className="row mt-3 mb-4">
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '1' })}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            toggle('1');
          }}
        >
          Membership info
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '2' })}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            toggle('2');
          }}
        >
          Subscription info
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default MembershipNavbar;
