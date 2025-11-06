// components/WeatherCard.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocationWeatherSoil } from "../hooks/useLocationWeatherSoil";

const width = Dimensions.get('window').width;

export default function WeatherCard() {
  const router = useRouter();
  const { weather, errorMsg, refresh, soil } = useLocationWeatherSoil();

  return (
    <View style={[styles.card, styles.weatherCard]}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : weather ? (
        <>
          {/* Top Row */}
          <View style={styles.weatherTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                ☀️ {weather.temperature.toFixed(1)}°C,{" "}
                {getWeatherDescription(weather.weathercode)}
              </Text>
              <Text style={styles.weatherDate}>
                {new Date(weather.time).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.weatherButton}
              onPress={() => router.push("/(screens)/WeatherScreen")}
            >
              <Feather name="arrow-up-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.weatherDivider} />

          {/* Weather Insights */}
          <View style={styles.weatherInsights}>
            <View style={styles.insightItem}>
              <Ionicons name="water-outline" size={20} color="#555" />
              <Text style={styles.insightText}>
                Humidity: {weather.humidity ?? "—"}%
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="leaf-outline" size={20} color="#555" />
              <Text style={styles.insightText}>
                Wind: {weather.wind_speed ?? "—"} km/h
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="sunny-outline" size={20} color="#555" />
              <Text style={styles.insightText}>
                UV: {weather.uv_index ?? "Moderate"}
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="thermometer-outline" size={20} color="#555" />
              <Text style={styles.insightText}>
                Soil Moisture: {soil?.moisture ?? "—"}%
              </Text>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="#103713" />
      )}
    </View>
  );
}

function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing fog",
    51: "Light drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
  };
  return map[code] ?? "Unknown";
}

const styles = StyleSheet.create({
  weatherCard: {},
  card: {
    padding: width * 0.04,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherDate: {
    fontSize: 12,
    color: '#888',
  },
  weatherButton: {
    backgroundColor: '#103713',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  weatherInsights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  insightItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  insightText: {
    fontSize: 13,
    color: '#555',
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  }
});
