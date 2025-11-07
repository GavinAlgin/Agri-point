import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../server/api';

export default function RecognitionScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // 📸 Pick Image from Gallery
  // ----------------------------
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setResult(null);
    }
  };

  // ----------------------------
  // 🔄 Refresh / Clear Everything
  // ----------------------------
  const handleRefresh = () => {
    setImageUri(null);
    setResult(null);
  };

  // ----------------------------
  // 🧠 Send Image → Backend (AI Crop Detection)
  // ----------------------------
  const fetchAIContent = async (uri: string) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await api.post('identity-crop/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      setResult({
        crop_detected: data.crop_detected || 'Unknown',
        confidence: data.confidence || 0,
        raw_response: data.raw_response || 'No details provided.',
      });
    } catch (error: any) {
      console.error('AI fetch failed:', error.response?.data || error.message);
      alert('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🧾 UI Render
  // ----------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌾 Crop Recognition</Text>
      <Text style={styles.subtitle}>
        Upload an image of a crop to identify it using AI
      </Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={50} color="#888" />
            <Text style={styles.placeholderText}>Tap to select an image</Text>
          </View>
        )}
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={() => fetchAIContent(imageUri)}
          >
            <Ionicons name="scan-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Analyze</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh-outline" size={20} color="#388E3C" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}

      {result && (
        <ScrollView
          style={styles.resultCard}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.resultTitle}>✅ Analysis Result</Text>
          <Text style={styles.resultText}>
            <Text style={styles.label}>Crop:</Text> {result.crop_detected}
          </Text>
          <Text style={styles.resultText}>
            <Text style={styles.label}>Confidence:</Text>{' '}
            {(result.confidence * 100).toFixed(2)}%
          </Text>

          {result.raw_response && (
            <View style={styles.rawResponseBox}>
              <Text style={styles.label}>AI Details:</Text>
              <Text style={styles.rawResponseText}>
                {typeof result.raw_response === 'object'
                  ? JSON.stringify(result.raw_response, null, 2)
                  : result.raw_response}
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* 🌀 Overlay while loading */}
      <Modal transparent animationType="fade" visible={loading}>
        <View style={styles.overlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Analyzing Image...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAF7',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  imagePicker: {
    width: '100%',
    height: 250,
    backgroundColor: '#E9F5EC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A5D6A7',
    borderWidth: 1.2,
    overflow: 'hidden',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 10,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#388E3C',
    borderWidth: 1.2,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    gap: 6,
  },
  refreshText: {
    color: '#388E3C',
    fontWeight: '600',
    fontSize: 15,
  },
  resultCard: {
    marginTop: 35,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    maxHeight: 250,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#388E3C',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  rawResponseBox: {
    marginTop: 12,
    backgroundColor: '#F0F8F1',
    borderRadius: 10,
    padding: 10,
  },
  rawResponseText: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});
