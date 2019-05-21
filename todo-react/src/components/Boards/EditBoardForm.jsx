import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import { updateBoard } from '../../actions/boardsActions';

class EditBoardForm extends Component {
  componentDidMount() {
    this.editBoardField.focus();
  }
  onSubmit = values => {
    const { updateBoard, boardId, teamId, onEdit, authToken } = this.props;
    if (values.title === '') throw new SubmissionError({ title: 'Can not be blank' });
    updateBoard(values, boardId, teamId, authToken);
    onEdit();
  };
  renderInputField = field => {
    const { inputStyle, boardPage } = this.props;
    const inputLettersCount = field.input.value.replace(/\s/g, '').length * 16 + 4;
    const width = boardPage ? `${inputLettersCount}px` : null;
    return (
      <input
        style={{ ...inputStyle, width }}
        type="text"
        ref={input => (this.editBoardField = input)}
        className="form-control mb-2"
        {...field.input}
      />
    );
  };
  render() {
    const { handleSubmit, onEdit, style } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)} style={style}>
          <Field name="title" component={this.renderInputField} onBlur={onEdit} />
        </form>
      </div>
    );
  }
}

EditBoardForm.propTypes = {
  boardPage: PropTypes.bool,
  boardId: PropTypes.string.isRequired,
  teamId: PropTypes.string,
  authToken: PropTypes.string.isRequired,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  updateBoard: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm(
  (_state, props) => ({
    form: `EditBloardForm-${props.boardId}`
  }),
  { updateBoard }
)(
  connect(
    mapStateToProps,
    { updateBoard }
  )(EditBoardForm)
);
