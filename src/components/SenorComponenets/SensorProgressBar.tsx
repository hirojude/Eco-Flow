// src/components/SensorProgressBar.tsx
import React from 'react';
import { CircularProgress, CircularProgressLabel, Box, Text, Flex } from '@chakra-ui/react';
import Card from '../card/Card'; // Adjust path as necessary

interface SensorProgressBarProps {
  name: string;
  value: number;
  maxValue: number;
  size: string;
  showPercentage?: boolean;
  unit?: string;
  loading?: boolean;
}

const SensorProgressBar: React.FC<SensorProgressBarProps> = ({ name, value, maxValue, size, showPercentage = false, unit = '' , loading = true}) => {
  const percentage = (value / maxValue) * 100;
  const textColorSecondary = 'secondaryGray.600'; // Secondary text color

  const isloading = () =>{
    loading ? <Text>loading</Text> : null
  }

  return (
    <Card h={130}>
      <Box textAlign="center">
        <Flex justifyContent="flex-start" alignItems="center" gap={5}>
          <CircularProgress
            value={percentage}
            size={size}
            thickness="10px"

            color="#27AE60" // Customize progress bar color
          >
            <CircularProgressLabel>
              {showPercentage ? ` ${percentage.toFixed(1)}%` : `${value}${unit}`}
            </CircularProgressLabel>
          </CircularProgress>
          <Box>
            <Text mb="2" color={textColorSecondary}>{name}</Text>
            <>{isloading()}</>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};

export default SensorProgressBar;
