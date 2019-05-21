import React from 'react';
import UserAvatar from 'react-user-avatar';

import CardMember from './CardMember';
import './styles/AssignedUsers.css';

const AssignedUsers = ({ assignedUsers, isModal }) => {
  const renderDots = assignedUsers.length > 3 && !isModal;
  return (
    <React.Fragment>
      <div style={{ display: 'block' }}>
        {assignedUsers.map((user, index) => {
          const isNeedToRender = index > 2 && !isModal;
          return isNeedToRender ? null : <CardMember key={user.email} user={user} />;
        })}
        {renderDots && (
          <UserAvatar
            className="ml-2"
            style={{ display: 'inline-block', marginBottom: '8px' }}
            size="15"
            name="Vladimir Kuchinskiy"
            colors={['#ccc', '#fafafa', '#ccaabb']}
            src={require('../../../images/more.png')}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default AssignedUsers;
