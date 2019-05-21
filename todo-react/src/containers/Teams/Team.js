import { connect } from 'react-redux';

import { getTeam } from '../../actions/teamActions';
import Team from '../../components/Teams/Team';

const mapStateToProps = ({ team, auth, boards }) => {
  return {
    team: team.team,
    boards: Object.values(team.boards),
    authToken: auth.authToken,
    loading: team.loading,
    membersCount: Object.values(team.members).length,
    isCreator: team.isCreator,
    isBoardDeleting: boards.isBoardDeleting
  };
};

export default connect(
  mapStateToProps,
  { getTeam }
)(Team);
