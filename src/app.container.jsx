import React, { useEffect } from "react";

import Api from './units/api'

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
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
        Api(position.coords.latitude, position.coords.longitude)
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
    
    return (
      <div className="main" data-theme="default">
        <Geo/>
      
        <Temperature/>
      
        <Detail/>
      
        <Diagram/>
      </div>
    );
  }
}

export default AppContainer;

