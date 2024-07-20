import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import { fetchSensorDataFromRealtimeDatabase } from '../../../../config/firebaseConfig'; // Adjust the import path
import { Box, Button, Center, Heading, Spinner } from '@chakra-ui/react';
import CustomCard from '../../../../components/card/Card';

interface Reading {
  epoch: number;
  humidity: string;
  temperature: string;
}

interface SensorData {
  [date: string]: {
    [time: string]: {
      [id: string]: Reading;
    };
  };
}

const SensorDataComponent: React.FC = () => {
  const [chart, setChart] = useState<ApexCharts | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLastTimestamp = async () => {
      const data: SensorData = await fetchSensorDataFromRealtimeDatabase();

      if (data) {
        const lastDate = Object.keys(data).pop()!;
        const lastTime = Object.keys(data[lastDate]).pop()!;
        const lastReading = data[lastDate][lastTime];
        const lastReadingId = Object.keys(lastReading).pop()!;
        const lastEpoch = lastReading[lastReadingId].epoch * 1000; // Convert to milliseconds
        setLastTimestamp(lastEpoch);
        initializeChart();
        fetchData('lastHour', lastEpoch); // Fetch the last hour data by default
      } else {
        console.error("No data available in the database");
      }
    };

    fetchLastTimestamp();
  }, []);

  const initializeChart = () => {
    const chartOptions: ApexCharts.ApexOptions = {
      chart: {
        type: 'line',
        height: 400,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
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
      series: [
        { name: 'Humidity', data: [] },
        { name: 'Temperature', data: [] }
      ],
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM HH:mm',
          style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500'
          }
        },
        title: {
          text: 'Time'
        },
      },
      yaxis: [
        {
          title: { text: 'Humidity (%)' },
          max: 100,
          labels: {
            style: {
              colors: '#A3AED0',
              fontSize: '12px',
              fontWeight: '500'
            }
          }
        },
        {
          opposite: true,
          title: { text: 'Temperature (°C)' },
          max: 50,
          labels: {
            style: {
              colors: '#A3AED0',
              fontSize: '12px',
              fontWeight: '500'
            }
          }
        },
        
      ],
      legend: { position: 'top' },
      stroke: { curve: 'smooth' },
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
      tooltip: {
        theme: 'dark'
      },
      
    };

    const newChart = new ApexCharts(document.querySelector("#chart"), chartOptions);
    newChart.render();
    
    setChart(newChart);
  };

  const fetchData = async (range: 'lastHour' | 'last24Hours' | 'last7Days', lastTimestamp: number) => {
    setLoading(true);

    let startTime: number;
    let interval: number;

    switch (range) {
      case 'lastHour':
        startTime = lastTimestamp - (60 * 60 * 1000);
        interval = 5 * 60 * 1000; // 5 minutes in milliseconds
        break;
      case 'last24Hours':
        startTime = lastTimestamp - (24 * 60 * 60 * 1000);
        interval = 10 * 60 * 1000; // 10 minutes in milliseconds
        break;
      case 'last7Days':
        startTime = lastTimestamp - (7 * 24 * 60 * 60 * 1000);
        interval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
        break;
      default:
        return;
    }

    const data: SensorData = await fetchSensorDataFromRealtimeDatabase();

    if (data) {
      const filteredData: SensorData = {};
      let lastFilteredTimestamp = 0;

      Object.keys(data).forEach(date => {
        Object.keys(data[date]).forEach(time => {
          const readings = data[date][time];
          Object.keys(readings).forEach(id => {
            const reading = readings[id];
            const timestamp = reading.epoch * 1000; // Convert to milliseconds
            if (timestamp >= startTime && timestamp <= lastTimestamp && timestamp - lastFilteredTimestamp >= interval) {
              if (!filteredData[date]) {
                filteredData[date] = {};
              }
              if (!filteredData[date][time]) {
                filteredData[date][time] = {};
              }
              filteredData[date][time][id] = reading;
              lastFilteredTimestamp = timestamp;
            }
            });
          });
        });
  
        updateChart(filteredData);
      } else {
        console.log("No data available in the database");
        chart?.updateSeries([
          { name: 'Humidity', data: [] },
          { name: 'Temperature', data: [] }
        ]);
      }
  
      setLoading(false);
    };
  
    const updateChart = (data: SensorData) => {
      if (!data) {
        console.log("No data available");
        return;
      }
  
      const humidityData: [number, number][] = [];
      const temperatureData: [number, number][] = [];
  
      Object.keys(data).forEach((date) => {
        const dayData = data[date];
        Object.keys(dayData).forEach((time) => {
          const readings = dayData[time];
          Object.keys(readings).forEach((id) => {
            const reading = readings[id];
            if (reading && reading.humidity && reading.temperature && reading.epoch) {
              const timestamp = reading.epoch * 1000; // Convert to milliseconds
              humidityData.push([timestamp, parseFloat(reading.humidity)]);
              temperatureData.push([timestamp, parseFloat(reading.temperature)]);
            }
          });
        });
      });
  
      chart?.updateSeries([
        { name: 'Humidity', data: humidityData },
        { name: 'Temperature', data: temperatureData }
      ]);
    };
  
    // Here's the modification to make "Last Hour" the default button
  
    const [selectedRange, setSelectedRange] = useState('lastHour');
  
    const handleClick = (range: 'lastHour' | 'last24Hours' | 'last7Days') => {
      setSelectedRange(range);
      fetchData(range, lastTimestamp);
    }
  
    return (
      <CustomCard>
        <Center flexDirection="column" py={5}>
          <Heading as="h1" mb={5}>Sensor Data</Heading>
          <Box id="chart" width="100%" height="400px"></Box>
          
          <Box mt={2}>
            <Button
              colorScheme={selectedRange === 'lastHour' ? 'teal' : 'gray'} // Apply different color schemes
              onClick={() => handleClick('lastHour')}
              mr={3}
            >
              Last Hour
            </Button>
            <Button
              colorScheme={selectedRange === 'last24Hours' ? 'teal' : 'gray'}
              onClick={() => handleClick('last24Hours')}
              mr={3}
            >
              Last 24 Hours
            </Button>
            <Button
              colorScheme={selectedRange === 'last7Days' ? 'teal' : 'gray'}
              onClick={() => handleClick('last7Days')}
            >
              Last 7 Days
            </Button>
          </Box>
          {loading && (
            <Spinner size="xl" color="teal.500" mt={5} />
          )}
        </Center>
      </CustomCard>
    );
  };
  
  export default SensorDataComponent;
  