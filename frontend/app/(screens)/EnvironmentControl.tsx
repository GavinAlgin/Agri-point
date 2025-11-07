import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Slider,
  FlatList,
} from "react-native";

interface Props {
  type: "indoor" | "greenhouse";
  onBack: () => void;
}

export const EnvironmentControl: React.FC<Props> = ({ type, onBack }) => {
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(65);
  const [light, setLight] = useState(80);

  const facility = [
    { key: "Power", status: "✅ Stable" },
    { key: "Sensors", status: "✅ Active" },
    { key: "Ventilation", status: "✅ Running" },
    { key: "Water Level", status: "⚠️ Medium" },
  ];

  const themeColor = type === "indoor" ? "#007aff" : "#34c759";

  return (
    <View style={[styles.container, { backgroundColor: "#0e1117" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.backButton, { color: themeColor }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColor }]}>
          {type === "indoor" ? "🏠 Indoor Control" : "🌿 Greenhouse Control"}
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Temperature</Text>
          <Text style={styles.value}>{temperature}°C</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setTemperature((t) => t - 1)}
              style={[styles.smallButton, { backgroundColor: themeColor }]}
            >
              <Text style={styles.smallButtonText}>–</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTemperature((t) => t + 1)}
              style={[styles.smallButton, { backgroundColor: themeColor }]}
            >
              <Text style={styles.smallButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>{humidity}%</Text>
          <Slider
            style={{ width: 200 }}
            minimumValue={30}
            maximumValue={100}
            minimumTrackTintColor={themeColor}
            maximumTrackTintColor="#888"
            thumbTintColor={themeColor}
            value={humidity}
            onValueChange={(v) => setHumidity(Math.round(v))}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Light</Text>
          <Text style={styles.value}>{light}%</Text>
          <Slider
            style={{ width: 200 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={themeColor}
            maximumTrackTintColor="#888"
            thumbTintColor={themeColor}
            value={light}
            onValueChange={(v) => setLight(Math.round(v))}
          />
        </View>
      </View>

      <View style={styles.facilitySection}>
        <Text style={[styles.subTitle, { color: themeColor }]}>Facility Check</Text>
        <FlatList
          data={facility}
          renderItem={({ item }) => (
            <Text style={styles.facilityItem}>
              {item.key}: {item.status}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    marginBottom: 30,
  },
  backButton: {
    fontSize: 18,
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  statusContainer: {
    alignItems: "center",
    gap: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#1c1f26",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  label: {
    color: "#bbb",
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  facilitySection: {
    marginTop: 40,
    backgroundColor: "#1c1f26",
    borderRadius: 15,
    padding: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  facilityItem: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 3,
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Animated,
//   Easing,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";

// export const GrowingInfoScreen: React.FC = () => {
//   const [light, setLight] = useState(10);
//   const [humidity, setHumidity] = useState(90);
//   const [age, setAge] = useState(1);

//   const rotateAnim = new Animated.Value(light);

//   const animateDial = (value: number) => {
//     Animated.timing(rotateAnim, {
//       toValue: value,
//       duration: 400,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   };

//   const dialRotation = rotateAnim.interpolate({
//     inputRange: [0, 100],
//     outputRange: ["-90deg", "90deg"],
//   });

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="chevron-back" size={28} color="#fff" />
//         </TouchableOpacity>
//         <View>
//           <Text style={styles.title}>Growing</Text>
//           <Text style={styles.subtitle}>info</Text>
//         </View>
//       </View>

//       {/* Light Control */}
//       <View style={styles.lightSection}>
//         <View style={styles.lightHeader}>
//           <Ionicons name="sunny-outline" size={20} color="#fff" />
//           <Text style={styles.lightLabel}>Light</Text>
//         </View>

//         <View style={styles.dialContainer}>
//           <Animated.View
//             style={[
//               styles.dialArc,
//               {
//                 transform: [{ rotate: dialRotation }],
//                 backgroundColor: "#ffde00",
//               },
//             ]}
//           />
//           <View style={styles.plantImageContainer}>
//             <Image
//               source={{
//                 uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Lettuce.jpg/512px-Lettuce.jpg",
//               }}
//               style={styles.plantImage}
//             />
//           </View>
//           <View style={styles.lightValueContainer}>
//             <Text style={styles.lightValue}>{light}%</Text>
//           </View>
//         </View>

//         <Slider
//           style={{ width: 250, marginTop: 20 }}
//           minimumValue={0}
//           maximumValue={100}
//           minimumTrackTintColor="#ffde00"
//           maximumTrackTintColor="#333"
//           thumbTintColor="#ffde00"
//           value={light}
//           onValueChange={(v) => {
//             setLight(Math.round(v));
//             animateDial(v);
//           }}
//         />
//       </View>

//       {/* Info Cards */}
//       <View style={styles.infoRow}>
//         <View style={styles.infoCard}>
//           <Ionicons name="calendar-outline" size={20} color="#fff" />
//           <Text style={styles.infoValue}>{age}d.</Text>
//           <Text style={styles.infoLabel}>Age</Text>
//         </View>
//         <View style={styles.infoCard}>
//           <Ionicons name="water-outline" size={20} color="#fff" />
//           <Text style={styles.infoValue}>{humidity}%</Text>
//           <Text style={styles.infoLabel}>Humidity</Text>
//         </View>
//       </View>

//       {/* Schedule Button */}
//       <TouchableOpacity style={styles.scheduleBtn}>
//         <Ionicons name="time-outline" size={22} color="#000" />
//         <Text style={styles.scheduleText}>Schedule</Text>
//         <Ionicons name="arrow-forward" size={20} color="#000" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#7a8b50",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 30,
//     gap: 20,
//   },
//   title: {
//     fontSize: 30,
//     color: "#fff",
//     fontWeight: "700",
//     lineHeight: 28,
//   },
//   subtitle: {
//     fontSize: 26,
//     color: "#d4ffb2",
//     fontWeight: "300",
//     lineHeight: 26,
//   },
//   lightSection: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   lightHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   lightLabel: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   dialContainer: {
//     width: 220,
//     height: 220,
//     borderRadius: 110,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//   },
//   dialArc: {
//     position: "absolute",
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     opacity: 0.5,
//   },
//   plantImageContainer: {
//     width: 160,
//     height: 160,
//     borderRadius: 80,
//     overflow: "hidden",
//     backgroundColor: "#2e3b26",
//   },
//   plantImage: {
//     width: "100%",
//     height: "100%",
//   },
//   lightValueContainer: {
//     position: "absolute",
//     top: 10,
//     left: 30,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     borderRadius: 10,
//     padding: 6,
//   },
//   lightValue: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 10,
//     marginBottom: 40,
//   },
//   infoCard: {
//     backgroundColor: "rgba(0,0,0,0.25)",
//     borderRadius: 20,
//     width: "45%",
//     alignItems: "center",
//     paddingVertical: 15,
//   },
//   infoValue: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//     marginVertical: 5,
//   },
//   infoLabel: {
//     color: "#d4ffb2",
//     fontSize: 14,
//   },
//   scheduleBtn: {
//     backgroundColor: "#ffde00",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 25,
//     paddingVertical: 15,
//     borderRadius: 25,
//   },
//   scheduleText: {
//     color: "#000",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
