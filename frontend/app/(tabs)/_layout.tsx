import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function _layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#000', tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 0, padding: width * 0.04, marginBottom: 12,} }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />, }} />
      <Tabs.Screen name="market" options={{ title: "Market", tabBarIcon: ({ color }) => <Ionicons name="storefront-outline" size={28} color={color} />, }} />
      <Tabs.Screen name="recognition" options={{ title: "Recognition", tabBarIcon: ({ color }) => <FontAwesome6 name="star-of-life" size={28} color={color} />, }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({ color }) => <MaterialIcons name="work-outline" size={28} color={color} />, }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} />, }} />
      <StatusBar style="auto" />
    </Tabs>
  );
}