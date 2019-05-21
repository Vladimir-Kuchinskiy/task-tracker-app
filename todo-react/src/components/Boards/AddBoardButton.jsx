import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBoardButton = ({ toggleShowNew }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const plusImage = mouseOver ? 'plus-white.png' : 'plus.png';
  return (
    <div
      className="col-3 add-board"
      onMouseOver={() => setMouseOver(!mouseOver)}
      onMouseOut={() => setMouseOver(!mouseOver)}
      onClick={toggleShowNew}
    >
      <img alt="Add Board" src={require('../../images/' + plusImage)} />
    </div>
  );
};

AddBoardButton.propTypes = {
  toggleShowNew: PropTypes.func
};

export default AddBoardButton;
