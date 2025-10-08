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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo, Feather, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PlantSuggestionList from '@/components/PlantSuggestionList';
import { useRouter } from 'expo-router';
import IoTCard from '@/components/QuickActionsOs';
import { useAuth } from '@/utils/AuthContext';
import api from '../server/api';

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
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentGreeting = greetings[index];

  // Redirect to login if token is missing
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      return <LoadingActivity>{}</LoadingActivity>
    }
  }, [isAuthenticated, loading]);

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await api.get('/user/', {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
        });
        setUser(res.data);
        console.log('User loaded:', res.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    };

    fetchUser();
  }, [isAuthenticated]);


  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
          <View style={styles.Header}>
            <View>
              <Text style={styles.GreetingText}>Welcome {currentGreeting.text} 👋</Text>
              <Text style={styles.HeaderSubtitle}>Smart Agriculture AI</Text>
            </View>
            <TouchableOpacity onPress={() => router.navigate('/settings')}>
              <Image
                source={{ uri: 'https://avatar.iran.liara.run/public/5' }}
                style={styles.Avatar}
              />
            </TouchableOpacity>
          </View>

        {/* Weather Widget - Redesigned */}
        <View style={[styles.card, styles.weatherCard]}>
          {/* Top Row: Weather + Date + Button */}
          <View style={styles.weatherTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>☀️ 28°C, Sunny</Text>
              <Text style={styles.weatherDate}>Sep 2, 2025 — 2:45 PM</Text>
            </View>
            <TouchableOpacity style={styles.weatherButton} onPress={() => router.navigate('/(screens)/WeatherScreen')}>
              <Feather name="arrow-up-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Vertical Divider */}
          <View style={styles.weatherDivider} />

          {/* Weather Insights Row */}
          <View style={styles.weatherInsights}>
            <View style={styles.insightItem}>
              <Ionicons name="water-outline" size={20} color="#555" />
              <Text style={styles.insightText}>Humidity: 45%</Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="leaf-outline" size={20} color="#555" />
              <Text style={styles.insightText}>Wind: 12 km/h</Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="sunny-outline" size={20} color="#555" />
              <Text style={styles.insightText}>UV: Moderate</Text>
            </View>
          </View>
        </View>

        {/* My Field Header */}
        <View style={styles.categoryHeader}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Field</Text>
          </View>
        </View>

        {/* Category Buttons */}
        <View style={styles.categories}>
          <Pressable style={styles.categoryBtn} onPress={() => router.push('/(screens)/EducateScreen')}>
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

        {/* My Device Header */}
        <View style={styles.categoryHeader}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Devices</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        <IoTCard
          onDevicesPress={() => Alert.alert('Device Connected')}
          onLocationPress={() => Alert.alert('Do you wanna switch off live location')}
          onAIPress={() => Alert.alert('AI clicked')}
        />


        {/* Suggestions Header */}
        <View style={styles.suggestionsHeader}>
          <View style={styles.sectionHeader}>
            <FontAwesome6 name="star-of-life" size={24} color="black" />
            <Text style={[styles.sectionTitle, { marginLeft: 10, flex: 1 }]}>Suggestions</Text>
          </View>
        </View>

        <PlantSuggestionList />
      </ScrollView>
      <StatusBar style='dark' />
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
  weatherCard: {},
  card: {
    padding: width * 0.04,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weatherDate: {
    fontSize: 12,
    color: '#888',
  },
  weatherButton: {
    backgroundColor: '#103713',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  weatherInsights: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  insightText: {
    fontSize: 13,
    color: '#555',
  },
});
