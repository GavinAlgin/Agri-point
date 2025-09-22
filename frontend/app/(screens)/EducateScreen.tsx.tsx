import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* StatusBar adjustment */}
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {/* Transparent Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>

      <View style={styles.mainContent}>
        {/* Image */}
        <Image
          source={{ uri: 'https://via.placeholder.com/400x250?text=Fruits+Image' }} // Mock fruit image
          style={styles.image}
        />
        <Text style={styles.title}>The Sicilian orange</Text>

        <View style={styles.nutritionContainer}>
          <Text style={styles.nutritionText}>200g</Text>
          <Text style={styles.nutritionText}>174Kcal</Text>
        </View>

        <Text style={styles.description}>
          Its vibrant orange peel conceals sweet and fragrant flesh, reminiscent of warm and sunny days on the island of Sicily.
        </Text>

        <View style={styles.nutritionDetails}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Protein</Text>
            <Text style={styles.nutritionValue}>12%</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Carbs</Text>
            <Text style={styles.nutritionValue}>3.7%</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Fat</Text>
            <Text style={styles.nutritionValue}>0.4%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'transparent', // Transparent header
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  mainContent: {
    marginTop: 100, // To avoid header overlap
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  nutritionText: {
    fontSize: 16,
    color: '#777',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    lineHeight: 20,
  },
  nutritionDetails: {
    marginTop: 20,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#555',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
