import { connect } from 'react-redux';

import { cancelSubscription } from '../../actions/profileActions';
import SubscriptionInfo from '../../components/Profile/Membership/SubscriptionInfo';

const mapStateToProps = ({ profile: { membership }, auth }) => {
  const isCanceled = membership.subscription && membership.subscription.status === 'Canceled';
  return {
    subscription: membership.subscription,
    isCanceled,
    authToken: auth.authToken,
    loadingCancel: membership.loadingCancel
  };
};

export default connect(
  mapStateToProps,
  { cancelSubscription }
)(SubscriptionInfo);
