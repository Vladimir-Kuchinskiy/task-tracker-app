import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import { createList } from '../../../actions/boardActions';
import Button from '../../common/Button';

class NewListForm extends Component {
  componentDidMount() {
    this.newListField.focus();
  }
  onSubmit = values => {
    const { createList, onClose, board, authToken } = this.props;
    if (values.title === undefined) throw new SubmissionError({ title: 'Can not be blank' });
    createList(values, board.id, authToken);
    onClose();
  };
  renderInputField = field => {
    return (
      <input
        type="text"
        ref={input => (this.newListField = input)}
        className="form-control"
        {...field.input}
      />
    );
  };
  render() {
    const { onClose, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <Field name="title" component={this.renderInputField} />
        </div>
        <button type="submit" className="btn btn-success pull-left">
          Create List
        </button>
        <Button onClick={onClose} classes="btn btn-danger pull-right" title="Close" />
      </form>
    );
  }
}

NewListForm.propTypes = {
  board: PropTypes.object.isRequired,
  authToken: PropTypes.string.isRequired,
  createList: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ board: { board }, auth }) => {
  return { board, authToken: auth.authToken };
};

export default reduxForm({ form: 'NewListForm' }, { createList })(
  connect(
    mapStateToProps,
    { createList }
  )(NewListForm)
);
