import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/CustomHeader";

const screenWidth = Dimensions.get("window").width;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function AiSuitabilityScreen() {
  const { location, type } = useLocalSearchParams();
  const router = useRouter();
  const [suitability, setSuitability] = useState<any>(null);
  const [graphPeriod, setGraphPeriod] = useState<"weeks" | "months" | "years">("weeks");
  const [aiExpanded, setAiExpanded] = useState(false);

  useEffect(() => {
    if (location && type) fetchSuitabilityData(String(location), String(type));
  }, [location, type]);

  async function fetchSuitabilityData(location: string, type: string) {
    const presets: Record<string, any> = {
      apple: {
        score: 85,
        tempRange: "18–28°C",
        moisture: "60–70%",
        nutrients: "Nitrogen, Potassium, Phosphorus",
        waterNeed: "3x / week",
        guideline: [
          "Check soil moisture weekly",
          "Apply compost monthly",
          "Prune trees as needed",
          "Monitor pests weekly",
        ],
        growthRate: {
          weeks: [10, 20, 30, 40, 50, 60],
          months: [40, 50, 60, 70, 80, 85],
          years: [50, 60, 70, 80, 85, 90],
        },
        expectedHarvest: {
          image:
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80",
          title: "Apple",
          description: "Fresh red apples",
          date: "2025-09-20",
          height: "2–3m",
        },
        alternatives: [
          {
            title: "Pear",
            image:
              "https://images.unsplash.com/photo-1570197781474-04b9a4d4c67f?auto=format&fit=crop&w=600&q=80",
          },
          {
            title: "Peach",
            image:
              "https://images.unsplash.com/photo-1574169208507-8437617485de?auto=format&fit=crop&w=600&q=80",
          },
        ],
        aiResponse:
          "This crop is highly suitable for your region. Optimal growth can be achieved by following the weekly soil checks, monthly compost application, and consistent watering. Pest monitoring is essential during the flowering stage.",
      },
    };

    setSuitability(presets[type.toLowerCase()] || presets["apple"]);
  }

  if (!suitability) return <Text style={{ margin: 20 }}>Loading...</Text>;

  const toggleAiExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAiExpanded(!aiExpanded);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this crop data?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => router.push("/(tabs)"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={"Agri-Guideline"} />
      {/* Background Image */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
        }}
        style={styles.backgroundImage}
      />

      {/* Content Container */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {/* Suitability Row */}
          <View style={styles.suitabilityRow}>
            <MaterialCommunityIcons name="leaf" size={28} color="#1B5E20" />
            <Text style={styles.scoreText}>Suitability Score:</Text>
            <Text style={styles.scoreValue}>{suitability.score}%</Text>
          </View>

          {/* Info Columns */}
          <View style={styles.infoGrid}>
            {[
              { icon: "thermometer", label: "Temp", value: suitability.tempRange },
              { icon: "droplet", label: "Moisture", value: suitability.moisture },
              { icon: "chemical-weapon", label: "Nutrients", value: suitability.nutrients },
              { icon: "cloud-rain", label: "Water", value: suitability.waterNeed },
            ].map((item, i) => (
              <View key={i} style={styles.infoColumn}>
                <Feather name={item.icon as any} size={24} color="#1B5E20" />
                <Text style={styles.infoTitle}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Growth Rate Tabs */}
          <View style={styles.tabRow}>
            {["weeks", "months", "years"].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.tabButton,
                  graphPeriod === period && { backgroundColor: "#1B5E20" },
                ]}
                onPress={() => setGraphPeriod(period as any)}
              >
                <Text style={[styles.tabText, graphPeriod === period && { color: "#fff" }]}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Growth Graph */}
          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [{ data: suitability.growthRate[graphPeriod] }],
              }}
              width={screenWidth - 40}
              height={200}
              yAxisSuffix="%"
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: () => "#1B5E20",
                labelColor: () => "#555",
                style: { borderRadius: 16 },
              }}
              style={{ borderRadius: 16 }}
            />
          </View>

          {/* AI Response */}
          <View style={styles.aiContainer}>
            <TouchableOpacity style={styles.aiHeader} onPress={toggleAiExpand}>
              <Text style={styles.aiTitle}>AI Recommendation</Text>
              <Entypo
                name={aiExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#1B5E20"
              />
            </TouchableOpacity>
            {aiExpanded && <Text style={styles.aiText}>{suitability.aiResponse}</Text>}
          </View>

          {/* Expected Harvest */}
          <View style={styles.harvestContainer}>
            <Image
              source={{ uri: suitability.expectedHarvest.image }}
              style={styles.harvestImage}
            />
            <View style={styles.harvestText}>
              <Text style={styles.harvestTitle}>{suitability.expectedHarvest.title}</Text>
              <Text>Date: {suitability.expectedHarvest.date}</Text>
              <Text>Height: {suitability.expectedHarvest.height}</Text>
              <Text>{suitability.expectedHarvest.description}</Text>
            </View>
          </View>

          {/* Step by Step Guidelines */}
          <View style={styles.guidelineBox}>
            <Text style={styles.guidelineTitle}>Care Guidelines</Text>
            {suitability.guideline.map((step: string, i: number) => (
              <View key={i} style={styles.stepBox}>
                <Text style={styles.stepNumber}>{i + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Alternative Recommendations */}
          <View style={styles.recommendationBox}>
            <Text style={styles.guidelineTitle}>Alternative Recommendations</Text>
            <FlatList
              horizontal
              data={suitability.alternatives}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.altCard}>
                  <Image source={{ uri: item.image }} style={styles.altImage} />
                  <Text style={styles.altTitle}>{item.title}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ height: 100 }} />
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#e0e0e0" }]} onPress={handleDelete}>
            <Text style={[styles.buttonText, { color: "#333" }]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#1B5E20" }]} onPress={() => router.push('/(screens)/ChatScreen')}>
            <Text style={styles.buttonText}>Chat with AI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },

  scrollContent: { paddingTop: 220 }, // content starts lower for image overlay
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: "100%",
  },

  suitabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  scoreText: { marginLeft: 8, fontSize: 16, color: "#333" },
  scoreValue: { marginLeft: "auto", fontSize: 18, fontWeight: "700", color: "#1B5E20" },

  infoGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  infoColumn: {
    width: "47%",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  infoTitle: { marginTop: 4, fontWeight: "600", color: "#1B5E20" },
  infoValue: { fontSize: 13, color: "#555", textAlign: "center" },

  tabRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  tabText: { color: "#1B5E20", fontWeight: "600" },

  graphContainer: { marginTop: 12, backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12 },

  aiContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginTop: 20,
    padding: 12,
  },
  aiHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aiTitle: { fontWeight: "700", color: "#1B5E20", fontSize: 16 },
  aiText: { marginTop: 8, color: "#555" },

  harvestContainer: { flexDirection: "row", marginTop: 20, backgroundColor: "#f0f0f0", borderRadius: 12 },
  harvestImage: { width: 120, height: 120, borderRadius: 12 },
  harvestText: { flex: 1, padding: 12 },
  harvestTitle: { fontWeight: "700", color: "#1B5E20", fontSize: 16 },

  guidelineBox: { marginTop: 20, backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12 },
  guidelineTitle: { fontWeight: "700", color: "#1B5E20", marginBottom: 8 },
  stepBox: { flexDirection: "row", alignItems: "flex-start", marginVertical: 6 },
  stepNumber: { fontWeight: "700", marginRight: 8, color: "#1B5E20" },
  stepText: { flex: 1, color: "#555" },

  recommendationBox: { marginTop: 20 },
  altCard: { width: 120, marginRight: 12, borderRadius: 12, overflow: "hidden", backgroundColor: "#f0f0f0" },
  altImage: { width: "100%", height: 80 },
  altTitle: { textAlign: "center", padding: 4, fontWeight: "600", color: "#1B5E20" },

  bottomButtons: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  button: {
    flex: 0.48,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
// } from "react-native";
// import { Feather, FontAwesome } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Header from "@/components/CustomHeader";

// const { width, height } = Dimensions.get("window");

// export default function GazeniaTreeScreen() {
//   return (
//     <SafeAreaView style={styles.screen}>
//       <Header title={"Guideline"} />
//       <View style={styles.imageContainer}>
//         <Image
//           source={{
//             uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
//           }}
//           style={styles.image}
//           resizeMode="cover"
//         />
//         <View style={styles.heartIcon}>
//           <Feather name="heart" size={24} color="white" />
//         </View>
//       </View>

//       <View style={styles.contentBox}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.titleRow}>
//             <Text style={styles.title}>Gazenia Tree</Text>
//             <View style={styles.rating}>
//               {[...Array(5)].map((_, i) => (
//                 <FontAwesome
//                   key={i}
//                   name="star"
//                   size={16}
//                   color={i < 4 ? "#FFD700" : "#ddd"}
//                   style={{ marginRight: 2 }}
//                 />
//               ))}
//             </View>
//           </View>

//           <Text style={styles.description}>
//             This year’s colors is the formal violet we we add to our Christmas new
//             kedandawns, with the hope that new flowers will try some formal styling
//             when Christmas is done.
//           </Text>

//           <Text style={styles.price}>$ 123.00</Text>

//           <View style={styles.iconRow}>
//             <View style={styles.iconItem}>
//               <Feather name="zap" size={20} color="#5cb85c" />
//               <View style={styles.iconTextContainer}>
//                 <Text style={styles.iconLabel}>Flowering</Text>
//                 <Text style={styles.iconValue}>6-8 Weeks</Text>
//               </View>
//             </View>

//             <View style={styles.iconItem}>
//               <Feather name="sun" size={20} color="#5cb85c" />
//               <View style={styles.iconTextContainer}>
//                 <Text style={styles.iconLabel}>Light</Text>
//                 <Text style={styles.iconValue}>Diffused</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.iconRow}>
//             <View style={styles.iconItem}>
//               <Feather name="droplet" size={20} color="#5cb85c" />
//               <View style={styles.iconTextContainer}>
//                 <Text style={styles.iconLabel}>Watering</Text>
//                 <Text style={styles.iconValue}>3-2 Week</Text>
//               </View>
//             </View>

//             <View style={styles.iconItem}>
//               <Feather name="thermometer" size={20} color="#5cb85c" />
//               <View style={styles.iconTextContainer}>
//                 <Text style={styles.iconLabel}>Temperature</Text>
//                 <Text style={styles.iconValue}>5º-26ºC</Text>
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const IMAGE_HEIGHT = 350;
// const IMAGE_OVERLAP = 70;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//   },
//   imageContainer: {
//     position: "absolute",
//     top: 0,
//     width: width,
//     height: IMAGE_HEIGHT,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     overflow: "hidden",
//     zIndex: 0,
//     backgroundColor: "#eee",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   heartIcon: {
//     position: "absolute",
//     top: 15,
//     right: 15,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     borderRadius: 20,
//     padding: 6,
//     zIndex: 1,
//   },
//   contentBox: {
//     flex: 1,
//     marginTop: IMAGE_HEIGHT - IMAGE_OVERLAP,
//     backgroundColor: "white",
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//     paddingBottom: 20,
//     zIndex: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 10,

//     // Flex container to push button down
//     justifyContent: "space-between",
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   titleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#222",
//   },
//   rating: {
//     flexDirection: "row",
//   },
//   description: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 16,
//     lineHeight: 20,
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#222",
//     marginBottom: 20,
//   },
//   iconRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   iconItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginRight: 12,
//     backgroundColor: "#e8f5e9",
//     padding: 12,
//     borderRadius: 12,
//   },
//   iconTextContainer: {
//     marginLeft: 12,
//   },
//   iconLabel: {
//     fontSize: 12,
//     color: "#5cb85c",
//     fontWeight: "700",
//   },
//   iconValue: {
//     fontSize: 12,
//     color: "#5cb85c",
//   },
//   button: {
//     backgroundColor: "#111",
//     borderRadius: 30,
//     paddingVertical: 15,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
