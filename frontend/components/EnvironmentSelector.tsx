import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const EnvironmentSelector: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/GreenHouseScreen')}>
          <Feather name="home" size={28} color="black" />
          <Text style={styles.buttonText}>Indoor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(screens)/GreenHouseScreen')}>
          <MaterialCommunityIcons name="flower-tulip-outline" size={28} color="black" />
          <Text style={styles.buttonText}>Greenhouse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10, 
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 15,
    backgroundColor: "#f7f7f7",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
});
