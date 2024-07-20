import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import SoilMoistureChart from './components/SoilMoistureChart';
import SensorProgressBar from '../../../components/SenorComponenets/SensorProgressBar';
// import EnvironmentalChart from './components/EnvironmentalChart';
import RainfallChart from './components/RainfallChart';
// import SensorData from './components/SensorData';
import SensorDataComponent from './components/SEnsorDataHTMl';

const Monitoring: React.FC = () => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} >
      <SimpleGrid gap="20px">
        <Heading>Monitoring</Heading>
        <SoilMoistureChart/>
        {/* <EnvironmentalChart /> */}
        {/* <SensorData/> */}
        <SensorDataComponent/>
        <SensorProgressBar name="Soil Moisture" value={75} maxValue={100} size="120px" />
        <RainfallChart />
      </SimpleGrid>
    </Box>
  );
};

export default Monitoring;
