import React from 'react';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';

import Spinner from '../../common/Spinner';

const SubscriptionInfo = props => {
  const { subscription, authToken, isCanceled, loadingCancel, cancelSubscription } = props;
  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you shure you want to cancel your subscription ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.value) cancelSubscription(subscription.id, authToken);
    });
  };

  const content = subscription ? (
    <div className="row justify-content-center mt-3 mb-4">
      <table className="table">
        <thead>
          <tr>
            <th>Bought at</th>
            <th>Updates/Expires at</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{subscription.boughtAt}</td>
            <td>{subscription.expiresAt}</td>
            <td>{subscription.status}</td>
            <td>
              <Button
                title="Cancel Subscription"
                color="danger"
                className="pull-right"
                disabled={isCanceled}
                onClick={handleClick}
              >
                Cancel Subscription
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <h3>You have no subscription, get one to extend your abilities</h3>
  );
  return loadingCancel ? <Spinner style={{ marginLeft: '45%', marginTop: '15%' }} /> : content;
};

export default SubscriptionInfo;
