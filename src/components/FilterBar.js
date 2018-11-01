import React from 'react';

const FilterBar = ({ handleChange }) => {
  return (
    <div className="field is-grouped">
      <div className="control is-expanded">
        <input className="input" name="filter" onChange={handleChange} placeholder="Search by cocktail name or ingredient..."/>
      </div>
    </div>
  );
};

export default FilterBar;
