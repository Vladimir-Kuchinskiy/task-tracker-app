import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Spinner from '../../common/Spinner';
import Button from '../../common/Button';

const MembershipCard = ({ isMember, imageUrl, toggleModal, title, subtitle, body, loading }) => {
  return (
    <div className="col-5">
      <Card>
        {loading ? (
          <CardBody style={{ minHeight: '200px' }}>
            <Spinner style={{ marginLeft: '36%', top: '33%' }} />
          </CardBody>
        ) : (
          <React.Fragment>
            <img className="card-img-top" src={imageUrl} alt="Card cap" />
            <CardBody>
              <CardTitle style={{ fontSize: '1.5em' }}>{title}</CardTitle>
              <hr />
              <CardSubtitle style={{ fontSize: '1.3em' }}>{subtitle}</CardSubtitle>
              <hr />
              <CardText style={{ color: 'black' }}>{body}</CardText>
              {!isMember && (
                <React.Fragment>
                  <hr />
                  <Button title="Get Membership" classes="btn btn-primary" onClick={toggleModal} />
                </React.Fragment>
              )}
            </CardBody>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

MembershipCard.propTypes = {
  isMember: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default MembershipCard;
