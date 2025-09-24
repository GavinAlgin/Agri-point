import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const Recognition = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '45%'], []);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const fetchAIContent = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.43.142/api/identity-crop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      return {
        crop_detected: data.crop_detected,
        confidence: data.confidence,
        raw_response: data.raw_response,
      };
    } catch (error) {
      console.error('AI fetch failed:', error);
      return {
        crop_detected: 'Error',
        confidence: 0,
        raw_response: null,
      };
    }
  };


const pickImage = async () => {
  closeSheet();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.6, // reduce quality to avoid broken pipe
  });

  if (!result.canceled && result.assets?.length > 0) {
    const uri = result.assets[0].uri;
    setLoading(true);

    const aiResponse = await fetchAIContent(uri);
    setLoading(false);

    setHistory((prev) => [
      {
        id: Date.now(),
        image: uri,
        content: aiResponse.crop_detected,
      },
      ...prev,
    ]);

    router.push({
      pathname: '/(screens)/ImgGenAIScreen',
      query: {
        image: uri,
        crop: aiResponse.crop_detected,
        confidence: aiResponse.confidence,
      },
    });
  }
};


  const openSheet = () => {
    bottomSheetRef.current?.expand();
    setOverlayVisible(true);
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
    setOverlayVisible(false);
  };

  const toggleFab = () => {
    Animated.timing(animation, {
      toValue: fabExpanded ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setFabExpanded((prev) => !prev);
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Detection</Text>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.iconButton}>
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

        {/* AI History */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          {history.length === 0 ? (
            <Text style={styles.noHistoryText}>No AI responses yet.</Text>
          ) : (
            history.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.historyImage}
                />
                <Text style={styles.historyText}>{item.content}</Text>
              </View>
            ))
          )}
        </ScrollView>

        {/* FAB */}
        <View style={styles.fabContainer}>
          <Animated.View
            style={[
              styles.actionButton,
              {
                transform: [{ translateY: uploadTranslate }],
                opacity: animation,
              },
            ]}>
            <TouchableOpacity onPress={openSheet} style={styles.subButton}>
              <Ionicons name="cloud-upload-outline" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.actionButton,
              {
                transform: [{ translateY: scanTranslate }],
                opacity: animation,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                toggleFab();
                router.push('/(screens)/CameraScreen');
              }}
              style={styles.subButton}>
              <Ionicons name="camera-outline" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={toggleFab} style={styles.mainFab}>
            <Ionicons
              name={fabExpanded ? 'close' : 'add'}
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Overlay & Bottom Sheet container */}
        <View style={StyleSheet.absoluteFill}>
          {/* Overlay behind the BottomSheet */}
          {overlayVisible && (
            <Pressable style={styles.overlay} onPress={closeSheet} />
          )}

          {/* Bottom Sheet on top of overlay */}
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={() => setOverlayVisible(false)}>
            <BottomSheetView style={styles.sheetContent}>
              <TouchableOpacity onPress={pickImage} style={styles.sheetButton}>
                <Text>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeSheet} style={styles.sheetButton}>
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
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
  iconButton: {
    marginRight: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
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
  noHistoryText: {
    marginTop: 20,
    color: 'gray',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  historyText: {
    flex: 1,
    marginLeft: 12,
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
  subButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#103713',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButton: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheetContent: {
    padding: 20,
    gap: 12,
  },
  sheetButton: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
});
