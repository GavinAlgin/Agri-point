import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

type WeatherData = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
};

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadWeather();
    animateIcon();
  }, []);

  const animateIcon = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  //weather functions
  const loadWeather = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission denied. Using cached data.', ToastAndroid.SHORT);
        loadCachedWeather();
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      setWeather(response.data);
      await AsyncStorage.setItem('@weather', JSON.stringify(response.data));
    } catch (err) {
      console.error('API Error:', err);
      loadCachedWeather();
    } finally {
      setLoading(false);
    }
  };

  const loadCachedWeather = async () => {
    try {
      const cached = await AsyncStorage.getItem('@weather');
      if (cached) {
        setWeather(JSON.parse(cached));
      }
    } catch (err) {
      console.error('Failed to load cached data:', err);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  }, []);

  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!weather || !weather.current_weather) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ color: '#555', marginTop: 10 }}>Loading weather...</Text>
      </View>
    );
  }

  const { temperature, windspeed, weathercode } = weather.current_weather;

  // Dummy values since Open-Meteo doesn't provide these in current_weather  
  const humidity = 60;
  const precipitation = 0;

  const weatherDescriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Rain showers',
    95: 'Thunderstorm',
  };

  const weatherDesc = weatherDescriptions[weathercode] || 'Unknown';


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Large Card */}
      <View style={styles.largeCard}>
        {/* Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Ionicons name="location-sharp" size={14} color="#fff" />
            <Text style={styles.badgeText}>Current Location</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="cloud-outline" size={14} color="#fff" />
            <Text style={styles.badgeText}>{weatherDesc}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.middleContent}>
          <View style={styles.tempSection}>
            <Text style={styles.tempText}>{Math.round(temperature)}°C</Text>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateText}>{formattedDate}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.timeText}>{formattedTime}</Text>
            </View>
          </View>
          <Animated.Image
            source={require('@/assets/images/cloud.png')}
            style={[styles.weatherIcon, { opacity: fadeAnim }]}
          />
        </View>

        {/* Details */}
        <View style={styles.weatherDetails}>
          <Text style={styles.detailText}>Humidity: {humidity}%</Text>
          <Text style={styles.detailText}>Visibility: 10km</Text>
        </View>
      </View>

      {/* Mini Cards */}
      <View style={styles.smallCardsRow}>
        <View style={styles.smallCard}>
          <Feather name="cloud-rain" size={24} color="#E2DBD0" />
          <Text style={styles.smallCardTitle}>Precipitation</Text>
          <Text style={styles.smallCardData}>{precipitation} mm</Text>
        </View>
        <View style={styles.smallCard}>
          <Feather name="wind" size={24} color="#E2DBD0" />
          <Text style={styles.smallCardTitle}>Wind Speed</Text>
          <Text style={styles.smallCardData}>{windspeed} km/h</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.01,
    paddingTop: 28,
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeCard: {
    backgroundColor: '#103713',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2DBD0',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#103713',
    fontWeight: 'semibold',
    marginLeft: 6,
    fontSize: 12,
  },
  middleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tempSection: {
    flex: 1,
  },
  tempText: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 8,
    color: '#fff',
    fontSize: 14,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    marginLeft: 16,
  },
  weatherDetails: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  smallCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: '#628B35',
    flex: 0.48,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  smallCardTitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  smallCardData: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
