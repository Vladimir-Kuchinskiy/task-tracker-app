import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm';
import { messages } from '../../constants';

class Auth extends Component {
  state = { isSignUp: false };

  componentDidMount() {
    const { isSignedIn, signOut } = this.props;
    if (localStorage.getItem('expiredMessage')) {
      signOut();
      toast.info(localStorage.getItem('expiredMessage'));
      return localStorage.removeItem('expiredMessage');
    }
    if (isSignedIn) toast.success(messages.alreadySignedIn);
  }

  toggleSignUp = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  renderSwitchButton() {
    const text = this.state.isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up';
    return (
      <div className="btn btn-outline-success" onClick={this.toggleSignUp}>
        {text}
      </div>
    );
  }

  getRedirectPath() {
    const { lastLocation } = this.props;
    return lastLocation && lastLocation.pathname !== '/logout' ? lastLocation.pathname : '/';
  }

  render() {
    if (this.props.isSignedIn) {
      const path = this.getRedirectPath();
      return <Redirect to={path} />;
    }

    return (
      <div className="container">
        <div className="row">
          <AuthForm isSignUp={this.state.isSignUp} />
        </div>
        <div className="row d-flex justify-content-center">{this.renderSwitchButton()}</div>
      </div>
    );
  }
}

Auth.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  lastLocation: PropTypes.object
};

export default withLastLocation(Auth);
