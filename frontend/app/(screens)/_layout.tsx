import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name='GenerativeScreen' options={{ headerShown: false }} />
        <Stack.Screen name='ProgessScreen' options={{ headerShown: false }} />
        <Stack.Screen name='TaskScreen' options={{ headerShown: false }} />
        <Stack.Screen name='CropDetailScreen' options={{ headerShown: false }} />
        <Stack.Screen name='VendorDetailScreen' options={{ headerShown: false }} />
    </Stack>
    <StatusBar style='auto' />
    </>
  )
}

export default _layout
