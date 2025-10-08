import {ScrollView, TextInput, Image, SafeAreaView ,StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Market from './Component/Market'
import Cart from './Component/Cart'
import MoreInfo from './Component/MoreInfo'
import MarketContextProvider from './Component/Context'
import Tab from './Component/Tab/Tab'
import Login from './Component/(auth)/Login'
import Forgot from './Component/(auth)/Forgot'
import Registration from './Component/(auth)/Registration'
import MyProfile from './Component/Profile/MyProfile'
import AuthContextProvider from './Component/(auth)/AuthContext'

//                    MAIN COMPONENT CREATING ROUTES FOR NAVIGATIONS

//CREATE BOTH NAVIGATORS
const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();

//CREATE A TAB NAVIGATOR COMPONENT

const App = () => {
  return (
    <MarketContextProvider>
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Market" component={Market} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            
          </Stack.Navigator>
          <Tab />      
        </NavigationContainer>
      </AuthContextProvider>
    </MarketContextProvider>
  )
}

export default App
