import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

interface IoTCardProps {
  onDevicesPress?: (event: GestureResponderEvent) => void;
  onLocationPress?: (event: GestureResponderEvent) => void;
  onAIPress?: (event: GestureResponderEvent) => void;
  onSettingsPress?: (event: GestureResponderEvent) => void;
}

const IoTCard: React.FC<IoTCardProps> = ({
  onDevicesPress,
  onLocationPress,
  onAIPress,
  onSettingsPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Large Button */}
      <TouchableOpacity style={styles.largeButton} onPress={onDevicesPress}>
        <View style={styles.largeButtonContent}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="router-wireless" size={28} color="#000" />
          </View>

          {/* Text Content */}
          <View style={styles.deviceInfo}>
            <Text style={styles.title}>Connected Device</Text>
            <Text style={styles.subtitle}>Model: Drone</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Usage</Text>
                <Text style={styles.statValue}>2h 30m</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Power</Text>
                <Text style={styles.statValue}>78%</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Images</Text>
                <Text style={styles.statValue}>154</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Small Buttons */}
      <View style={styles.smallButtonsContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={onLocationPress}>
          <MaterialCommunityIcons name="map-marker-radius" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton1} onPress={onAIPress}>
          <MaterialCommunityIcons name="star-four-points-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IoTCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  largeButton: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
  },
  largeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#103713',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ddd',
    marginHorizontal: 6,
  },
  smallButtonsContainer: {
    justifyContent: 'space-between',
  },
  smallButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: (width - 40) / 4.5,
    alignItems: 'center',
    marginBottom: 10,
  },
  smallButton1: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    width: (width - 40) / 4.5,
    alignItems: 'center',
  },
});
