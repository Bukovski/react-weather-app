import moment from "moment";

import Icons from "./icons";
import { kelvinToC } from "./temperatureConvert";


const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


// Get date from Unix timestamp
const dateFromTimestamp = function(timestamp) {
	const date = new Date(timestamp * 1000);
	return moment(date).format("MMMM Do");
};

// Get time from Unix timestamp
const timeFromTimestamp = function(timestamp) {
	const date = new Date(timestamp * 1000);
	return moment(date).format("HH:MM");
};


export default function FetchDataWeather (latitude, longitude) {
	const geoCoordinates = `&lat=${ latitude }&lon=${ longitude }`;
	const currentWeatherUrl = `${ BASE_URL }weather?appid=${ API_KEY }${ geoCoordinates }`;
	const weatherForecastUrl = `${ BASE_URL }forecast?appid=${ API_KEY }${ geoCoordinates }`;
	
	
	const currentWeatherData = async () => {
		try {
			const response = await fetch(currentWeatherUrl);
			const getDataJson = await response.json();
			
			return {
				actualTemperature: kelvinToC(getDataJson.main.temp).toFixed(0),
				date: dateFromTimestamp(getDataJson.dt),
				cityName: getDataJson.name,
				windSpeed: getDataJson.wind.speed,
				humidity: getDataJson.main.humidity.toFixed(0),
				pressure: getDataJson.main.pressure.toFixed(0),
				weatherDescription: (getDataJson.weather[ 0 ].description).toUpperCase(),
				weatherIcon: Icons(getDataJson.weather[ 0 ].id),
			};
		} catch (err) {
			console.error(err)
		}
	};
	
	const weatherForecastData = async () => {
		try {
			const response = await fetch(weatherForecastUrl)
			const getDataJson = await response.json();
			
			console.log("weatherForecastData ->", getDataJson);
			
			const temperaturesForecast = [];
			const temperaturesForecastLabels = [];
			
			for (let i = 0; i < 5; i++) {
				temperaturesForecast[ i ] = Number(kelvinToC(getDataJson.list[ i ].main.temp).toFixed(1));
				temperaturesForecastLabels[ i ] = timeFromTimestamp(getDataJson.list[ i ].dt);
			}
			
			const cloneTemperaturesForecast = [ ...temperaturesForecast ].sort();
			const [ maxTemperature, minTemperature ] = [ cloneTemperaturesForecast.pop(),				cloneTemperaturesForecast.shift() ]
			
			return {
				temperaturesForecast,
				temperaturesForecastLabels,
				maxTemperature,
				minTemperature,
			};
		} catch (err) {
			console.error(err)
		}
	}
	
	return Promise.all([ currentWeatherData(), weatherForecastData() ])
		.then((responses) => {
			let weatherData = {};
			
			responses.forEach((response) => {
				weatherData = Object.assign(weatherData, response);
			});
			
			return weatherData;
		});
};
