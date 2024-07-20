// src/components/MainDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import WeatherCard from '../../../components/Weather/WeatherCard';
import TotalSpent from './TotalSpent';
import SoilMoistureChart from '../Monitoring/components/SoilMoistureChart';
import SensorProgressBar from '../../../components/SenorComponenets/SensorProgressBar';
import useSensorData from '../../../components/SenorComponenets/useSensorData';
import CustomCard from '../../../components/card/Card';
import RealTimeWeather from '../../../components/WeatherTest/components/RealTimeWeather';

const MainDashboard: React.FC = () => {
  const { sensorData, loading: sensorLoading, error: sensorError } = useSensorData();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const city = await getCityName(position.coords.latitude, position.coords.longitude);
        setLocation(city);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching user location:', error.message);
          setError(error.message);
        } else {
          console.error('Error fetching user location:', error);
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCityName = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?apikey=52eaB0a1vE1SOEijwjHGNTVMDqzC6Ln7&location=${latitude},${longitude}`);
      const data = await response.json();
      return data.location.name;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching city name:', error.message);
      } else {
        console.error('Error fetching city name:', error);
      }
      return '';
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={5}>
            <Skeleton isLoaded={!sensorLoading}>
              <Box>
                <SensorProgressBar name="Temperature" value={sensorData?.temperature ?? 0} maxValue={50} size="100px" unit="°C" loading={sensorLoading} />
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!sensorLoading}>
              <Box>
                <SensorProgressBar name="Humidity" value={sensorData?.humidity ?? 0} maxValue={100} size="100px" showPercentage={true} unit="%" />
              </Box>
            </Skeleton>
            <Skeleton isLoaded={!sensorLoading}>
              <Box>
                <SensorProgressBar name="Soil Moisture" value={sensorData?.soilMoisture ?? 0} maxValue={1024} size="100px" />
              </Box>
            </Skeleton>
            {/* <Skeleton isLoaded={!sensorLoading}>
              <Box>
                <SensorProgressBar name="Rain Sensor" value={sensorData?.rainSensor ?? 0} maxValue={1} size="120px" />
              </Box>
            </Skeleton> */}
          </SimpleGrid>
      <Grid templateColumns={{ base: '1fr', md: '1fr 320px' }} gap="20px">
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
          {/* <TotalSpent /> */}
          <Skeleton isLoaded={!sensorLoading}>
            <SoilMoistureChart />
          </Skeleton>
        </SimpleGrid>

        <Box h="100%">
          <Skeleton isLoaded={!loading} h="100%">
            <CustomCard h="100%">
              {latitude && longitude && (
                <RealTimeWeather latitude={latitude} longitude={longitude} location={location} />
              )}
            </CustomCard>
          </Skeleton>
          {/* <CustomCard>
            <ForecastWeather latitude={latitude} longitude={longitude} location={location} />
          </CustomCard> */}
        </Box>
          <Skeleton isLoaded={!loading}>
            <WeatherCard
              temperature={45}
              windspeed={23}
              humidity={42}
              place={'kumasi'}
              heatIndex={24}
              iconString={'clear'}
              conditions={'Sunny'}
            />
          </Skeleton>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
