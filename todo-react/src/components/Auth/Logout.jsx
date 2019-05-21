import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Logout extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <Redirect to="/auth" />;
  }
}

Logout.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default Logout;
