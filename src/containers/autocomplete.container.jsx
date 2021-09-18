import { Fragment, useEffect, useRef, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import Search from "../components/search.component";
// import fakeLocationSuggestion from "../utils/fakeLocationSuggestion.json";


const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT = 20;

const AutocompleteContainer = (props) => {
	const { onLocationChange = (text) => {} } = props;
	
	const isCancelled = useRef(false); // true - block update load data from autocomplete api
	const [ textValue, setTextValue ] = useState(""); // input data
	const [ cities, setCities ] = useState([]); // saved full collection from autocomplete api
	const [ suggestions, setSuggestions ] = useState([]); // saved only filtered data
	
	// the index of the drop-down list item to select using the up and down keys.
	// After pressing, the enter will return to position -1
	const [ focusSuggestion, setFocusSuggestion ] = useState(-1);
	
	/*
	// for get fake data
	useEffect(() => {
		isCancelled.current = true;

		setTimeout(() => {
			setSuggestions(fakeLocationSuggestion);
		}, 1000);
	}, [])
	*/
	
	useEffect(() => {
		const loadUsers = async () => {
			try {
				const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(textValue) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
				
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
			_clearFocusSuggestion();
			_clearSuggestion(textValue);
			
			loadUsers();
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ textValue ]);
	
	
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
	
	const _clearSuggestion = (textValue) => {
		if (!textValue.length && suggestions.length) {
			setSuggestions([]);
		}
	}
	
	const _cityNameLayout = (suggestion) => {
		const countyName = suggestion.address.county || "";
		const cityName = suggestion.address.district || suggestion.address.city || "" ;
		
		return `${ cityName }, ${ countyName }`;
	}
	
	
	const handleChangeValue = (event) => {
		const textValue = event.target.value;
		
		setSuggestions(cities);
		setTextValue(textValue);
	}
	
	const handleSuggestClick = event => {
		const textClick = event.target.innerText;
		
		setTextValue(textClick);
		setSuggestions([]);
	}
	
	const handleClearField = () => {
		setTimeout(() => {
			setSuggestions([]);
		}, 200)
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
			setTextValue(_cityNameLayout(suggestions[ focusSuggestion ]));
			handleClearField();
		}
	}
	
	const handleClickButton = () => {
		onLocationChange(textValue);
		
		_clearFocusSuggestion();
		handleClearField();
		setTextValue("");
	}
	
	const _mapSuggestion = (suggestion, index) => {
		return <li
			className={ "search__autocomplete-item " + ((focusSuggestion === index) ? "search__autocomplete-item--color" : "") }
			key={ suggestion.locationId }
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
				textValue={ textValue }
			>
				{
					suggestions.length
						? <ul
							className="search__autocomplete"
				      onClick={ handleSuggestClick }
						>
							{ suggestions.map(_mapSuggestion) }
						</ul>
						: null
				}
			</Search>
		</Fragment>
	);
};



export default AutocompleteContainer;
