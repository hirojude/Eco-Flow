/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Flex, Text, useColorModeValue, Spinner } from '@chakra-ui/react';
import LineChart from '../../../../components/charts/LineChart'; // Adjust the path as necessary
import useSensorData from '../../../../components/SensorGraph/UseSensorDataGraph';
import ThresholdInput from '../../../../components/SensorGraph/ThresholdInput';
import RangeButton from '../../../../components/SensorGraph/RangeButton';
import Card from '../../../../components/card/Card';


interface Thresholds {
  optimal: number;
  caution: number;
  dry: number;
}

const SensorData: React.FC = () => {
  const [range, setRange] = useState<string>('last24Hours');
  const [thresholds, setThresholds] = useState<Thresholds>({ optimal: 70, caution: 25, dry: 10 });
  const { data, loading } = useSensorData(range);

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setThresholds({ ...thresholds, [name]: Number(value) });
  };

  const chartOptions: any = {
    chart: {
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
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
        text: 'Value'
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
      type: 'line'
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      show: false,
      column: {
        color: ['#7551FF', '#39B8FF'],
        opacity: 0.5
      }
    },
    annotations: {
      yaxis: [
        {
          y: thresholds.optimal,
          borderColor: 'green',
          label: {
            borderColor: 'green',
            style: {
              color: '#fff',
              background: 'green'
            },
            text: 'Optimal'
          }
        },
        {
          y: thresholds.caution,
          borderColor: 'yellow',
          label: {
            borderColor: 'yellow',
            style: {
              color: '#fff',
              background: 'yellow'
            },
            text: 'Caution'
          }
        },
        {
          y: thresholds.dry,
          borderColor: 'red',
          label: {
            borderColor: 'red',
            style: {
              color: '#fff',
              background: 'red'
            },
            text: 'Dry'
          }
        }
      ]
    }
  };

  return (
    <Card>
      <Box>
        <Flex flexDirection="column" mb="20px">
          <Text color={textColor} fontSize="xl" fontWeight="700" mb="10px">
            Environmental Factors Chart
          </Text>
          <Flex mb="10px">
            <ThresholdInput label="Optimal Threshold" name="optimal" value={thresholds.optimal} onChange={handleThresholdChange} />
            <ThresholdInput label="Caution Threshold" name="caution" value={thresholds.caution} onChange={handleThresholdChange} />
            <ThresholdInput label="Dry Threshold" name="dry" value={thresholds.dry} onChange={handleThresholdChange} />
          </Flex>
        </Flex>
        <Flex mb="20px">
          <RangeButton label="Last Hour" onClick={() => setRange('lastHour')} />
          <RangeButton label="Last 24 Hours" onClick={() => setRange('last24Hours')} />
          <RangeButton label="Last 7 Days" onClick={() => setRange('last7Days')} />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" h="400px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box minH="260px" minW="75%" mt="auto" h="400px">
            <LineChart
              chartData={[
                { name: 'Humidity', data: data.humidity },
                { name: 'Temperature', data: data.temperature }
              ]}
              chartOptions={chartOptions}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default SensorData;
