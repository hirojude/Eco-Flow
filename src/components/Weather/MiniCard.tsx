import React, { useEffect, useState } from 'react';
import sun from '../../assets/icons/sun.png';
import cloud from '../../assets/icons/cloud.png';
import fog from '../../assets/icons/fog.png';
import rain from '../../assets/icons/rain.png';
import snow from '../../assets/icons/snow.png';
import storm from '../../assets/icons/storm.png';
import wind from '../../assets/icons/windy.png';
import { Center, Heading } from '@chakra-ui/react';
import Card from '../card/Card';

interface MiniCardProps {
  time: number;
  temp: number;
  iconString: string;
}

const MiniCard: React.FC<MiniCardProps> = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState<string>();

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
    <Card borderRadius='12px' boxSize={180}      >
      <Center>  {/* Center the entire content */}
        <Heading size="" p='1' fontWeight="sm" color="gray.500">
          {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(" ")[0]}
        </Heading>
      </Center>
      
      <Center>
        <div className='w-full flex justify-center items-center flex-1'>
          <img src={icon} alt="forecast not available" className='w-[4rem] h-[4rem]' />
        </div>
      </Center>
      <Center>
        <p className='text-center font-bold'>{temp}&deg;C</p>
      </Center>
    </Card>
  );
};

export default MiniCard;
