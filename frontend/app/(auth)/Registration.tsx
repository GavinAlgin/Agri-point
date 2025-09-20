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
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Invalid email address.", ToastAndroid.SHORT);
      // Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      ToastAndroid.show("Weak password, make atleast 8 characters.", ToastAndroid.SHORT);
      // Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Password Mismatch", ToastAndroid.SHORT);
      // Alert.alert('Password Mismatch', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.251.5:8000/api/register/', {
        email,
        username,
        password,
      });

      console.log('Registration successful:', response.data);
      ToastAndroid.show("Success! Account created", ToastAndroid.SHORT);
      // Alert.alert('Success', 'Account created successfully.');
      // Optionally navigate to login screen
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
      ToastAndroid.show(
        "Registration Unsuccessful: " + (error?.response?.data?.detail || 'An error occurred.'),
        ToastAndroid.SHORT
      );
      // Alert.alert('Registration Failed', error.response?.data?.detail || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async () => {
    ToastAndroid.show('Google Auth Coming Soon!',  ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <FontAwesome5 name="star-of-life" size={24} color="white" />
      </View>

      <View style={styles.Content}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Create an account</Text>
        <Text style={{ color: '#777', fontSize: 18 }}>
          Create your account, it takes less than a minute. 
          Enter your email and password
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
          style={styles.InputBtn}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.InputBtn}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.InputBtn}
        />
      </View>

      <View style={styles.Btns}>
        <TouchableOpacity style={styles.LoginBtn} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.BtnTitle}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginBtn} onPress={handleOAuth} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.BtnTitle}>Continue with Google</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={{ textAlign: 'center', marginTop: 16, }}>Already have an account? 
        <Link href={'/(auth)/Login'} style={{ fontSize: 16, fontWeight: 'bold', color: '#103713', }}>Login</Link>
      </Text>


      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Register;

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
});
