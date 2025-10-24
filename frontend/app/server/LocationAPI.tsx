// hooks/useLocationWeatherSoil.ts
import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";

type WeatherData = {
  temperature: number;
  weathercode: number;
  time: string;
  wind_speed?: number;
  humidity?: number;
  uv_index?: number;
};

type SoilData = {
  ph?: number;
  organic_carbon?: number;
  texture_class?: string;
  // add other props if returned
};

type State = {
  hasPermission: boolean | null;
  location: Location.LocationObject | null;
  weather: WeatherData | null;
  soil: SoilData | null;
  errorMsg: string | null;
  refresh: () => Promise<void>;
};

export function useLocationWeatherSoil(): State {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [soil, setSoil] = useState<SoilData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const resp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,uv_index`
      );
      const data = await resp.json();
      const humidity = data.hourly?.relative_humidity_2m?.[0] ?? null;
      const uv = data.hourly?.uv_index?.[0] ?? null;
      if (data?.current_weather) {
        setWeather({
          temperature: data.current_weather.temperature,
          weathercode: data.current_weather.weathercode,
          time: data.current_weather.time,
          wind_speed: data.current_weather.windspeed,
          humidity,
          uv_index: uv,
        });
      } else {
        throw new Error("Missing weather data");
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setErrorMsg("Unable to fetch weather data");
    }
  }, []);

  const fetchSoil = useCallback(async (lat: number, lon: number) => {
    try {
      // Example endpoint from SoilDataFederator
      const resp = await fetch(
        `https://shiny.esoil.io/SoilDataFederator/SoilData?lat=${lat}&lon=${lon}&property=ph,organic_carbon,texture_class`
      );
      const data = await resp.json();
      const props: SoilData = {};
      if (data && data.results && data.results.length > 0) {
        const result = data.results[0];
        props.ph = result.ph;
        props.organic_carbon = result.organic_carbon;
        props.texture_class = result.texture_class;
      }
      setSoil(props);
    } catch (err) {
      console.error("Soil fetch error:", err);
      // Do not block if soil fails — you may still show weather
    }
  }, []);

  const getLocationAndData = useCallback(async () => {
    try {
      setErrorMsg(null);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setHasPermission(true);

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      const { latitude, longitude } = loc.coords;

      await Promise.all([
        fetchWeather(latitude, longitude),
        fetchSoil(latitude, longitude),
      ]);
    } catch (err) {
      console.error("Location error:", err);
      setErrorMsg("Error retrieving location");
    }
  }, [fetchWeather, fetchSoil]);

  useEffect(() => {
    getLocationAndData();
  }, [getLocationAndData]);

  return {
    hasPermission,
    location,
    weather,
    soil,
    errorMsg,
    refresh: getLocationAndData,
  };
}



// // useLocationWeather.tsx
// import { useEffect, useState, useCallback } from "react";
// import * as Location from "expo-location";

// type WeatherData = {
//   temperature: number | null;
//   weathercode: number | null;
//   time: string | null;
// };

// type LocationWeatherState = {
//   hasPermission: boolean | null;
//   location: Location.LocationObject | null;
//   weather: WeatherData | null;
//   errorMsg: string | null;
//   refresh: () => Promise<void>;
// };

// /**
//  * A reusable hook that:
//  * 1. Requests location permission
//  * 2. Gets current location
//  * 3. Fetches weather data from Open-Meteo API
//  */
// export function useLocationWeather(): LocationWeatherState {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const fetchWeather = useCallback(async (lat: number, lon: number) => {
//     try {
//       const response = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
//       );
//       const data = await response.json();

//       if (data?.current_weather) {
//         setWeather({
//           temperature: data.current_weather.temperature,
//           weathercode: data.current_weather.weathercode,
//           time: data.current_weather.time,
//         });
//       } else {
//         setErrorMsg("Failed to fetch weather data");
//       }
//     } catch (error) {
//       setErrorMsg("Error fetching weather data");
//     }
//   }, []);

//   const getLocationAndWeather = useCallback(async () => {
//     try {
//       // Request location permissions
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setHasPermission(false);
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       setHasPermission(true);

//       // Get current location
//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);

//       // Fetch weather
//       await fetchWeather(loc.coords.latitude, loc.coords.longitude);
//     } catch (err) {
//       setErrorMsg("Error retrieving location");
//     }
//   }, [fetchWeather]);

//   useEffect(() => {
//     getLocationAndWeather();
//   }, [getLocationAndWeather]);

//   return {
//     hasPermission,
//     location,
//     weather,
//     errorMsg,
//     refresh: getLocationAndWeather,
//   };
// }
