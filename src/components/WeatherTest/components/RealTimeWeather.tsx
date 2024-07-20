import React, { useState, useEffect } from 'react';
import { getRealTimeWeather } from '../services/realTimeWeatherService';
// import '../RealTimeWeather.css';
import weatherIcon from '../../../assets/weather-icon.png';
import CustomCard from '../../card/Card';
import {  Flex, Image,Text } from '@chakra-ui/react';
import { useDate } from '../services/useDate';

// Define the type for the weather data
interface WeatherData {
  temperature: number;
  humidity: number;
}

interface RealTimeWeatherProps {
  latitude: number;
  longitude: number;
  location?: string;
}

const RealTimeWeather: React.FC<RealTimeWeatherProps> = ({ latitude, longitude, location }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { time } = useDate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getRealTimeWeather(latitude, longitude, location);
        setWeatherData(data.data.values);
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

    fetchWeatherData();
  }, [latitude, longitude, location]);

  if (loading) return <p>Loading real-time weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return null;

  return (
    <>
      <CustomCard p={6} mb='1rem' borderRadius='1rem'>
        <Flex direction="column" alignItems="center" >
          <Image src={weatherIcon} alt="Weather Icon" boxSize="50px"/>
          <Text fontSize="5xl" fontWeight="bold">{weatherData.temperature}°C</Text>
          <p className="humidity">Humidity: {weatherData.humidity}%</p>
          <Text fontSize="lg" color="gray.500">conditions</Text>
        </Flex>
      </CustomCard>
      <CustomCard  p={4}  mb='1rem' borderRadius='1rem'>
        <Flex direction="column" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" mb={2}>place</Text>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Text color="gray.500">{new Date().toDateString()}</Text>
            <Text color="gray.500">{time}</Text>
          </Flex>
        </Flex>
      </CustomCard>
    </>
    
  );
};

export default RealTimeWeather;
