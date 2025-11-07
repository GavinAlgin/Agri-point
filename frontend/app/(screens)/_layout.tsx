import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/utils/AuthContext'

const _layout = () => {
  return (
    <>
    <AuthProvider>
      <Stack>
          <Stack.Screen name='GenerativeScreen' options={{ headerShown: false }} />
          <Stack.Screen name='PlantingGuide' options={{ headerShown: false }} />
          <Stack.Screen name='ProgessScreen' options={{ headerShown: false }} />
          <Stack.Screen name='TaskScreen' options={{ headerShown: false }} />
          <Stack.Screen name='MapViewScreen' options={{ headerShown: false }} />
          <Stack.Screen name='VendorDetailScreen' options={{ headerShown: false }} />
          <Stack.Screen name='LanguageScreen' options={{ headerShown: false }} />
          <Stack.Screen name='CameraScreen' options={{ headerShown: false }} />
          <Stack.Screen name='ImgGenAIScreen' options={{ headerShown: false }} />
          <Stack.Screen name='ChatScreen' options={{ headerShown: false }} />
          <Stack.Screen name='WeatherScreen' options={{ headerShown: false }} />
          <Stack.Screen name='EducateScreen' options={{ headerShown: false }} />
          <Stack.Screen name='EnvironmentControl' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
    <StatusBar style='auto' />
    </>
  )
}

export default _layout
