import React, { Fragment } from "react";

import { fetchDataWeather, fetchDataWeatherFake } from '../utils/fetchDataWeather';
import fetchDataLocation from "../utils/fetchDataLocation";

import Geo from "../components/geo.component";
import Temperature from "../components/temperature.component";
import Detail from "../components/detail.component";
import Diagram from "../components/diagram.component";
import ThemeSwitcher from "../components/themeSwitcher.component";
import AutocompleteContainer from "./autocomplete.container";


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      actualTemperature: '0',
      maxTemperature: '0',
      minTemperature: '0',
      date: 'Fri, May 6',
      cityName: 'City Name',
      windSpeed: '0',
      humidity: '0',
      pressure: '0',
      weatherDescription: 'clouds',
      weatherIcon: 'wi wi-day-cloudy',
      temperaturesForecast: [ -10, -5, 0, 5, 10 ],
      temperaturesForecastLabels: [ "09:00", "12:00", "15:00", "18:00", "21:00" ],
      loaded: false,
      error: false,
      theme: 'default'
    };
  }
  
  componentDidMount() {
    this._getData();
    // this._getFakeData();
  }
  
  _getFakeData() {
    setTimeout(() => {
      this.setState({ ...fetchDataWeatherFake() });
    }, 1000)
  }
  
  _setDataWeather = async (dataWeather) => {
    const weatherData = await fetchDataWeather(dataWeather);
    
    if (!weatherData.error) {
      this.setState({ ...weatherData });
    }
  };
  
  // Fetch the data using the gps coordinates
  _getData = async () => {
    const getLocation = await fetchDataLocation();
    this._setDataWeather(getLocation)
  }
  
  
  // Fetch the data using city name from input on page
  handleLocationChange = async (inputText) => {
    this._setDataWeather({ cityName: inputText })
  };
  
  
  render() {
    const {
      cityName, date,
      actualTemperature, maxTemperature, minTemperature,
      weatherDescription, weatherIcon, windSpeed, humidity, pressure,
      temperaturesForecast, temperaturesForecastLabels,
      loaded
    } = this.state;
    
    return (
      <Fragment>
        <div className="main">
          <div className="panel">
            <AutocompleteContainer onLocationChange={ this.handleLocationChange }/>
            <ThemeSwitcher />
          </div>
          
          <Geo data={{ cityName, date }} />
          
          <Temperature data={{ actualTemperature, maxTemperature, minTemperature }} />
          
          <Detail data={{ weatherDescription, weatherIcon, windSpeed, humidity, pressure }}/>
          
          <Diagram data={{ temperaturesForecast, temperaturesForecastLabels, loaded }}/>
        </div>
      </Fragment>
    );
  }
}


export default AppContainer;

