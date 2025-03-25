import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navi from './Navi';
import Weather from './Weather';
const Utilities = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null);
  
  // const APIkey='81086adf98c64e88a5ea443bc2a54f1a'
//   const APIkey='ffdf7cdeb01048348df73edbb5dc4864'
  const APIkey=process.env.REACT_APP_GEO_APIKEY
  const Geolocation_url=process.env.REACT_APP_GEOLOCATION_URL
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords)

          // Set the geolocation coordinates
          
          setLocation({ latitude, longitude });

          // Reverse geocoding to get the city
          axios
            //.get(`https://api.opencagedata.com/geocode/v1/json?key=${APIkey}&q=${latitude}+${longitude}&pretty=1`)
            .get(`${Geolocation_url}?key=${APIkey}&q=${latitude}+${longitude}&pretty=1`)
            .then((response) => {
              // console.log(response.data.results[0]);
              const city = response.data.results[0].components.state_district;
              
              console.log(city);
              setCity(city);
            })
            .catch((err) => {
              setError('Error fetching city information');
              console.error('Error fetching city information:', err);
            });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div>
     
      {city===null?(console.log('null'))
      :<Weather cityName={city}/>}
    </div>
  );
  
};

export default Utilities;
