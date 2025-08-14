import React, { useRef, useMemo, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { FAB } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const CorpDetailsScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [searchQuery, setSearchQuery] = useState('');
  const [polygonCoords, setPolygonCoords] = useState<any[]>([]);
  const [freeDrawMode, setFreeDrawMode] = useState(false);

  // For Freehand drawing
  const handleMapPress = (event: any) => {
    if (freeDrawMode) {
      setPolygonCoords((prev) => [...prev, event.nativeEvent.coordinate]);
    }
  };

  const handleSearch = () => {
    // Simulated drawing of a square area around a point
    const center = {
      latitude: 37.78825,
      longitude: -122.4324,
    };

    const offset = 0.01;
    const square = [
      { latitude: center.latitude + offset, longitude: center.longitude - offset },
      { latitude: center.latitude + offset, longitude: center.longitude + offset },
      { latitude: center.latitude - offset, longitude: center.longitude + offset },
      { latitude: center.latitude - offset, longitude: center.longitude - offset },
    ];

    setPolygonCoords(square);
    mapRef.current?.animateToRegion({
      ...center,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
      >
        {polygonCoords.length > 2 && (
          <Polygon
            coordinates={polygonCoords}
            fillColor="rgba(0, 150, 255, 0.3)"
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
      </MapView>

      {/* Transparent Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="insert-chart" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="smart-toy" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: 'white' }}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Search Area or Place</Text>
          <TextInput
            placeholder="Enter location"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search & Highlight</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Floating Buttons */}
      <View style={styles.fabContainer}>
        <FAB
          icon="refresh"
          style={styles.fab}
          onPress={() => {
            // Reset the map and polygon
            setPolygonCoords([]);
            mapRef.current?.animateToRegion({
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }}
        />
        <FAB
          icon="gesture"
          style={styles.fab}
          onPress={() => setFreeDrawMode(!freeDrawMode)}
          label={freeDrawMode ? 'Drawing: ON' : 'Drawing: OFF'}
        />
      </View>
    </View>
  );
};

export default CorpDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
  },
  sheetContent: {
    padding: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    alignItems: 'flex-end',
    gap: 12,
  },
  fab: {
    backgroundColor: '#007bff',
  },
});
