// // import React from 'react'
// // import { Animated, View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

// // const { width } = Dimensions.get('window');

// // const CARD_HEIGHT = 140;
// // const IMAGE_WIDTH = 120;

// // type Suggestion = {
// //   id: string;
// //   title: string;
// //   subtitle: string;
// //   image: string;
// //   harvestDate: string;
// // };

// // const suggestions: Suggestion[] = [
// //     {
// //         id: '1',
// //         title: 'Maize',
// //         subtitle: 'Ideal for current soil and weather',
// //         image: 'https://example.com/maize.jpg',
// //         harvestDate: '2025-12-15',
// //     },
// // ];

// // const SuggestionsContainer = () => {
// //   return (
// //     <View style={styles.container}>
// //         <TouchableOpacity style={styles.card}>
// //             <Image source="https://example.com/maize.jpg" style={styles.image} resizeMode="cover" />
// //             <View style={styles.textContainer}>
// //                 <Text style={styles.title}>Maize</Text>
// //                 <Text style={styles.subtitle}>Ideal for current soil and weather</Text>
// //                 <Text style={styles.harvestDate}>Harvest Date: </Text>
// //             </View>
// //         </TouchableOpacity>
// //     </View>
// //   )
// // }

// // export default SuggestionsContainer

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     paddingTop: 20,
// //   },
// //   header: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 16,
// //     color: '#333',
// //   },
// //   listContainer: {
// //     paddingBottom: 20,
// //   },
// //   card: {
// //     flexDirection: 'row',
// //     backgroundColor: '#f7f7f7',
// //     borderRadius: 12,
// //     marginBottom: 16,
// //     overflow: 'hidden',
// //     height: CARD_HEIGHT,
// //   },
// //   image: {
// //     width: IMAGE_WIDTH,
// //     height: '100%',
// //   },
// //   textContainer: {
// //     flex: 1,
// //     padding: 12,
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#2a2a2a',
// //   },
// //   subtitle: {
// //     fontSize: 14,
// //     color: '#666',
// //     marginTop: 4,
// //   },
// //   harvestDate: {
// //     fontSize: 13,
// //     color: '#999',
// //     marginTop: 8,
// //   },
// // });

// import React, { useState, useEffect } from 'react';
// import {
//   View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator,
// } from 'react-native';
// import * as Location from 'expo-location';

// const { width } = Dimensions.get('window');
// const CARD_HEIGHT = 140;
// const IMAGE_WIDTH = 120;

// type Suggestion = {
//   crop: string;
//   suitability: number;
//   // Optionally add image URL and harvestDate if your API returns them
// };

// type Props = {
//   onViewAll?: () => void;
// };

// const SuggestionsContainer: React.FC<Props> = ({ onViewAll }) => {
//   const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') return;
//       const loc = await Location.getCurrentPositionAsync({});
//       const coords = { lat: loc.coords.latitude, lon: loc.coords.longitude };
//       setLocation(coords);

//       setLoading(true);
//       try {
//         const response = await fetch('https://your-farmfuture-server.com/predict', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ latitude: coords.lat, longitude: coords.lon }),
//         });
//         const data = await response.json();
//         // Example response: { "maize": 0.85, "wheat": 0.76, ... }
//         const arr = Object.entries(data).map(([crop, score]) => ({
//           crop,
//           suitability: score as number,
//         }));
//         arr.sort((a, b) => b.suitability - a.suitability);
//         setSuggestions(arr);
//       } catch (err) {
//         console.error('Error fetching suggestions:', err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <ActivityIndicator style={styles.loader} size="large" />;

//   return (
//     <View style={styles.container}>
//       {suggestions.slice(0, 2).map((s, idx) => (
//         <TouchableOpacity key={idx} style={styles.card}>
//           {/* Placeholder image—update if your API provides images */}
//           <Image source={{ uri: 'https://via.placeholder.com/120' }} style={styles.image} resizeMode="cover" />
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>{s.crop}</Text>
//             <Text style={styles.subtitle}>{`Suitability: ${(s.suitability * 100).toFixed(1)}%`}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//       {suggestions.length > 2 && onViewAll && (
//         <TouchableOpacity style={styles.floatingButton} onPress={onViewAll}>
//           <Text style={styles.floatingButtonText}>View All</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default SuggestionsContainer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#f7f7f7',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     height: CARD_HEIGHT,
//   },
//   image: {
//     width: IMAGE_WIDTH,
//     height: '100%',
//   },
//   textContainer: {
//     flex: 1,
//     padding: 12,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2a2a2a',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   floatingButton: {
//     position: 'absolute',
//     bottom: 30,
//     left: (width - 140) / 2,
//     width: 140,
//     height: 50,
//     backgroundColor: '#4CAF50',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   floatingButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

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
