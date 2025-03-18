import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);
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
          setWeatherData(records[0].item.readings);
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Weather List</h2>
      <ul>
        {weatherData.map((reading) => (
          <li key={reading.station.id}>
            <Link to={`/detail/${reading.station.id}`}>
              <strong>{reading.station.name} ({reading.station.id})</strong> - 
              {reading.station.townCenter} - {reading.wbgt}°C - {reading.heatStress}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherList;




