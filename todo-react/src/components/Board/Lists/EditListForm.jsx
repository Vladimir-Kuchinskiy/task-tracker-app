import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import { updateList } from '../../../actions/boardActions';

class EditListForm extends Component {
  componentDidMount() {
    this.editListField.focus();
  }

  onSubmit = values => {
    const { onEdit, updateList, listId, authToken } = this.props;
    if (values.title === '') throw new SubmissionError({ title: 'Can not be blank' });
    updateList(values, listId, authToken);
    onEdit();
  };

  renderInputField = field => {
    return (
      <input
        style={{ padding: '4px 2px 4px 3px' }}
        type="text"
        ref={input => (this.editListField = input)}
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
            <Field name="title" component={this.renderInputField} onBlur={onEdit} />
          </div>
        </form>
      </div>
    );
  }
}

EditListForm.propTypes = {
  listId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm(
  (_state, { listId }) => ({
    form: `EditListForm-${listId}`
  }),
  { updateList }
)(
  connect(
    mapStateToProps,
    { updateList }
  )(EditListForm)
);
