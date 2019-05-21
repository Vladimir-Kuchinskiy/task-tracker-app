import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import MemberListItem from './MemberListItem';

const MembersPopover = ({
  users,
  toggle,
  popoverOpen,
  authToken,
  createAssignment,
  deleteAssignment,
  boardId
}) => {
  return (
    <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
      <PopoverHeader>Members</PopoverHeader>
      <PopoverBody>
        {users.length > 0 ? (
          <ul className="list-group">
            {users.map(user => (
              <MemberListItem
                key={user.email}
                boardId={boardId}
                user={user}
                authToken={authToken}
                createAssignment={createAssignment}
                deleteAssignment={deleteAssignment}
              />
            ))}
          </ul>
        ) : (
          'Card has no members.'
        )}
      </PopoverBody>
    </Popover>
  );
};

export default MembersPopover;
