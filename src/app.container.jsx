import React, { Fragment } from "react";

import { fetchDataWeather, fetchDataWeatherFake } from './units/fetchDataWeather';
import fetchDataLocation from "./units/fetchDataLocation";
import { messageError } from "./libs/errorMessages/errorMessages";

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";
import Preloader from "./components/preloader/preloader.component";


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      actualTemperature: '0',
      maxTemperature: '0',
      minTemperature: '0',
      date: 'Fri, May 6',
      cityName: 'City Name',
      windSpeed: '---',
      humidity: '--',
      pressure: '----',
      weatherDescription: 'clouds',
      weatherIcon: 'wi wi-day-cloudy',
      temperaturesForecast: [ -10, -5, 0, 5, 10 ],
      temperaturesForecastLabels: [ "09:00", "12:00", "15:00", "18:00", "21:00" ],
      loaded: false,
      theme: 'default'
    };
  }
  
  componentDidMount() {
    this.getData();
    // this.getFakeData();
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.theme !== this.state.theme) {
      const getThemeSwitcher = document.body;
      getThemeSwitcher.setAttribute("data-theme", this.state.theme);
    }
  }
  
  getFakeData() {
    setTimeout(() => {
      this.setState({ ...fetchDataWeatherFake() });
    }, 1000)
  }
  
  // Fetch the data using the gps coordinates
  async getData() {
    try {
      const getLocation = await fetchDataLocation();
      const weatherData = await fetchDataWeather(getLocation);
  
      this.setState({
        actualTemperature: weatherData.actualTemperature,
        maxTemperature: weatherData.maxTemperature,
        minTemperature: weatherData.minTemperature,
        date: weatherData.date,
        cityName: weatherData.cityName,
        windSpeed: weatherData.windSpeed,
        humidity: weatherData.humidity,
        pressure: weatherData.pressure,
        weatherDescription: weatherData.weatherDescription,
        weatherIcon: weatherData.weatherIcon,
        temperaturesForecast: weatherData.temperaturesForecast,
        temperaturesForecastLabels: weatherData.temperaturesForecastLabels,
        loaded: true
      });
    } catch (err) {
      messageError(err.message);
    }
  }
  
  render() {
    const {
      cityName, date,
      actualTemperature, maxTemperature, minTemperature,
      weatherDescription, weatherIcon, windSpeed, humidity, pressure,
      temperaturesForecast, temperaturesForecastLabels,
      theme, loaded
    } = this.state;
    
    
    return (
      <Fragment>
        { <Preloader isLoaded={ loaded }/> }
        
        <div className="main">
          <Geo cityName={ cityName } date={ date } />
          
          <Temperature data={{ actualTemperature, maxTemperature, minTemperature }} />
          
          <Detail data={{ weatherDescription, weatherIcon, windSpeed, humidity, pressure }}/>
          
          <Diagram data={{ temperaturesForecast, temperaturesForecastLabels, loaded }}/>
        </div>
      </Fragment>
    );
  }
}

export default AppContainer;

