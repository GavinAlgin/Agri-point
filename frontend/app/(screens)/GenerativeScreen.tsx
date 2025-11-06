import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/CustomHeader';
import { Ionicons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

const width = Dimensions.get('window').width;

const simulatedAgricultureData = [
  "Wheat crop growth is optimal at 20°C with moderate rainfall.",
  "Tomatoes require 6-8 hours of sunlight daily.",
  "Corn yield increases with nitrogen-rich fertilizer.",
];

const GenerativeScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typingText, setTypingText] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();

  // Typewriter effect
  const typeText = (text: string) => {
    let index = 0;
    setTypingText('');
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text }]);
        setTypingText('');
      }
    }, 30);
  };

  const handleSend = (userInput?: string) => {
    const msgText = userInput || input.trim();
    if (!msgText) return;

    const userMessage = { id: Date.now(), sender: 'user', text: msgText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const randomData = simulatedAgricultureData[Math.floor(Math.random() * simulatedAgricultureData.length)];
      typeText(`Based on agricultural insights: ${randomData}`);
    }, 500);
  };

  const handleVoiceInput = () => {
    const simulatedVoiceText = "Tell me about corn farming.";
    handleSend(simulatedVoiceText);
  };

  // Handle scanned data returned from camera
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        const params = navigation.getState().routes.find(r => r.name === 'Generative')?.params;
        if (params?.scannedData) {
          handleSend(params.scannedData);
          navigation.setParams({ scannedData: undefined });
        }
      });
      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingText]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="AI Assistant" />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Where knowledge begins</Text>
      </View>

      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[styles.messageContainer, msg.sender === 'ai' ? styles.aiMessage : styles.userMessage]}
          >
            <Ionicons
              name={msg.sender === 'ai' ? "ios-robot-outline" : "person-circle-outline"}
              size={24}
              color={msg.sender === 'ai' ? "#7B61FF" : "#00A86B"}
              style={styles.iconBubble}
            />
            <View style={styles.textBubble}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
        {typingText ? (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <Ionicons name="ios-robot-outline" size={24} color="#7B61FF" style={styles.iconBubble} />
            <View style={styles.textBubble}>
              <Text style={styles.messageText}>{typingText}|</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => router.push('/(screens)/CameraScreen')}>
            <Feather name="camera" size={22} color="#666" style={styles.iconLeft} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
          />

          <TouchableOpacity onPress={handleVoiceInput}>
            <Feather name="mic" size={22} color="#666" style={styles.iconRight} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default GenerativeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  subtitleContainer: { alignItems: 'center', marginVertical: 10 },
  subtitle: { fontSize: 14, color: '#777', fontStyle: 'italic' },
  chatContainer: { flex: 1, paddingHorizontal: width * 0.05, marginBottom: 20 },
  messageContainer: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  aiMessage: { alignSelf: 'flex-start' },
  userMessage: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  iconBubble: { marginHorizontal: 6 },
  textBubble: { backgroundColor: '#F1F1F1', padding: 10, borderRadius: 12, maxWidth: width * 0.7 },
  messageText: { fontSize: 15, color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 30, backgroundColor: '#f8f8f8', paddingHorizontal: 10, marginHorizontal: 16, marginBottom: 10, height: 50 },
  input: { flex: 1, fontSize: 16, color: '#000', paddingHorizontal: 8 },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
