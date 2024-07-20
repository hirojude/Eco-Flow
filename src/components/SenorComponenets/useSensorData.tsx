import { useState, useEffect } from 'react';
import { ref, onValue, off, DataSnapshot } from 'firebase/database';
import { database } from '../../config/firebaseConfig';

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  rainSensor: number;
}

const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(database, "sensorData");

    const handleDataChange = (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dateKeys = Object.keys(data).sort(); // Sort the date keys to ensure chronological order
        const latestDate = dateKeys[dateKeys.length - 1];

        const timeEntries = data[latestDate];
        const timeKeys = Object.keys(timeEntries).sort(); // Sort the time keys to ensure chronological order
        const latestTime = timeKeys[timeKeys.length - 1];

        const sensorEntries = timeEntries[latestTime];
        const sensorKeys = Object.keys(sensorEntries);
        const latestSensorKey = sensorKeys[sensorKeys.length - 1];
        console.log(latestSensorKey)

        setSensorData(sensorEntries[latestSensorKey] as SensorData);
      } else {
        setSensorData(null);
      }
      setLoading(false);
    };

    const handleError = (error: Error) => {
      setError(error.message);
      setLoading(false);
    };

    onValue(dbRef, handleDataChange, handleError);

    return () => {
      off(dbRef, 'value', handleDataChange);
    };
  }, []);

  return { sensorData, loading, error };
};

export default useSensorData;
