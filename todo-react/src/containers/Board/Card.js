import { connect } from 'react-redux';

import Card from '../../components/Board/Cards/Card';

const mapStateToProps = ({ board: { members } }, { card }) => {
  const assignedUsers = members.filter(member => {
    let isAssigned = false;
    Object.values(card.assignments).forEach(assignment => {
      if (assignment.userEmail === member.email) isAssigned = true;
    });
    return isAssigned;
  });
  return { assignedUsers };
};

export default connect(mapStateToProps)(Card);
