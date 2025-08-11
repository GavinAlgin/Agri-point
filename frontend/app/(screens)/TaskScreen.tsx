import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://192.168.8.128:8080/tasks'; // Change this to your LAN IP

export default function ToDoScreen() {
  const [tasks, setTasks] = useState([]);
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data.tasks);
    } catch (err) {
      Alert.alert('Error', 'Could not fetch tasks');
    }
  };

  const submitParagraph = async () => {
    if (!paragraph.trim()) return;

    try {
      const res = await axios.post(`${API_BASE}/paragraph-to-tasks`, {
        text: paragraph
      });
      setTasks(res.data.tasks);
      setParagraph('');
    } catch (err) {
      Alert.alert('Error', 'Failed to generate tasks');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your paragraph..."
        multiline
        numberOfLines={4}
        value={paragraph}
        onChangeText={setParagraph}
      />
      <Button title="Generate Tasks" onPress={submitParagraph} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  task: { fontSize: 18, marginVertical: 5 },
});
