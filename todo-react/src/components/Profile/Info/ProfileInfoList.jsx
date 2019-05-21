import React from 'react';

import { capitalizeString } from '../../../services/viewHelpers';

const ProfileInfoList = ({ profile }) => {
  return Object.keys(profile).map(key => {
    return (
      <React.Fragment key={key}>
        <p>
          {capitalizeString(key)}: <span className="pull-right">{profile[key]}</span>
        </p>
        <hr />
      </React.Fragment>
    );
  });
};

export default ProfileInfoList;
