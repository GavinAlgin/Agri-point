// utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  return await AsyncStorage.getItem('jwtToken');
};

export const setToken = async (token) => {
  await AsyncStorage.setItem('jwtToken', token);
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('jwtToken');
};
