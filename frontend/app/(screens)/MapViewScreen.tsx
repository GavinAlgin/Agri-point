import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const MapViewScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [polygonCoords, setPolygonCoords] = useState<any[]>([]);
  const [dataMode, setDataMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suitabilityColor, setSuitabilityColor] = useState('rgba(0,150,255,0.3)');
  const [climateData, setClimateData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<string>('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q=${encodeURIComponent(
          searchQuery
        )}`,
        { headers: { 'User-Agent': 'AgroMapper/1.0 (contact@example.com)' } }
      );

      if (!res.data.length) {
        Alert.alert('Not Found', 'No matching location found.');
        return;
      }

      const best = res.data[0];
      const geo = best.geojson;
      let coordsArray: any[] = [];

      if (geo.type === 'Polygon') {
        coordsArray = geo.coordinates[0].map((p: [number, number]) => ({
          latitude: p[1],
          longitude: p[0],
        }));
      } else if (geo.type === 'MultiPolygon') {
        coordsArray = geo.coordinates[0][0].map((p: [number, number]) => ({
          latitude: p[1],
          longitude: p[0],
        }));
      }

      if (!coordsArray.length) {
        Alert.alert('Boundary not found', 'No polygon data for this region.');
        return;
      }

      setPolygonCoords(coordsArray);

      mapRef.current?.animateToRegion(
        {
          latitude: parseFloat(best.lat),
          longitude: parseFloat(best.lon),
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        },
        1000
      );

      await fetchEnvironmentalData(parseFloat(best.lat), parseFloat(best.lon));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch location data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnvironmentalData = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,soil_moisture_0_7cm,precipitation`
      );
      const temps = res.data?.hourly?.temperature_2m || [];
      const soil = res.data?.hourly?.soil_moisture_0_7cm || [];
      const rain = res.data?.hourly?.precipitation || [];

      const temperature = temps.length > 0 ? temps[0] : 25;
      const soilMoisture = soil.length > 0 ? soil[0] : 0.3;
      const precipitation = rain.length > 0 ? rain[0] : 1.0;

      // Since NDVI not provided, we set a fallback value
      const avgNDVI = 0.4;

      if (avgNDVI < 0.2) setSuitabilityColor('rgba(255,0,0,0.4)');
      else if (avgNDVI < 0.5) setSuitabilityColor('rgba(255,200,0,0.4)');
      else setSuitabilityColor('rgba(0,200,0,0.4)');

      const env = { ndvi: avgNDVI, temperature, soilMoisture, precipitation };
      setClimateData(env);
      generateSmartRecommendations(env);
    } catch (err) {
      console.warn('Environmental data fetch failed.', err?.message);
      // fallback defaults
      const env = { ndvi: 0.35, temperature: 26, soilMoisture: 0.25, precipitation: 1.0 };
      setClimateData(env);
      setSuitabilityColor('rgba(255,200,0,0.4)');
      generateSmartRecommendations(env);
    }
  };

  const generateSmartRecommendations = (env: any) => {
    const { ndvi, temperature, soilMoisture, precipitation } = env;
    let crops = [];
    let livestock = [];

    if (ndvi > 0.6 && soilMoisture > 0.3) {
      crops.push('Maize', 'Cassava', 'Plantain', 'Vegetables');
      livestock.push('Poultry', 'Goats');
    } else if (ndvi > 0.4 && temperature > 28) {
      crops.push('Oil Palm', 'Rice', 'Sugarcane');
      livestock.push('Goats', 'Cattle');
    } else if (ndvi < 0.3 && precipitation < 1) {
      crops.push('Sorghum', 'Millet');
      livestock.push('Sheep', 'Camels');
    } else {
      crops.push('Groundnuts', 'Cowpeas', 'Yams');
      livestock.push('Poultry', 'Sheep');
    }

    if (temperature > 32) crops = crops.filter((c) => c !== 'Vegetables');
    if (temperature < 18) livestock.push('Cattle');

    const msg = `🌿 Best Crops: ${crops.join(', ')}\n🐄 Recommended Livestock: ${livestock.join(', ')}`;
    setRecommendations(msg);
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} provider={PROVIDER_GOOGLE} style={StyleSheet.absoluteFillObject}>
        {polygonCoords.length > 2 && (
          <Polygon
            coordinates={polygonCoords}
            fillColor={dataMode ? suitabilityColor : 'rgba(0,150,255,0.3)'}
            strokeColor={dataMode ? 'green' : 'blue'}
            strokeWidth={2}
          />
        )}
      </MapView>

      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search for a location..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={styles.input}
          />
          {loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : (
            searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )
          )}
        </View>

        <TouchableOpacity
          style={[styles.dataButton, dataMode && styles.dataButtonActive]}
          onPress={() => setDataMode(!dataMode)}
        >
          <Ionicons
            name={dataMode ? 'analytics' : 'leaf'}
            size={18}
            color={dataMode ? '#fff' : '#007bff'}
          />
          <Text
            style={[
              styles.dataButtonText,
              { color: dataMode ? '#fff' : '#007bff' },
            ]}
          >
            {dataMode ? 'Data Mode' : 'Normal Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      {!dataMode && recommendations && (
        <View style={styles.infoBubble}>
          <Text style={styles.infoTitle}>Recommendations</Text>
          <Text style={styles.infoText}>{recommendations}</Text>
        </View>
      )}

      {dataMode && climateData && (
        <View style={styles.dataBubble}>
          <Text style={styles.dataTitle}>Environmental Data</Text>
          <Text style={styles.dataText}>🌡️ Temp: {climateData.temperature.toFixed(1)}°C</Text>
          <Text style={styles.dataText}>
            💧 Moisture: {(climateData.soilMoisture * 100).toFixed(1)}%
          </Text>
          <Text style={styles.dataText}>🌧️ Rainfall: {climateData.precipitation} mm</Text>
          <Text style={styles.dataText}>🟢 NDVI: {climateData.ndvi.toFixed(2)}</Text>
          <Text style={styles.dataText}>
            Suitability:{' '}
            {climateData.ndvi < 0.2
              ? 'Poor 🔴'
              : climateData.ndvi < 0.5
              ? 'Moderate 🟡'
              : 'Good 🟢'}
          </Text>
        </View>
      )}

      <View style={styles.legendCard}>
        <Text style={styles.legendTitle}>NDVI Suitability</Text>
        <View style={styles.legendRow}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255,0,0,0.4)' }]} />
          <Text>Poor vegetation</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(255,200,0,0.4)' }]} />
          <Text>Moderate vegetation</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendColor, { backgroundColor: 'rgba(0,200,0,0.4)' }]} />
          <Text>Highly suitable</Text>
        </View>
      </View>
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { position: 'absolute', top: 50, width: width - 40, alignSelf: 'center', zIndex: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: { flex: 1, marginLeft: 8, color: '#333', fontSize: 16 },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#eaf2ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 10,
  },
  dataButtonActive: { backgroundColor: '#007bff' },
  dataButtonText: { marginLeft: 6, fontSize: 14, fontWeight: '600' },
  infoBubble: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 15,
  },
  infoTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  infoText: { fontSize: 14, color: '#333' },
  dataBubble: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 14,
    borderRadius: 12,
    width: width * 0.55,
    zIndex: 30,
  },
  dataTitle: { color: '#fff', fontWeight: '700', marginBottom: 6 },
  dataText: { color: '#fff', fontSize: 13, marginBottom: 2 },
  legendCard: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  legendTitle: { fontWeight: '700', fontSize: 14, marginBottom: 6 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  legendColor: { width: 20, height: 12, marginRight: 8, borderRadius: 3 },
});
