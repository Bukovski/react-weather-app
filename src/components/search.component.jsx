import React, { useEffect, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import fakeLocationSuggestion from "../units/fakeLocationSuggestion.json";


const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT = 5;

const Search = (props) => {
  const [ users, setUsers ] = useState([]);
  const [ text, setText ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  // const [ suggestions, setSuggestions ] = useState(fakeLocationSuggestion);
  
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(text) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
  
        const res = await fetcher(URL);
        const dataUsers = res.suggestions;
        
        if (dataUsers) {
          setUsers(dataUsers);
        }
      } catch (err) {
        messageError("Sorry, something wrong with input autocomplete");
      }
    }
    
    loadUsers();
  }, [ text ]);
  
  const onChangeHandler = (text) => {
    setSuggestions(users);
    setText(text.toLowerCase());
  }
  
  const onSuggestHandler = text => {
    setText(text);
    setSuggestions([]);
  }
  
  const onClearFieldHandler = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 100)
  }
  
  return (
    <div className="search">
      <div className="search__wrap">
        <input
          type="search"
          role="search"
          placeholder="Search for a location"
          className="search__input"
          onChange={ e => onChangeHandler(e.target.value) }
          onBlur={ onClearFieldHandler }
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
      </div>
      {
        suggestions && <ul className="search__autocomplete">{
          suggestions.map((suggestion) => {
          const cityName = suggestion.address.district;
          
          return <li
            className="search__autocomplete-item"
            key={ suggestion.locationId }
            onClick={ () => onSuggestHandler(cityName) }
          >{ cityName }</li>
        })
        }</ul>
      }
    </div>
  );
};

// Search.propTypes = {
//   isSearching: PropTypes.bool,
//   location: PropTypes.string.isRequired,
//   onLocationChange: PropTypes.func.isRequired,
// };

export default Search;
