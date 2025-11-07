import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Sample data for buyer requests
const buyerRequests = [
  {
    id: "1",
    title: "Looking for Organic Tomatoes",
    quantity: "200 kg",
    location: "Nairobi",
    price: "$2.5/kg",
    urgency: "High",
  },
  {
    id: "2",
    title: "Need Free-range Chicken",
    quantity: "50 birds",
    location: "Kisumu",
    price: "$10/bird",
    urgency: "Medium",
  },
  {
    id: "3",
    title: "Wheat Bulk Purchase",
    quantity: "5 tons",
    location: "Eldoret",
    price: "$1500/ton",
    urgency: "Low",
  },
];

export default function MarketplaceRequestsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.heartIcon}>
          <Feather name="shopping-cart" size={24} color="white" />
        </View>
      </View>

      <View style={styles.contentBox}>
        <Text style={styles.title}>Buyer Requests</Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {buyerRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <Text style={styles.requestTitle}>{request.title}</Text>

              <View style={styles.requestRow}>
                <Feather name="map-pin" size={18} color="#5cb85c" />
                <Text style={styles.requestText}>{request.location}</Text>
              </View>

              <View style={styles.requestRow}>
                <Feather name="database" size={18} color="#5cb85c" />
                <Text style={styles.requestText}>Quantity: {request.quantity}</Text>
              </View>

              <View style={styles.requestRow}>
                <Feather name="tag" size={18} color="#5cb85c" />
                <Text style={styles.requestText}>Price: {request.price}</Text>
              </View>

              <View style={styles.requestRow}>
                <Feather name="clock" size={18} color="#5cb85c" />
                <Text style={styles.requestText}>Urgency: {request.urgency}</Text>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Contact Buyer</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const IMAGE_HEIGHT = 350;
const IMAGE_OVERLAP = 70;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    width: width,
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
  heartIcon: {
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
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
  },
  requestCard: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  requestTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "#2f7a3e",
    marginBottom: 10,
  },
  requestRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  requestText: {
    marginLeft: 8,
    color: "#3a3a3a",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#111",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});