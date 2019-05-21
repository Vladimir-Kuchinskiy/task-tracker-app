import { connect } from 'react-redux';

import { membershipCardContent } from '../../services/viewHelpers';
import MembershipCard from '../../components/Profile/Membership/MembershipCard';

const mapStateToProps = ({ profile: { membership } }) => {
  return {
    isMember: membership.isMember,
    ...membershipCardContent(membership.isMember, membership.subscription),
    loading: membership.loading
  };
};

export default connect(mapStateToProps)(MembershipCard);
