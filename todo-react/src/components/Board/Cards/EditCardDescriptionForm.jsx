import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Button from '../../common/Button';
import { updateCard } from '../../../actions/boardActions';

class EditCardDescriptionForm extends Component {
  componentDidMount() {
    setTimeout(function() {
      document.querySelector('textarea').focus();
    }, 0);
  }

  onSubmit = values => {
    const { updateCard, cardId, authToken, onEdit } = this.props;
    updateCard(values, cardId, authToken);
    onEdit();
  };

  render() {
    const { handleSubmit, descrAreaHeight } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <Field
            style={{ height: `${descrAreaHeight}px` }}
            name="description"
            component="textarea"
            className="form-control"
            rows="4"
            onBlur={handleSubmit(this.onSubmit)}
          />
        </div>
        <Button classes="btn btn-success" onClick={handleSubmit(this.onSubmit)} title="Add" />
      </form>
    );
  }
}

EditCardDescriptionForm.propTypes = {
  cardId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm(
  (_state, { cardId }) => {
    return {
      form: `EditCardDescriptionForm-${cardId}`
    };
  },
  { updateCard }
)(
  connect(
    mapStateToProps,
    { updateCard }
  )(EditCardDescriptionForm)
);
