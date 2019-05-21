import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, classes, title, id }) => {
  return (
    <div className={classes} onClick={onClick} id={id}>
      {title}
    </div>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
