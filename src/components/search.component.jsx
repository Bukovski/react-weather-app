import React from 'react';
// import PropTypes from 'prop-types';

const Search = (props) => {
  const { isSearching, onLocationChange = () => {} } = props;

  return (
      <div className="search">
        <div className="search__wrap">
        <input
          type="search"
          role="search"
          onChange={onLocationChange}
          placeholder="Search for a location"
          className="search__input"
        />
  
        <button type="submit" className="search__button">
          <svg
            width="24"
            height="24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        </div>
      </div>
  );
};

// Search.propTypes = {
//   isSearching: PropTypes.bool,
//   location: PropTypes.string.isRequired,
//   onLocationChange: PropTypes.func.isRequired,
// };

export default Search;
