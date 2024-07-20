import React, { useState, useEffect } from 'react';
import { getForecastWeather } from '../services/forecastWeatherService';
// import '../ForecastWeather.css';
// import weatherIcon from '../../../assets/weather-icon.png';

// Define the type for the forecast data
interface ForecastData {
  date: string;
  dayName: string;
  sunriseTime: string;
  sunsetTime: string;
  temperatureAvg: number;
  temperatureMin: number;
  temperatureMax: number;
}

interface ForecastWeatherProps {
  latitude: number;
  longitude: number;
  location?: string;
}

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ latitude, longitude, location }) => {
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const data = await getForecastWeather(latitude, longitude, location);
        setForecastData(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [latitude, longitude, location]);

  if (loading) return <p>Loading forecasted weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!forecastData || !Array.isArray(forecastData)) return null;

  return (
    <div className="forecast-container">
      {forecastData.map((forecast, index) => (
        <div className="forecast-item" key={index}>
          <div className="weather-info">
            <p className="date">{forecast.dayName}</p>
            <p>{forecast.date}</p>
            {/* <div className="weather-icon">
              <img src={weatherIcon} alt="Weather Icon" />
            </div> */}
            <p className="sunrise-sunset">Sunrise: {forecast.sunriseTime}</p>
            <p className="sunrise-sunset">Sunset: {forecast.sunsetTime}</p>
            <div className="temperature-info">
              <p>Max: {forecast.temperatureMax}°C</p>
              <p>Min: {forecast.temperatureMin}°C</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeather;
