import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const WeatherScreen: React.FC = () => {
  const router = useRouter();
  const {
    weather,
    soil,
    hourlyData,
    dailyData,
    errorMsg,
    refresh,
  } = useLocationWeatherSoil();

  const wateringSuitable =
    soil?.soil_moisture_0_to_7cm && soil.soil_moisture_0_to_7cm < 0.3;

  return (
    <LinearGradient colors={["#89CFF0", "#103713"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.Header}>
            <Pressable
              style={styles.backContainer}
              onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#007AFF" />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <Pressable onPress={refresh}>
              <Feather name="refresh-cw" size={22} color="#fff" />
            </Pressable>
          </View>

          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : !weather ? (
            <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
          ) : (
            <>
              {/* Weather Summary */}
              <View style={styles.header}>
                <Text style={styles.cityText}>{}</Text>
                <Text style={styles.dateText}>
                  {new Date(weather.time).toLocaleString()}
                </Text>
              </View>

              <View style={styles.weatherCard}>
                <Image
                  source={getWeatherIcon(weather.weathercode)}
                  style={styles.weatherIcon}
                />
                <Text style={styles.temperature}>{weather.temperature}°C</Text>
                <Text style={styles.condition}>
                  {mapWeatherCodeToCondition(weather.weathercode)}
                </Text>
              </View>

              {/* Info Row */}
              <View style={styles.infoRow}>
                <InfoTile
                  label="Humidity"
                  value={`${weather.humidity ?? "--"}%`}
                />
                <InfoTile
                  label="Wind"
                  value={`${weather.wind_speed ?? "--"} km/h`}
                />
              </View>

              <View style={styles.infoRow}>
                <InfoTile
                  label="UV Index"
                  value={`${weather.uv_index ?? "--"}`}
                />
                <InfoTile
                  label="Soil Temp"
                  value={`${soil?.soil_temperature_0_to_7cm ?? "--"}°C`}
                />
              </View>

              {/* 🌱 Soil Section */}
              <Text style={styles.sectionTitle}>Soil Data</Text>
              <View style={styles.glassCard}>
                <Text style={styles.soilText}>
                  🌡️ 0–7 cm Temp: {soil?.soil_temperature_0_to_7cm ?? "--"}°C
                </Text>
                <Text style={styles.soilText}>
                  💧 0–7 cm Moisture: {soil?.soil_moisture_0_to_7cm ?? "--"}
                </Text>
                <Text style={styles.soilText}>
                  🌡️ 7–28 cm Temp: {soil?.soil_temperature_7_to_28cm ?? "--"}°C
                </Text>
                <Text style={styles.soilText}>
                  💧 7–28 cm Moisture: {soil?.soil_moisture_7_to_28cm ?? "--"}
                </Text>
              </View>

              {/* 🌤 Hourly Forecast */}
              <Text style={styles.sectionTitle}>Hourly Forecast</Text>
              {hourlyData.length === 0 ? (
                <Text style={styles.noDataText}>No hourly forecast available.</Text>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {hourlyData.map((hour, index) => (
                    <View key={index} style={styles.hourlyCard}>
                      <Text style={styles.hourlyTime}>
                        {new Date(hour.time).getHours()}:00
                      </Text>
                      <Image
                        source={getWeatherIcon(hour.weathercode)}
                        style={styles.hourlyIcon}
                      />
                      <Text style={styles.hourlyTemp}>
                        {hour.temperature}°C
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}

              {/* 📆 7-Day Forecast */}
              <Text style={styles.sectionTitle}>7-Day Forecast</Text>
              {dailyData.length === 0 ? (
                <Text style={styles.noDataText}>No forecast available.</Text>
              ) : (
                dailyData.map((day, index) => (
                  <View key={index} style={styles.dailyRow}>
                    <Image
                      source={getWeatherIcon(day.weathercode)}
                      style={styles.dailyIcon}
                    />
                    <Text style={styles.dailyDate}>
                      {new Date(day.date).toDateString().slice(0, 10)}
                    </Text>
                    <Text style={styles.dailyTemp}>
                      {day.maxTemp}° / {day.minTemp}°
                    </Text>
                    <Text style={styles.dailyRain}>
                      💧 {day.precipitationSum.toFixed(1)} mm
                    </Text>
                  </View>
                ))
              )}

              {/* Notifications */}
              <Text style={styles.sectionTitle}>Notifications</Text>
              <View style={styles.glassCard}>
                <Text style={styles.notifTitle}>Weather Notification</Text>
                <Text style={styles.notifBody}>
                  {wateringSuitable
                    ? "✅ Conditions are suitable for watering tomorrow."
                    : "⚠️ Weather is not ideal for watering tomorrow."}
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const InfoTile: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View style={styles.infoTile}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

function mapWeatherCodeToCondition(code: number): string {
  if (code >= 0 && code <= 3) return "Clear Sky";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Drizzle";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

function getWeatherIcon(code: number) {
  if (code >= 0 && code <= 3)
    return require("@/assets/images/sun.png");
  if (code >= 45 && code <= 48)
    return require("@/assets/images/fog.png");
  if (code >= 51 && code <= 67)
    return require("@/assets/images/drizzle.png");
  if (code >= 71 && code <= 77)
    return require("@/assets/images/snow.png");
  if (code >= 80 && code <= 82)
    return require("@/assets/images/rain.png");
  if (code >= 95)
    return require("@/assets/images/storm.png");
  return require("@/assets/images/cloud.png");
}

export default WeatherScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingTop: StatusBar.currentHeight || 40 },
  content: { padding: 20 },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backContainer: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 6, fontSize: 16, color: "#007AFF" },
  header: { marginBottom: 20 },
  cityText: { fontSize: 32, fontWeight: "700", color: "#fff" },
  dateText: { fontSize: 18, color: "#f0f8ff", marginTop: 4 },
  weatherCard: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  weatherIcon: { width: 100, height: 100, marginBottom: 10 },
  temperature: { fontSize: 52, fontWeight: "700", color: "#fff" },
  condition: { fontSize: 20, color: "#e0f7fa", marginTop: 8 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoTile: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  infoLabel: { color: "#fff", fontSize: 16 },
  infoValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 16,
  },
  glassCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginBottom: 16,
  },
  soilText: { color: "#fff", fontSize: 16, marginVertical: 4 },
  notifTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "orange",
    marginBottom: 8,
  },
  notifBody: { fontSize: 16, color: "#fff" },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  hourlyCard: {
    width: 80,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
  },
  hourlyTime: { color: "#fff", marginBottom: 4, fontSize: 14 },
  hourlyTemp: {
    color: "#fff",
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  hourlyIcon: { width: 40, height: 40 },
  noDataText: {
    color: "#fff",
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 10,
  },
  dailyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
  },
  dailyIcon: { width: 36, height: 36 },
  dailyDate: { color: "#fff", flex: 1, marginLeft: 8 },
  dailyTemp: { color: "#fff", fontWeight: "600" },
  dailyRain: { color: "#aee" },
});



function useLocationWeatherSoil(): { weather: any; soil: any; hourlyData: any; dailyData: any; errorMsg: any; refresh: any; } {
    throw new Error("Function not implemented.");
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
