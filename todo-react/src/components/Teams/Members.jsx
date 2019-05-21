import React from 'react';
import PropTypes from 'prop-types';

import Person from './Person';
import AddMember from '../../containers/Teams/AddMember';
import './styles/Members.css';

const Members = ({ members }) => {
  return (
    <div>
      <h2 className="row">Team members</h2>
      <table className="table members-table">
        <tbody>
          {members.map(member => (
            <Person member={member} key={member.id} />
          ))}
          <AddMember />
        </tbody>
      </table>
    </div>
  );
};

Members.propTypes = {
  members: PropTypes.array.isRequired
};

export default Members;
