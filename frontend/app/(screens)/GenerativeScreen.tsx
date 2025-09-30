// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import Header from '@/components/CustomHeader';

// const client = new OpenAI({
//   baseURL: "https://router.huggingface.co/v1", // Hugging Face router endpoint
//   apiKey: process.env.EXPO_PUBLIC_HF_TOKEN,
// });

// const GenerativeScreen = () => {
//   const { crop } = useLocalSearchParams();
//   const [structuredResponse, setStructuredResponse] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchAIResponse = async () => {
//     try {
//       const cropObj = JSON.parse(crop);
//       const prompt = `Give a structured agricultural analysis for the following crop data:\n${JSON.stringify(
//         cropObj,
//         null,
//         2
//       )}`;

//       const chatCompletion = await client.chat.completions.create({
//         model: "deepseek-ai/DeepSeek-R1:fireworks-ai", // Pick the model you want
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//       });

//       setStructuredResponse(chatCompletion.choices[0]?.message?.content || "No response");
//     } catch (error) {
//       console.error("AI Error:", error);
//       setStructuredResponse("Failed to fetch AI response.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAIResponse();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Header title={'My Field Analysis'} />
//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <Text style={styles.responseText}>{structuredResponse}</Text>
//       )}
//     </ScrollView>
//   );
// };

// export default GenerativeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   responseText: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
// });
