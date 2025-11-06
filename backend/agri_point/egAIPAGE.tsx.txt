import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from '../lib/api'; // your configured axios instance with token

export default function AIPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      // 1️⃣ Call your AI API
      const aiRes = await axios.post('/ai/generate/', { prompt: query }); 
      const aiText = aiRes.data.response;
      setResponse(aiText);

      // 2️⃣ Save to your Django DB
      await axios.post('/ai/interactions/', {
        question: query,
        response: aiText,
      });

    } catch (error) {
      console.error('Error saving interaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ask AI about crops..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title={loading ? "Thinking..." : "Ask"} onPress={handleAskAI} />
      {response ? <Text style={styles.response}>{response}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  response: { marginTop: 20, fontSize: 16, color: 'green' }
});
