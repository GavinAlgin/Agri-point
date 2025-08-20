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
      // Extract filename from URI (e.g., apple.jpg -> "apple")
      const imageName = (image as string)?.split('/').pop()?.split('.')[0]?.toLowerCase() || '';

      let responseText = '';

      switch (imageName) {
        case 'apple':
          responseText = `🍎 This is an *Apple*.\n\n🔍 **Condition**: The apple appears fresh and ripe.\n💡 **Suggestions**: Store in a cool place to keep it crisp.\n🌱 **Improvement**: To grow better apples, ensure the tree gets full sunlight and consistent watering.`;
          break;
        case 'banana':
          responseText = `🍌 This is a *Banana*.\n\n🔍 **Condition**: Slightly overripe with brown spots.\n💡 **Suggestions**: Perfect for smoothies or baking.\n🌱 **Improvement**: Bananas grow best in warm, humid environments with rich, well-drained soil.`;
          break;
        case 'mango':
          responseText = `🥭 This is a *Mango*.\n\n🔍 **Condition**: Firm and ripe.\n💡 **Suggestions**: Ready to be eaten fresh or used in salads.\n🌱 **Improvement**: Mango trees need deep watering and regular pruning for optimal fruiting.`;
          break;
        case 'orange':
          responseText = `🍊 This is an *Orange*.\n\n🔍 **Condition**: Juicy and ripe.\n💡 **Suggestions**: Great for juicing or snacking.\n🌱 **Improvement**: Provide citrus trees with balanced fertilizer and avoid overwatering.`;
          break;
        default:
          responseText = "🤖 Sorry, I couldn't identify this fruit. Please try with a clear image named after a fruit like 'apple', 'banana', etc.";
      }

      setAiResponse(responseText);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while analyzing the image.");
      setAiResponse("❌ Failed to generate a response.");
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
    alignSelf: 'flex-start',
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
    alignItems: 'flex-start',
  },
  aiIcon: {
    marginRight: 8,
    marginTop: 3,
  },
  aiResponseText: {
    fontSize: 16,
    color: '#33691E',
    flex: 1,
  },
});
