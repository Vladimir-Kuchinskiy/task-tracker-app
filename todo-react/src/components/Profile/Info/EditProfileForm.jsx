import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Button from '../../common/Button';
import EditProfileImage from '../../../containers/Profile/EditProfileImage';
import { updateProfile, changeAvatar } from '../../../actions/profileActions';

class EditProfileForm extends Component {
  onSubmit = values => {
    const { onEdit, updateProfile, authToken, imageFile } = this.props;
    const finalValues = imageFile ? { ...values, avatar: imageFile } : values;
    updateProfile(finalValues, authToken);
    onEdit();
  };

  onChangeForFile = delegate => ({ target }) => {
    if (this.verifyFile(target.files)) {
      const currentFile = target.files[0];
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const avatar = { url: reader.result, isDefaultAvatar: false };
          this.props.changeAvatar(avatar);
        },
        false
      );
      if (currentFile) reader.readAsDataURL(currentFile);
      delegate(currentFile);
    } else {
      target.value = '';
      toast.error('This file is not allowed. Only images are allowed.');
    }
  };

  verifyFile = files => {
    if (files && files.length > 0) {
      const acceptedFileTypes = ['image/x-png', 'image/png', 'image/jpeg', 'image/gif'];
      return acceptedFileTypes.includes(files[0].type) ? true : false;
    }
    return true;
  };

  renderFileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps },
    meta: omitMeta,
    ...props
  }) => {
    return (
      <input
        onChange={this.onChangeForFile(onChange)}
        onBlur={this.onChangeForFile(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    );
  };

  renderInputField = field => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input type="text" className="form-control" {...field.input} />
      </div>
    );
  };

  renderSelectField = field => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option />
          <option>Male</option>
          <option>Fimale</option>
        </select>
      </div>
    );
  };

  render() {
    const { handleSubmit, onEdit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <EditProfileImage />
          <div className="d-flex mt-3 justify-content-center">
            <Field
              className="pull-right"
              name="avatar"
              component={this.renderFileInput}
              type="file"
              style={{ width: '80%' }}
            />
          </div>
          <hr />
          <div className="form-group">
            <Field name="first_name" label="First Name" component={this.renderInputField} />
          </div>
          <div className="form-group">
            <Field name="last_name" label="Last Name" component={this.renderInputField} />
          </div>
          <div className="form-group">
            <Field name="gender" label="Gender" component={this.renderSelectField} />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-success pull-left">
              Update
            </button>
            <Button onClick={onEdit} classes="btn btn-danger pull-right" title="Close" />
          </div>
        </form>
      </div>
    );
  }
}

EditProfileForm.propTypes = {
  authToken: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profile: { avatar } }) => {
  return { authToken: auth.authToken, imageFile: avatar.imageFile };
};

export default reduxForm({ form: 'EditProfileForm' }, { updateProfile })(
  connect(
    mapStateToProps,
    { updateProfile, changeAvatar }
  )(EditProfileForm)
);
