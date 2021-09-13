import React from "react";

import { fetchDataWeather, fetchDataWeatherFake } from './units/fetchDataWeather'

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";


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
      theme: 'warm'
    };
  }
  
  componentDidMount() {
    // this.getData();
    this.getFakeData();
  }
  
  getFakeData() {
    setTimeout(() => {
      this.setState({ ...fetchDataWeatherFake() });
    }, 1000)
  }
  
  // Fetch the data using the gps coordinates
  getData() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchDataWeather(position.coords.latitude, position.coords.longitude)
          .then((data) => {
            this.setState({
              actualTemperature: data.actualTemperature,
              maxTemperature: data.maxTemperature,
              minTemperature: data.minTemperature,
              date: data.date,
              cityName: data.cityName,
              windSpeed: data.windSpeed,
              humidity: data.humidity,
              pressure: data.pressure,
              weatherDescription: data.weatherDescription,
              weatherIcon: data.weatherIcon,
              temperaturesForecast: data.temperaturesForecast,
              temperaturesForecastLabels: data.temperaturesForecastLabels,
              loaded: true
            });
          });
      },
      (error) => alert(error.message),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      }
    );
    
  }
  
  render() {
    // Render the activity monitor while the data is loading
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }
    
    const {
      cityName, date,
      actualTemperature, maxTemperature, minTemperature,
      weatherDescription, weatherIcon, windSpeed, humidity, pressure,
      temperaturesForecast, temperaturesForecastLabels
    } = this.state;
    
    return (
      <div className="main" data-theme="default">
        <Geo cityName={ cityName } date={ date } />
        
        <Temperature data={{ actualTemperature, maxTemperature, minTemperature }} />
        
        <Detail data={{ weatherDescription, weatherIcon, windSpeed, humidity, pressure }}/>
        
        <Diagram data={{ temperaturesForecast, temperaturesForecastLabels }}/>
      </div>
    );
  }
}

export default AppContainer;

