/* eslint-disable @typescript-eslint/no-explicit-any */
// imports
import React, { useState } from 'react';
import { Box, Flex, Text, useColorModeValue, Input } from '@chakra-ui/react';
import LineChart from '../../../../components/charts/LineChart'; // Adjust the path as necessary
import Card from '../../../../components/card/Card';

// Sample Data (you'll replace this with real sensor data)
const soilMoistureData = [
  { time: '2024-06-01', moisture: 45 },
  { time: '2024-06-02', moisture: 50 },
  { time: '2024-06-03', moisture: 95 },
  { time: '2024-06-04', moisture: 75 },
  { time: '2024-06-05', moisture: 23 },
  { time: '2024-06-06', moisture: 13 },
  { time: '2024-06-07', moisture: 65 },
  { time: '2024-06-08', moisture: 45 },
  // Add more data points as needed
];

const chartData = [
  {
    name: 'Soil Moisture',
    data: soilMoistureData.map(d => d.moisture),
  },
];

const chartOptions: any = {
  chart: {
    
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
    dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: '#4318FF'
    }
  },
  xaxis: {
    categories: soilMoistureData.map(d => d.time),
    title: {
      text: 'Time',
    },
    labels: {
        style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500'
        }
    },
    axisBorder: {
        show: false
    },
    
  },
  yaxis: {
    title: {
      text: 'Soil Moisture (%)',
    },
    labels: {
        style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500'
        }
    },
    min: 0,
    max: 100,
  },
  legend: {
    show: false
},
  markers: {
    size: 0,
    colors: 'white',
    strokeColors: '#7551FF',
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true
  },
  stroke: {
    curve: 'smooth',
    type: 'line',
  },
  tooltip: {
    theme: 'dark',
  },
  grid: {
    show: false,
    column: {
        color: [ '#7551FF', '#39B8FF' ],
        opacity: 0.5
    }
},
  annotations: {
    yaxis: [
      {
        y:70,
        borderColor: 'green',
        label: {
          borderColor: 'green',
          style: {
            color: '#fff',
            background: 'green',
          },
          text: 'Optimal',
        },
      },
      {
        y: 25,
        borderColor: 'yellow',
        label: {
          borderColor: 'yellow',
          style: {
            color: '#fff',
            background: 'yellow',
          },
          text: 'Caution',
        },
      },
      {
        y: 5,
        borderColor: 'red',
        label: {
          borderColor: 'red',
          style: {
            color: '#fff',
            background: 'red',
          },
          text: 'Dry',
        },
      },
    ],
  },
};

const SoilMoistureChart = () => {
  const [thresholds, setThresholds] = useState({
    optimal: 70,
    caution: 25,
    dry: 10,
  });

  // Chakra UI color modes
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // Handle threshold change
  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setThresholds({
      ...thresholds,
      [name]: Number(value),
    });
  };

  // Update chart options with new thresholds
  const updatedChartOptions = {
    ...chartOptions,
    annotations: {
      yaxis: [
        {
          y: thresholds.optimal,
          borderColor: 'green',
          label: {
            borderColor: 'green',
            style: {
              color: '#fff',
              background: 'green',
            },
            text: 'Optimal',
          },
        },
        {
          y: thresholds.caution,
          borderColor: 'yellow',
          label: {
            borderColor: 'yellow',
            style: {
              color: '#fff',
              background: 'yellow',
            },
            text: 'Caution',
          },
        },
        {
          y: thresholds.dry,
          borderColor: 'red',
          label: {
            borderColor: 'red',
            style: {
              color: '#fff',
              background: 'red',
            },
            text: 'Dry',
          },
        },
      ],
    },
  };

  return (
    <Card>
        <Box>
          <Flex flexDirection="column" mb="20px">
            <Text color={textColor} fontSize="xl" fontWeight="700" mb="10px">
              Soil Moisture Chart
            </Text>
            <Flex mb="10px">
              <Input
                type="number"
                placeholder="Optimal Threshold"
                name="optimal"
                value={thresholds.optimal}
                onChange={handleThresholdChange}
                mr="5px"
              />
              <Input
                type="number"
                placeholder="Caution Threshold"
                name="caution"
                value={thresholds.caution}
                onChange={handleThresholdChange}
                mr="5px"
              />
              <Input
                type="number"
                placeholder="Dry Threshold"
                name="dry"
                value={thresholds.dry}
                onChange={handleThresholdChange}
              />
            </Flex>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto' h='260px'>
              <LineChart chartData={chartData} chartOptions={updatedChartOptions} />
          </Box>
        </Box>
    </Card>
  );
};

export default SoilMoistureChart;
