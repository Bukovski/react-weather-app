import { fetchDataWeather, fetchDataWeatherFake } from "../../utils/fetchDataWeather";
import * as message from "../../libs/clientMessages/clientMessages";
import {
	mockCurrentWeather,	mockSearchCurrentWeather,
	mockSearchWeatherForecast, mockWeatherForecast
} from "../../__mocks__/weather.mock";



describe("fetchDataWeather Utils", () => {
	const messageErrorFn = jest.fn((text) => text);
	
	beforeAll(() => {
		jest.mock("../../libs/clientMessages/clientMessages");
		message[ "messageError" ] = (text) => messageErrorFn(text);
	});
	
	afterAll(() => {
		jest.clearAllMocks();
	});
	
	it('should return valid object', async () => {
		const mockFetchCurrentWeather = Promise.resolve({
			json: () => Promise.resolve(mockCurrentWeather),
			ok: () => true
		});
		
		const mockFetchWeatherForecast = Promise.resolve({
			json: () => Promise.resolve(mockWeatherForecast),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementationOnce(() => mockFetchCurrentWeather);
		fetch.mockImplementationOnce(() => mockFetchWeatherForecast);
		
		const dataProps = { latitude: 48.5682, longitude: 38.6435, cityName: undefined };
		
		const fetchWeather = await fetchDataWeather(dataProps);
		
		expect(fetchWeather).toEqual({
			actualTemperature: '0',
			cityName: 'Stakhanov',
			date: 'Wed, November 10',
			humidity: '51',
			maxTemperature: 0,
			minTemperature: -1,
			pressure: '1036',
			temperaturesForecast: [ 0, -1, -1, -2, -3 ],
			temperaturesForecastLabels: [ '18:11', '21:11', '00:11', '03:11', '06:11' ],
			weatherDescription: 'CLEAR SKY',
			weatherIcon: 'wi wi-day-sunny',
			windSpeed: 2.75,
			loaded: true,
			error: false
		})
	});
	
	it('search city should return valid object', async () => {
		const mockFetchCurrentWeather = Promise.resolve({
			json: () => Promise.resolve(mockSearchCurrentWeather),
			ok: () => true
		});
		
		const mockFetchWeatherForecast = Promise.resolve({
			json: () => Promise.resolve(mockSearchWeatherForecast),
			ok: () => true
		});
		
		fetch.resetMocks();
		fetch.mockImplementationOnce(() => mockFetchCurrentWeather);
		fetch.mockImplementationOnce(() => mockFetchWeatherForecast);
		
		const dataPropsCity = { latitude: undefined, longitude: undefined, cityName: 'Kiev, Kiev' };
		
		const fetchWeather = await fetchDataWeather(dataPropsCity);
		
		expect(fetchWeather).toEqual({
			actualTemperature: '4',
			cityName: 'Kyiv',
			date: 'Wed, November 10',
			humidity: '47',
			maxTemperature: 4,
			minTemperature: 1,
			pressure: '1030',
			temperaturesForecast: [ 4, 3, 3, 2, 1 ],
			temperaturesForecastLabels: [ '18:11', '21:11', '00:11', '03:11', '06:11' ],
			weatherDescription: 'CLEAR SKY',
			weatherIcon: 'wi wi-day-sunny',
			windSpeed: 0.45,
			loaded: true,
			error: false
		})
	});
	
	it('should call error messages', async () => {
		const mockFetchCurrentWeather = Promise.resolve({
			json: () => Promise.reject(new Error('Data empty')),
			ok: () => ({ status: 401 })
		});
		
		const mockFetchWeatherForecast = Promise.resolve({
			json: () => Promise.reject(new Error('Data empty')),
			ok: () => ({ status: 401 })
		});
		
		fetch.resetMocks();
		
		fetch.mockImplementationOnce(() => mockFetchCurrentWeather);
		fetch.mockImplementationOnce(() => mockFetchWeatherForecast);
		
		const dataProps = { latitude: 48.5682, longitude: 38.6435, cityName: undefined };
		
		await fetchDataWeather(dataProps);
		
		expect(messageErrorFn).toHaveBeenCalledTimes(2);
		expect(messageErrorFn.mock.calls[0][0]).toBe("Couldn't get weather data");
		expect(messageErrorFn.mock.calls[1][0]).toBe("Couldn't get weather data");
	});
	
	it ("fetchDataWeatherFake return static object", () => {
		expect(fetchDataWeatherFake()).toEqual({
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
		})
	})

});