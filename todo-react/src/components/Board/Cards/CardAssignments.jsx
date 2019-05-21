import React from 'react';
import AssignedUsers from './AssignedUsers';

const CardAssignments = ({ assignedUsers }) => {
  return (
    assignedUsers.length > 0 && (
      <div className="mb-3">
        Members
        <AssignedUsers assignedUsers={assignedUsers} isModal={true} />
      </div>
    )
  );
};

export default CardAssignments;
