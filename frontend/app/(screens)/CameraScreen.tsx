import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Camera from 'expo-camera'; 
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsScanning(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });

        setTimeout(() => {
          setIsScanning(false);
          router.navigate('ScanProcessing', { imageUri: photo.uri });
        }, 2000);
      } catch (e) {
        setIsScanning(false);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} />

      <View style={styles.bottomContainer}>
        {isScanning ? (
          <>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.scanningText}>Scanning...</Text>
          </>
        ) : (
          <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#4CAF50',
  },
  scanningText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
});
