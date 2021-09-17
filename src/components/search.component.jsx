import React, { useEffect, useRef, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import fakeLocationSuggestion from "../units/fakeLocationSuggestion.json";


const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT = 20;

const Search = (props) => {
  const isCancelled = useRef(false);
  const [ users, setUsers ] = useState([]);
  const [ text, setText ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  // const [ suggestions, setSuggestions ] = useState(fakeLocationSuggestion);
  
  // the index of the drop-down list item to select using the up and down keys.
  // After pressing, the enter will return to position -1
  const [ focusSuggestion, setFocusSuggestion ] = useState(-1);
  

  
  // /*
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(text) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
        
        const res = await fetcher(URL);
        const dataUsers = res.suggestions;
        
        if (dataUsers) {
          setUsers(dataUsers);
        }
  
        clearFocusSuggestion();
      } catch (err) {
        messageError("Sorry, something wrong with input autocomplete");
        isCancelled.current = true;
      }
    }
    
    // If an error occurs while receiving data from the server,
    // then we no longer make a request to the server
    if (!isCancelled.current) {
      loadUsers();
    }
  }, [ text ]);
  // */
  
  const handleChangeValue = (event) => {
    const text = event.target.value;
    
    setSuggestions(users);
    setText(text.toLowerCase());
  }
  
  const handleSuggestClick = text => {
    setText(text);
    setSuggestions([]);
  }
  
  const handleClearField = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100)
  }
 
  const clearFocusSuggestion = () => {
    if (focusSuggestion !== -1) {
      setFocusSuggestion(-1);
      handleClearField();
    }
  }
 
  const handleKeyCatcher = (event) => {
    if (
      (event.key === "ArrowUp" || event.code === " ArrowUp")
      && focusSuggestion > -1
    ) {
      setFocusSuggestion(focusSuggestion - 1)
    }
    
    const maxSuggest = suggestions.length - 1;
    if (
      (event.key === "ArrowDown" || event.code === " ArrowDown")
      && focusSuggestion !== maxSuggest
    ) {
      setFocusSuggestion(focusSuggestion + 1)
    }
  
    if (
      (event.key === "Enter" || event.code === " Enter")
      && focusSuggestion !== -1
    ) {
      setText(suggestions[ focusSuggestion ].address.district)
    }
  }

  
  return (
    <div className="search">
      <div className="search__wrap">
        <input
          type="search"
          role="search"
          placeholder="Search for a location"
          className="search__input"
          onChange={ handleChangeValue }
          onBlur={ handleClearField }
          onKeyDown={ handleKeyCatcher }
          value={ text }
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
        {
          suggestions && <ul className="search__autocomplete">{
            suggestions.map((suggestion, index) => {
              const cityName = suggestion.address.district;
              console.log(index, focusSuggestion)
              return <li
                className={ "search__autocomplete-item " + ((focusSuggestion === index) ? "search__autocomplete-item--color" : "") }
                key={ suggestion.locationId }
                onClick={ () => handleSuggestClick(cityName) }
              >{ cityName }</li>
            })
          }</ul>
        }
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
