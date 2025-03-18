import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WeatherDetail = () => {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://api-open.data.gov.sg/v2/real-time/api/weather?api=wbgt"
        );
        const records = response.data?.data?.records ?? [];
        if (records.length > 0 && records[0].item?.readings) {
          const selectedWeather = records[0].item.readings.find(
            (reading) => reading.station.id === id
          );
          if (selectedWeather) {
            setWeather(selectedWeather);
          } else {
            setError("Station not found.");
          }
        } else {
          setError("No weather data available.");
        }
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!weather) return <p>No data available for this station.</p>;

  return (
    <div>
      <h2>Weather Details</h2>
      <p>Station ID: {weather.station.id}</p>
      <p>Name: {weather.station.name}</p>
      <p>Town Center: {weather.station.townCenter}</p>
      <p>Temperature: {weather.wbgt}°C</p>
      <p>Heat Stress: {weather.heatStress}</p>
      <p>Latitude: {weather.location.latitude}</p>
      <p>Longitude: {weather.location.longitude}</p>
    </div>
  );
};

export default WeatherDetail;


