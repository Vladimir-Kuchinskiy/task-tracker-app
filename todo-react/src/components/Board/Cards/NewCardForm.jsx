import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import { createCard } from '../../../actions/boardActions';
import Button from '../../common/Button';

class NewCardForm extends Component {
  componentDidMount() {
    this.newCardField.focus();
  }
  onSubmit = values => {
    const { listId, authToken, createCard, onClose } = this.props;
    if (values.content === undefined) throw new SubmissionError({ title: 'Can not be blank' });
    createCard(values, listId, authToken);
    onClose();
  };
  renderInputField = field => {
    return (
      <input
        type="text"
        className="form-control"
        ref={input => (this.newCardField = input)}
        {...field.input}
      />
    );
  };
  render() {
    const { handleSubmit, onClose } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field name="content" component={this.renderInputField} />
          </div>
          <button type="submit" className="btn btn-success pull-left">
            Create Card
          </button>
          <Button onClick={onClose} title="Close" classes="btn btn-danger pull-right" />
        </form>
      </div>
    );
  }
}

NewCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  createCard: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm(
  (_state, props) => ({
    form: `NewCardForm-${props.listId}`
  }),
  { createCard }
)(
  connect(
    mapStateToProps,
    { createCard }
  )(NewCardForm)
);
