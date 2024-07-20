/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Flex, Text, useColorModeValue, Input, Select } from '@chakra-ui/react';
import LineChart from '../../../../components/charts/LineChart'; // Adjust the path as necessary
import Card from '../../../../components/card/Card';
import { fetchSensorDataFromRealtimeDatabase } from '../../../../config/firebaseConfig'; // Adjust the path as necessary

interface ChartDataPoint {
  x: number;
  y: number;
}

interface ChartDataSet {
  name: string;
  data: ChartDataPoint[];
}

type TimeRange = 'lastHour' | 'lastDay' | 'lastWeek';

const initialChartOptions = {
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
        y: 70,
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
        y: 25,
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
        y: 10,
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

const EnvironmentalChart = () => {
  const [thresholds, setThresholds] = useState({
    optimal: 70,
    caution: 25,
    dry: 10
  });
  const [chartData, setChartData] = useState<ChartDataSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('lastHour'); // Default time range

  // Chakra UI color modes
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchSensorDataFromRealtimeDatabase();
      if (data) {
        const formattedData = formatSensorData(data);
        setChartData(formattedData);
      }
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  const downsampleData = (data: ChartDataPoint[], interval: number): ChartDataPoint[] => {
    return data.filter((_, index) => index % interval === 0);
  };

  const formatSensorData = useCallback((data: Record<string, any>): ChartDataSet[] => {
    const now = Date.now();
    const timeRanges: Record<TimeRange, number> = {
      lastHour: now - 3600 * 1000,
      lastDay: now - 24 * 3600 * 1000,
      lastWeek: now - 7 * 24 * 3600 * 1000
    };

    const intervals: Record<TimeRange, number> = {
      lastHour: 1, // No down-sampling for the last hour
      lastDay: 10, // Down-sample by taking every 10th data point
      lastWeek: 100 // Down-sample by taking every 100th data point
    };

    const selectedTimeRange = timeRanges[timeRange];
    const selectedInterval = intervals[timeRange];

    const humidityData: ChartDataPoint[] = [];
    const temperatureData: ChartDataPoint[] = [];

    Object.keys(data).forEach((date) => {
      const dayData = data[date];
      Object.keys(dayData).forEach((time) => {
        const readings = dayData[time];
        Object.keys(readings).forEach((id) => {
          const reading = readings[id];
          if (reading && reading.humidity && reading.temperature && reading.epoch) {
            const timestamp = reading.epoch * 1000; // Convert to milliseconds
            if (timestamp >= selectedTimeRange) {
              humidityData.push({ x: timestamp, y: parseFloat(reading.humidity) });
              temperatureData.push({ x: timestamp, y: parseFloat(reading.temperature) });
            }
          }
        });
      });
    });

    const downsampledHumidityData = downsampleData(humidityData, selectedInterval);
    const downsampledTemperatureData = downsampleData(temperatureData, selectedInterval);

    return [
      { name: 'Humidity', data: downsampledHumidityData },
      { name: 'Temperature', data: downsampledTemperatureData }
    ];
  }, [timeRange]);

  // Handle threshold change
  const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setThresholds({
      ...thresholds,
      [name]: Number(value)
    });
  };

  // Handle time range change
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value as TimeRange);
  };

  // Memoize updated chart options
  const updatedChartOptions = useMemo(() => ({
    ...initialChartOptions,
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
  }), [thresholds]);

  return (
    <Card>
      <Box>
        <Flex flexDirection="column" mb="20px">
          <Text color={textColor} fontSize="xl" fontWeight="700" mb="10px">
            Environmental Factors Chart
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
            <Select
              placeholder="Select Time Range"
              onChange={handleTimeRangeChange}
              value={timeRange}
              ml="10px"
            >
              <option value="lastHour">Last Hour</option>
              <option value="lastDay">Last Day</option>
              <option value="lastWeek">Last Week</option>
            </Select>
          </Flex>
        </Flex>
        
          <Box minH="260px" minW="75%" mt="auto" h="400px">
            <LineChart chartData={chartData} chartOptions={updatedChartOptions} />
          </Box>
        )
      </Box>
    </Card>
  );
};

export default EnvironmentalChart;
