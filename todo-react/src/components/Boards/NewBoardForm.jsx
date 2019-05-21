import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';

import './styles/NewBoardForm.css';
import { createBoard } from '../../actions/boardsActions';
import Button from '../common/Button';

class NewBoardForm extends Component {
  componentDidMount() {
    this.newBoardField.focus();
  }

  onSubmit = values => {
    if (values.title === undefined) throw new SubmissionError({ title: 'Can not be blank' });
    const { authToken, createBoard, onClose, teamId } = this.props;
    createBoard(values, authToken, teamId);
    onClose();
  };

  renderInputField = field => {
    return (
      <input
        type="text"
        className="form-control"
        ref={input => (this.newBoardField = input)}
        {...field.input}
      />
    );
  };

  render() {
    const { onClose, handleSubmit } = this.props;
    return (
      <div className="create-board-form col-3">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field name="title" component={this.renderInputField} />
          </div>
          <button type="submit" className="btn btn-success pull-left">
            Create Board
          </button>
          <Button onClick={onClose} title="Close" classes="btn btn-danger pull-right" />
        </form>
      </div>
    );
  }
}

NewBoardForm.propTypes = {
  authToken: PropTypes.string.isRequired,
  teamId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createBoard: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { authToken: auth.authToken };
};

export default reduxForm({ form: 'NewBoardForm' }, { createBoard })(
  connect(
    mapStateToProps,
    { createBoard }
  )(NewBoardForm)
);
