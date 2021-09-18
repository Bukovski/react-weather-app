import React, { Fragment } from "react";

import { fetchDataWeather, fetchDataWeatherFake } from './units/fetchDataWeather';
import fetchDataLocation from "./units/fetchDataLocation";

import Geo from "./components/geo.component";
import Temperature from "./components/temperature.component";
import Detail from "./components/detail.component";
import Diagram from "./components/diagram.component";
import Preloader from "./components/preloader/preloader.component";
import Search from "./components/search.component";
import ThemeSwitcher from "./components/theme-switcher.component";


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
    this.getData();
    // this.getFakeData();
  }
  
  getFakeData() {
    setTimeout(() => {
      this.setState({ ...fetchDataWeatherFake() });
    }, 1000)
  }
  
  // Fetch the data using the gps coordinates
  async getData() {
    const getLocation = await fetchDataLocation();
    const weatherData = await fetchDataWeather(getLocation);
    
    this.setState({ ...weatherData });
  }
  
  
  handleLocationChange = async (inputText) => {
    const weatherData = await fetchDataWeather({ cityName: inputText });
    
    if (!weatherData.error) {
      this.setState({ ...weatherData });
    }
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
        { <Preloader isLoaded={ loaded }/> }
        
        <div className="main">
          <div className="panel">
            <Search onLocationChange={ this.handleLocationChange }/>
            <ThemeSwitcher />
          </div>
          
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

