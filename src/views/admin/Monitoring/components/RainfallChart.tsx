/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import Card from '../../../../components/card/Card';
import BarChart from '../../../../components/charts/BarChart';


const rainfallData = [
    {
      name: 'Rainfall',
      data: [
        { x: new Date('2024-06-01').getTime(), y: 5 },
        { x: new Date('2024-06-02').getTime(), y: 8 },
        { x: new Date('2024-06-03').getTime(), y: 2 },
        { x: new Date('2024-06-04').getTime(), y: 10 },
        { x: new Date('2024-06-05').getTime(), y: 15 },
        { x: new Date('2024-06-06').getTime(), y: 7 },
        { x: new Date('2024-06-07').getTime(), y: 3 },
        { x: new Date('2024-06-08').getTime(), y: 12 },
        { x: new Date('2024-06-09').getTime(), y: 6 },
        { x: new Date('2024-06-10').getTime(), y: 8 },
        { x: new Date('2024-06-11').getTime(), y: 14 },
        { x: new Date('2024-06-12').getTime(), y: 9 }
      ]
    }
  ];

  const chartOptions: any = {
    chart: {
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Time'
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
      }
    },
    yaxis: {
      title: {
        text: 'Rainfall (mm)'
      },
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500'
        }
      }
    },
    legend: {
      show: true
    },
    colors: ['#1E90FF'],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded'
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      show: false
    }
  };
  



const RainfallChart = () => {
  // Chakra UI color modes
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Card>
      <Box>
        <Flex flexDirection="column" mb="20px">
          <Text color={textColor} fontSize="xl" fontWeight="700" mb="10px">
            Rainfall Chart
          </Text>
        </Flex>
        <Box minH="260px" minW="75%" mt="auto" h="260px">
          <BarChart chartData={rainfallData} chartOptions={chartOptions} />
        </Box>
      </Box>
    </Card>
  );
};

export default RainfallChart;
