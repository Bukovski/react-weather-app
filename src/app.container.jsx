import React, { useEffect } from "react";

import fetchDataWeather from './units/fetchDataWeather'

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    
    //   "temperaturesForecast": [
    //   20,
    //   22,
    //   23,
    //   22,
    //   20,
    //   18,
    //   16,
    //   15,
    //   20
    // ],
    //   "temperaturesForecastLabels": [
    //   "09:09",
    //   "12:09",
    //   "15:09",
    //   "18:09",
    //   "21:09",
    //   "00:09",
    //   "03:09",
    //   "06:09",
    //   "09:09"
    // ],
    //   "loaded": true,
    //   "theme": "warm"
    // }
    
    this.state = {
      actualTemperature: '',
      maxTemperature: '--',
      minTemperature: '--',
      date: '',
      cityName: '',
      windSpeed: '---',
      humidity: '--',
      pressure: '----',
      weatherDescription: '',
      weatherIcon: '',
      temperaturesForecast: [],
      temperaturesForecastLabels: [],
      loaded: false,
      theme: 'warm'
    };
  }
  
  componentDidMount() {
    this.getData();
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

