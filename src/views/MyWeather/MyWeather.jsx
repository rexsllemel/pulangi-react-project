import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';

const MyWeather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '5bd755699b89f78d34ea4dc34fa29e03',
    lat: '7.90639000',
    lon: '125.09417000',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <div style={{ height: '100px', width: '100%', fontSize: '10' }}>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Pulangui, Valencia City Bukidnon"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
    </div>
  );
};

export default MyWeather;
