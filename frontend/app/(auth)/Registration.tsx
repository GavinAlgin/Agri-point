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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://your-django-url.com/api/register/', {
        email,
        username,
        password,
      });

      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Account created successfully.');
      // Optionally navigate to login screen
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.detail || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.HeaderContainer}>
        <FontAwesome5 name="star-of-life" size={24} color="white" />
      </View>

      <View style={styles.Content}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Create an account</Text>
        <Text style={{ color: '#777', fontSize: 18 }}>
          Fill in the details to get started.
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
      </View>

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
