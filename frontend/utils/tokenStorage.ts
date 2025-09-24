import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('jwtToken');
};

export const setToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('jwtToken', token);
};

export const clearToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('jwtToken');
};
