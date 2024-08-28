import axios from "axios";
import { GetServerSideProps } from "next";

interface WeatherData {
  temperature: number;
  weathercode: number;
}

interface WeatherPageProps {
  weather: WeatherData;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latitude = 35.6895;
  const longitude = 139.6917;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const response = await axios.get(apiUrl);
  const weather = response.data.current_weather;

  return {
    props: {
      weather,
    },
  };
};

const WeatherPage: React.FC<WeatherPageProps> = ({ weather }) => {
  return (
    <div>
      <h1>Current Weather</h1>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Weather Code: {weather.weathercode}</p>
    </div>
  );
};

export default WeatherPage;
