import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserAvatar from 'react-user-avatar';

import './ProfileInfo.css';
import ProfileInfoList from './ProfileInfoList';
import EditProfileForm from './EditProfileForm';
import Button from '../../common/Button';
import Spinner from '../../common/Spinner';

class ProfileInfo extends Component {
  state = { editClicked: false };

  componentDidMount() {
    const { authToken, getProfile } = this.props;
    getProfile(authToken);
  }

  renderEditProfileForm = () => {
    const { firstName, lastName, gender, avatar } = this.props.profile;
    let initialValues = {};
    if (firstName) initialValues = { first_name: firstName };
    if (lastName) initialValues = { ...initialValues, last_name: lastName };
    if (gender) initialValues = { ...initialValues, gender };
    return (
      <EditProfileForm onEdit={this.toggleEdit} avatar={avatar} initialValues={initialValues} />
    );
  };

  renderProfileInfo = () => {
    const { avatarUrl, ...profile } = this.props.profile;
    return (
      <div className="profile-info">
        {this.props.loading ? (
          <Spinner style={{ marginLeft: '36%' }} />
        ) : (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-3">
                <UserAvatar
                  size="80"
                  name="Vladimir Kuchinskiy"
                  colors={['#ccc', '#fafafa', '#ccaabb']}
                  src={avatarUrl}
                />
              </div>
            </div>
            <hr className="mt-4" />
            <ProfileInfoList profile={profile} />
            <div className="row justify-content-center">
              <Button
                title="Edit profile"
                classes="btn btn-outline-primary"
                onClick={this.toggleEdit}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  };

  toggleEdit = () => {
    this.setState({ editClicked: !this.state.editClicked });
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="row">Profile info</h2>
        <div className="row justify-content-center mt-3 mb-4">
          <div className="col-5">
            {this.state.editClicked ? this.renderEditProfileForm() : this.renderProfileInfo()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProfileInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  authToken: PropTypes.string.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default ProfileInfo;
