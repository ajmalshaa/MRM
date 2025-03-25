import React from 'react'

import { useEffect } from 'react';
import { useState } from 'react';
import './CalendarActivities.css'
const Weather = (props) => {
    const [weatherData, setWeatherData] = useState(null);
    
    // const WEATHERapiKey = 'c71022d74b1369102bb289a93cdb04a5';
    const WEATHERapiKey = process.env.REACT_APP_WEATHER_APIKEY;
    const WeatherURL= process.env.REACT_APP_WEATHER_URL
    const gotCity=props.cityName
    //console.log(gotCity)
    
    const city = 'Alappuzha'; // Replace with the desired city
    

    useEffect(() => {
        
        
        // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const apiUrl = `${WeatherURL}?q=${city}&appid=${WEATHERapiKey}`;
        
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            setWeatherData(data);
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }, [WEATHERapiKey, city]);
    
      if (!weatherData) {
        return <div>Loading...</div>;
        
      
      
      }
      
      const temperatureCelsius = weatherData.main.temp - 273.15;
      
      
  return (
    <div className='weather'>
    <h6>Weather in <b>{weatherData.name}</b></h6> &nbsp; &nbsp; &nbsp;
    <h6>Temp: {temperatureCelsius.toFixed(2)}°C</h6> &nbsp; &nbsp; &nbsp;
    <h6>Weather: {weatherData.weather[0].description}</h6>
    <img src={(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)} className="filtered-icon"/>
    
    {/* Add more information as needed */}
    
  </div>
  )
}

export default Weather