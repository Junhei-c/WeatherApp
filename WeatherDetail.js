import axios from "axios";

const API_URL = "https://api-open.data.gov.sg/v2/real-time/api/weather?api=wbgt";

export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(API_URL);
    
    
    const records = response.data?.data?.records ?? [];
    
    
    if (records.length === 0 || !records[0].item?.readings) {
      throw new Error("No weather data available.");
    }

    
    return records[0].item.readings.map((reading) => ({
      id: reading.station.id, 
      name: reading.station.name, 
      townCenter: reading.station.townCenter, 
      latitude: reading.location.latitude,
      longitude: reading.location.longitude, 
      temperature: reading.wbgt, 
      heatStress: reading.heatStress, 
    }));

  } catch (error) {
    throw new Error("Failed to fetch weather data.");
  }
};


