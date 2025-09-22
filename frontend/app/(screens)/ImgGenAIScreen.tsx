import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ImgGenAIScreen = () => {
  const { image, crop, confidence } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.resultContainer}>
        <Text style={styles.label}>Crop Detected:</Text>
        <Text style={styles.value}>{crop || 'Unknown'}</Text>

        <Text style={styles.label}>Confidence:</Text>
        <Text style={styles.value}>
          {confidence ? `${(confidence * 100).toFixed(2)}%` : 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ImgGenAIScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
