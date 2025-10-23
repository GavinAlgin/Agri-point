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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/CustomHeader';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const width = Dimensions.get('window').width;

const GenerativeScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typingText, setTypingText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // 🧠 Typewriter Effect for AI message
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

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTimeout(() => {
      typeText("That’s a great question! Let me find the best possible answer for you...");
    }, 500);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingText]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="AI Assistant" />

      {/* Subtitle */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Where knowledge begins</Text>
      </View>

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Feather name="camera" size={22} color="#666" style={styles.iconLeft} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />

          <TouchableOpacity onPress={handleSend}>
            <Feather name="mic" size={22} color="#666" style={styles.iconRight} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style='dark' />
    </SafeAreaView>
  );
};

export default GenerativeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  iconBubble: {
    marginHorizontal: 6,
  },
  textBubble: {
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 12,
    maxWidth: width * 0.7,
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  centerVoiceIcon: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 10,
  },
  voiceCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
