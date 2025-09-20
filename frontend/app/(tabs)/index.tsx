import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WeatherCard from '@/components/WeatherCard';
import { FontAwesome6 } from '@expo/vector-icons';
import PlantSuggestionList from '@/components/PlantSuggestionList';
import CropSelector from '@/components/CategoryFields';
import axios from 'axios';
import { AuthContext } from '@/utils/AuthContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const greetings = [
  { text: 'Hello', language: 'English' },
  { text: 'Hallo', language: 'Afrikaans' },
  { text: 'Sawubona', language: 'Zulu' },
  { text: 'Molo', language: 'Xhosa' },
  { text: 'Dumelang', language: 'Tswana' },
  { text: 'Lumela', language: 'Sesotho' },
  { text: 'Ndaa!', language: 'Venda' },
  { text: 'Salotsha', language: 'Ndebele' },
];

const Index = () => {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);
  const { authToken, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentGreeting = greetings[index];

  // Redirect to login if token is missing
  useEffect(() => {
    if (!loading && !authToken) {
      router.replace('/(auth)/Login');
    }
  }, [authToken, loading]);

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!authToken) return;

      try {
        const res = await axios.get('http://192.168.43.142:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(res.data);
        console.log('User loaded:', res.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    };

    fetchUser();
  }, [authToken]);


  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.Header}>
          <Text style={styles.GreetingText}>
            {currentGreeting.text}, {user?.username || user?.email}
          </Text>
          <Image source={require('../../assets/images/mesh.jpg')} style={styles.Avatar} />
        </View>
        
        <IoTCard
          droneName="Falcon 9"
          condition="Needs Maintenance"
          batteryLevel={45}
          droneImage="https://example.com/drone.jpg"
          onPress={() => console.log('Card Pressed')}
        />

        {/* My Field Header */}
        <View style={styles.categoryHeader}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Field</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CropSelector />

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

        <View style={styles.categoryHeader}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      <StatusBar style="dark" />
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
    paddingBottom: 60,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  GreetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  HeaderSubtitle: {
    fontSize: 14,
    color: '#333',
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
});
