import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/utils/AuthContext'

const _layout = () => {
  return (
    <>
    <AuthProvider>
        <Stack>
            <Stack.Screen name='Login' options={{ headerShown: false }} />
            <Stack.Screen name='Registration' options={{ headerShown: false }} />
            <Stack.Screen name='Forgot' options={{ headerShown: false }} />
        </Stack>
    </AuthProvider>
    <StatusBar style='auto' />
    </>
  )
}

export default _layout
