import { useState, useEffect } from 'react';
import { fetchSensorDataFromRealtimeDatabase } from '../../config/firebaseConfig'; // Adjust the path as necessary

const useSensorData = (range: string) => {
  const [data, setData] = useState<{ humidity: [number, number][], temperature: [number, number][] }>({ humidity: [], temperature: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const sensorData = await fetchSensorDataFromRealtimeDatabase();
      if (!sensorData) {
        setLoading(false);
        return;
      }

      const now = Date.now();
      let startTime: number;
      let interval: number;

      switch (range) {
        case 'lastHour':
          startTime = now - 60 * 60 * 1000;
          interval = 5 * 60 * 1000;
          break;
        case 'last24Hours':
          startTime = now - 24 * 60 * 60 * 1000;
          interval = 10 * 60 * 1000;
          break;
        case 'last7Days':
          startTime = now - 7 * 24 * 60 * 60 * 1000;
          interval = 1 * 60 * 60 * 1000;
          break;
        default:
          setLoading(false);
          return;
      }

      const humidityData: [number, number][] = [];
      const temperatureData: [number, number][] = [];
      let lastFilteredTimestamp = 0;

      Object.keys(sensorData).forEach(date => {
        Object.keys(sensorData[date]).forEach(time => {
          const readings = sensorData[date][time];
          Object.keys(readings).forEach(id => {
            const reading = readings[id];
            const timestamp = reading.epoch * 1000;
            if (timestamp >= startTime && timestamp <= now && timestamp - lastFilteredTimestamp >= interval) {
              humidityData.push([timestamp, parseFloat(reading.humidity.toString())]);
              temperatureData.push([timestamp, parseFloat(reading.temperature.toString())]);
              lastFilteredTimestamp = timestamp;
            }
          });
        });
      });

      setData({ humidity: humidityData, temperature: temperatureData });
      setLoading(false);
    };

    fetchData();
  }, [range]);

  return { data, loading };
};

export default useSensorData;
