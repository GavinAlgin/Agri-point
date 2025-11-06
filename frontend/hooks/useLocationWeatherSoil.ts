import { useState, useEffect } from "react";
import * as Location from "expo-location";

// Types
interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  uv_index: number;
  weathercode: number;
  time: string;
}

interface SoilData {
  moisture: number;
  ph: number;
}

export function useLocationWeatherSoil() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [soil, setSoil] = useState<SoilData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch weather from Open-Meteo API
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,uv_index`
        );
        const weatherJson = await weatherRes.json();
        const current = weatherJson.current_weather;
        const humidity = weatherJson.hourly?.relativehumidity_2m?.[0] ?? null;
        const uv_index = weatherJson.hourly?.uv_index?.[0] ?? null;

        setWeather({
          temperature: current.temperature,
          wind_speed: current.windspeed,
          weathercode: current.weathercode,
          humidity,
          uv_index,
          time: current.time,
        });

        // Simulated soil data (replace with real API later)
        setSoil({
          moisture: Math.floor(Math.random() * 50) + 10, // 10-60%
          ph: parseFloat((Math.random() * 2 + 5.5).toFixed(1)), // 5.5-7.5
        });
      } catch (e: any) {
        setErrorMsg(e.message);
      }
    })();
  }, []);

  const refresh = () => {
    setWeather(null);
    setSoil(null);
    setErrorMsg(null);
  };

  return { weather, soil, errorMsg, refresh };
}
