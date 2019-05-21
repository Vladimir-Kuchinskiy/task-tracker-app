import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Person from './Person';
import SearchForm from './SearchForm';

const AddMember = ({ findedUserEmails, searchUsers }) => {
  useEffect(() => {
    return () => searchUsers('');
  }, []);

  const handleChange = e => {
    searchUsers(e.target.value);
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          <h5 className="invite-title">Invite new member</h5>
          <SearchForm onChange={handleChange} />
        </td>
      </tr>
      {findedUserEmails.map((member, index) => (
        <Person member={member} invitable key={index} />
      ))}
    </React.Fragment>
  );
};

AddMember.propTypes = {
  findedUserEmails: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired
};

export default AddMember;
