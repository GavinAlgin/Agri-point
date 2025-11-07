import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';

const CameraScreen = () => {
  const router = useRouter(); // ✅ useRouter hook
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        // Delay to ensure root layout is mounted
        setTimeout(startScanning, 500);
      }
    })();
  }, []);

  const startScanning = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const data = "Detected: Healthy corn field 🌽";
        router.push({ pathname: '/(screens)/AIScreen', params: { scannedData: data } });
      }
    }, 200);
  };

  if (hasPermission === null)
    return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  if (hasPermission === false)
    return <View style={styles.center}><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={CameraType.back}>
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scanning... {scanProgress}%</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
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
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 30, backgroundColor: 'rgba(0,0,0,0.3)' },
  scanText: { color: '#fff', fontSize: 18, marginBottom: 20 },
  cancelButton: { padding: 12, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
