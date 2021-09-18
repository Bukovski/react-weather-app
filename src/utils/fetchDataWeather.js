import Icons from "./icons";
import { kelvinToC } from "./temperatureConvert";
import { dateFromTimestamp, timeFromTimestamp } from "./timeConverter";
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";


const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";


const fetchDataWeather = ({ latitude, longitude, cityName }) => {
	let geoCoordinates = `&lat=${ latitude }&lon=${ longitude }`;
	
	if (cityName) {
		geoCoordinates = `&q=${ encodeURIComponent(cityName) }`;
	}
	
	const currentWeatherUrl = `${ BASE_URL }weather?appid=${ API_KEY }${ geoCoordinates }`;
	const weatherForecastUrl = `${ BASE_URL }forecast?appid=${ API_KEY }${ geoCoordinates }`;
	
	const currentWeatherData = async () => {
		try {
			const getDataJson = await fetcher(currentWeatherUrl);
			
			return  {
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
			messageError("Couldn't get weather data");
			return { error: true };
		}
	};
	
	const weatherForecastData = async () => {
		try {
			const getDataJson = await fetcher(weatherForecastUrl)
			
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
			messageError("Couldn't get weather data");
			return { error: true };
		}
	}
	
	return Promise.all([ currentWeatherData(), weatherForecastData() ])
		.then((responses) => {
			let weatherData = {
				actualTemperature: "21",
				cityName: "Tokyo",
				date: "Mon, September 13",
				humidity: "42",
				maxTemperature: 23,
				minTemperature: 17,
				pressure: "1012",
				temperaturesForecast: [21, 20, 19, 17, 23],
				temperaturesForecastLabels: ["21:09", "00:09", "03:09", "06:09", "09:09"],
				weatherDescription: "BROKEN CLOUDS",
				weatherIcon: "wi wi-day-cloudy",
				windSpeed: 2.32,
				loaded: true,
				error: false
			};
			
			responses.forEach((response) => {
				weatherData = Object.assign(weatherData, response);
			});
			
			return weatherData;
		});
};


const fetchDataWeatherFake = () => {
	return {
		"actualTemperature": "22",
		"maxTemperature": 24,
		"minTemperature": 18,
		"date": "Mon, September 12th",
		"cityName": "Tokyo",
		"windSpeed": 3.91,
		"humidity": "43",
		"pressure": "1016",
		"weatherDescription": "OVERCAST CLOUDS",
		"weatherIcon": "wi wi-day-cloudy",
		"temperaturesForecast": [ 21, 24, 22, 19, 18 ],
		"temperaturesForecastLabels": [ "12:09", "15:09", "18:09", "21:09", "00:09" ],
		"loaded": true
	}
}


export {
	fetchDataWeather,
	fetchDataWeatherFake
}
