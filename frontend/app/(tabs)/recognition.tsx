import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Recognition = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const toggleFab = () => {
    const toValue = fabExpanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setFabExpanded(!fabExpanded);
  };

  const handleUploadPress = () => {
    setBottomSheetVisible(true);
    toggleFab();
  };

  const handleScanPress = () => {
    toggleFab();
    navigation.navigate('CameraScreen'); // Ensure this screen exists
  };

  const uploadTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });

  const scanTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Detection</Text>

        {/* Dropdown Button */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={{
              marginRight: 12,
              padding: 12,
              borderRadius: 10,
              backgroundColor: '#f7f7f7',
            }}>
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text>Report</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        {/* Upload Button */}
        <Animated.View
          style={[
            styles.actionButton,
            {
              transform: [{ translateY: uploadTranslate }],
              opacity: animation,
            },
          ]}>
          <TouchableOpacity onPress={handleUploadPress} style={styles.subButton}>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Scan Button */}
        <Animated.View
          style={[
            styles.actionButton,
            {
              transform: [{ translateY: scanTranslate }],
              opacity: animation,
            },
          ]}>
          <TouchableOpacity onPress={handleScanPress} style={styles.subButton}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Main FAB */}
        <TouchableOpacity onPress={toggleFab} style={styles.mainFab}>
          <Ionicons name={fabExpanded ? 'close' : 'add'} size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* BottomSheet Modal */}
      <Modal
        visible={bottomSheetVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setBottomSheetVisible(false)}>
        <View style={styles.bottomSheetBackdrop}>
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>Upload Image</Text>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => {
                // Handle actual image picker here
                setBottomSheetVisible(false);
              }}>
              <Text>Select from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => setBottomSheetVisible(false)}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Recognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 36,
    right: 0,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: 120,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    alignItems: 'center',
  },
  mainFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#103713',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#103713',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomSheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sheetOption: {
    paddingVertical: 12,
  },
});
