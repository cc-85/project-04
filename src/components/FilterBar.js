import React from 'react';

const FilterBar = ({ handleChange }) => {
  return (
    <form>
      <div className="field is-grouped">
        {/* <div className="control">
          <div className="select">
            <select name="sort" onChange={handleChange}>
              <option value="name|asc">Name A - Z</option>
              <option value="name|desc">Name Z - A</option>
            </select>
          </div>
        </div> */}
        <div className="control is-expanded">
          <input className="input" name="filter" onChange={handleChange} placeholder="Search..."/>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
