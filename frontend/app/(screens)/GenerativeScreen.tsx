import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/CustomHeader";
import { Ionicons, Feather, Octicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import * as Speech from "expo-speech";

const width = Dimensions.get("window").width;

// API keys
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

const HUGGINGFACE_API_URL =
  "https://api-inference.huggingface.co/models/TheBloke/vicuna-7B-1.1-HF";

const GenerativeScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I’m your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typingText, setTypingText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<any>();

  // Typewriter effect
  const typeText = (text: string) => {
    let index = 0;
    setTypingText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { id: Date.now(), sender: "ai", text }]);
        setTypingText("");
        Speech.speak(text); // Optional: speak AI’s response aloud
      }
    }, 20);
  };

  // Send text to Hugging Face model
  const handleSend = async (userInput?: string) => {
    const msgText = userInput || input.trim();
    if (!msgText) return;

    const userMessage = { id: Date.now(), sender: "user", text: msgText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTypingText("...");

    try {
      const response = await fetch(HUGGINGFACE_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: msgText,
          parameters: { max_new_tokens: 200 },
        }),
      });

      const data = await response.json();
      const aiText = data?.[0]?.generated_text || "Sorry, I couldn't generate a response.";
      typeText(aiText);
    } catch (error) {
      console.error("Hugging Face API error:", error);
      typeText("Oops! Something went wrong while fetching the response.");
    }
  };

  // 🎙️ Record and transcribe using OpenAI Whisper
  const handleVoiceInput = async () => {
    try {
      if (isRecording) {
        // Stop recording
        console.log("Stopping recording...");
        setIsRecording(false);
        await recording?.stopAndUnloadAsync();
        const uri = recording?.getURI();
        setRecording(null);

        if (uri) {
          const transcription = await transcribeAudio(uri);
          if (transcription) handleSend(transcription);
        }
      } else {
        // Start recording
        console.log("Starting recording...");
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        setIsRecording(true);
      }
    } catch (err) {
      console.error("Voice recording error:", err);
      setIsRecording(false);
    }
  };

  // 🧠 Upload audio to Whisper API
  const transcribeAudio = async (uri: string): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/m4a",
        name: "speech.m4a",
      } as any);
      formData.append("model", "whisper-1");

      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Transcription:", data);
      return data.text || null;
    } catch (error) {
      console.error("Transcription error:", error);
      return null;
    }
  };

  // Auto-scroll
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, typingText]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Agri Assistant" />

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingVertical: 10,
        }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sender === "ai" ? styles.aiMessage : styles.userMessage,
            ]}
          >
            {msg.sender === "ai" ? (
              <Octicons name="north-star" size={24} color="black" style={styles.iconBubble} />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="black"
                style={styles.iconBubble}
              />
            )}
            <View style={[styles.textBubble, msg.sender === "user" && styles.userBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}

        {typingText ? (
          <View style={[styles.messageContainer, styles.aiMessage]}>
            <Octicons name="north-star" size={24} color="black" style={styles.iconBubble} />
            <View style={styles.textBubble}>
              <Text style={styles.messageText}>{typingText}|</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => router.push("/(screens)/CameraScreen")}>
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
            <Feather
              name={isRecording ? "mic-off" : "mic"}
              size={22}
              color={isRecording ? "red" : "#666"}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default GenerativeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatContainer: { paddingHorizontal: width * 0.04 },
  messageContainer: { flexDirection: "row", marginBottom: 12, alignItems: "flex-start" },
  aiMessage: { alignSelf: "flex-start" },
  userMessage: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  iconBubble: { marginHorizontal: 6 },
  textBubble: { backgroundColor: "#F1F1F1", padding: 10, borderRadius: 12, maxWidth: width * 0.7 },
  userBubble: { backgroundColor: "#D1E8FF" },
  messageText: { fontSize: 15, color: "#333" },
  inputWrapper: { paddingBottom: 10, backgroundColor: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    marginHorizontal: 16,
    height: 50,
  },
  input: { flex: 1, fontSize: 16, color: "#000", paddingHorizontal: 8 },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});
