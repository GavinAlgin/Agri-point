import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('Error getting token:', e);
    return null;
  }
};

export const setToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('Error saving token:', e);
  }
};

export const removeToken = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing token:', e);
  }
};
