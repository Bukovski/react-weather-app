import React, { useEffect, useRef, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import fakeLocationSuggestion from "../units/fakeLocationSuggestion.json";


const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT = 50;

const Search = (props) => {
  const isCancelled = useRef(false);
  // const isCancelled = useRef(true);
  const [ users, setUsers ] = useState([]);
  const [ text, setText ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  // const [ suggestions, setSuggestions ] = useState(fakeLocationSuggestion);
  
  // the index of the drop-down list item to select using the up and down keys.
  // After pressing, the enter will return to position -1
  const [ focusSuggestion, setFocusSuggestion ] = useState(-1);
  
  //TODO:
  // 5, отправить данные из инпута только после нажатия кнопки отправки
  // 6, получить геоданные о городе
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(text) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
        
        
        const res = await fetcher(URL);
        const suggestionsCollection = res.suggestions;
        
        const suggestionsFilter = _cityFilter(suggestionsCollection);
        console.log(suggestionsCollection, suggestionsFilter)
        
        if (suggestionsFilter) {
          setUsers(suggestionsFilter);
        }
        
        _clearSuggestion(text)
        _clearFocusSuggestion();
      } catch (err) {
        messageError("Sorry, something wrong with input autocomplete");
        // isCancelled.current = true;
      }
    }
    
    // If an error occurs while receiving data from the server,
    // then we no longer make a request to the server
    if (!isCancelled.current) {
      loadUsers();
    }
  }, [ text ]);

  
  const _cityFilter = (suggestionArr) => {
    if (suggestionArr) {
      return suggestionArr
        .filter(suggestObj => [ "district", "city" ].includes(suggestObj.matchLevel))
    }
    
    return suggestionArr;
  }
  
  const _clearFocusSuggestion = () => {
    if (focusSuggestion !== -1) {
      setFocusSuggestion(-1);
      handleClearField();
    }
  }
  
  const _clearSuggestion = (text) => {
    if (!text) {
      setSuggestions([]);
    }
  }
  
  const _cityNameLayout = (suggestion) => {
    const countyName = suggestion.address.county || "";
    const cityName = suggestion.address.district || suggestion.address.city || "" ;
    
    return `${ cityName }, ${ countyName }`;
  }
  
  
  
  const handleChangeValue = (event) => {
    const text = event.target.value;
    
    setSuggestions(users);
    setText(text);
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
      setText(_cityNameLayout(suggestions[ focusSuggestion ]))
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
          suggestions.length
            ? <ul className="search__autocomplete">{
              suggestions
                .map((suggestion, index) => {
                  return <li
                    className={ "search__autocomplete-item " + ((focusSuggestion === index) ? "search__autocomplete-item--color" : "") }
                    key={ suggestion.locationId }
                    onClick={ () => handleSuggestClick(_cityNameLayout(suggestion)) }
                  >{ _cityNameLayout(suggestion) }</li>
                })
            }</ul>
            : null
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
