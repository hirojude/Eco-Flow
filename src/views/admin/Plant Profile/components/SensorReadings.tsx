// src/components/SensorReadings.tsx
import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';
import CustomCard from '../../../../components/card/Card';

interface SensorReadingsProps {
  temperature: number;
  humidity: number;
  soilMoisture: number;
}

const SensorReadings: React.FC<SensorReadingsProps> = ({ temperature, humidity, soilMoisture }) => {
  

  return (
    <CustomCard
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      p={4}
      maxW="sm"
      mx="auto"
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Sensor Readings
      </Text>
      <Stack spacing={3}>
        <Box>
          <Text fontSize="md" fontWeight="semibold">
            Temperature
          </Text>
          <Text fontSize="lg">{temperature}°C</Text>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="semibold">
            Humidity
          </Text>
          <Text fontSize="lg">{humidity}%</Text>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="semibold">
            Soil Moisture
          </Text>
          <Text fontSize="lg">{soilMoisture}%</Text>
        </Box>
      </Stack>
    </CustomCard>
  );
};

export default SensorReadings;
