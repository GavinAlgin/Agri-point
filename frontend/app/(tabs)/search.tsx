import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
// import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

// Simulated AI responses
const aiResponses = [
  "Hello! How can I assist you today?",
  "Sure, I can help with that.",
  "Let me look that up for you.",
  "Here's something you might find interesting."
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "How can I help?",
    "Tell me a joke.",
    "What’s the weather like?",
    "Search for a movie."
  ]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');
      
      // Simulate AI response
      setTimeout(() => {
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages(prevMessages => [...prevMessages, { text: randomResponse, isUser: false }]);
      }, 1000);
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Animated button styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 500 }),
      transform: [{ scale: withTiming(1.2, { duration: 500 }) }]
    };
  });

  return (
    <View style={styles.container}>
      
      {/* Chat List */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.message, item.isUser ? styles.userMessage : styles.aiMessage]}>
            {item.isUser ? (
              <Text style={styles.messageText}>{item.text}</Text>
            ) : (
              <View style={styles.aiResponseContainer}>
                <FontAwesome5 name="asterisk" size={20} color="black" style={styles.aiIcon} />
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          </View>
        )}
        style={styles.chatList}
      />

      {/* Suggestions Container */}
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity key={index} onPress={() => setInputText(suggestion)} style={styles.suggestion}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleImagePick} style={styles.iconButton}>
            {/* <Ionicons name="image" size={24} color="#fff" /> */}
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSend} style={[styles.sendButton, animatedStyle]}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  chatList: {
    flex: 1,
    width: '100%',
    marginBottom: 16,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#ddd',
    alignSelf: 'flex-end',
    color: '#fff',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    color: '#000',
  },
  aiResponseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f4f4f4',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 5,
    marginLeft:  5,
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 30,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    marginBottom: 15, // Space between suggestions and input field
  },
  suggestion: {
    backgroundColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  suggestionText: {
    color: '#000',
    fontSize: 14,
  },
});
