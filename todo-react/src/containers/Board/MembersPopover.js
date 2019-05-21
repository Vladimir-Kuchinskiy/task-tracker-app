import { connect } from 'react-redux';

import { createAssignment, deleteAssignment } from '../../actions/boardActions';
import MembersPopover from '../../components/Board/Cards/MembersPopover';

const mapStateToProps = ({ board: { members, board }, auth: { authToken } }, { card }) => {
  const users = members.map(member => {
    let isAssigned = false;
    let userCardId;
    Object.values(card.assignments).forEach(assignment => {
      if (assignment.userEmail === member.email) {
        isAssigned = true;
        userCardId = assignment.id;
      }
    });
    return { ...member, isAssigned, userCardId, cardId: card.id };
  });
  return { users, authToken, boardId: board.id };
};

export default connect(
  mapStateToProps,
  { createAssignment, deleteAssignment }
)(MembersPopover);
