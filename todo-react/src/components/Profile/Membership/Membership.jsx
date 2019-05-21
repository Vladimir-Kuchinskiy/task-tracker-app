import React, { Component } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';

import TransactionModal from './TransactionModal';
import MembershipCard from '../../../containers/Profile/MembershipCard';
import MembershipNavbar from './MembershipNavbar';
import SubscriptionInfo from '../../../containers/Profile/SubscriptionInfo';

class Membership extends Component {
  state = { showModal: false, activeTab: '1' };

  componentDidMount() {
    const { getSubscription, authToken } = this.props;
    getSubscription(authToken);
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { showModal, activeTab } = this.state;

    const tabContent = (
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="row justify-content-center mt-3 mb-4">
            <MembershipCard toggleModal={this.toggleModal} />
            <TransactionModal showModal={showModal} toggleModal={this.toggleModal} />
          </div>
        </TabPane>
        <TabPane tabId="2">
          <SubscriptionInfo />
        </TabPane>
      </TabContent>
    );

    return (
      <React.Fragment>
        <h2 className="row">Membership</h2>
        <MembershipNavbar activeTab={activeTab} toggle={this.toggleTab} />
        {tabContent}
      </React.Fragment>
    );
  }
}

Membership.propTypes = {
  authToken: PropTypes.string.isRequired,
  getSubscription: PropTypes.func.isRequired
};

export default Membership;
