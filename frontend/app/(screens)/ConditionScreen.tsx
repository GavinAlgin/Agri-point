import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = 350;
const IMAGE_OVERLAP = 70;

// ---------------------------
// SharedCard Component
// ---------------------------
interface SharedCardProps {
  image: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  buttonLabel: string;
  onButtonPress?: () => void;
}

const SharedCard = ({
  image,
  title,
  subtitle,
  children,
  buttonLabel,
  onButtonPress,
}: SharedCardProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        <View style={styles.iconOverlay}>
          <Feather name="info" size={24} color="white" />
        </View>
      </View>

      {/* Foreground Content Box */}
      <View style={styles.contentBox}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {children}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ---------------------------
// ConditionScreen Component
// ---------------------------
export default function ConditionScreen() {
  return (
    <SharedCard
      image="https://images.unsplash.com/photo-1590080875839-36916b07f94b?auto=format&fit=crop&w=800&q=80"
      title="Crop & Livestock Condition"
      subtitle="Monitor real-time health and environment data."
      buttonLabel="Refresh Data"
      onButtonPress={() => console.log("Refreshing data...")}
    >
      <View style={styles.statRow}>
        <Feather name="thermometer" size={20} color="#5cb85c" />
        <Text style={styles.statText}>Temperature: 23°C</Text>
      </View>

      <View style={styles.statRow}>
        <Feather name="droplet" size={20} color="#5cb85c" />
        <Text style={styles.statText}>Soil Moisture: 65%</Text>
      </View>

      <View style={styles.statRow}>
        <Feather name="activity" size={20} color="#5cb85c" />
        <Text style={styles.statText}>Health Index: Stable 🌿</Text>
      </View>

      <View style={styles.guidelines}>
        <Text style={styles.sectionTitle}>Care Recommendations:</Text>
        <Text style={styles.guideText}>
          • Maintain irrigation twice a week.{"\n"}
          • Fertilize every 15 days.{"\n"}
          • Monitor livestock feed quality regularly.{"\n"}
          • Check temperature sensors once per week.
        </Text>
      </View>
    </SharedCard>
  );
}

// ---------------------------
// Styles
// ---------------------------
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width,
    height: IMAGE_HEIGHT,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
    zIndex: 0,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  iconOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
  contentBox: {
    flex: 1,
    marginTop: IMAGE_HEIGHT - IMAGE_OVERLAP,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  guidelines: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#111",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
