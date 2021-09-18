import React from 'react';

const Search = (props) => {
  const {
    children,
    onChangeValue = () => {},
    onClearField = () => {},
    onKeyCatcher = () => {},
    onClickButton = () => {},
    textValue,
  } = props;
  
  
  return (
    <div className="search">
      <div className="search__wrap">
        <input
          type="search"
          role="search"
          placeholder="Search for a location"
          className="search__input"
          onChange={ onChangeValue }
          onBlur={ onClearField }
          onKeyDown={ onKeyCatcher }
          value={ textValue }
        />
        
        <button
          type="submit"
          className="search__button"
          onClick={ onClickButton }
        >
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
        {
          children
        }
      </div>
    </div>
  );
};


export default Search;
