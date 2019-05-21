import React from 'react';
import UserAvatar from 'react-user-avatar';

import './styles/MemberListItem.css';
import checkedImage from '../../../images/checked.png';

const MemberListItem = ({ user, authToken, createAssignment, deleteAssignment, boardId }) => {
  const handleClick = () => {
    user.isAssigned
      ? deleteAssignment(authToken, user)
      : createAssignment(authToken, boardId, user);
  };

  return (
    <React.Fragment>
      <li className="list-group-item member-item" onClick={handleClick}>
        <div className="row" style={{ height: '25px' }}>
          <div className="col-2">
            <UserAvatar
              size="35"
              style={{ marginLeft: '-10px', marginTop: '-5px' }}
              name="Vladimir Kuchinskiy"
              colors={['#ccc', '#fafafa', '#ccaabb']}
              src={user.avatarUrl}
            />
          </div>
          <div className="col-8 user-member-email">{user.email}</div>
          <div className="col-2">
            {user.isAssigned && <img src={checkedImage} width="17px" alt="Checked" />}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default MemberListItem;
