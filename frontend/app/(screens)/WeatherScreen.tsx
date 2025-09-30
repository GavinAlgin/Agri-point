import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const WeatherScreen: React.FC = () => {
  const router = useRouter();
  const wateringSuitable = true;

  return (
    <LinearGradient
      colors={['#89CFF0', '#103713']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.Header}>
            <Pressable style={styles.backContainer} onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#007AFF" />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
          </View>

          <View style={styles.header}>
            <Text style={styles.cityText}>Polokwane</Text>
            <Text style={styles.dateText}>Tuesday, Sept 30</Text>
          </View>

          <View style={styles.weatherCard}>
            <Image
              source={require('@/assets/images/cloud.png')} // Replace with your weather icon
              style={styles.weatherIcon}
            />
            <Text style={styles.temperature}>23°C</Text>
            <Text style={styles.condition}>Sunny</Text>
          </View>

          <View style={styles.infoRow}>
            <InfoTile label="Humidity" value="60%" />
            <InfoTile label="Wind" value="15 km/h" />
          </View>

          <View style={styles.infoRow}>
            <InfoTile label="Sunrise" value="6:30 AM" />
            <InfoTile label="Sunset" value="6:45 PM" />
          </View>

          <Text style={styles.sectionTitle}>Hourly Forecast</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: 6 }).map((_, index) => (
              <HourlyCard key={index} hour={`${index + 1} PM`} temp="22°C" />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Notifications</Text>

          {/* Notifications Card */}
          <View style={styles.glassCard}>
            <Text style={styles.notifTitle}>Weather Notification</Text>
            <Text style={styles.notifBody}>
              {wateringSuitable
                ? 'Conditions are suitable tomorrow for watering.'
                : 'Weather is not ideal for watering tomorrow.'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const InfoTile: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoTile}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const HourlyCard: React.FC<{ hour: string; temp: string }> = ({ hour, temp }) => (
  <View style={styles.hourlyCard}>
    <Text style={styles.hourlyTime}>{hour}</Text>
    <Image
      source={require('@/assets/images/cloud.png')} // Replace with weather icon
      style={styles.hourlyIcon}
    />
    <Text style={styles.hourlyTemp}>{temp}</Text>
  </View>
);

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  Header: {
    flexDirection: 'row',
    paddingHorizontal: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  backContainer: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 6, fontSize: 16, color: '#007AFF' },
  cityText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  dateText: {
    fontSize: 18,
    color: '#f0f8ff',
    marginTop: 4,
  },
  weatherCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 52,
    fontWeight: '700',
    color: '#fff',
  },
  condition: {
    fontSize: 20,
    color: '#e0f7fa',
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoTile: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  infoLabel: {
    color: '#fff',
    fontSize: 16,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginVertical: 16,
  },
  hourlyCard: {
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  hourlyTime: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 14,
  },
  hourlyTemp: {
    color: '#fff',
    marginTop: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  hourlyIcon: {
    width: 40,
    height: 40,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  glassCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 5,
  },
  notifTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'orange',
    marginBottom: 8,
  },
  notifBody: {
    fontSize: 16,
    color: '#fff',
  },
});
