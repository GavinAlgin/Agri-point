import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  FontAwesome6,
} from '@expo/vector-icons';

const width = Dimensions.get('window').width;

const IoTCard = ({
  droneImage,
  droneName = 'SkyWatcher X1',
  condition = 'Good',
  batteryLevel = 72,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Left: 2x2 Button Grid */}
      <View style={styles.buttonGrid}>
        <CircleButton icon={<MaterialIcons name="sensors" size={24} color="black" />} />
        <CircleButton icon={<FontAwesome5 name="map-marker-alt" size={20} color="black" />} />
        <CircleButton icon={<MaterialIcons name="track-changes" size={24} color="black" />} />
        <CircleButton icon={<FontAwesome6 name="star-of-life" size={20} color="black" />} />
      </View>

      {/* Right: Drone Info */}
      <View style={styles.droneInfo}>
        <Image
          source={droneImage ? { uri: droneImage } : require('@/assets/images/cloud.png')}
          style={styles.droneImage}
          resizeMode="contain"
        />
        <Text style={styles.droneName}>{droneName}</Text>
        <Text style={styles.subtitle}>Condition: {condition}</Text>
        <Text style={styles.subtitle}>Battery: {batteryLevel}%</Text>
      </View>
    </TouchableOpacity>
  );
};

const CircleButton = ({ icon }) => (
  <TouchableOpacity style={styles.circleButton}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: width * 0.04,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 110,
    justifyContent: 'space-between',
    marginRight: 16,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  droneInfo: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  droneImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  droneName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 8,
    color: '#666',
  },
});

export default IoTCard;
