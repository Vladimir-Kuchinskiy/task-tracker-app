import { connect } from 'react-redux';

import { searchUsers } from '../../actions/teamActions';
import AddMember from '../../components/Teams/AddMember';

const mapStateToProps = ({ team }) => {
  return {
    findedUserEmails: team.findedUserEmails
  };
};

export default connect(
  mapStateToProps,
  { searchUsers }
)(AddMember);
