import React from 'react';
import UserAvatar from 'react-user-avatar';
import ReactTooltip from 'react-tooltip';

const CardMember = ({ user }) => {
  return (
    <React.Fragment key={user.email}>
      <div
        className="mt-3 ml-2"
        style={{ width: '35px', display: 'inline-block' }}
        data-tip
        data-for={`tooltip${user.email}`}
      >
        <UserAvatar
          className="mamber-avatar"
          style={{ display: 'inline-block' }}
          size="35"
          name="Vladimir Kuchinskiy"
          colors={['#ccc', '#fafafa', '#ccaabb']}
          src={user.avatarUrl}
        />
      </div>
      <ReactTooltip id={`tooltip${user.email}`} type="dark">
        <span>{user.email}</span>
      </ReactTooltip>
    </React.Fragment>
  );
};

export default CardMember;
