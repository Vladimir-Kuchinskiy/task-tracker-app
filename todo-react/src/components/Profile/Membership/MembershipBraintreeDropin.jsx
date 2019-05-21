import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DropIn from 'braintree-web-drop-in-react';

import Spinner from '../../common/Spinner';
import Button from '../../common/Button';

const MembershipBraintreeDropin = ({ authToken, ...props }) => {
  useEffect(() => {
    const { getClientToken } = props;
    getClientToken(authToken);
  }, []);

  const handleClick = () => {
    const { buyMembership, buyMembershipLoadingFinish, instance, onModalClose } = props;
    buyMembership(instance, authToken)
      .then(() => {
        onModalClose();
      })
      .catch(() => {
        buyMembershipLoadingFinish();
      });
  };

  const { clientToken, setInstance, loading, loadingModal } = props;
  if (loading) {
    return <Spinner style={{ marginLeft: '45%' }} />;
  } else {
    return (
      <div>
        <DropIn
          options={{ authorization: clientToken }}
          onInstance={instance => setInstance(instance)}
        />
        <div style={{ textAlign: 'center' }}>
          {loadingModal ? (
            'Wait a couple of seconds pleace...'
          ) : (
            <Button
              title="Buy Membership"
              classes="btn btn-outline-success"
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    );
  }
};

MembershipBraintreeDropin.propTypes = {
  authToken: PropTypes.string.isRequired,
  clientToken: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadingModal: PropTypes.bool.isRequired,
  buyMembership: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  setInstance: PropTypes.func.isRequired,
  getClientToken: PropTypes.func.isRequired,
  instance: PropTypes.object
};

export default MembershipBraintreeDropin;
