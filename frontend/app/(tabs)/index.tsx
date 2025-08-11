import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WeatherCard from '@/components/WeatherCard';
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import PlantSuggestionList from '@/components/PlantSuggestionList';

const { width } = Dimensions.get('window');

const greetings = [
  { text: 'Hello', language: 'English' },
  { text: 'Hallo', language: 'Afrikaans' },
  { text: 'Sawubona', language: 'Zulu' },
  { text: 'Molo', language: 'Xhosa' },
  { text: 'Dumelang', language: 'Tswana' },
  { text: 'Lumela', language: 'Sesotho' },
];

const Index = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentGreeting = greetings[index];

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.Header}>
          <Text style={styles.GreetingText}>{currentGreeting.text}, Gavin</Text>
          <Image source={require('../../assets/images/mesh.jpg')} style={styles.Avatar} />
        </View>

        <WeatherCard />

        {/* My Field Header */}
        <View style={styles.categoryHeader}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Field</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Buttons */}
        <View style={styles.categories}>
          <Pressable style={styles.categoryBtn}>
            <MaterialCommunityIcons name="fruit-grapes-outline" size={26} color="black" />
          </Pressable>
          <Pressable style={styles.categoryBtn}>
            <MaterialCommunityIcons name="fruit-watermelon" size={26} color="black" />
          </Pressable>
          <Pressable style={styles.categoryBtn}>
            <MaterialCommunityIcons name="food-apple-outline" size={26} color="black" />
          </Pressable>
          <Pressable style={{ padding: 16, borderRadius: 10, backgroundColor: '#f7f7f7', width: 60, alignItems: 'center', }}>
            <Entypo name="plus" size={26} color="black" />
          </Pressable>
        </View>

        {/* Suggestions Header */}
        <View style={styles.suggestionsHeader}>
          <View style={styles.sectionHeader}>
            <FontAwesome6 name="star-of-life" size={24} color="black" />
            <Text style={[styles.sectionTitle, { marginLeft: 10, flex: 1 }]}>Suggestions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PlantSuggestionList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: width * 0.04,
    paddingBottom: 60, // Add bottom padding for scroll spacing
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  GreetingText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  Avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  categoryHeader: {
    marginBottom: 10,
  },
  suggestionsHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#ccc',
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 12,
    marginBottom: 30,
  },
  categoryBtn: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: (width - 60) / 4, 
    alignItems: 'center',
  },
});
