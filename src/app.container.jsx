import React, { useEffect } from "react";

import fetchDataWeather from './units/fetchDataWeather'

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  
    // {
    //   "actualTemperature": "18",
    //   "maxTemperature": 23,
    //   "minTemperature": 15,
    //   "date": "Sunday, 1818 0",
    //   "cityName": "Stakhanov",
    //   "windSpeed": 2.68,
    //   "humidity": "50",
    //   "pressure": "1015",
    //   "weatherDescription": "OVERCAST CLOUDS",
    //   "weatherIcon": "wi wi-day-cloudy",
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
    
    const { cityName, date } = this.state;
    
    return (
      <div className="main" data-theme="default">
        <Geo cityName={ cityName } date={ date } />
      
        <Temperature/>
      
        <Detail/>
      
        <Diagram/>
      </div>
    );
  }
}

export default AppContainer;

