import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

export default function _layout() {
  return (
    <>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='(index)' />
        <Stack.Screen name='Onboarding' options={{headerShown: false}} />
        <Stack.Screen name='Reset-Password' />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}