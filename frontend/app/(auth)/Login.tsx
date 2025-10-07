import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../utils/AuthContext';
import api from '../server/api';

const { width } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const validateForm = (): boolean => {
    if (!email || !password) {
      // ToastAndroid.show("Validation Error, Please fill in all fields", ToastAndroid.SHORT);
      if (Platform.OS === "android") {
        ToastAndroid.show("Validation Error, Please fill in all fields", ToastAndroid.SHORT);
      } else {
        Alert.alert("Validation Error", "Please fill in all fields");
      }

      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // ToastAndroid.show("Invalid email address.", ToastAndroid.SHORT);
      if (Platform.OS === "android") {
        ToastAndroid.show("Invalid email address.", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", "Invalid email address.");
      }
      return false;
    }

    if (password.length < 6) {
      // ToastAndroid.show("Password too short.", ToastAndroid.SHORT);
      if (Platform.OS === "android") {
        ToastAndroid.show("Password too short.", ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", "Password too short.");
      }
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      // Adjust based on your Django backend's response
      const token = response.data.token || response.data.access;

      if (!token) {
        throw new Error('No token received');
      }

      // Save token to AsyncStorage
      // await AsyncStorage.setItem('userToken', token);
      await login(token);

      // ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
      if (Platform.OS === "android") {
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
      } else {
        Alert.alert("Welcome", "Login Successful");
      }
      router.replace('/(tabs)'); // Adjust route as needed
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      // ToastAndroid.show(
      //   "Login Failed: " + (error?.response?.data?.detail || 'An error occurred.'),
      //   ToastAndroid.SHORT
      // );
      if (Platform.OS === "android") {
        ToastAndroid.show(
        "Login Failed: " + (error?.response?.data?.detail || 'An error occurred.'),
        ToastAndroid.SHORT
      );
      } else {
        Alert.alert("Login Failed", "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async () => {
    // ToastAndroid.show('Google Auth Coming Soon!', ToastAndroid.SHORT);
    if (Platform.OS === "android") {
      ToastAndroid.show('Google Auth Coming Soon!', ToastAndroid.SHORT);
    } else {
      Alert.alert("Notice", "Google Auth Coming Soon!");
    }
  };

  const handleForgot = async () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <FontAwesome5 name="star-of-life" size={24} color="white" />
      </View>

      <View style={styles.Content}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Welcome Back</Text>
        <Text style={{ color: '#777', fontSize: 18 }}>
          Login to your account
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

        <TouchableOpacity onPress={handleForgot}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginBtn} onPress={handleOAuth} disabled={loading}>
          <Text style={styles.BtnTitle}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: 'center', marginTop: 16 }}>
        Don’t have an account?{' '}
        <Link style={styles.subtitle} href={'/(auth)/Registration'} >
          Register
        </Link>
      </Text>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Login;

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
    gap: 16,
  },
  InputBtn: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.9,
    height: 50,
    paddingHorizontal: 10,
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
    alignItems: 'center',
  },
  BtnTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#103713'
  }
});
