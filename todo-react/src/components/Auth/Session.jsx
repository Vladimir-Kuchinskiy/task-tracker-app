import React from 'react';
import PropTypes from 'prop-types';

const Session = ({ userEmail }) => <h6 style={{ color: 'white' }}>{userEmail}</h6>;

Session.propTypes = {
  userEmail: PropTypes.string.isRequired
};

export default Session;
