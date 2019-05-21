import { connect } from 'react-redux';

import { getTeams } from '../../actions/teamsActions';
import Teams from '../../components/Teams/Teams';

const mapStateToProps = ({ auth, teams, profile: { membership } }) => {
  return {
    teams: Object.values(teams.teams),
    isAnyTeams: Object.values(teams.teams).length > 0,
    loading: teams.loading,
    authToken: auth.authToken,
    isMember: membership.isMember
  };
};

export default connect(
  mapStateToProps,
  { getTeams }
)(Teams);
