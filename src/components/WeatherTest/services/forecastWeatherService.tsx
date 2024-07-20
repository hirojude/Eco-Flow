import axios from 'axios';

const API_KEY = 'gl1alCfPzE8NYoTWQ7cCyTjEbqaS392j';
const API_URL = 'https://api.tomorrow.io/v4/timelines';

// Define the type for the forecast data
interface ForecastData {
  date: string;
  dayName: string;
  sunriseTime: string;
  sunsetTime: string;
  temperatureAvg: number;
  temperatureMin: number;
  temperatureMax: number;
}

// Define the type for the API response structure
interface Forecast {
  startTime: string;
  values: {
    sunriseTime: string;
    sunsetTime: string;
    temperatureAvg: number;
    temperatureMin: number;
    temperatureMax: number;
  };
}

// Function to get day name from the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getDayName = (dayIndex: number): string => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
};

export const getForecastWeather = async (latitude: number, longitude: number, location?: string): Promise<ForecastData[]> => {
  try {
    const queryParams = location
      ? `apikey=${API_KEY}&location=${location}&fields=temperatureAvg,temperatureMin,temperatureMax,sunriseTime,sunsetTime&units=metric&timesteps=1d`
      : `apikey=${API_KEY}&location=${latitude},${longitude}&fields=temperatureAvg,temperatureMin,temperatureMax,sunriseTime,sunsetTime&units=metric&timesteps=1d`;

    const response = await axios.get(`${API_URL}?${queryParams}`);
    const dailyForecasts: Forecast[] = response.data?.data?.timelines?.[0]?.intervals || [];

    const forecastData: ForecastData[] = dailyForecasts.map((forecast) => {
      const date = new Date(forecast.startTime);
      const dayName = getDayName(date.getDay());

      return {
        date: date.toISOString().split('T')[0], // Extract date
        dayName: dayName,
        sunriseTime: new Date(forecast.values.sunriseTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Extract time
        sunsetTime: new Date(forecast.values.sunsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Extract time
        temperatureAvg: forecast.values.temperatureAvg,
        temperatureMin: forecast.values.temperatureMin,
        temperatureMax: forecast.values.temperatureMax
      };
    });

    return forecastData;
  } catch (error) {
    throw new Error('Failed to fetch forecast weather data');
  }
};
