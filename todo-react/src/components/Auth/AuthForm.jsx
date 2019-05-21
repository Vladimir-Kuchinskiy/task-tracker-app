import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { auth } from '../../actions/authActions';

class AuthForm extends Component {
  onSubmit = values => {
    this.props.auth(values, this.props.isSignUp);
  };

  renderInputField = ({ input, label, name, type = 'text', error }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type={type} className="form-control" {...input} />
        {error && (
          <div
            className="invalid-feedback"
            style={{ display: 'block', position: 'inherit', fontSize: '100%' }}
          >
            {error.join(', ')}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { handleSubmit, isSignUp, errors } = this.props;
    return (
      <div className="container">
        <h1 className="title">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <form
          className={`needs-validation ${errors && 'was-validated'}`}
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <div className="form-group">
            <Field
              name="email"
              component={this.renderInputField}
              label="Email"
              error={errors && errors['email']}
            />
            <Field
              name="password"
              component={this.renderInputField}
              label="Password"
              type="password"
              error={errors && errors['password']}
            />
            {isSignUp && (
              <Field
                name="password_confirmation"
                component={this.renderInputField}
                label="Password Confirmation"
                type="password"
                error={errors && errors['password_confirmation']}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary pull-left">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { errors: auth.errors };
};

export default reduxForm({ form: 'AuthForm' }, { auth })(
  connect(
    mapStateToProps,
    { auth }
  )(AuthForm)
);
