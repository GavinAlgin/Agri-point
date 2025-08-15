// import Header from '@/components/CustomHeader';
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   SafeAreaView
// } from 'react-native';

// interface Message {
//   id: string;
//   sender: 'user' | 'ai';
//   text: string;
// }

// const ChatScreen: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const flatListRef = useRef<FlatList>(null);

//   const sendMessage = () => {
//     if (!inputText.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       sender: 'user',
//       text: inputText.trim(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');

//     // Simulate AI response
//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         sender: 'ai',
//         text: generateAIResponse(userMessage.text),
//       };
//       setMessages(prev => [...prev, aiResponse]);
//     }, 1000);
//   };

//   const generateAIResponse = (userInput: string): string => {
//     // Simulate an AI-like response
//     return `You said: "${userInput}". Here's a thoughtful reply like ChatGPT might give.`;
//   };

//   useEffect(() => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageBubble,
//         item.sender === 'user' ? styles.userBubble : styles.aiBubble,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <Header title={'GenAI Screen'} />
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         keyboardVerticalOffset={80}
//       >
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.chatContainer}
//         />

//         <View style={styles.inputContainer}>
//           <TextInput
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Ask AI..."
//             style={styles.input}
//             onSubmitEditing={sendMessage}
//             returnKeyType="send"
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//             <Text style={styles.sendButtonText}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//   },
//   chatContainer: {
//     padding: 10,
//     paddingBottom: 80,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     borderRadius: 16,
//     padding: 10,
//     marginVertical: 6,
//   },
//   userBubble: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   aiBubble: {
//     backgroundColor: '#E5E5EA',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     position: 'absolute',
//     bottom: 0,
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#fff',
//     borderTopColor: '#ccc',
//     borderTopWidth: 1,
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#F1F1F1',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: Platform.OS === 'ios' ? 12 : 8,
//     fontSize: 16,
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


import Header from '@/components/CustomHeader'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const GenerativeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'GenAI Screen'} />
      <StatusBar style='dark' />
    </SafeAreaView>
  )
}

export default GenerativeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
