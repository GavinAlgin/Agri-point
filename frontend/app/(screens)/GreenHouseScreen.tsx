import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function GrowingInfoScreen(){
  const [light, setLight] = useState(10);
  const [humidity, setHumidity] = useState(90);
  const [age, setAge] = useState(1);

  const rotateAnim = new Animated.Value(light);

  const animateDial = (value: number) => {
    Animated.timing(rotateAnim, {
      toValue: value,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const dialRotation = rotateAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["-90deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Growing</Text>
          <Text style={styles.subtitle}>info</Text>
        </View>
      </View>

      {/* Light Control */}
      <View style={styles.lightSection}>
        <View style={styles.lightHeader}>
          <Ionicons name="sunny-outline" size={20} color="#fff" />
          <Text style={styles.lightLabel}>Light</Text>
        </View>

        <View style={styles.dialContainer}>
          <Animated.View
            style={[
              styles.dialArc,
              {
                transform: [{ rotate: dialRotation }],
                backgroundColor: "#ffde00",
              },
            ]}
          />
          <View style={styles.plantImageContainer}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Lettuce.jpg/512px-Lettuce.jpg",
              }}
              style={styles.plantImage}
            />
          </View>
          <View style={styles.lightValueContainer}>
            <Text style={styles.lightValue}>{light}%</Text>
          </View>
        </View>

        <Slider
          style={{ width: 250, marginTop: 20 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#ffde00"
          maximumTrackTintColor="#333"
          thumbTintColor="#ffde00"
          value={light}
          onValueChange={(v) => {
            setLight(Math.round(v));
            animateDial(v);
          }}
        />
      </View>

      {/* Info Cards */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.infoValue}>{age}d.</Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="water-outline" size={20} color="#fff" />
          <Text style={styles.infoValue}>{humidity}%</Text>
          <Text style={styles.infoLabel}>Humidity</Text>
        </View>
      </View>

      {/* Schedule Button */}
      <TouchableOpacity style={styles.scheduleBtn}>
        <Ionicons name="time-outline" size={22} color="#000" />
        <Text style={styles.scheduleText}>Schedule</Text>
        <Ionicons name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7a8b50",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 20,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 26,
    color: "#d4ffb2",
    fontWeight: "300",
    lineHeight: 26,
  },
  lightSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  lightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lightLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dialContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  dialArc: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.5,
  },
  plantImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: "hidden",
    backgroundColor: "#2e3b26",
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  lightValueContainer: {
    position: "absolute",
    top: 10,
    left: 30,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    padding: 6,
  },
  lightValue: {
    color: "#fff",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 5,
  },
  infoLabel: {
    color: "#d4ffb2",
    fontSize: 14,
  },
  scheduleBtn: {
    backgroundColor: "#ffde00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scheduleText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});
