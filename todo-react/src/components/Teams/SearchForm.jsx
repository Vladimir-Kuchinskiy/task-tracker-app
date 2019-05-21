import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onChange }) => {
  return (
    <div className="row">
      <div className="col-4">
        <form action="" onSubmit={e => e.preventDefault()}>
          <input onChange={onChange} type="text" className="form-control" placeholder="Search..." />
        </form>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SearchForm;
