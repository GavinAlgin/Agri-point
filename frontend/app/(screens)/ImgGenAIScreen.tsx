import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';

const ImgGenAIScreen = () => {
  const { image } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (image && !aiResponse) {
      generateAIResponse();
    }
  }, [image]);

  const generateAIResponse = async () => {
    setLoading(true);
    setTyping(true);

    try {
      const response = await fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': 'YOUR_PLANT_ID_API_KEY',
        },
        body: JSON.stringify({
          images: [image], // Pass image URL
          similar_images: true,
          details: ["common_names", "url", "name_authority", "wiki_description", "taxonomy"],
        }),
      });

      const data = await response.json();

      if (data?.suggestions?.length > 0) {
        const plant = data.suggestions[0];
        const name = plant.plant_name;
        const commonNames = plant?.plant_details?.common_names?.join(', ') || '';
        const description = plant.plant_details?.wiki_description?.value || 'No description available.';

        setAiResponse(`🌿 The image is identified as *${name}* (${commonNames}).\n\n${description}`);
      } else {
        setAiResponse("🤖 Sorry, I couldn't identify this plant. Try another image.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to contact the plant identification API.");
      setAiResponse("❌ Something went wrong while generating the AI response.");
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Image Recognition'} />

      <Text style={styles.title}>Image Preview</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      ) : (
        <Text>No image provided</Text>
      )}

      <View style={styles.responseContainer}>
        {typing && (
          <View style={styles.typingBubble}>
            <Text style={styles.typingDot}>⏳ AI is analyzing the image...</Text>
          </View>
        )}

        {!typing && aiResponse && (
          <View style={styles.aiResponseBubble}>
            <MaterialIcons name="smart-toy" size={20} color="#4CAF50" style={styles.aiIcon} />
            <Text style={styles.aiResponseText}>{aiResponse}</Text>
          </View>
        )}

        {!typing && !aiResponse && (
          <Text>No AI response generated yet.</Text>
        )}
      </View>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
    </View>
  );
};

export default ImgGenAIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  responseContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    minHeight: 80,
    justifyContent: 'center',
  },
  typingBubble: {
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 12,
    alignSelf: 'flex-start',
  },
  typingDot: {
    fontStyle: 'italic',
    color: '#00796B',
  },
  aiResponseBubble: {
    flexDirection: 'row',
    backgroundColor: '#F1F8E9',
    borderRadius: 10,
    padding: 12,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  aiIcon: {
    marginRight: 8,
  },
  aiResponseText: {
    fontSize: 16,
    color: '#33691E',
  },
});


// nukitashi the animation