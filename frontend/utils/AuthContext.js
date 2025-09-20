import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token when app starts
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) setAuthToken(token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('jwtToken', token);
    setAuthToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
