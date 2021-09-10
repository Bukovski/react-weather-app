import moment from "moment";

import Icons from "./icons";


const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


// Convert degree Kelvin to degree Celsius
const kelvinToC = (kelvin) => kelvin - 273;

// Get date from Unix timestamp
const dateFromTimestamp = function(timestamp) {
	const date = new Date(timestamp * 1000);
	return moment(date).format("dddd, mmmm d");
};

// Get time from Unix timestamp
const timeFromTimestamp = function(timestamp) {
	const date = new Date(timestamp * 1000);
	return moment(date).format("HH:MM");
};

export default function Api (latitude, longitude) {
	const geoCoordinates = `&lat=${ latitude }&lon=${ longitude }`;
	const currentWeatherUrl = `${ BASE_URL }weather?appid=${ API_KEY }${ geoCoordinates }`;
	const weatherForecastUrl = `${ BASE_URL }forecast?appid=${ API_KEY }${ geoCoordinates }`;
	
	
	const currentWeatherData = fetch(currentWeatherUrl)
		.then((response) => response.json())
		.then((json) => {
			console.log("1 currentWeatherData -->", json)
			
			return {
				actualTemperature: kelvinToC(json.main.temp).toFixed(0),
				date: dateFromTimestamp(json.dt),
				cityName: json.name,
				windSpeed: json.wind.speed,
				humidity: json.main.humidity.toFixed(0),
				pressure: json.main.pressure.toFixed(0),
				weatherDescription: (json.weather[0].description).toUpperCase(),
				weatherIcon: Icons(json.weather[0].id),
			};
		});
	
	const weatherForecastData = fetch(weatherForecastUrl)
		.then((response) => response.json())
		.then((json) => {
			console.log("2 weatherForecastData -->", json)
			
			const temperaturesForecast = [];
			const temperaturesForecastLabels = [];
			
			for (var i = 0; i < 9; i++) {
				temperaturesForecast[ i ] = Number(kelvinToC(json.list[ i ].main.temp).toFixed(1));
				temperaturesForecastLabels[ i ] = timeFromTimestamp(json.list[ i ].dt);
			}
			
			const cloneTemperaturesForecast = [ ...temperaturesForecast ].sort();
			const [ maxTemperature, minTemperature ] = [ cloneTemperaturesForecast.pop(),				cloneTemperaturesForecast.shift() ]
			
			return {
				temperaturesForecast,
				temperaturesForecastLabels,
				maxTemperature,
				minTemperature,
			};
		});
	
	return Promise.all([ currentWeatherData, weatherForecastData ])
		.then((responses) => {
			let weatherData = {};
			
			responses.forEach((response) => {
				weatherData = Object.assign(weatherData, response);
			});
			
			return weatherData;
		});
};
