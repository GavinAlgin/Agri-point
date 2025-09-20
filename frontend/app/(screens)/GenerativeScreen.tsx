import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Header from '@/components/CustomHeader';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/<your-model>';
const HF_API_KEY = '<your-huggingface-api-key>'; // Store securely in production

const GenerativeScreen = () => {
  const { crop } = useLocalSearchParams();
  const [structuredResponse, setStructuredResponse] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAIResponse = async () => {
    try {
      const cropObj = JSON.parse(crop);
      const prompt = `Give a structured agricultural analysis for the following crop data:\n${JSON.stringify(
        cropObj,
        null,
        2
      )}`;

      const response = await axios.post(
        HUGGING_FACE_API_URL,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
          },
        }
      );

      setStructuredResponse(response.data?.[0]?.generated_text || 'No response');
    } catch (error) {
      console.error('AI Error:', error);
      setStructuredResponse('Failed to fetch AI response.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIResponse();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header title={'My Field Anaylsis'} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={styles.responseText}>{structuredResponse}</Text>
      )}
    </ScrollView>
  );
};

export default GenerativeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  responseText: {
    fontSize: 16,
    lineHeight: 22,
  },
});


