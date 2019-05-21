import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

const Spinner = ({ style }) => {
  return (
    <div className="lds-css ng-scope center">
      <div className="lds-double-ring" style={style}>
        <div />
        <div />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  style: PropTypes.object
};

export default Spinner;
