import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

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

      // Set global font for Text and TextInput
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: 'Lato-Regular' };

      TextInput.defaultProps = TextInput.defaultProps || {};
      TextInput.defaultProps.style = { fontFamily: 'Lato-Regular' };
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(index)" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="Reset-Password" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
