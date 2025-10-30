// useLocationWeather.tsx
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";

type WeatherData = {
  temperature: number | null;
  weathercode: number | null;
  time: string | null;
};

type LocationWeatherState = {
  hasPermission: boolean | null;
  location: Location.LocationObject | null;
  weather: WeatherData | null;
  errorMsg: string | null;
  refresh: () => Promise<void>;
};

/**
 * A reusable hook that:
 * 1. Requests location permission
 * 2. Gets current location
 * 3. Fetches weather data from Open-Meteo API
 */
export function useLocationWeather(): LocationWeatherState {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await response.json();

      if (data?.current_weather) {
        setWeather({
          temperature: data.current_weather.temperature,
          weathercode: data.current_weather.weathercode,
          time: data.current_weather.time,
        });
      } else {
        setErrorMsg("Failed to fetch weather data");
      }
    } catch (error) {
      setErrorMsg("Error fetching weather data");
    }
  }, []);

  const getLocationAndWeather = useCallback(async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setHasPermission(true);

      // Get current location
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Fetch weather
      await fetchWeather(loc.coords.latitude, loc.coords.longitude);
    } catch (err) {
      setErrorMsg("Error retrieving location");
    }
  }, [fetchWeather]);

  useEffect(() => {
    getLocationAndWeather();
  }, [getLocationAndWeather]);

  return {
    hasPermission,
    location,
    weather,
    errorMsg,
    refresh: getLocationAndWeather,
  };
}
