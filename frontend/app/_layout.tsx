import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { AuthProvider } from '@/utils/AuthContext'

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
      });

      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(index)" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="Reset-Password" />
      </Stack>
    </AuthProvider>
      <StatusBar style="auto" />
    </>
  );
}
