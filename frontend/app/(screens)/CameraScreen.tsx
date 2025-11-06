import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;

const simulatedAgricultureData = [
  "Detected: Wheat crop is healthy.",
  "Detected: Tomato plants need more sunlight.",
  "Detected: Corn field requires nitrogen fertilizer.",
];

const CameraScreen = () => {
  const navigation = useNavigation<any>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanning, setScanning] = useState(true);

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      startScanning();
    })();
  }, []);

  const startScanning = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const randomData = simulatedAgricultureData[Math.floor(Math.random() * simulatedAgricultureData.length)];
        navigation.navigate('Generative', { scannedData: randomData });
      }
    }, 150);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (hasPermission === null) return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  if (hasPermission === false) return <View style={styles.center}><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scanning... {scanProgress}%</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30 },
  scanText: { color: '#fff', fontSize: 18, marginBottom: 20 },
  cancelButton: { padding: 12, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
