import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';

const mockWeather = {
  city: 'New York',
  temp: 26,
  condition: 'Sunny',
};

const mockAlert = 'Heat Alert: Stay hydrated and avoid outdoor activity at noon.';

const mockForecast = [
  { name: 'Mon', icon: '☀️' },
  { name: 'Tue', icon: '🌦' },
  { name: 'Wed', icon: '🌧' },
  { name: 'Thu', icon: '☁️' },
  { name: 'Fri', icon: '☀️' },
  { name: 'Sat', icon: '🌩' },
  { name: 'Sun', icon: '🌤' },
];

const mockRainData = [
  { time: '1 AM', percentage: 10 },
  { time: '4 AM', percentage: 20 },
  { time: '7 AM', percentage: 30 },
  { time: '10 AM', percentage: 60 },
  { time: '1 PM', percentage: 40 },
  { time: '4 PM', percentage: 20 },
  { time: '7 PM', percentage: 10 },
];

export default function App() {
  const [date, setDate] = useState(new Date());
  const [prediction, setPrediction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handlePredict = () => {
    const futureDate = date.toDateString();
    setPrediction({
      date: futureDate,
      condition: 'Partly Cloudy',
      temp: 24,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Weather Display */}
      <View style={styles.header}>
        <Text style={styles.city}>{mockWeather.city}</Text>
        <Text style={styles.temp}>{mockWeather.temp}°C - {mockWeather.condition}</Text>
      </View>

      {/* Alert Card */}
      <View style={styles.alertCard}>
        <Text style={styles.alertText}>⚠️ {mockAlert}</Text>
      </View>

      {/* Weekly Forecast */}
      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>📅 Weekly Forecast</Text>
        <View style={styles.weekContainer}>
          {mockForecast.map((day, idx) => (
            <View key={idx} style={styles.dayBlock}>
              <Text>{day.name}</Text>
              <Text style={{ fontSize: 24 }}>{day.icon}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rain Forecast Graph */}
      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>🌧 Rain Forecast</Text>
        <LineChart
          data={{
            labels: mockRainData.map(item => item.time),
            datasets: [{ data: mockRainData.map(item => item.percentage) }],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#000',
            labelColor: () => '#000',
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#555',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Prediction Widget */}
      <View style={styles.widget}>
        <Text style={styles.widgetTitle}>📅 Predict Weather</Text>
        <View style={{ marginBottom: 10 }}>
          {Platform.OS === 'ios' || showPicker ? (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                setDate(selectedDate || date);
              }}
            />
          ) : (
            <Button title="Pick a Date" onPress={() => setShowPicker(true)} />
          )}
        </View>
        <Button title="Get Prediction" onPress={handlePredict} />
        {prediction && (
          <View style={styles.predictionBox}>
            <Text style={styles.predictionText}>
              Prediction for {prediction.date}:
            </Text>
            <Text style={styles.predictionText}>
              {prediction.temp}°C - {prediction.condition}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 32,
    fontWeight: '300',
  },
  temp: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 4,
  },
  alertCard: {
    backgroundColor: '#ffe5e5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  alertText: {
    fontSize: 16,
    color: '#a00',
  },
  widget: {
    marginBottom: 30,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBlock: {
    alignItems: 'center',
    width: 40,
  },
  predictionBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  predictionText: {
    fontSize: 16,
  },
});
