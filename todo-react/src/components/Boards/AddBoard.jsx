import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles/AddBoard.css';
import NewBoardForm from './NewBoardForm';
import AddBoardButton from './AddBoardButton';

class AddBoard extends Component {
  state = {
    showNewBoardForm: false
  };

  toggleShowNewBoardForm = () => {
    const { showNewBoardForm } = this.state;
    this.setState({ showNewBoardForm: !showNewBoardForm });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showNewBoardForm ? (
          <NewBoardForm onClose={this.toggleShowNewBoardForm} teamId={this.props.teamId} />
        ) : (
          <AddBoardButton toggleShowNew={this.toggleShowNewBoardForm} />
        )}
      </React.Fragment>
    );
  }
}

AddBoard.propTypes = {
  teamId: PropTypes.string
};

export default AddBoard;
