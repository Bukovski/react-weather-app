import { Fragment, useEffect, useRef, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import Search from "../components/search.component";
// import fakeLocationSuggestion from "./units/fakeLocationSuggestion.json";


const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT = 20;

const AutocompleteContainer = (props) => {
	const { onLocationChange = (text) => {} } = props;
	
	const isCancelled = useRef(false); // true - block update load data from autocomplete api
	const [ text, setText ] = useState(""); // input data
	const [ cities, setCities ] = useState([]); // saved full collection from autocomplete api
	const [ suggestions, setSuggestions ] = useState([]); // saved only filtered data
	// const [ suggestions, setSuggestions ] = useState(fakeLocationSuggestion);
	
	// the index of the drop-down list item to select using the up and down keys.
	// After pressing, the enter will return to position -1
	const [ focusSuggestion, setFocusSuggestion ] = useState(-1);
	
	
	useEffect(() => {
		const loadUsers = async () => {
			try {
				const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(text) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
				
				const res = await fetcher(URL);
				const suggestionsCollection = res.suggestions;
				
				const suggestionsFilter = _cityFilter(suggestionsCollection);
				
				if (suggestionsFilter) {
					setCities(suggestionsFilter);
				}
				
			} catch (err) {
				messageError("Sorry, something wrong with input autocomplete");
				isCancelled.current = true;
			}
		}
		
		// If an error occurs while receiving data from the server,
		// then we no longer make a request to the server
		if (!isCancelled.current) {
			loadUsers();
			
			_clearFocusSuggestion();
			_clearSuggestion(text);
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		}
	}
	
	const _clearSuggestion = (text) => {
		if (!text.length && suggestions.length) {
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
		
		setSuggestions(cities);
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
		if ((event.key === "ArrowUp" || event.code === " ArrowUp")
			&& (focusSuggestion > -1)) {
			setFocusSuggestion(focusSuggestion - 1);
		}
		
		const maxSuggest = suggestions.length - 1;
		if ((event.key === "ArrowDown" || event.code === " ArrowDown")
			&& (focusSuggestion !== maxSuggest)) {
			setFocusSuggestion(focusSuggestion + 1);
		}
		
		if ((event.key === "Enter" || event.code === " Enter")
			&& (focusSuggestion !== -1)) {
			setText(_cityNameLayout(suggestions[ focusSuggestion ]));
			handleClearField();
		}
	}
	
	const handleClickButton = () => {
		onLocationChange(text);
		
		_clearFocusSuggestion();
		handleClearField();
		setText("");
	}
	
	const _mapSuggestion = (suggestion, index) => {
		return <li
			className={ "search__autocomplete-item " + ((focusSuggestion === index) ? "search__autocomplete-item--color" : "") }
			key={ suggestion.locationId }
			onClick={ () => handleSuggestClick(_cityNameLayout(suggestion)) }
		>
			{ _cityNameLayout(suggestion) }
		</li>
	};
	
	return (
		<Fragment>
			<Search
				onChangeValue={ handleChangeValue }
				onClearField={ handleClearField }
				onKeyCatcher={ handleKeyCatcher }
				onClickButton={ handleClickButton }
				textValue={ text }
			>
				{
					suggestions.length
						? <ul className="search__autocomplete">
							{ suggestions.map(_mapSuggestion) }
						</ul>
						: null
				}
			</Search>
		</Fragment>
	);
};



export default AutocompleteContainer;
