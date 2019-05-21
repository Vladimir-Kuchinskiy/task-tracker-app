import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import { updateCard } from '../../../actions/boardActions';

class EditCardForm extends Component {
  componentDidMount() {
    this.editCardField.focus();
  }

  onSubmit = values => {
    const { updateCard, cardId, authToken, onEdit } = this.props;
    if (values.content === '') throw new SubmissionError({ content: 'Can not be blank' });
    updateCard(values, cardId, authToken);
    onEdit();
  };

  renderInputField = field => {
    return (
      <input
        type="text"
        ref={input => (this.editCardField = input)}
        className="form-control"
        {...field.input}
      />
    );
  };

  render() {
    const { handleSubmit, onEdit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field name="content" component={this.renderInputField} onBlur={onEdit} />
          </div>
        </form>
      </div>
    );
  }
}

EditCardForm.propTypes = {
  cardId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm(
  (_state, { cardId }) => ({
    form: `EditCardForm-${cardId}`
  }),
  { updateCard }
)(
  connect(
    mapStateToProps,
    { updateCard }
  )(EditCardForm)
);
