import { AntDesign, Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, Text, View, StyleSheet, Pressable, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearToken } from '@/utils/tokenStorage';
import { AuthContext } from '@/utils/AuthContext';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { authToken, loading } = useContext(AuthContext);

  const handleLogout = async () => {
    await clearToken();
    // Redirect to login screen
    router.push('/(auth)/Login');
    ToastAndroid.show("Successfully logged", ToastAndroid.SHORT);
  };

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
        const res = await axios.get('http://192.168.163.137:8000/api/user/', {
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Image
              source={require('@/assets/images/mesh.jpg')} // Add actual image URI if available
              style={styles.userImage}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user?.username}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          <TouchableOpacity>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.card} onPress={() => router.push('/(screens)/OrderScreen')}>
              <Feather name="box" size={24} color="black" />
              <Text style={styles.title}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.navigate('')}>
              <AntDesign name="retweet" size={24} color="black" />
              <Text style={styles.title}>Recycle</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <TouchableOpacity style={styles.card} onPress={() => router.navigate('/(screens)/ChatScreen')}>
              <FontAwesome6 name="star-of-life" size={24} color="black" />
              <Text style={styles.title}>Chat AI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.navigate('')}>
              <Feather name="user" size={24} color="black" />
              <Text style={styles.title}>Diagnose</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '600', padding: width * 0.05, marginTop: -22 }}>Activity</Text>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 10 }} onPress={() => router.push('')}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={24} color="black" />
              </View>
              <Text style={styles.linkText}>Address Book</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 10 }} onPress={() => router.push('')}>
              <View style={styles.iconContainer}>
                <Ionicons name="notifications-outline" size={24} color="black" />
              </View>
              <Text style={styles.linkText}>Notification</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 10, right: 34 }} onPress={() => router.push('/(screens)/LanguageScreen')}>
              <View style={styles.iconContainer}>
                <Ionicons name="language-outline" size={24} color="black" />
              </View>
              <Text style={styles.linkText}>Language</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 10, right: 3 }} onPress={() => router.push('/(screens)/TaskScreen')}>
              <View style={styles.iconContainer}>
                <AntDesign name="staro" size={24} color="black" />
              </View>
              <Text style={styles.linkText}>Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '600', padding: width * 0.05, marginTop: 10 }}>Settings</Text>

        <View style={{ flexDirection: 'column', padding: width * 0.04, gap: 14 }}>
          <TouchableOpacity style={styles.account} onPress={() => router.push('')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account-cog-outline" size={24} color="black" />
            </View>
            <Text style={styles.linkText}>Account Settings</Text>
          </TouchableOpacity>

          <Pressable style={styles.account} onPress={() => router.push('')}>
            <View style={styles.iconContainer}>
              <AntDesign name="bank" size={24} color="black" />
            </View>
            <Text style={styles.linkText}>Payment Configurations</Text>
          </Pressable>

          <TouchableOpacity style={styles.account} onPress={() => router.push('')}>
            <View style={styles.iconContainer}>
              <Ionicons name="help" size={24} color="black" />
            </View>
            <Text style={styles.linkText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.account} onPress={() => router.push('')}>
            <View style={styles.iconContainer}>
              <Feather name="book-open" size={24} color="black" />
            </View>
            <Text style={styles.linkText}>Learn About Us</Text>
          </TouchableOpacity>

          <Pressable style={styles.logOut} onPress={handleLogout}>
            <View style={styles.iconContainer}>
              <AntDesign name="logout" size={24} color="black" />
            </View>
            <Text style={styles.logOutText}>LogOut</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    padding: width * 0.05,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  username: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '500',
  },
  card: {
    alignItems: 'center',
    margin: 10,
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    width: 175,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
  linkCard: {
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: 30,
    width: 50,
    height: 50,
    backgroundColor: '#f1f1f1f1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500'
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 10,
    right: 3,
  },
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 10,
    right: 3,
    marginBottom: 20,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red'
  },
});