import { connect } from 'react-redux';

import {
  getClientToken,
  setInstance,
  buyMembership,
  buyMembershipLoadingFinish
} from '../../actions/profileActions';
import MembershipBraintreeDropin from '../../components/Profile/Membership/MembershipBraintreeDropin';

const mapStateToProps = ({ auth, profile: { membership } }) => {
  return {
    authToken: auth.authToken,
    clientToken: membership.clientToken,
    instance: membership.instance,
    loading: !membership.clientToken,
    loadingModal: membership.loadingModal
  };
};

export default connect(
  mapStateToProps,
  { getClientToken, setInstance, buyMembership, buyMembershipLoadingFinish }
)(MembershipBraintreeDropin);
