import React, { useEffect, useState } from 'react';
import { Flex, Text, Image, SimpleGrid, Box, Center } from '@chakra-ui/react';
import { useDate } from './Utils/useDate';
import sun from '../../assets/icons/sun.png';
import cloud from '../../assets/icons/cloud.png';
import fog from '../../assets/icons/fog.png';
import rain from '../../assets/icons/rain.png';
import snow from '../../assets/icons/snow.png';
import storm from '../../assets/icons/storm.png';
import wind from '../../assets/icons/windy.png';
import MiniCard from './MiniCard'; // Import the MiniCard component
import CustomCard from '../card/Card';




interface WeatherCardProps {
  temperature: number;
  windspeed: number;
  humidity: number;
  place: string;
  heatIndex?: number;
  iconString: string;
  conditions: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <Box  maxW="48rem" borderRadius="1rem" overflow="hidden">
      <CustomCard p={6} mb='1rem' borderRadius='1rem'>
        <Flex direction="column" alignItems="center" >
          <Image src={icon} alt="weather_icon" boxSize="50px" />
          <Text fontSize="5xl" fontWeight="bold">{temperature}°C</Text>
          <Text fontSize="lg" color="gray.500">{conditions}</Text>
        </Flex>
      </CustomCard>
      <CustomCard  p={4}  mb='1rem' borderRadius='1rem'>
        <Flex direction="column" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" mb={2}>{place}</Text>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Text color="gray.500">{new Date().toDateString()}</Text>
            <Text color="gray.500">{time}</Text>
          </Flex>
        </Flex>
      </CustomCard>
      <CustomCard  p={4}  mb='1rem' borderRadius='1rem'>
        <Flex justifyContent="space-between" >
          <Flex direction="column" alignItems="center">
            <Text fontWeight="bold" fontSize="lg" align="center">Wind Speed</Text>
            <Text color="gray.500">{windspeed} km/h</Text>
          </Flex>
          <Flex direction="column" alignItems="center">
            <Text fontWeight="bold" fontSize="lg">Humidity</Text>
            <Text color="gray.500">{humidity} gm/m³</Text>
          </Flex>
          <Flex direction="column" alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="lg" align="center">Heat Index</Text>
            <Text color="gray.500">{heatIndex ? heatIndex : 'N/A'}</Text>
          </Flex>
        </Flex>
      </CustomCard>
      <CustomCard>
        <SimpleGrid columns={2}>
          <Center>
            <MiniCard time={new Date().getTime()} temp={20} iconString="cloud" />
          </Center>
          <Center>
            <MiniCard time={new Date().getTime() + 1} temp={22} iconString="clear" />
          </Center>
          <Center>
            <MiniCard time={new Date().getTime() + 2} temp={18} iconString="rain" />
          </Center>
          <Center>
            <MiniCard time={new Date().getTime() + 3} temp={16} iconString="thunder" />
          </Center>
        </SimpleGrid>
      
      </CustomCard>
    </Box>
  ); 
};

export default WeatherCard;
