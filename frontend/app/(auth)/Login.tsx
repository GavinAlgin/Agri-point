import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/utils/AuthContext';

const { width } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const validateForm = (): boolean => {
    if (!email || !password) {
      ToastAndroid.show("Validation! Fill in all fields", ToastAndroid.SHORT);
      // Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    } else if (!username) {
      ToastAndroid.show("Validation! Fill in all fields", ToastAndroid.SHORT);
      return false;
    } 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
      // Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    return true;
  };

  // const handleLogin = async () => {
  //   if (!validateForm()) return;

  //   setLoading(true);

  //   try {
  //     const response = await axios.post('http://192.168.177.137:8000/api/login/', {
  //       username,
  //       email,
  //       password,
  //     });
  //     console.log('Login success', response.data);
  //     ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);

  //     router.push('/(tabs)'); // navigate to home screen  
  //   } catch (error: any) {
  //     ToastAndroid.show("Success! Logged In", ToastAndroid.SHORT);
  //     console.error('Login failed:', error.response?.data || error.message);
  //     ToastAndroid.show(
  //       "Login Failed: " + (error?.response?.data?.detail || 'An error occurred.'),
  //       ToastAndroid.SHORT
  //     );
  //     // Alert.alert('Login Failed', error.response?.data?.detail || 'An error occurred.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.177.137:8000/api/login/', {
        username,
        email,
        password,
      });

      console.log('Login success', response.data);
      ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);

      const token = response.data.access; // Adjust this if the token key is different

      if (token) {
        await AsyncStorage.setItem('jwtToken', token);
        router.push('/(tabs)'); // Navigate to home
      } else {
        ToastAndroid.show("No token received.", ToastAndroid.SHORT);
      }

    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      ToastAndroid.show(
        "Login Failed: " + (error?.response?.data?.detail || 'An error occurred.'),
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }

      await login(token);
      router.push('/(tabs)');
  };


  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <FontAwesome5 name="star-of-life" size={24} color="white" />
      </View>

      <View style={styles.Content}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Welcome back,</Text>
        <Text style={{ color: '#777', fontSize: 18 }}>
          We’re happy to see you here. Enter your email address and password.
        </Text>
      </View>

      <View style={styles.loginForm}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.InputBtn}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="username"
          style={styles.InputBtn}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.InputBtn}
        />
      </View>

      <View style={styles.Btns}>
        <TouchableOpacity style={styles.LoginBtn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.BtnTitle}>Login</Text>
          )}
        </TouchableOpacity>

        <Pressable onPress={() => router.push('/(tabs)')}>
          <Text style={styles.Forgot}>Forgot Password?</Text>
        </Pressable>

        <View style={styles.Separator} />

        <TouchableOpacity style={styles.LoginBtn} onPress={() => router.push('/(auth)/Registration')}>
          <Text style={styles.BtnTitle}>Create an Account</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Login;

// admin@gmail.com
// gadmin
// 1234@admin

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: width * 0.04,
    },
    HeaderContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#103713',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
    },
    Content: {
        flexDirection: 'column',
        marginTop: 28,
    },
    loginForm: {
        marginTop: 28,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
    },
    InputBtn: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        width:  width * 0.9,
        height: 50,
    },
    Btns: {
        flexDirection: 'column',
        marginTop: 28,
        gap: 18,
    },
    LoginBtn: {
        padding: 12,
        backgroundColor: '#103713',
        borderRadius: 10,
        alignItems: 'center'
    },
    BtnTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    Forgot: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    Separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 12,
    },

})