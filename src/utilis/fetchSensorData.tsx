import { ref, get } from "firebase/database";
import { database } from "../config/firebaseConfig";

const fetchLatestSensorData = async () => {
  const dbRef = ref(database, "sensorData");
  const snapshot = await get(dbRef);

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
    return sensorEntries[latestSensorKey];
  } else {
    console.log("No data available");
    return null;
  }
};

export { fetchLatestSensorData };
