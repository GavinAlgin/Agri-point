import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import regions from '@/hooks/Locations.json';  // Import the JSON

type Suggestion = {
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  detailsLink: string;
};

type Region = {
  id: string;
  name: string;
  suggestions: Suggestion[];
};

const PlantSuggestionList = ({ navigation }: any) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [regionName, setRegionName] = useState<string>('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // For simplicity: pick the region with minimal lat/lon difference
      const nearest = regions.regions.reduce((prev, curr) => {
        // Just rough proximity – you can replace with proper distance calculation
        const dPrev = Math.abs(latitude - (prev as any).lat || 0) + Math.abs(longitude - (prev as any).lon || 0);
        const dCurr = Math.abs(latitude - (curr as any).lat || 0) + Math.abs(longitude - (curr as any).lon || 0);
        return dCurr < dPrev ? curr : prev;
      });

      setRegionName(nearest.name);
      setSuggestions(nearest.suggestions);
    })();
  }, []);

  const renderItem = ({ item }: { item: Suggestion }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', {
        title: item.title,
        description: item.description,
        detailsLink: item.detailsLink
      })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.text}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Suggestions for {regionName}</Text> */}
      <FlatList data={suggestions} keyExtractor={(item) => item.title} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4, marginTop: 10, },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { flexDirection: 'row', marginBottom: 16, backgroundColor: '#f9f9f9', borderRadius: 8, overflow: 'hidden' },
  image: { width: 100, height: 100 },
  text: { flex: 1, padding: 8 },
  title: { fontSize: 18, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#555' },
  description: { fontSize: 12, color: '#777', marginTop: 4 }
});

export default PlantSuggestionList;
